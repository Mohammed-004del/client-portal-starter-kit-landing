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
 * The only way to reach a human here.
 */
export const CONTACT_EMAIL = 'mohammedmahmoodhamed004@gmail.com'

/**
 * Email capture, pointed at one Postgres function and nothing else.
 *
 * This is the seller's own Supabase project — not a third-party form service —
 * and the table lives in a `marketing` schema so the product's migrations,
 * which rebuild `public`, can never drop it.
 *
 * The key below is a **publishable** key. It is designed to be shipped in a
 * browser bundle and is not a secret: it grants exactly one privilege here,
 * EXECUTE on public.capture_lead. The schema holding the addresses is not
 * exposed to the API at all, so this key cannot read a single stored address,
 * and every product table is behind row-level security besides.
 *
 * A plain fetch rather than @supabase/supabase-js: one POST does not justify
 * ~30KB of client library.
 */
const SUPABASE_URL = 'https://kxiugikgjsoyybtlkepu.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_v47ADYYCkn4l30jhyURgWw_f8Ina1ly'

export const LEAD_ENDPOINT = `${SUPABASE_URL}/rest/v1/rpc/capture_lead`
export const LEAD_HEADERS = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
  'Content-Type': 'application/json',
}

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
