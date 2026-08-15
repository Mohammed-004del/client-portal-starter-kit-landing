import { useRef } from 'react'
import {
  ASSETS,
  CHECKOUT_URL,
  CONTACT_EMAIL,
  CURRENT_PRICE_USD,
  LAUNCH_ACTIVE,
} from './config'
import {
  DIFFERENTIATOR,
  ENFORCEMENT,
  FAQ,
  FOOTER,
  HERO,
  INCLUDED,
  LAUNCH,
  LIMITS,
  LOCAL_PAY,
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
import { usePageMotion } from './motion'
import {
  Arrow,
  Closing,
  Contact,
  CtaBlock,
  DefList,
  Faq,
  Guarantee,
  Prose,
  Reveal,
  Section,
  SignupForm,
  Shot,
  Terminal,
} from './ui'

/** Fixed, behind everything, click-through. Motion lives in CSS keyframes. */
function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <div className="ambient-blob ambient-blob-3" />
      <div className="grid-veil" />
    </div>
  )
}

/**
 * The four marks of the actual stack, as decoration only — no labels, because
 * the technologies are already named in the copy of this section and nothing
 * new may be written here.
 */
function BrandMarks() {
  return (
    <ul
      aria-hidden="true"
      className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-14 gap-y-6 px-5 py-8 sm:px-8"
    >
      {/* React */}
      <li className="text-muted transition-colors hover:text-accent">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="2.05" fill="currentColor" stroke="none" />
          <g strokeWidth="1">
            <ellipse cx="12" cy="12" rx="11" ry="4.2" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>
      </li>
      {/* TypeScript */}
      <li className="text-muted transition-colors hover:text-accent">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
          <path d="M1.5 1.5h21v21h-21zM13.2 12.6h3v6.3c0 1.5 1.1 2.4 2.9 2.4 1.6 0 2.7-.9 2.7-2.3 0-1.2-.7-1.9-2.4-2.3l-1-.2c-.6-.2-.9-.4-.9-.8 0-.4.4-.7 1-.7.6 0 1 .3 1.1.8h2.6c-.1-1.6-1.4-2.6-3.6-2.6-2.2 0-3.6 1-3.6 2.7 0 1.3.8 2 2.4 2.4l1 .2c.7.2 1 .4 1 .8 0 .4-.4.7-1.1.7-.7 0-1.2-.3-1.3-.9h-2.8zm-1.1 0H5.4v1.7h2.3v6.9h1.9v-6.9h2.3z" />
        </svg>
      </li>
      {/* Supabase */}
      <li className="text-muted transition-colors hover:text-accent">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
          <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
        </svg>
      </li>
      {/* Tailwind CSS */}
      <li className="text-muted transition-colors hover:text-accent">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
          <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6 12z" />
        </svg>
      </li>
    </ul>
  )
}

function Nav() {
  const { locale, setLocale, t } = useLocale()

  return (
    <header data-nav className="fixed inset-x-0 top-0 z-50 border-b">
      <nav
        aria-label={t({ en: 'Primary', ar: 'التنقل الرئيسي' })}
        className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8"
      >
        <a
          href="#top"
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
          <span className="hidden sm:inline">{t(NAV.brand)}</span>
          <span className="sm:hidden">{t(NAV.brandShort)}</span>
        </a>

        <ul className="ms-auto hidden items-center gap-7 lg:flex">
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
            className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {t(LOCALE_SWITCH_LABEL)}
          </button>
          <a
            href={CHECKOUT_URL}
            aria-label={t(OFFER.buyAria)}
            className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold"
          >
            {t(OFFER.buy)}
            <Arrow />
          </a>
        </div>
      </nav>
    </header>
  )
}

/**
 * The hero visual: a device drawn in CSS holding the real recording, with
 * decorative marks floating around it. Nothing here depicts data — the only
 * thing showing product content is the video itself.
 */
function HeroDevice() {
  const { t } = useLocale()

  return (
    <div data-hero-frame className="relative perspective-[1600px]">
      <div aria-hidden="true" className="device-bloom" />

      <div className="device">
        <div className="device-screen">
          <video
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
        </div>
        <div aria-hidden="true" className="device-base" />

        {/* Decoration only. Hidden on the smallest screens, where they would
            crowd the device rather than frame it. */}
        <div aria-hidden="true" className="float-mark float-a hidden size-14 sm:grid -inset-e-6 top-8">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6.5 18.5A4.5 4.5 0 0 1 6 9.6a6 6 0 0 1 11.6-1.6A4 4 0 0 1 18 18.5z" />
            <path d="M12 15.5v-5M9.6 12.4 12 10l2.4 2.4" />
          </svg>
        </div>

        <div aria-hidden="true" className="float-mark float-b hidden size-14 lg:grid -inset-e-10 bottom-14">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
            <path d="M14 3.5V8h4.5M9 13h6M9 16.5h4" />
          </svg>
        </div>

        <div aria-hidden="true" className="float-mark float-c hidden size-16 md:grid -inset-s-8 bottom-4">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.5 4.5 5.6v5.6c0 4.6 3.2 8.9 7.5 10 4.3-1.1 7.5-5.4 7.5-10V5.6z" />
            <rect x="9.2" y="10.8" width="5.6" height="4.4" rx="1" />
            <path d="M10.6 10.8V9.6a1.4 1.4 0 0 1 2.8 0v1.2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const { t } = useLocale()

  return (
    // overflow-x-clip, not hidden: `clip` contains the floating marks that sit
    // outside the device without creating a scroll container — `hidden` would
    // make this a scroller and break ScrollTrigger, the same trap as on body.
    <section
      id="top"
      className="relative overflow-x-clip px-5 pt-28 pb-16 sm:px-8 md:pt-36 md:pb-20"
    >
      {/* Two columns from lg up: copy beside the device, as in the reference.
          Grid order (not left/right) so RTL mirrors structurally. */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h1 className="text-hero font-bold leading-[1.1] tracking-tight text-balance">
            <span data-hero className="block">
              {t(HERO.h1Line1)}
            </span>
            <span
              data-hero
              className="mt-2 block bg-linear-to-br from-accent via-accent to-glow bg-clip-text text-transparent"
            >
              {t(HERO.h1Line2)}
            </span>
          </h1>

          <p data-hero className="mt-7 max-w-xl text-base leading-relaxed text-muted">
            {t(HERO.sub)}
          </p>

          {/* The offer. Deliberately the heaviest thing in the column. */}
          <div data-hero className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CHECKOUT_URL}
              aria-label={t(OFFER.buyAria)}
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
            >
              {t(OFFER.buy)}
              <Arrow />
            </a>
            <a
              href="#walkthrough"
              className="btn-ghost inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-fg"
            >
              {t(OFFER.watch)}
            </a>
          </div>

          {/* The promise, set apart from the offer by a rule and a mark so the
              two do not read as one block of small print. */}
          <div data-hero className="mt-8 max-w-xl border-t border-line pt-5">
            <Guarantee marked />
          </div>
        </div>

        <div className="lg:col-span-6">
          <HeroDevice />
          <p className="mt-6 text-sm text-faint">{t(HERO.videoCaption)}</p>
        </div>
      </div>
    </section>
  )
}

/** Shared heading treatment so every section reads at the same level. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2
        id={id}
        className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
      >
        {children}
      </h2>
    </Reveal>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h3 className="mt-16 text-xl font-semibold tracking-tight md:text-2xl">{children}</h3>
    </Reveal>
  )
}

/* §1 */
function Problem() {
  const { t } = useLocale()

  return (
    <Section id="problem" eyebrow={t(PROBLEM.eyebrow)}>
      <SectionHeading id="problem-heading">{t(PROBLEM.heading)}</SectionHeading>
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
      <Reveal>
        <h2
          id="proof-heading"
          className="max-w-3xl text-section font-bold leading-tight tracking-tight text-balance"
        >
          <span className="block">{t(DIFFERENTIATOR.headingLine1)}</span>
          <span className="mt-1 block bg-linear-to-br from-accent to-glow bg-clip-text text-transparent">
            {t(DIFFERENTIATOR.headingLine2)}
          </span>
        </h2>
      </Reveal>

      <Prose paragraphs={t(DIFFERENTIATOR.body)} />

      <Terminal
        label={t(DIFFERENTIATOR.terminalLabel)}
        body={SWEEP_EXCERPT}
        note={t(DIFFERENTIATOR.terminalSourceNote)}
      />

      <SubHeading>{t(DIFFERENTIATOR.greenSuiteHeading)}</SubHeading>
      <Prose paragraphs={t(DIFFERENTIATOR.greenSuiteBody)} />

      <SubHeading>{t(DIFFERENTIATOR.namingHeading)}</SubHeading>
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
      <SectionHeading id="enforcement-heading">{t(ENFORCEMENT.heading)}</SectionHeading>
      <Prose paragraphs={t(ENFORCEMENT.intro)} />

      {/* Two claims, labelled and kept apart. Neither caption may imply the
          other's scope — the database refuses; the router merely redirects. */}
      <Reveal>
        <div className="glass mt-16 rounded-2xl p-6 sm:p-8">
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
      </Reveal>

      <Reveal>
        <div className="glass mt-8 rounded-2xl p-6 sm:p-8">
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
      </Reveal>

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
      <SectionHeading id="included-heading">{t(INCLUDED.heading)}</SectionHeading>
      <Prose paragraphs={[t(INCLUDED.intro)]} />
      <DefList items={INCLUDED.tables} mono columns={2} />

      <SubHeading>{t(INCLUDED.restHeading)}</SubHeading>
      <DefList items={INCLUDED.rest} columns={2} />

      <CtaBlock />
    </Section>
  )
}

/* §5 */
function Setup() {
  const { t } = useLocale()

  return (
    <Section id="setup" eyebrow={t(SETUP.eyebrow)}>
      <SectionHeading id="setup-heading">{t(SETUP.heading)}</SectionHeading>
      <Prose paragraphs={t(SETUP.intro)} />

      <Terminal
        label={t(SETUP.commandsLabel)}
        body={SETUP_COMMANDS}
        note={t(SETUP.commandsNote)}
      />

      <SubHeading>{t(SETUP.afterHeading)}</SubHeading>
      <Prose paragraphs={t(SETUP.after)} />

      <SubHeading>{t(SETUP.emptyDbHeading)}</SubHeading>
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
      <SectionHeading id="limits-heading">{t(LIMITS.heading)}</SectionHeading>
      <Prose paragraphs={[t(LIMITS.intro)]} />
      <DefList items={LIMITS.items} columns={2} />
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
      <SectionHeading id="walkthrough-heading">{t(SCREENS.heading)}</SectionHeading>
      <Prose paragraphs={[t(SCREENS.intro)]} />

      <Reveal>
        <figure className="mt-10">
          <div className="glow-frame">
            <video
              className="bg-surface"
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
          </div>
          <figcaption className="mt-4 text-sm text-faint">{t(HERO.videoCaption)}</figcaption>
        </figure>
      </Reveal>

      <SubHeading>{t(SCREENS.gridHeading)}</SubHeading>
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

      <SubHeading>{t(SCREENS.mobileHeading)}</SubHeading>
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
      <SectionHeading id="stack-heading">{t(STACK.heading)}</SectionHeading>
      <Prose paragraphs={[t(STACK.intro)]} />
      <DefList items={STACK.groups} columns={2} />
      <Reveal>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-faint">{t(STACK.auditNote)}</p>
      </Reveal>
      <CtaBlock />
    </Section>
  )
}

/* §9 */
function Pricing() {
  const { t } = useLocale()

  return (
    <Section id="pricing" eyebrow={t(PRICING.eyebrow)}>
      <SectionHeading id="pricing-heading">{t(PRICING.heading)}</SectionHeading>
      <Prose paragraphs={[t(PRICING.intro)]} />

      <Reveal>
        <div className="glow-frame mt-12">
          <div className="bg-surface p-6 sm:p-10">
            <p className="flex flex-wrap items-baseline gap-3">
              <span
                className="bg-linear-to-br from-fg to-accent bg-clip-text text-display font-bold tracking-tight text-transparent"
                dir="ltr"
              >
                ${CURRENT_PRICE_USD}
              </span>
              <span className="text-sm text-muted">{t(PRICING.priceLabel)}</span>
            </p>
            {LAUNCH_ACTIVE && (
              <p className="mt-3 text-sm font-medium text-accent">{t(PRICING.priceNote)}</p>
            )}

            {/* The reason the launch price exists, next to the launch price.
                A cut with no stated reason reads either as a trap or as proof
                the standing price was padded. */}
            {LAUNCH_ACTIVE && (
              <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {t(LAUNCH.label)}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-fg md:text-xl">
                  {t(LAUNCH.heading)}
                </h3>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
                  {t(LAUNCH.body).map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
            )}

            {/* The value stack, made of counted artefacts rather than the
                estimated hours this pattern normally stacks against a price.
                Each figure names the file it was counted from, and the note
                below says outright that nothing here is an estimate. */}
            <h3 className="mt-10 border-t border-line pt-8 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
              {t(PRICING.countsHeading)}
            </h3>
            <dl className="mt-6 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING.counts.map((item) => (
                <div key={item.label.en}>
                  <dt className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold tracking-tight text-fg" dir="ltr">
                      {item.n}
                    </span>
                    <span className="text-sm font-medium text-muted">{t(item.label)}</span>
                  </dt>
                  {/* The source, not a sales line — kept LTR because every one
                      of these is a filename or an identifier. */}
                  <dd className="mt-1.5 font-mono text-xs leading-relaxed text-faint">
                    {t(item.note)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-faint">
              {t(PRICING.countsNote)}
            </p>

            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              {PRICING.includes.map((item) => (
                <li key={item.en} className="flex gap-3 text-base leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-1 shrink-0 text-accent">
                    <svg
                      viewBox="0 0 20 20"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m4 10.5 4 4 8-9" />
                    </svg>
                  </span>
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 border-t border-line pt-6 text-sm leading-relaxed text-faint">
              {t(PRICING.licenceNote)}
            </p>

            {/* The second payment route. No account details here on purpose —
                they are sent in a reply, not published. */}
            <div className="mt-8 rounded-2xl border border-line bg-raised p-5">
              <h3 className="text-sm font-semibold text-fg">{t(LOCAL_PAY.heading)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(LOCAL_PAY.body)}</p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Local payment — Client Portal Starter Kit')}`}
                dir="ltr"
                className="mt-3 inline-block max-w-full break-all font-mono text-sm text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
              {t(PRICING.guaranteeHeading)}
            </h3>
            {/* Unmarked: the section's one counted CTA+guarantee pair is the
                CtaBlock below. This is the same promise restated in full. */}
            <div className="mt-3">
              <Guarantee className="text-base text-fg" />
            </div>
          </div>
        </div>
      </Reveal>

      <CtaBlock />
    </Section>
  )
}

function ProofBlock() {
  const { t } = useLocale()

  return (
    <div>
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t(PROOF.heading)}</h2>
      </Reveal>
      <Prose paragraphs={t(PROOF.body)} />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {PROOF.items.map((item) => (
          // Odd count in a two-column grid would otherwise leave a bare cell.
          <Reveal as="li" key={item.term.en} className="sm:last:col-span-2">
            <div className="glass card-lift h-full rounded-2xl p-5">
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
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  const { t } = useLocale()

  return (
    <footer className="relative border-t border-line px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <ProofBlock />

        <div className="mt-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t(FAQ.heading)}</h2>
          </Reveal>
          <Faq items={FAQ.items} />
        </div>

        <div className="mt-24">
          <Contact />
          <SignupForm />
        </div>

        {/* Stated here rather than linked to pages that do not exist. Nothing
            is withheld: the guarantee and the licence are already on the page
            in full, and the payment terms belong to the payment processor. */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t(FOOTER.legalHeading)}
            </h2>
          </Reveal>
          {/* dl > div > dt + dd. A second nested div here is invalid and
              Lighthouse flags it as definition-list / dlitem. */}
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {FOOTER.legal.map((item) => (
              <div key={item.term.en} data-reveal className="glass h-full rounded-2xl p-5">
                <dt className="text-sm font-semibold text-accent">{t(item.term)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{t(item.desc)}</dd>
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
  const { t, locale } = useLocale()
  const root = useRef<HTMLDivElement>(null)

  usePageMotion(root, locale)

  return (
    <div ref={root}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-accent-strong focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-ink"
      >
        {t(NAV.skipToContent)}
      </a>
      <Ambient />
      <Nav />
      <main id="main">
        <Hero />
        {/* Decoration, no labels — the technologies are named in §8's copy. */}
        <div className="tech-band">
          <BrandMarks />
        </div>
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
    </div>
  )
}
