/**
 * The gate for /guide. `verify.mjs` drives the product page only; this drives
 * the guide with the same standard — every link resolves, no console noise,
 * no horizontal scroll at any breakpoint, and the code blocks stay LTR inside
 * the RTL layout.
 *
 * Usage: node scripts/verify-guide.mjs ./verify-shots
 *        VERIFY_URL=https://…/guide node scripts/verify-guide.mjs ./verify-shots
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = process.env.VERIFY_URL || 'http://localhost:4174/guide'
const SHOTS = process.argv[2] ?? './verify-shots'
mkdirSync(SHOTS, { recursive: true })

const results = []
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

const noise = []
const badStatus = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') noise.push(`[${m.type()}] ${m.text()}`)
})
page.on('pageerror', (e) => noise.push(`[pageerror] ${e.message}`))
page.on('response', (r) => {
  if (r.status() >= 400) badStatus.push(`${r.status()} ${r.url()}`)
})

await page.goto(URL, { waitUntil: 'networkidle' })

// ------------------------------------------------------------- structure
const shape = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  h1s: document.querySelectorAll('h1').length,
  sections: [...document.querySelectorAll('section[id]')].map((s) => s.id),
  checks: document.querySelectorAll('#checklist li').length,
  kinds: document.querySelectorAll('#kinds dl > div').length,
  codeBlocks: document.querySelectorAll('pre code').length,
  // Nothing on the guide may carry the sales page's CTA/guarantee pairing —
  // the offer is one block at the very end, not after every section.
  guarantees: document.querySelectorAll('[data-guarantee]').length,
}))
ok('exactly one h1', shape.h1s === 1, `count=${shape.h1s}`)
ok('all seven sections present', shape.sections.length === 7, shape.sections.join(', '))
ok('twelve checks in the checklist', shape.checks === 12, `count=${shape.checks}`)
ok('six guard kinds listed', shape.kinds === 6, `count=${shape.kinds}`)
ok('five code blocks', shape.codeBlocks === 5, `count=${shape.codeBlocks}`)
ok('no CTA/guarantee pairing on the guide', shape.guarantees === 0, `count=${shape.guarantees}`)

// The pseudo-code must not be dressed as captured output. `Terminal` in ui.tsx
// draws window chrome; if any of it appears here, the distinction has been lost.
const chrome = await page.locator('figcaption .rounded-full').count()
ok('no terminal chrome on the guide (pseudo-code is not a run)', chrome === 0, `dots=${chrome}`)

// ----------------------------------------------------------- anchor links
const anchors = await page.evaluate(() =>
  [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')))],
)
for (const href of anchors) {
  const id = href.slice(1)
  const found = await page.evaluate((i) => !!document.getElementById(i), id)
  ok(`anchor ${href} resolves`, found)
}

// -------------------------------------------------------- off-page links
const links = await page.evaluate(() =>
  [...document.querySelectorAll('a[href]')]
    .map((a) => a.getAttribute('href'))
    .filter((h) => h && !h.startsWith('#') && !h.startsWith('mailto:')),
)
for (const href of [...new Set(links)]) {
  const target = new global.URL(href, page.url()).toString()
  const res = await page.request.get(target)
  ok(`link ${href} → ${res.status()}`, res.ok(), target)
}

// ------------------------------------------------------------------- RTL
await page.evaluate(() => {
  localStorage.setItem('cpsk-locale', 'ar')
})
await page.reload({ waitUntil: 'networkidle' })
const rtl = await page.evaluate(() => ({
  dir: document.documentElement.dir,
  lang: document.documentElement.lang,
  // SQL and pseudo-code are not Arabic text and must not mirror.
  codeDirs: [...document.querySelectorAll('pre')].map((p) => p.getAttribute('dir')),
  h1: document.querySelector('h1')?.innerText ?? '',
}))
ok('Arabic sets dir=rtl / lang=ar', rtl.dir === 'rtl' && rtl.lang === 'ar', `${rtl.lang}/${rtl.dir}`)
ok(
  'every code block stays LTR inside the RTL page',
  rtl.codeDirs.length === 5 && rtl.codeDirs.every((d) => d === 'ltr'),
  rtl.codeDirs.join(','),
)
ok('h1 is translated', /اختبارات/.test(rtl.h1), rtl.h1.slice(0, 30))

// ------------------------------------------------------ no sideways scroll
for (const locale of ['en', 'ar']) {
  await page.evaluate((l) => localStorage.setItem('cpsk-locale', l), locale)
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.reload({ waitUntil: 'networkidle' })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    ok(`${locale} @ ${width}px — no horizontal scroll`, overflow <= 0, `overflow=${overflow}px`)
    await page.screenshot({ path: `${SHOTS}/guide-${locale}-${width}.png`, fullPage: false })
  }
}

// ------------------------------------------------------------------ noise
ok('zero console errors/warnings', noise.length === 0, noise.slice(0, 3).join(' | '))
ok('no HTTP 4xx/5xx responses', badStatus.length === 0, badStatus.slice(0, 3).join(' | '))

await browser.close()

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length === 0 ? 0 : 1)
