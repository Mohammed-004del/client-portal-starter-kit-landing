import { useRef, type ReactNode } from 'react'

import { useLocale } from './locale-context'
import { LOCALE_SWITCH_ARIA, LOCALE_SWITCH_LABEL, PROOF } from './content'
import { usePageMotion } from './motion'
import {
  G1,
  G2,
  G3,
  G4,
  G5,
  G6,
  G7,
  GUIDE_CLOSE,
  GUIDE_HEAD,
  GUIDE_NAV,
  GUIDE_SIGNUP,
  NEW_TABLE_SQL,
  Q_COLUMN_GRANTS,
  Q_NO_POLICY,
  Q_RLS_ON,
  SWEEP_PATTERN,
} from './guide-content'
import { Arrow, Contact, Reveal, SignupForm } from './ui'

/**
 * Source the reader is expected to run, not output claimed to have happened.
 * Deliberately unlike `Terminal` in ui.tsx: no window chrome, no traffic
 * lights, and a label that says what the block is. The page's rule is that
 * nothing may be mistaken for a run that did not occur, and pseudo-code
 * dressed as a captured terminal would break it.
 */
function CodeBlock({ label, body, lang }: { label: string; body: string; lang?: string }) {
  // `lang` is a human-language attribute — putting "sql" in it is invalid and
  // tells a screen reader to pronounce the block in a language that does not
  // exist. The language of a code sample belongs in a data attribute.
  return (
    <Reveal>
      <figure className="my-8">
        <figcaption className="mb-2 flex items-center gap-2 font-mono text-xs text-faint">
          <span aria-hidden="true" className="inline-block h-px w-4 bg-line-strong" />
          {label}
        </figcaption>
        {/* dir=ltr: SQL and code are not Arabic text and must not mirror. */}
        <pre
          dir="ltr"
          className="verbatim overflow-x-auto rounded-2xl border border-line bg-surface px-4 py-5 text-[0.8125rem] leading-relaxed text-fg"
        >
          <code data-lang={lang}>{body}</code>
        </pre>
      </figure>
    </Reveal>
  )
}

function GuideNav() {
  const { locale, setLocale, t } = useLocale()

  return (
    <header data-nav className="fixed inset-x-0 top-0 z-50 border-b">
      <nav
        aria-label={t({ en: 'Primary', ar: 'التنقل الرئيسي' })}
        className="mx-auto flex h-16 max-w-4xl items-center gap-4 px-5 sm:px-8"
      >
        <a
          href="/"
          aria-label={t(GUIDE_NAV.backAria)}
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-fg"
        >
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-br from-accent to-accent-strong"
          >
            <svg viewBox="0 0 24 24" className="size-4 text-white" fill="currentColor">
              <path d="M12 1.5 3.5 5.2v6.3c0 5.2 3.6 10.1 8.5 11.3 4.9-1.2 8.5-6.1 8.5-11.3V5.2z" />
            </svg>
          </span>
          <span className="hidden sm:inline">{t(GUIDE_NAV.back)}</span>
        </a>

        <button
          type="button"
          onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
          aria-label={t(LOCALE_SWITCH_ARIA)}
          className="ms-auto rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          {t(LOCALE_SWITCH_LABEL)}
        </button>
      </nav>
    </header>
  )
}

/** Numbered section heading, so the table of contents and the body agree. */
function GuideSection({
  id,
  n,
  heading,
  children,
}: {
  id: string
  n: string
  heading: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-accent">{n}</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-2xl font-bold leading-tight tracking-tight text-balance md:text-3xl"
        >
          {heading}
        </h2>
      </Reveal>
      {children}
    </section>
  )
}

function GuideProse({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="mt-6 space-y-5 text-base leading-relaxed text-muted md:text-lg">
      {paragraphs.map((p) => (
        <Reveal key={p.slice(0, 48)} as="div">
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
  )
}

const SECTIONS = [G1, G2, G3, G4, G5, G6, G7] as const
const SECTION_IDS = ['difference', 'green', 'kinds', 'pattern', 'shadowed', 'newtable', 'checklist']

function Toc() {
  const { t } = useLocale()

  return (
    <Reveal>
      <nav aria-labelledby="toc-heading" className="glass mt-12 rounded-2xl p-6">
        <h2 id="toc-heading" className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(GUIDE_NAV.tocHeading)}
        </h2>
        <ol className="mt-4 space-y-2.5">
          {SECTIONS.map((s, i) => (
            <li key={SECTION_IDS[i]} className="flex gap-3 text-sm leading-relaxed">
              <span className="font-mono text-xs text-faint" dir="ltr">
                {s.n}
              </span>
              <a
                href={`#${SECTION_IDS[i]}`}
                className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
              >
                {t(s.heading)}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  )
}

export default function GuidePage() {
  const { locale, t } = useLocale()
  const root = useRef<HTMLDivElement>(null)

  usePageMotion(root, locale)

  return (
    <div ref={root}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-accent-strong focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-ink"
      >
        {t(GUIDE_NAV.skipToContent)}
      </a>

      <div className="ambient" aria-hidden="true">
        <div className="ambient-blob ambient-blob-1" />
        <div className="grid-veil" />
      </div>

      <GuideNav />

      <main id="main" className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-8 md:pt-36">
        <article>
          <header>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t(GUIDE_HEAD.kicker)}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-balance md:text-5xl">
              <span className="block">{t(GUIDE_HEAD.h1)}</span>
              <span className="mt-2 block bg-linear-to-br from-accent via-accent to-glow bg-clip-text text-transparent">
                {t(GUIDE_HEAD.h1b)}
              </span>
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {t(GUIDE_HEAD.standfirst).map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-faint">{t(GUIDE_HEAD.readingTime)}</p>
          </header>

          <Toc />

          {/* 01 */}
          <GuideSection id="difference" n={G1.n} heading={t(G1.heading)}>
            <GuideProse paragraphs={t(G1.body)} />
          </GuideSection>

          {/* 02 */}
          <GuideSection id="green" n={G2.n} heading={t(G2.heading)}>
            <GuideProse paragraphs={t(G2.body)} />
            <Reveal>
              <p className="glass mt-10 rounded-2xl border-s-2 border-s-accent p-6 text-lg font-medium leading-relaxed text-fg">
                {t(G2.pull)}
              </p>
            </Reveal>
          </GuideSection>

          {/* 03 */}
          <GuideSection id="kinds" n={G3.n} heading={t(G3.heading)}>
            <GuideProse paragraphs={t(G3.intro)} />
            <dl className="mt-8 grid gap-4">
              {G3.kinds.map((kind) => (
                <div key={kind.term.en} data-reveal className="glass rounded-2xl p-6">
                  {/* The label leads with a literal sweep prefix, so it stays LTR
                      even when the explanation beside it is Arabic. */}
                  <dt dir="ltr" className="font-mono text-sm font-semibold text-accent">
                    {t(kind.term)}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-muted">{t(kind.desc)}</dd>
                </div>
              ))}
            </dl>
            <GuideProse paragraphs={t(G3.after)} />
            <CodeBlock
              lang="sql"
              label={t({ en: 'SQL — run against your own project', ar: 'SQL — شغّله على مشروعك أنت' })}
              body={Q_RLS_ON}
            />
            <CodeBlock
              lang="sql"
              label={t({ en: 'SQL — run against your own project', ar: 'SQL — شغّله على مشروعك أنت' })}
              body={Q_NO_POLICY}
            />
            <CodeBlock
              lang="sql"
              label={t({ en: 'SQL — run against your own project', ar: 'SQL — شغّله على مشروعك أنت' })}
              body={Q_COLUMN_GRANTS}
            />
          </GuideSection>

          {/* 04 */}
          <GuideSection id="pattern" n={G4.n} heading={t(G4.heading)}>
            <GuideProse paragraphs={t(G4.body)} />
            <CodeBlock label={t(G4.patternLabel)} body={SWEEP_PATTERN} />
            <GuideProse paragraphs={t(G4.notes)} />
          </GuideSection>

          {/* 05 */}
          <GuideSection id="shadowed" n={G5.n} heading={t(G5.heading)}>
            <GuideProse paragraphs={t(G5.body)} />
          </GuideSection>

          {/* 06 */}
          <GuideSection id="newtable" n={G6.n} heading={t(G6.heading)}>
            <GuideProse paragraphs={t(G6.body)} />
            <CodeBlock
              lang="sql"
              label={t({ en: 'SQL — the migration, in full', ar: 'SQL — الـ migration كاملًا' })}
              body={NEW_TABLE_SQL}
            />
          </GuideSection>

          {/* 07 */}
          <GuideSection id="checklist" n={G7.n} heading={t(G7.heading)}>
            <GuideProse paragraphs={[t(G7.intro)]} />
            <ol className="mt-8 grid gap-3">
              {t(G7.checks).map((check, i) => (
                <li key={check.slice(0, 40)} data-reveal className="glass flex gap-4 rounded-2xl p-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-sm font-semibold text-accent"
                    dir="ltr"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-relaxed text-muted">{check}</span>
                </li>
              ))}
            </ol>
          </GuideSection>

          {/* Close. The first mention of anything for sale is below this line. */}
          <section className="mt-24 border-t border-line pt-16" aria-labelledby="close-heading">
            <Reveal>
              <h2
                id="close-heading"
                className="text-2xl font-bold tracking-tight text-balance md:text-3xl"
              >
                {t(GUIDE_CLOSE.heading)}
              </h2>
            </Reveal>
            <GuideProse paragraphs={t(GUIDE_CLOSE.body)} />

            <Reveal>
              <h3 className="mt-14 text-lg font-semibold text-fg">{t(GUIDE_CLOSE.runsHeading)}</h3>
            </Reveal>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PROOF.items
                .filter((item) => item.external)
                .map((item) => (
                  <Reveal as="li" key={item.term.en}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass card-lift block h-full rounded-2xl p-5"
                    >
                      <span className="text-base font-semibold text-fg underline decoration-line-strong underline-offset-4">
                        {t(item.term)}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-muted">
                        {t(item.desc)}
                      </span>
                    </a>
                  </Reveal>
                ))}
            </ul>
            <Reveal>
              <p className="mt-4 text-sm leading-relaxed text-faint">{t(GUIDE_CLOSE.runsNote)}</p>
            </Reveal>

            <Reveal>
              <div className="glow-frame mt-14">
                <div className="bg-surface p-6 sm:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-fg">
                    {t(GUIDE_CLOSE.productHeading)}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {t(GUIDE_CLOSE.productBody)}
                  </p>
                  <a
                    href="/"
                    className="btn-primary mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold"
                  >
                    {t(GUIDE_CLOSE.productCta)}
                    <Arrow />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="mt-14">
              <Contact />
              <SignupForm heading={t(GUIDE_SIGNUP.heading)} body={t(GUIDE_SIGNUP.body)} />
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}
