import { ASSETS, CHECKOUT_URL } from './config'
import {
  DIFFERENTIATOR,
  HERO,
  LOCALE_SWITCH_ARIA,
  LOCALE_SWITCH_LABEL,
  NAV,
  OFFER,
  SWEEP_EXCERPT,
} from './content'
import { useLocale } from './locale-context'
import { CtaBlock, Prose, Section, Terminal } from './ui'

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

      <p className="mt-10 max-w-3xl border-s-2 border-accent ps-5 text-base font-medium leading-relaxed text-fg md:text-lg">
        {t(DIFFERENTIATOR.closing)}
      </p>

      <CtaBlock />
    </Section>
  )
}

function Walkthrough() {
  const { t } = useLocale()

  return (
    <Section id="walkthrough">
      <h2 id="walkthrough-heading" className="text-section font-bold tracking-tight">
        {t(OFFER.watch)}
      </h2>
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
      <CtaBlock />
    </Section>
  )
}

export default function App() {
  const { t } = useLocale()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-ink"
      >
        {t(NAV.skipToContent)}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Differentiator />
        <Walkthrough />
      </main>
    </>
  )
}
