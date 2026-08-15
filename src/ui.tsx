import { useState, type FormEvent, type ReactNode } from 'react'
import {
  CHECKOUT_IS_PLACEHOLDER,
  CHECKOUT_URL,
  CONTACT_EMAIL,
  LEAD_ENDPOINT,
  LEAD_HEADERS,
} from './config'
import { CONTACT, OFFER, SIGNUP, type CopyPair } from './content'
import { useLocale } from './locale-context'

/**
 * Scroll-reveal wrapper. Renders visible; `src/motion.ts` hides it only when
 * the reader has not asked for reduced motion. Never give this opacity:0 in
 * CSS — that is how scroll-reveal pages end up permanently blank.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  return (
    <Tag data-reveal className={className}>
      {children}
    </Tag>
  )
}

/** Small shield mark that ties the guarantee to the offer above it. */
export function ShieldMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 size-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.5 4.5 5.6v5.6c0 4.6 3.2 8.9 7.5 10 4.3-1.1 7.5-5.4 7.5-10V5.6z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </svg>
  )
}

/**
 * The promise, with its name attached. One component so a named guarantee can
 * never end up rendered beside terms other than these.
 *
 * `marked` emits the attribute the verification script counts. Exactly one
 * guarantee per section carries it — the section may restate the promise (the
 * pricing card does) without that restatement counting as a second pairing.
 */
export function Guarantee({
  marked,
  className = 'text-sm text-muted',
}: {
  marked?: boolean
  className?: string
}) {
  const { t } = useLocale()

  return (
    <p
      data-guarantee={marked ? '' : undefined}
      className={`flex max-w-2xl gap-2.5 leading-relaxed ${className}`}
    >
      <ShieldMark />
      <span>
        <strong className="font-semibold text-fg">{t(OFFER.guaranteeName)}.</strong>{' '}
        {t(OFFER.guarantee)}
      </span>
    </p>
  )
}

/**
 * The buy button and the guarantee, welded together in one component.
 * Every body section renders this exactly once, so the pair cannot drift
 * apart as sections are edited.
 */
export function CtaBlock({ id }: { id?: string }) {
  const { t } = useLocale()

  return (
    <div className="mt-12 border-t border-line pt-8">
      <a
        id={id}
        href={CHECKOUT_URL}
        aria-label={t(OFFER.buyAria)}
        className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold"
      >
        {t(OFFER.buy)}
        <Arrow />
      </a>
      <div className="mt-5">
        <Guarantee marked />
      </div>
      {CHECKOUT_IS_PLACEHOLDER && (
        <p className="mt-2 text-xs text-faint">{t(OFFER.checkoutPlaceholderNote)}</p>
      )}
    </div>
  )
}

/** Direction-aware: the arrow points the way the text runs. */
export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 shrink-0 rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
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
      className="relative border-t border-line px-5 py-20 sm:px-8 md:py-28"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-5xl">
        {eyebrow && (
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-accent/60" />
              {eyebrow}
            </p>
          </Reveal>
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
    <Reveal>
      <figure className="my-10">
        <div className="glow-frame">
          <div className="overflow-hidden bg-surface">
            <figcaption className="flex flex-wrap items-center gap-3 border-b border-line bg-raised px-4 py-3">
              <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                <span className="inline-block size-2.5 rounded-full bg-fail/80" />
                <span className="inline-block size-2.5 rounded-full bg-accent/70" />
                <span className="inline-block size-2.5 rounded-full bg-pass/80" />
              </span>
              <span className="font-mono text-xs text-muted">{label}</span>
            </figcaption>
            <pre className="verbatim overflow-x-auto px-4 py-5 text-[0.8125rem] leading-relaxed text-fg">
              <code>{body}</code>
            </pre>
          </div>
        </div>
        {note && <p className="mt-3 font-mono text-xs text-faint">{note}</p>}
      </figure>
    </Reveal>
  )
}

export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
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

/** A closing line set off by a rule — the sentence a section is arguing toward. */
export function Closing({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="glass mt-12 max-w-3xl rounded-2xl border-s-2 border-s-accent p-6 text-base font-medium leading-relaxed text-fg md:text-lg">
        {children}
      </p>
    </Reveal>
  )
}

/**
 * Term-and-explanation list, rendered as the reference's card grid. `mono`
 * renders the term in monospace, for the places where it is a literal
 * identifier from the schema.
 */
export function DefList({
  items,
  mono,
  columns = 1,
}: {
  items: readonly CopyPair[]
  mono?: boolean
  columns?: 1 | 2
}) {
  const { t } = useLocale()

  return (
    // A <dl> may contain `div > dt + dd`, but not a second nested div — the
    // reveal wrapper and the card must therefore be the same element.
    <dl className={`mt-8 grid gap-4 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <div key={item.term.en} data-reveal className="glass card-lift h-full rounded-2xl p-6">
          <dt
            className={`font-semibold text-fg ${mono ? 'font-mono text-sm text-accent' : 'text-base'}`}
            dir={mono ? 'ltr' : undefined}
          >
            {t(item.term)}
          </dt>
          <dd className="mt-3 text-base leading-relaxed text-muted">{t(item.desc)}</dd>
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
    <Reveal>
      <figure>
        <div className="card-lift overflow-hidden rounded-2xl border border-line bg-surface">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="h-auto w-full"
          />
        </div>
        {caption && (
          <figcaption className="mt-3 text-sm leading-relaxed text-faint">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  )
}

/**
 * Direct line to a human, kept above the signup form: someone with a real
 * question should not be funnelled into a mailing list instead of an answer.
 */
export function Contact() {
  const { t } = useLocale()

  return (
    <Reveal>
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-fg">{t(CONTACT.heading)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t(CONTACT.body)}</p>
        {/* break-all: the address is one unbreakable token and overflows a
            320px viewport without it. */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          dir="ltr"
          aria-label={`${t(CONTACT.ariaPrefix)} ${CONTACT_EMAIL}`}
          className="mt-5 inline-block max-w-full break-all font-mono text-base text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </Reveal>
  )
}

/**
 * Email capture. Subordinate to the buy button by construction: it sits in the
 * footer, below the contact block, and never interrupts.
 *
 * It calls one Postgres function and reports exactly what happened. There is no
 * silent success path — a failed request says so and says nothing was stored,
 * because a form that swallows an address is worse than no form.
 */
export function SignupForm({ heading, body }: { heading?: string; body?: string } = {}) {
  const { t } = useLocale()
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'invalid' | 'failed'>('idle')
  const [email, setEmail] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setState('invalid')
      return
    }

    setState('sending')
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: LEAD_HEADERS,
        body: JSON.stringify({ lead_email: value }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setState('ok')
      setEmail('')
    } catch {
      setState('failed')
    }
  }

  return (
    <div className="glass mt-4 rounded-2xl p-6 sm:p-8">
      {/* The guide states a different reason for leaving an address than the
          sales page does, so both are overridable — but the field, the
          endpoint and the failure behaviour stay identical. */}
      <h3 className="text-lg font-semibold text-fg">{heading ?? t(SIGNUP.heading)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body ?? t(SIGNUP.body)}</p>

      {/* noValidate on purpose: the browser's own validation bubble speaks the
          browser's language, not the page's, so an Arabic reader would get an
          English tooltip. Validating here keeps the message bilingual. */}
      <form noValidate onSubmit={onSubmit} className="mt-5 flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="lead-email" className="block text-xs font-medium text-faint">
            {t(SIGNUP.label)}
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            dir="ltr"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state !== 'sending') setState('idle')
            }}
            disabled={state === 'sending'}
            placeholder={t(SIGNUP.placeholder)}
            className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-fg placeholder:text-faint disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-ghost rounded-xl px-6 py-3 text-sm font-semibold text-fg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t(state === 'sending' ? SIGNUP.sending : SIGNUP.submit)}
        </button>
      </form>

      {/* aria-live so the outcome is announced, not only painted. */}
      <p aria-live="polite" className="mt-3 min-h-5 text-sm">
        {state === 'ok' && <span className="text-pass">{t(SIGNUP.ok)}</span>}
        {state === 'invalid' && <span className="text-fail">{t(SIGNUP.invalid)}</span>}
        {state === 'failed' && <span className="text-fail">{t(SIGNUP.failed)}</span>}
      </p>
    </div>
  )
}

/** Native disclosure — no JS, keyboard-operable and searchable for free. */
export function Faq({ items }: { items: readonly CopyPair[] }) {
  const { t } = useLocale()

  return (
    <div className="mt-8 grid gap-3">
      {items.map((item) => (
        <Reveal key={item.term.en}>
          <details className="glass group rounded-2xl px-5 open:border-line-strong sm:px-6">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-base font-semibold text-fg marker:content-none">
              <span className="flex-1">{t(item.term)}</span>
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-base text-accent transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 text-base leading-relaxed text-muted">{t(item.desc)}</p>
          </details>
        </Reveal>
      ))}
    </div>
  )
}
