import type { ReactNode } from 'react'
import { CHECKOUT_IS_PLACEHOLDER, CHECKOUT_URL, CONTACT_EMAIL } from './config'
import { CONTACT, OFFER, type CopyPair } from './content'
import { useLocale } from './locale-context'

/**
 * The buy button and the guarantee, welded together in one component.
 * Every body section renders this exactly once, so the pair cannot drift
 * apart as sections are edited.
 */
export function CtaBlock({ id }: { id?: string }) {
  const { t } = useLocale()

  return (
    <div className="mt-10 border-t border-line pt-8">
      <a
        id={id}
        href={CHECKOUT_URL}
        aria-label={t(OFFER.buyAria)}
        className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-accent-ink transition-colors hover:bg-fg focus-visible:bg-fg"
      >
        {t(OFFER.buy)}
      </a>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted" data-guarantee>
        {t(OFFER.guarantee)}
      </p>
      {CHECKOUT_IS_PLACEHOLDER && (
        <p className="mt-2 text-xs text-faint">{t(OFFER.checkoutPlaceholderNote)}</p>
      )}
    </div>
  )
}

export function Section({
  id,
  eyebrow,
  children,
}: {
  id: string
  eyebrow?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      data-section
      className="border-t border-line px-5 py-20 sm:px-8 md:py-28"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-5xl">
        {eyebrow && (
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        )}
        {children}
      </div>
    </section>
  )
}

/**
 * Verbatim captured output. Labelled as a capture, scrolls rather than wraps,
 * and stays LTR inside the RTL page.
 */
export function Terminal({
  label,
  body,
  note,
}: {
  label: string
  body: string
  note?: string
}) {
  return (
    <figure className="my-8">
      <figcaption className="flex flex-wrap items-center gap-2 rounded-t-md border border-line bg-raised px-4 py-2.5">
        <span
          aria-hidden="true"
          className="inline-block size-2 shrink-0 rounded-full bg-accent"
        />
        <span className="font-mono text-xs text-muted">{label}</span>
      </figcaption>
      <pre className="verbatim overflow-x-auto rounded-b-md border border-t-0 border-line bg-surface px-4 py-5 text-[0.8125rem] leading-relaxed text-fg">
        <code>{body}</code>
      </pre>
      {note && <p className="mt-2 font-mono text-xs text-faint">{note}</p>}
    </figure>
  )
}

export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="mt-6 space-y-5 text-base leading-relaxed text-muted md:text-lg">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
    </div>
  )
}

/** A closing line set off by a rule — the sentence a section is arguing toward. */
export function Closing({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 max-w-3xl border-s-2 border-accent ps-5 text-base font-medium leading-relaxed text-fg md:text-lg">
      {children}
    </p>
  )
}

/**
 * Term-and-explanation list. `mono` renders the term in monospace, for the
 * places where the term is a literal identifier from the schema.
 */
export function DefList({ items, mono }: { items: readonly CopyPair[]; mono?: boolean }) {
  const { t } = useLocale()

  return (
    <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
      {items.map((item) => (
        <div key={item.term.en} className="bg-bg p-5 sm:p-6 md:grid md:grid-cols-[14rem_1fr] md:gap-6">
          <dt
            className={`font-semibold text-fg ${mono ? 'font-mono text-sm' : 'text-base'}`}
            dir={mono ? 'ltr' : undefined}
          >
            {t(item.term)}
          </dt>
          <dd className="mt-2 text-base leading-relaxed text-muted md:mt-0">{t(item.desc)}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * A real captured image. The caption is part of the evidence — it says what the
 * picture is, so nothing here can be mistaken for browser chrome or a mockup.
 */
export function Shot({
  src,
  alt,
  caption,
  width,
  height,
  eager,
}: {
  src: string
  alt: string
  caption?: string
  /** Real pixel size of the file. Required — without it a lazy image collapses
   *  to zero height, which both shifts the layout and stops it ever loading. */
  width: number
  height: number
  eager?: boolean
}) {
  return (
    <figure>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-auto w-full rounded-lg border border-line bg-surface"
      />
      {caption && <figcaption className="mt-3 text-sm leading-relaxed text-faint">{caption}</figcaption>}
    </figure>
  )
}

/**
 * Subordinate to the buy button: below the fold, no interruption. A mailto
 * rather than a form — there is no backend here, and a hosted form service
 * would be the only third-party request on the whole page.
 */
export function Contact() {
  const { t } = useLocale()

  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-fg">{t(CONTACT.heading)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t(CONTACT.body)}</p>
      {/* break-all: the address is one unbreakable token and overflows a
          320px viewport without it. */}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        dir="ltr"
        aria-label={`${t(CONTACT.ariaPrefix)} ${CONTACT_EMAIL}`}
        className="mt-5 inline-block max-w-full break-all font-mono text-base text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
      >
        {CONTACT_EMAIL}
      </a>
    </div>
  )
}

/** Native disclosure — no JS, keyboard-operable and searchable for free. */
export function Faq({ items }: { items: readonly CopyPair[] }) {
  const { t } = useLocale()

  return (
    <div className="mt-8 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.term.en} className="group">
          <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-base font-semibold text-fg marker:content-none">
            <span className="flex-1">{t(item.term)}</span>
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-lg text-accent group-open:hidden"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="hidden shrink-0 font-mono text-lg text-accent group-open:inline"
            >
              −
            </span>
          </summary>
          <p className="pb-6 text-base leading-relaxed text-muted">{t(item.desc)}</p>
        </details>
      ))}
    </div>
  )
}
