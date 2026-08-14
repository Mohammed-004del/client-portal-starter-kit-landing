/**
 * Every tunable value on this page lives here, defined once.
 */

/** One-time price, USD. Rendered wherever a price appears — never re-typed in copy. */
export const PRICE_USD = 129

/**
 * Live Lemon Squeezy checkout. Verified out of test mode before being put here:
 * the page reports test_mode false on both product and cart, shows no test-mode
 * banner, offers real payment methods, and its subtotal is 12900 — $129.00.
 *
 * The test-mode variant had a different id, so this URL is not interchangeable
 * with the earlier one.
 */
export const CHECKOUT_URL =
  'https://client-portal-starter-kit.lemonsqueezy.com/checkout/buy/c4ae2215-105f-4f79-82a3-8200235f987f'

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
