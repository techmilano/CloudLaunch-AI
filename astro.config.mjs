// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that should not appear in the sitemap (utility pages and the
// unreviewed privacy draft, which is also marked noindex).
const EXCLUDE_FROM_SITEMAP = ['/thanks/', '/privacy/', '/404'];

export default defineConfig({
  // Production URL — used for canonical links, Open Graph URLs and the sitemap.
  site: 'https://cloudlaunchai.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDE_FROM_SITEMAP.some((path) => page.includes(path)),
    }),
  ],
});
