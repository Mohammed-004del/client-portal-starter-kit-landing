import type { ReactNode } from 'react'
import { CHECKOUT_IS_PLACEHOLDER, CHECKOUT_URL } from './config'
import { OFFER } from './content'
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
