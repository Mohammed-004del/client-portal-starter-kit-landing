import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * All page motion, in one place.
 *
 * Two rules hold this together:
 *
 * 1. **Nothing is hidden in CSS.** Elements marked `data-reveal` / `data-hero`
 *    render visible, and are only ever hidden by `gsap.set()` after GSAP has
 *    actually loaded. If this module never loads, the page is complete and
 *    static rather than blank — which on a sales page is the difference between
 *    a product and an empty screen.
 *
 * 2. **Only what is below the fold is hidden.** A ScrollTrigger fires `onEnter`
 *    when its start point is *crossed*; anything already above the viewport —
 *    a deep link to #pricing, a browser restoring scroll position — never
 *    crosses anything and would stay invisible permanently.
 *
 * Together those also mean GSAP can be loaded *after* first paint without any
 * flash of content moving, so it stays out of the critical path: ~47KB gzip
 * that would otherwise delay the hero for an animation nobody can see yet.
 */
export function usePageMotion(scope: RefObject<HTMLElement | null>, locale: string) {
  useEffect(() => {
    let cancelled = false
    let cleanup: (() => void) | undefined

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        // Nav state is not motion — it is a scroll position readout, so it
        // runs for every reader including those who asked for reduced motion.
        const nav = document.querySelector('[data-nav]')
        if (nav) {
          ScrollTrigger.create({
            start: 'top -64',
            end: 99999,
            onToggle: (self) => nav.classList.toggle('nav-scrolled', self.isActive),
          })
        }

        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          /* ---------------------------------------------------------- hero */
          const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero]')
          const frame = document.querySelector<HTMLElement>('[data-hero-frame]')

          const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })

          if (heroItems.length) {
            gsap.set(heroItems, { opacity: 0, y: 26 })
            intro.to(heroItems, { opacity: 1, y: 0, stagger: 0.085 })
          }

          if (frame) {
            // Settles out of a slight tilt rather than merely fading in, which
            // is what gives the reference's hero its sense of depth.
            gsap.set(frame, { opacity: 0, y: 48, rotateX: 12, scale: 0.96 })
            intro.to(
              frame,
              { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.3, ease: 'power2.out' },
              '-=0.55',
            )
          }

          /* ------------------------------------------------------- reveals */
          // Direction-neutral on purpose: y/opacity only, so the same tween is
          // correct in RTL without mirroring anything.
          const threshold = window.innerHeight * 0.88
          const reveals = gsap.utils
            .toArray<HTMLElement>('[data-reveal]')
            .filter((el) => el.getBoundingClientRect().top > threshold)

          if (reveals.length) {
            gsap.set(reveals, { opacity: 0, y: 30 })
            ScrollTrigger.batch(reveals, {
              start: 'top 88%',
              once: true,
              // Without a cap, a fast scroll drops every remaining element into
              // one batch and the stagger becomes a multi-second cascade the
              // reader has already scrolled past. Six keeps a group under a
              // second.
              batchMax: 6,
              onEnter: (batch) =>
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  stagger: 0.06,
                  ease: 'power3.out',
                  overwrite: true,
                }),
            })
          }

          return () => {
            gsap.set([...heroItems, ...reveals, frame].filter(Boolean), { clearProps: 'all' })
          }
        })

        return () => mm.revert()
      }, scope.current ?? undefined)

      // Late layout — web fonts, the last lazy image — moves trigger points
      // measured earlier. Resize is handled by ScrollTrigger itself; load is not.
      const onLoad = () => ScrollTrigger.refresh()
      if (document.readyState === 'complete') onLoad()
      else window.addEventListener('load', onLoad, { once: true })

      cleanup = () => {
        window.removeEventListener('load', onLoad)
        ctx.revert()
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
    // Switching language rewrites every string, so trigger positions are stale;
    // tearing the context down and rebuilding it is the correct response.
  }, [scope, locale])
}
