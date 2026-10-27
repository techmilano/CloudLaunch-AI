#!/usr/bin/env node
/**
 * Lists every [PLACEHOLDER] still present in the source.
 * Usage: npm run check:placeholders
 * Exits with code 1 if any remain, so it can be used as a prelaunch gate.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const SCAN = ['src'];
const PATTERN = /\[([A-Z][A-Z0-9_]{2,})(?::[^\]]*|\s[—-][^\]]*)?\]/g;

const found = new Map();

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(astro|ts|js|mjs|css|md)$/.test(entry)) {
      const lines = readFileSync(full, 'utf8').split('\n');
      lines.forEach((line, i) => {
        for (const match of line.matchAll(PATTERN)) {
          const key = match[1];
          if (!found.has(key)) found.set(key, []);
          found.get(key).push(`${relative(root, full)}:${i + 1}`);
        }
      });
    }
  }
}

SCAN.forEach((d) => walk(join(root, d)));

if (found.size === 0) {
  console.log('No placeholders found. Ready for launch review.');
  process.exit(0);
}

console.log(`Found ${found.size} placeholder(s) to replace:\n`);
for (const [key, locations] of [...found.entries()].sort()) {
  console.log(`[${key}]`);
  locations.forEach((loc) => console.log(`   ${loc}`));
}
process.exit(1);
