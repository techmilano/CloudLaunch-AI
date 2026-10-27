# CloudLaunchAI website

Marketing site for CloudLaunchAI, built with [Astro](https://astro.build) as a fully static site and deployed on Netlify. No server, database, or paid service is needed to render it. The contact form uses Netlify Forms.

- **Production URL:** https://cloudlaunchai.com
- **Netlify project:** `cloudlaunch-ai-prod`
- **Stack:** Astro 7 (static output), self-hosted fonts (Outfit, Public Sans), no client framework, no third-party scripts or cookies.

---

## Quick reference

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Local dev server | `npm run dev` → http://localhost:4321 |
| Production build | `npm run build` → output in `dist/` |
| Preview the build | `npm run preview` |
| List unreplaced placeholders | `npm run check:placeholders` |

Requires **Node.js 22.23.4 or newer** (see `.nvmrc`; Netlify uses Node 22 via `netlify.toml`).

---

## Editing content

Most edits don’t require touching page templates.

| What | Where |
| --- | --- |
| Email, scheduling link, service area, legal name, founder details, nav labels, CTA labels | `src/config/site.ts` |
| Solutions (names, summaries, use cases), the four process steps, human-oversight points | `src/data/content.ts` |
| FAQ on How It Works | `src/pages/how-it-works.astro` (top of file) |
| Business-type dropdown options | `src/pages/contact.astro` (top of file) |
| Page-specific copy | `src/pages/*.astro` |
| Colors, type scale, spacing | `src/styles/global.css` (`:root` tokens) |
| Logo, favicon, social preview image | `public/` |

### Placeholders

Any value written as `[LIKE_THIS]` is a placeholder. On the site it’s shown with a dashed yellow highlight so it can’t slip into launch unnoticed. Run:

```bash
npm run check:placeholders
```

It lists every remaining placeholder with file and line number, and exits with an error code while any remain (so you can use it as a prelaunch gate).

**Scheduling link behavior:** while `schedulingUrl` is a placeholder, every “Book a discovery call” button points to `/contact/#schedule`, so there are no dead links. Once you set a real URL, all those buttons open your booking page in a new tab automatically.

### Copy guardrails

The site intentionally avoids: guaranteed results, response times, integrations, certifications or compliance claims; invented customers, testimonials, or case studies; prices; and “replace your staff” messaging. Keep new copy to the same standard — describe what a workflow *can be set up to do*, and confirm anything specific during discovery.

---

## Local development

```bash
npm install
npm run dev
```

Note: the contact form only *submits* on Netlify (or under `netlify dev`). On the plain Astro dev/preview server, a submit will show the form’s “didn’t send” message — that’s expected.

---

## Build

```bash
npm run build
```

Outputs static HTML/CSS to `dist/`, plus `sitemap-index.xml` and `sitemap-0.xml`. Utility pages (`/thanks/`, `/privacy/`, 404) are excluded from the sitemap.

---

## Deploying on Netlify

`netlify.toml` already sets:

- Build command: `npm run build`
- Publish directory: `dist`
- `NODE_VERSION = "22"`
- Security headers, long-cache headers for `/_astro/*`, `noindex` for `/thanks/` and `/privacy/`, and a `www → apex` redirect.

### Option A — Git continuous deployment (current setup)

The `cloudlaunch-ai-prod` project is connected to the GitHub repo `techmilano/CloudLaunch-AI`, production branch `main`. Every push to `main` builds and publishes. Pull requests get Deploy Previews.

### Option B — Netlify CLI (manual)

```bash
npm install -g netlify-cli
netlify login
netlify link            # choose cloudlaunch-ai-prod
netlify deploy --build          # draft deploy for review
netlify deploy --build --prod   # production
```

`netlify link` writes `.netlify/` — it’s already in `.gitignore`; don’t commit it. If Git deploys are active, the next push to `main` replaces any manual production deploy.

### Enable form detection (one time)

In Netlify: **Project configuration → Forms → Enable form detection**, then redeploy. Without this, the form will not register.

---

## Custom domain setup

1. Netlify → **Domain management → Add a domain** → `cloudlaunchai.com` (already the primary domain on this project).
2. Also add `www.cloudlaunchai.com` as a domain alias. `netlify.toml` redirects `www` to the apex domain.
3. DNS — either:
   - **Netlify DNS:** point your registrar’s nameservers to the ones Netlify shows, or
   - **External DNS:** an `A` record for the apex to Netlify’s load balancer IP (shown in the Netlify UI), and a `CNAME` for `www` → `cloudlaunch-ai-prod.netlify.app`.
4. **HTTPS:** Netlify provisions a Let’s Encrypt certificate automatically once DNS resolves. Check **Domain management → HTTPS**.
5. If the domain ever changes, update `site` in `astro.config.mjs`, `url` in `src/config/site.ts`, the sitemap line in `public/robots.txt`, and the redirect in `netlify.toml`.

---

## Contact form (Netlify Forms)

How it works:

- The form in `src/pages/contact.astro` is rendered into static HTML with `data-netlify="true"`, so Netlify detects it at deploy time. Form name: **`contact`**.
- Fields: `name`, `email`, `company`, `business-type`, `message`, plus hidden `form-name` and `subject`.
- **Spam protection:** honeypot field `bot-field` (`netlify-honeypot="bot-field"`), plus Netlify’s built-in Akismet filtering.
- **Validation:** native HTML validation without JavaScript; with JavaScript, inline per-field messages, an error summary that receives focus, and `aria-invalid` on problem fields.
- **Success:** with JavaScript, the form is submitted in the background and replaced by an inline confirmation whose heading receives focus. Without JavaScript, the browser posts normally and lands on `/thanks/`.
- **Privacy:** submissions are stored in your Netlify account only; nothing is published on the site. A privacy notice sits above the submit button.

### Notifications

Netlify → **Forms → Form notifications → Add notification → Email notification**, choose the `contact` form, and enter the inbox that should receive inquiries. The email subject is set by the hidden `subject` field (“New website inquiry (submission id)”); change it in `contact.astro` if needed — don’t also set one in the UI, since the HTML value wins.

### Testing the form after deploy

1. Open `https://cloudlaunchai.com/contact/` (or a Deploy Preview URL).
2. Submit empty → five error messages and a focused error summary.
3. Enter an invalid email → specific format message.
4. Submit a realistic inquiry using a **real** email address and full sentences (obvious test text like `test@test.com` / “asdf” is often marked spam).
5. You should see “Inquiry sent. Thank you.” on the page.
6. In Netlify → **Forms → contact**, confirm the submission under **Verified submissions**. If it’s missing, check **Spam submissions** first.
7. Turn JavaScript off and repeat once — you should land on `/thanks/`.
8. Confirm the notification email arrives.

Delete test submissions afterwards. For data you collect, export and delete old submissions regularly.

---

## Accessibility and quality notes

- Semantic landmarks, one `h1` per page, skip link, labeled form controls, `aria-current` in navigation.
- Keyboard-operable mobile menu (`aria-expanded`, Escape to close, focus returned to the toggle). Without JavaScript the menu is always visible.
- Visible 3px focus outline on all interactive elements.
- Colors checked for WCAG AA contrast; bright teal is used only for decorative lines, never text.
- `prefers-reduced-motion` disables transitions and smooth scrolling.
- Tap targets ≥ 44px on mobile; inputs use 16px text so iOS doesn’t zoom.
- Structured data is limited to verified facts (organization name, URL, logo). Add address, phone, founder, or `sameAs` links only once confirmed.

---

## Prelaunch checklist

**Business details**

- [ ] Replace every placeholder — `npm run check:placeholders` reports none
- [ ] `[CONTACT_EMAIL]` — a monitored inbox
- [ ] `[SCHEDULING_URL]` — booking page tested end to end
- [ ] `[SERVICE_AREA]`, `[LEGAL_BUSINESS_NAME]`, `[YEAR_FOUNDED]`
- [ ] Founder name, title, bio, and **only verified** credentials; optional photo in `public/` and set `founder.photo`
- [ ] Read every page aloud once: no guarantees, invented proof, or prices crept in

**Privacy and legal**

- [ ] `/privacy/` reviewed and completed by the business owner **and a legal advisor** (fill `[PRIVACY_EFFECTIVE_DATE]`, `[RETENTION_PERIOD]`, and every `[REVIEW: …]` note)
- [ ] Then: remove the draft banner and `noindex` from `src/pages/privacy.astro`, remove `/privacy/` from the `netlify.toml` noindex header and the `astro.config.mjs` sitemap exclusion, and drop “(draft)” from link text in `Footer.astro` and `contact.astro`
- [ ] If you add analytics, chat, or other third-party tools, update the privacy notice first

**Netlify**

- [ ] Form detection enabled; `contact` form appears under Forms
- [ ] Email notification configured to the right inbox
- [ ] Live form test passed (JS on and off) and test submissions deleted
- [ ] `cloudlaunchai.com` and `www` resolve; HTTPS certificate active
- [ ] Deploy log shows no warnings

**Search and sharing**

- [ ] `https://cloudlaunchai.com/sitemap-index.xml` and `/robots.txt` load
- [ ] Submit the sitemap in Google Search Console
- [ ] Share a page link in a messaging app to confirm the preview image and title
- [ ] Optional: replace `public/og-image.png` (1200×630) with a designed social image

**Final checks**

- [ ] Click every nav link and CTA on a phone and on desktop
- [ ] Tab through Home and Contact with the keyboard only
- [ ] Run Lighthouse (Accessibility, SEO, Best Practices) on Home and Contact
