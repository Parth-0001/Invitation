import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChapterIntro } from '../components/film/ChapterIntro'

export type ScrollSceneVariant =
  | 'rise'
  | 'zoom'
  | 'slide-left'
  | 'slide-right'
  | 'panel'
  | 'dramatic'
  | 'hero-exit'

export interface FilmChapter {
  title: string
  subtitle?: string
}

interface ScrollSceneProps {
  children: ReactNode
  variant?: ScrollSceneVariant
  className?: string
  id?: string
  chapter?: FilmChapter
  tone?: 'light' | 'wine' | 'gold' | 'cream'
  /** Shared max-width column for chapter title + body (e.g. scratch card). */
  contentColumn?: boolean
}

export function ScrollScene({
  children,
  variant = 'rise',
  className = '',
  id,
  chapter,
  tone = 'light',
  contentColumn = false,
}: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      className={`scroll-scene film-chapter film-chapter--tone-${tone} scroll-scene--${variant} ${active ? 'scroll-scene--active' : ''} ${className}`}
    >
      <div className="film-chapter__ambient" aria-hidden="true" />
      {contentColumn ? (
        <div className="film-chapter__content">
          {chapter && (
            <ChapterIntro title={chapter.title} subtitle={chapter.subtitle} />
          )}
          <div className="scroll-scene__inner">{children}</div>
        </div>
      ) : (
        <>
          {chapter && (
            <ChapterIntro title={chapter.title} subtitle={chapter.subtitle} />
          )}
          <div className="scroll-scene__inner">{children}</div>
        </>
      )}
    </div>
  )
}
