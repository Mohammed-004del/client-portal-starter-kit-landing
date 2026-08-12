import { ASSETS, CHECKOUT_URL, PRICE_USD } from './config'
import {
  DIFFERENTIATOR,
  ENFORCEMENT,
  FAQ,
  FOOTER,
  HERO,
  INCLUDED,
  LIMITS,
  LOCALE_SWITCH_ARIA,
  LOCALE_SWITCH_LABEL,
  NAV,
  OFFER,
  PRICING,
  PROBLEM,
  PROOF,
  SCREENS,
  SETUP,
  SETUP_COMMANDS,
  STACK,
  SWEEP_EXCERPT,
  TWO_IDENTITY_EXCERPT,
} from './content'
import { useLocale } from './locale-context'
import {
  Closing,
  CtaBlock,
  DefList,
  Contact,
  Faq,
  Prose,
  Section,
  Shot,
  Terminal,
} from './ui'

function Nav() {
  const { locale, setLocale, t } = useLocale()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav
        aria-label={t({ en: 'Primary', ar: 'التنقل الرئيسي' })}
        className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8"
      >
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight text-fg">
          <span className="hidden sm:inline">{t(NAV.brand)}</span>
          <span className="sm:hidden">{t(NAV.brandShort)}</span>
        </a>

        <ul className="ms-auto hidden items-center gap-6 lg:flex">
          {NAV.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-muted transition-colors hover:text-fg">
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <button
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
            aria-label={t(LOCALE_SWITCH_ARIA)}
            className="rounded-md border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {t(LOCALE_SWITCH_LABEL)}
          </button>
          <a
            href={CHECKOUT_URL}
            aria-label={t(OFFER.buyAria)}
            className="rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-fg"
          >
            {t(OFFER.buy)}
          </a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  const { t } = useLocale()

  return (
    <section id="top" className="px-5 pt-28 pb-20 sm:px-8 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <h1 className="max-w-4xl text-hero font-bold leading-[1.08] tracking-tight text-balance">
          <span className="block">{t(HERO.h1Line1)}</span>
          <span className="mt-2 block text-muted">{t(HERO.h1Line2)}</span>
        </h1>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {t(HERO.sub)}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#walkthrough"
            className="inline-flex items-center justify-center rounded-md border border-line-strong px-6 py-3 text-base font-semibold text-fg transition-colors hover:bg-surface"
          >
            {t(OFFER.watch)}
          </a>
          <a
            href={CHECKOUT_URL}
            aria-label={t(OFFER.buyAria)}
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-ink transition-colors hover:bg-fg"
          >
            {t(OFFER.buy)}
          </a>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted" data-guarantee>
          {t(OFFER.guarantee)}
        </p>

        <figure className="mt-14">
          <video
            className="w-full rounded-lg border border-line bg-surface"
            width={1440}
            height={810}
            poster={ASSETS.heroPoster}
            controls
            playsInline
            preload="metadata"
          >
            <source src={ASSETS.heroVideoWebm} type="video/webm" />
            <source src={ASSETS.heroVideoMp4} type="video/mp4" />
            {t(HERO.videoUnsupported)}
          </video>
          <figcaption className="mt-3 text-sm text-faint">{t(HERO.videoCaption)}</figcaption>
        </figure>
      </div>
    </section>
  )
}

/* §1 */
function Problem() {
  const { t } = useLocale()

  return (
    <Section id="problem" eyebrow={t(PROBLEM.eyebrow)}>
      <h2
        id="problem-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(PROBLEM.heading)}
      </h2>
      <Prose paragraphs={t(PROBLEM.body)} />
      <Closing>{t(PROBLEM.closing)}</Closing>
      <CtaBlock />
    </Section>
  )
}

/* §2 */
function Differentiator() {
  const { t } = useLocale()

  return (
    <Section id="proof" eyebrow={t(DIFFERENTIATOR.eyebrow)}>
      <h2
        id="proof-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        <span className="block">{t(DIFFERENTIATOR.headingLine1)}</span>
        <span className="mt-1 block text-accent">{t(DIFFERENTIATOR.headingLine2)}</span>
      </h2>

      <Prose paragraphs={t(DIFFERENTIATOR.body)} />

      <Terminal
        label={t(DIFFERENTIATOR.terminalLabel)}
        body={SWEEP_EXCERPT}
        note={t(DIFFERENTIATOR.terminalSourceNote)}
      />

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(DIFFERENTIATOR.greenSuiteHeading)}
      </h3>
      <Prose paragraphs={t(DIFFERENTIATOR.greenSuiteBody)} />

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(DIFFERENTIATOR.namingHeading)}
      </h3>
      <Prose paragraphs={t(DIFFERENTIATOR.namingBody)} />

      <Closing>{t(DIFFERENTIATOR.closing)}</Closing>

      <CtaBlock />
    </Section>
  )
}

/* §3 */
function Enforcement() {
  const { t } = useLocale()

  return (
    <Section id="enforcement" eyebrow={t(ENFORCEMENT.eyebrow)}>
      <h2
        id="enforcement-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(ENFORCEMENT.heading)}
      </h2>
      <Prose paragraphs={t(ENFORCEMENT.intro)} />

      {/* Two claims, labelled and kept apart. Neither caption may imply the
          other's scope — the database refuses; the router merely redirects. */}
      <div className="mt-14 border-s-2 border-line-strong ps-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(ENFORCEMENT.claim1Label)}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
          {t(ENFORCEMENT.claim1Heading)}
        </h3>
        <Prose paragraphs={t(ENFORCEMENT.claim1Body)} />
        <Terminal
          label={t(ENFORCEMENT.claim1TerminalLabel)}
          body={TWO_IDENTITY_EXCERPT}
          note={t(ENFORCEMENT.claim1TerminalNote)}
        />
      </div>

      <div className="mt-14 border-s-2 border-line-strong ps-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {t(ENFORCEMENT.claim2Label)}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
          {t(ENFORCEMENT.claim2Heading)}
        </h3>
        <Prose paragraphs={t(ENFORCEMENT.claim2Body)} />

        {/* Stacked, not side by side: the evidence in these is the text in the
            address bar, and at half width it is not readable. */}
        <div className="mt-8 space-y-8">
          <Shot
            src={ASSETS.proofTypedAdmin}
            alt={t(ENFORCEMENT.shot1Caption)}
            caption={t(ENFORCEMENT.shot1Caption)}
            width={1919}
            height={990}
          />
          <Shot
            src={ASSETS.proofBackOnPortal}
            alt={t(ENFORCEMENT.shot2Caption)}
            caption={t(ENFORCEMENT.shot2Caption)}
            width={1919}
            height={990}
          />
        </div>
      </div>

      <Closing>{t(ENFORCEMENT.closing)}</Closing>
      <CtaBlock />
    </Section>
  )
}

/* §4 */
function Included() {
  const { t } = useLocale()

  return (
    <Section id="included" eyebrow={t(INCLUDED.eyebrow)}>
      <h2
        id="included-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(INCLUDED.heading)}
      </h2>
      <Prose paragraphs={[t(INCLUDED.intro)]} />
      <DefList items={INCLUDED.tables} mono />

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(INCLUDED.restHeading)}
      </h3>
      <DefList items={INCLUDED.rest} />

      <CtaBlock />
    </Section>
  )
}

/* §5 */
function Setup() {
  const { t } = useLocale()

  return (
    <Section id="setup" eyebrow={t(SETUP.eyebrow)}>
      <h2
        id="setup-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(SETUP.heading)}
      </h2>
      <Prose paragraphs={t(SETUP.intro)} />

      <Terminal
        label={t(SETUP.commandsLabel)}
        body={SETUP_COMMANDS}
        note={t(SETUP.commandsNote)}
      />

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(SETUP.afterHeading)}
      </h3>
      <Prose paragraphs={t(SETUP.after)} />

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(SETUP.emptyDbHeading)}
      </h3>
      <Prose paragraphs={t(SETUP.emptyDbBody)} />

      <CtaBlock />
    </Section>
  )
}

/* §6 */
function Limits() {
  const { t } = useLocale()

  return (
    <Section id="limits" eyebrow={t(LIMITS.eyebrow)}>
      <h2
        id="limits-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(LIMITS.heading)}
      </h2>
      <Prose paragraphs={[t(LIMITS.intro)]} />
      <DefList items={LIMITS.items} />
      <Closing>{t(LIMITS.closing)}</Closing>
      <CtaBlock />
    </Section>
  )
}

/* §7 — the walkthrough recording, then every screen in it. */
function Screens() {
  const { t } = useLocale()

  return (
    <Section id="walkthrough" eyebrow={t(SCREENS.eyebrow)}>
      <h2
        id="walkthrough-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(SCREENS.heading)}
      </h2>
      <Prose paragraphs={[t(SCREENS.intro)]} />

      <figure className="mt-8">
        <video
          className="w-full rounded-lg border border-line bg-surface"
          width={1440}
          height={810}
          poster={ASSETS.walkthroughPoster}
          controls
          playsInline
          preload="none"
        >
          <source src={ASSETS.walkthroughWebm} type="video/webm" />
          <source src={ASSETS.walkthroughMp4} type="video/mp4" />
          {t(HERO.videoUnsupported)}
        </video>
        <figcaption className="mt-3 text-sm text-faint">{t(HERO.videoCaption)}</figcaption>
      </figure>

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(SCREENS.gridHeading)}
      </h3>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {SCREENS.shots.map((shot) => (
          <Shot
            key={shot.file}
            src={ASSETS.screenshot(shot.file)}
            alt={t(shot.label)}
            caption={t(shot.label)}
            width={shot.w}
            height={shot.h}
          />
        ))}
      </div>

      <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
        {t(SCREENS.mobileHeading)}
      </h3>
      {/* Portrait captures, held narrow so they read as phone screens rather
          than as a desktop screenshot that came out the wrong shape. */}
      <div className="mt-8 flex flex-wrap gap-8">
        {SCREENS.mobileShots.map((shot) => (
          <div key={shot.file} className="w-full max-w-60">
            <Shot
              src={ASSETS.screenshot(shot.file)}
              alt={t(shot.label)}
              caption={t(shot.label)}
              width={shot.w}
              height={shot.h}
            />
          </div>
        ))}
      </div>

      <CtaBlock />
    </Section>
  )
}

/* §8 */
function Stack() {
  const { t } = useLocale()

  return (
    <Section id="stack" eyebrow={t(STACK.eyebrow)}>
      <h2
        id="stack-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(STACK.heading)}
      </h2>
      <Prose paragraphs={[t(STACK.intro)]} />
      <DefList items={STACK.groups} />
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-faint">{t(STACK.auditNote)}</p>
      <CtaBlock />
    </Section>
  )
}

/* §9 */
function Pricing() {
  const { t } = useLocale()

  return (
    <Section id="pricing" eyebrow={t(PRICING.eyebrow)}>
      <h2
        id="pricing-heading"
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {t(PRICING.heading)}
      </h2>
      <Prose paragraphs={[t(PRICING.intro)]} />

      <div className="mt-10 rounded-lg border border-line bg-surface p-6 sm:p-8">
        <p className="flex flex-wrap items-baseline gap-3">
          <span className="text-5xl font-bold tracking-tight text-fg" dir="ltr">
            ${PRICE_USD}
          </span>
          <span className="text-sm text-muted">{t(PRICING.priceLabel)}</span>
        </p>

        <ul className="mt-8 space-y-4">
          {PRICING.includes.map((item) => (
            <li key={item.en} className="flex gap-3 text-base leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-sm text-accent">
                —
              </span>
              <span>{t(item)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-faint">
          {t(PRICING.licenceNote)}
        </p>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          {t(PRICING.guaranteeHeading)}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-fg">{t(OFFER.guarantee)}</p>
      </div>

      <CtaBlock />
    </Section>
  )
}

function ProofBlock() {
  const { t } = useLocale()

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t(PROOF.heading)}</h2>
      <Prose paragraphs={t(PROOF.body)} />

      <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {PROOF.items.map((item) => (
          // Odd count in a two-column grid would otherwise leave a bare cell
          // showing the grid's own background as an empty block.
          <li key={item.term.en} className="bg-bg p-5 sm:last:col-span-2">
            <a
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="text-base font-semibold text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              {t(item.term)}
              <span className="ms-2 font-mono text-xs font-normal text-accent">
                {item.external ? t(PROOF.openLabel) : t(PROOF.jumpLabel)}
              </span>
            </a>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(item.desc)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  const { t } = useLocale()

  return (
    <footer className="border-t border-line px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <ProofBlock />

        <div className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t(FAQ.heading)}</h2>
          <Faq items={FAQ.items} />
        </div>

        <div className="mt-20">
          <Contact />
        </div>

        {/* Stated here rather than linked to pages that do not exist. Nothing
            is withheld: the guarantee and the licence are already on the page
            in full, and the payment terms belong to the payment processor. */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t(FOOTER.legalHeading)}
          </h2>
          <dl className="mt-8 space-y-6">
            {FOOTER.legal.map((item) => (
              <div key={item.term.en}>
                <dt className="text-sm font-semibold text-fg">{t(item.term)}</dt>
                <dd className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted">
                  {t(item.desc)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="text-sm leading-relaxed text-muted">{t(FOOTER.note)}</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const { t } = useLocale()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-ink"
      >
        {t(NAV.skipToContent)}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Differentiator />
        <Enforcement />
        <Included />
        <Setup />
        <Limits />
        <Screens />
        <Stack />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
