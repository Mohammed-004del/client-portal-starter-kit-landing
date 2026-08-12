/**
 * Every tunable value on this page lives here, defined once.
 */

/** One-time price, USD. Rendered wherever a price appears — never re-typed in copy. */
export const PRICE_USD = 129

/**
 * PLACEHOLDER — not a working checkout.
 * Replace with the real Lemon Squeezy checkout URL before launch.
 */
export const CHECKOUT_URL = 'https://PLACEHOLDER.lemonsqueezy.com/checkout/buy/REPLACE-ME'

/** True while CHECKOUT_URL is still the placeholder, so the UI can say so instead of pretending. */
export const CHECKOUT_IS_PLACEHOLDER = CHECKOUT_URL.includes('PLACEHOLDER')

/**
 * The only way to reach a human here. A mailto: rather than a form service:
 * this page has no backend by design, and a third-party form would be the one
 * external dependency on an otherwise entirely self-hosted page.
 */
export const CONTACT_EMAIL = 'mohammedmahmoodhamed004@gmail.com'

/** Asset paths, copied one-way out of demo-assets/ at build time. */
export const ASSETS = {
  heroVideoWebm: '/assets/video/hero.webm',
  heroVideoMp4: '/assets/video/hero.mp4',
  heroPoster: '/assets/video/hero-poster.webp',
  walkthroughWebm: '/assets/video/walkthrough.webm',
  walkthroughMp4: '/assets/video/walkthrough.mp4',
  walkthroughPoster: '/assets/video/walkthrough-poster.webp',
  proofTypedAdmin: '/assets/proof/01-typed-admin.png',
  proofBackOnPortal: '/assets/proof/02-back-on-portal.png',
  screenshot: (stem: string) => `/assets/screenshots/${stem}.png`,
} as const

/**
 * The captured runs, served as plain text so a prospect can read the evidence
 * before buying rather than being asked to take the excerpts on trust.
 */
export const RUNS = {
  fullSweep: '/assets/terminal/full-sweep.txt',
  securitySuite: '/assets/terminal/test-security.txt',
  filteredSweep: '/assets/terminal/filtered-sweep.txt',
  lighthouse: '/assets/terminal/lighthouse-audit.txt',
} as const
