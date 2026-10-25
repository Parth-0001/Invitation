import Lenis from 'lenis'
import { useEffect, type ReactNode } from 'react'

interface CinematicExperienceProps {
  children: ReactNode
  enabled?: boolean
}

/** Smooth scroll, film overlays, and global scroll CSS variables for parallax. */
export function CinematicExperience({ children, enabled = true }: CinematicExperienceProps) {
  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add('cinematic-mode')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const useNativeScroll = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const useLiteEffects = prefersReducedMotion || useNativeScroll

    if (useLiteEffects) {
      root.classList.add('cinematic-lite')
    }

    let scrollRaf = 0
    const setScrollVars = (scroll: number, limit: number) => {
      const progress = limit > 0 ? scroll / limit : 0
      if (useLiteEffects) {
        root.style.setProperty('--cinematic-progress', String(progress))
        return
      }
      root.style.setProperty('--cinematic-scroll', String(scroll))
      root.style.setProperty('--cinematic-progress', String(progress))
    }

    const scheduleScrollVars = (scroll: number, limit: number) => {
      if (scrollRaf) return
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0
        setScrollVars(scroll, limit)
      })
    }

    const readScrollMetrics = () => {
      const scroll = window.scrollY
      const limit = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      return { scroll, limit }
    }

    if (prefersReducedMotion || useNativeScroll) {
      const onNativeScroll = () => {
        const { scroll, limit } = readScrollMetrics()
        scheduleScrollVars(scroll, limit)
      }

      onNativeScroll()
      window.addEventListener('scroll', onNativeScroll, { passive: true })
      window.addEventListener('resize', onNativeScroll)

      return () => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf)
        window.removeEventListener('scroll', onNativeScroll)
        window.removeEventListener('resize', onNativeScroll)
        root.classList.remove('cinematic-mode', 'cinematic-lite')
        root.style.removeProperty('--cinematic-scroll')
        root.style.removeProperty('--cinematic-progress')
      }
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
    })

    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      scheduleScrollVars(scroll, limit)
    }

    lenis.on('scroll', onScroll)
    onScroll({ scroll: lenis.scroll, limit: lenis.limit })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      root.classList.remove('cinematic-mode', 'cinematic-lite')
      root.style.removeProperty('--cinematic-scroll')
      root.style.removeProperty('--cinematic-progress')
    }
  }, [enabled])

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <div className="cinematic-root">
      <div className="cinematic-progress" aria-hidden="true" />
      <div className="cinematic-grain" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />
      {children}
    </div>
  )
}
