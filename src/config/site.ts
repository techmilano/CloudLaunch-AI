/**
 * CloudLaunchAI — editable business details.
 *
 * Everything a non-developer is likely to change lives in this file.
 * Values written in square brackets (e.g. the contact email below) are placeholders: the site shows them
 * visibly highlighted so they can't slip into launch unnoticed.
 * Replace each one with a verified fact before launch, or leave it as-is
 * until you have one. Run `npm run check:placeholders` to list what's left.
 */

export const site = {
  name: 'CloudLaunchAI',
  /** Production URL. Also set `site` in astro.config.mjs if this changes. */
  url: 'https://cloudlaunchai.com',
  tagline: 'Managed AI workflows for small and midsize businesses',
  defaultDescription:
    'CloudLaunchAI designs, launches, and manages practical AI workflows that help small and midsize businesses answer inquiries, follow up on missed calls, and route requests to the right person — with your team in control.',

  // ---- Contact details (replace before launch) -------------------------
  contactEmail: '[CONTACT_EMAIL]',
  /** Online booking page, e.g. a Calendly or Google Calendar booking link. */
  schedulingUrl: '[SCHEDULING_URL]',
  serviceArea: '[SERVICE_AREA]',
  legalName: '[LEGAL_BUSINESS_NAME]',

  // ---- Calls to action ---------------------------------------------------
  cta: {
    primary: 'Book a discovery call',
    secondary: 'Explore solutions',
  },

  // ---- Navigation --------------------------------------------------------
  nav: [
    { label: 'Solutions', href: '/solutions/' },
    { label: 'How it works', href: '/how-it-works/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],

  // ---- Founder / team (About page) --------------------------------------
  founder: {
    name: '[FOUNDER_NAME]',
    title: '[FOUNDER_TITLE]',
    bio: '[FOUNDER_BIO — two or three sentences on background and why you started CloudLaunchAI]',
    credentials: '[FOUNDER_CREDENTIALS — only list verified certifications, degrees, or memberships]',
    /** Path to a photo in /public, e.g. '/team/founder.jpg'. Leave '' to show an initials badge. */
    photo: '',
  },
  yearFounded: '[YEAR_FOUNDED]',

  // ---- Social profiles (only add real, active profiles) ------------------
  social: [] as { label: string; href: string }[],
};

/** True when a value is still an unreplaced square-bracket placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

/**
 * Where "Book a discovery call" points. Until a real scheduling URL is set,
 * it falls back to the contact page so the button never leads to a dead link.
 */
export function bookingHref(): string {
  return isPlaceholder(site.schedulingUrl) ? '/contact/#schedule' : site.schedulingUrl;
}

export function bookingIsExternal(): boolean {
  return !isPlaceholder(site.schedulingUrl);
}
