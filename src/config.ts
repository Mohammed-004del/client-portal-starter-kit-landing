/**
 * Every tunable value on this page lives here, defined once.
 */

/** The standing one-time price, USD. What the product costs once launch ends. */
export const PRICE_USD = 129

/**
 * The launch offer: the first 20 licences at $89.
 *
 * The count is enforced by a 20-redemption limit on the Lemon Squeezy discount,
 * not by anyone remembering to act. When the twentieth sells, the code stops
 * applying and checkout reverts to $129 on its own — so LAUNCH_ACTIVE must go
 * false in the same breath, or the page advertises a price checkout will refuse
 * to honour. That is the single thing this page may never do.
 *
 * There is deliberately no "x of 20 taken" counter. A number nobody can verify
 * and someone has to remember to update is exactly the kind of number this page
 * refuses everywhere else; the offer is stated as a rule instead of a running
 * total, which stays true without maintenance.
 *
 * ⚠️ HELD FALSE until the discount is verified applying at checkout.
 * Checked 2026-08-16 against the live variant with the documented parameter
 * `?checkout[discount_code]=M5NTY0MG`, raw and percent-encoded: the page
 * rendered $129.00, the button read "Pay $129.00", and the checkout showed no
 * discount field at all. Both branches below are built and tested — flip to
 * true once a checkout opened from CHECKOUT_URL actually shows $89.
 */
export const LAUNCH_ACTIVE = false
export const LAUNCH_PRICE_USD = 89
export const LAUNCH_SEATS = 20

/** The price actually charged right now. Every rendered price derives from this. */
export const CURRENT_PRICE_USD = LAUNCH_ACTIVE ? LAUNCH_PRICE_USD : PRICE_USD

/**
 * Live Lemon Squeezy checkout. Verified out of test mode before being put here:
 * the page reports test_mode false on both product and cart, shows no test-mode
 * banner, offers real payment methods, and its subtotal is 12900 — $129.00.
 *
 * The test-mode variant had a different id, so this URL is not interchangeable
 * with the earlier one.
 */
const CHECKOUT_BASE =
  'https://client-portal-starter-kit.lemonsqueezy.com/checkout/buy/c4ae2215-105f-4f79-82a3-8200235f987f'

/**
 * The launch discount, pre-applied through the URL so the buyer never has to
 * find a coupon field — checkout opens already showing $89. The code is public
 * by design: what limits it is the 20-redemption cap on the discount itself,
 * not secrecy.
 */
const LAUNCH_DISCOUNT_CODE = 'M5NTY0MG'

export const CHECKOUT_URL = LAUNCH_ACTIVE
  ? `${CHECKOUT_BASE}?checkout[discount_code]=${LAUNCH_DISCOUNT_CODE}`
  : CHECKOUT_BASE

/** True while CHECKOUT_URL is still the placeholder, so the UI can say so instead of pretending. */
export const CHECKOUT_IS_PLACEHOLDER = CHECKOUT_URL.includes('PLACEHOLDER')

/**
 * The only way to reach a human here.
 */
export const CONTACT_EMAIL = 'mohammedmahmoodhamed004@gmail.com'

/**
 * Lemon Squeezy needs an international card, which a large share of developers
 * in Egypt and the Gulf do not have — so there is a second route, arranged by
 * email rather than published. The account details stay out of the page on
 * purpose: they belong to a personal number tied to a bank account, and a page
 * that ranks in Google is the wrong place for either.
 *
 * ⚠️ This is a promise being made to a buyer. Confirm the window before it
 * ships — it is the seller's commitment, not an estimate.
 */
export const MANUAL_DELIVERY_HOURS = 24

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
