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
 * Form service endpoint (Formspree or any POST-to-URL service), set via VITE_FORM_ENDPOINT.
 * Unset means the email form reports itself unconfigured rather than silently doing nothing.
 */
export const FORM_ENDPOINT: string | undefined = import.meta.env.VITE_FORM_ENDPOINT

/** Footer legal links. All placeholders until real pages exist. */
export const PLACEHOLDER_LINKS = {
  refund: '#refund-policy',
  privacy: '#privacy-policy',
  terms: '#terms',
  contact: 'mailto:REPLACE-ME@example.com',
} as const

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
} as const
