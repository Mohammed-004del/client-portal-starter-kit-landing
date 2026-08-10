import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = 'http://localhost:4174/'
const SHOTS = process.argv[2]
mkdirSync(SHOTS, { recursive: true })

const results = []
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch()

// ---------------------------------------------------------------- console
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const noise = []
const badStatus = []
const hardFailures = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') noise.push(`[${m.type()}] ${m.text()}`)
})
page.on('pageerror', (e) => noise.push(`[pageerror] ${e.message}`))
page.on('response', (r) => {
  if (r.status() >= 400) badStatus.push(`${r.status()} ${r.url()}`)
})
page.on('requestfailed', (r) => {
  // A browser cancelling its own media range request once it has the metadata
  // it asked for is normal and is not an error. Anything else is.
  const err = r.failure()?.errorText ?? ''
  if (err === 'net::ERR_ABORTED' && r.resourceType() === 'media') return
  hardFailures.push(`${r.url()} ${err}`)
})

await page.goto(URL, { waitUntil: 'networkidle' })

// ------------------------------------------------------- default = EN/LTR
const en = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  title: document.title,
  desc: document.querySelector('meta[name="description"]')?.content ?? '',
  og: document.querySelector('meta[property="og:locale"]')?.content ?? '',
}))
ok('default locale is en/ltr', en.lang === 'en' && en.dir === 'ltr', `${en.lang}/${en.dir}`)
ok('English title set', en.title.includes('security you can check'), en.title.slice(0, 50))

// --------------------------------------------------- every asset resolves
const assets = await page.evaluate(async () => {
  const imgs = [...document.querySelectorAll('img')].map((i) => ({
    kind: 'img',
    src: i.currentSrc || i.src,
    okay: i.complete && i.naturalWidth > 0,
  }))
  const vids = await Promise.all(
    [...document.querySelectorAll('video')].map(async (v) => {
      if (v.readyState === 0) {
        v.preload = 'metadata'
        v.load()
        await new Promise((r) => {
          v.addEventListener('loadedmetadata', r, { once: true })
          setTimeout(r, 6000)
        })
      }
      return {
        kind: 'video',
        src: v.currentSrc,
        okay: v.readyState > 0 && v.videoWidth > 0,
        detail: `readyState=${v.readyState} ${v.videoWidth}x${v.videoHeight}`,
      }
    }),
  )
  return [...imgs, ...vids]
})
for (const a of assets) {
  const short = (a.src || '(empty src)').replace('http://localhost:4174', '')
  ok(`${a.kind} renders: ${short}`, a.okay, a.detail ?? '')
}
ok('at least one video present', assets.some((a) => a.kind === 'video'), `${assets.length} assets`)

// -------------------------------------------- CTA + guarantee pairing
const pairing = await page.evaluate(() => {
  const sections = [...document.querySelectorAll('[data-section]')]
  return sections.map((s) => ({
    id: s.id,
    guarantees: s.querySelectorAll('[data-guarantee]').length,
  }))
})
for (const s of pairing) {
  ok(`section #${s.id} has exactly one guarantee`, s.guarantees === 1, `count=${s.guarantees}`)
}

// ------------------------------------------------------ in-page anchors
const anchors = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="#"]')].map((a) => ({
    href: a.getAttribute('href'),
    label: (a.textContent || '').trim().slice(0, 30),
    resolves: a.getAttribute('href') === '#' || !!document.querySelector(a.getAttribute('href')),
  })),
)
for (const a of anchors) {
  ok(`anchor ${a.href} ("${a.label}") has a target`, a.resolves)
}

await page.screenshot({ path: `${SHOTS}/1440-ltr.png`, fullPage: true })

// ------------------------------------------------------ toggle to Arabic
await page.getByRole('button', { name: /Switch to Arabic/i }).click()
await page.waitForTimeout(400)
const ar = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  title: document.title,
  og: document.querySelector('meta[property="og:locale"]')?.content ?? '',
  desc: document.querySelector('meta[name="description"]')?.content ?? '',
  h1: document.querySelector('h1')?.textContent ?? '',
  // the terminal block must stay LTR inside the RTL page
  verbatimDir: getComputedStyle(document.querySelector('pre.verbatim')).direction,
  bodyDir: getComputedStyle(document.body).direction,
}))
ok('toggle switches to ar/rtl', ar.lang === 'ar' && ar.dir === 'rtl', `${ar.lang}/${ar.dir}`)
ok('body computed direction is rtl', ar.bodyDir === 'rtl', ar.bodyDir)
ok('terminal block stays ltr inside rtl page', ar.verbatimDir === 'ltr', ar.verbatimDir)
ok('Arabic title swapped', /حماية/.test(ar.title), ar.title.slice(0, 40))
ok('Arabic meta description swapped', /Supabase/.test(ar.desc) && /عزل/.test(ar.desc))
ok('og:locale swapped', ar.og === 'ar_EG', ar.og)
ok('H1 is Arabic', /وظيفتك/.test(ar.h1), ar.h1.slice(0, 40))

// no untranslated English leaking into Arabic body copy
const leaked = await page.evaluate(() => {
  const bad = []
  for (const p of document.querySelectorAll('main p, main h1, main h2, main h3')) {
    const txt = (p.textContent || '').trim()
    if (/You were hired|Run the guard sweep yourself|is easy to write/.test(txt)) bad.push(txt.slice(0, 60))
  }
  return bad
})
ok('no English strings left in Arabic page', leaked.length === 0, leaked.join(' | '))

await page.screenshot({ path: `${SHOTS}/1440-rtl.png`, fullPage: true })

// --------------------------------------------------------- persistence
await page.reload({ waitUntil: 'networkidle' })
const afterReload = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
}))
ok(
  'language persists across reload',
  afterReload.lang === 'ar' && afterReload.dir === 'rtl',
  `${afterReload.lang}/${afterReload.dir}`,
)

// ------------------------------------------------- breakpoints, both dirs
for (const dir of ['rtl', 'ltr']) {
  if (dir === 'ltr') {
    await page.getByRole('button', { name: /التبديل إلى الإنجليزية/i }).click()
    await page.waitForTimeout(300)
  }
  for (const w of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width: w, height: 900 })
    await page.waitForTimeout(150)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    ok(`no horizontal overflow @${w}px ${dir}`, !overflow)
    await page.screenshot({ path: `${SHOTS}/${w}-${dir}.png`, fullPage: true })
  }
}

// ------------------------------------------------------- reduced motion
const rm = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1024, height: 800 } })
const rmPage = await rm.newPage()
await rmPage.goto(URL, { waitUntil: 'domcontentloaded' })
const scrollBehavior = await rmPage.evaluate(
  () => getComputedStyle(document.documentElement).scrollBehavior,
)
ok('prefers-reduced-motion disables smooth scroll', scrollBehavior === 'auto', scrollBehavior)
await rm.close()

// --------------------------------------------------------------- console
ok('zero console errors/warnings', noise.length === 0, noise.slice(0, 6).join(' | '))
ok('no HTTP 4xx/5xx responses', badStatus.length === 0, badStatus.slice(0, 6).join(' | '))
ok('no failed requests', hardFailures.length === 0, hardFailures.slice(0, 6).join(' | '))

await browser.close()

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) {
  console.log('FAILURES:')
  for (const f of failed) console.log(`  - ${f.name} ${f.detail}`)
  process.exit(1)
}
