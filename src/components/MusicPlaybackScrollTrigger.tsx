import { useEffect, useRef, type ReactNode } from 'react'
import { useOptionalMusicPlayback } from '../context/MusicPlaybackContext'

const SCROLL_PLAY_RATIO = 0.25

interface MusicPlaybackScrollTriggerProps {
  children: ReactNode
}

/** Starts soundtrack when this block scrolls into view (e.g. couple section). */
export function MusicPlaybackScrollTrigger({ children }: MusicPlaybackScrollTriggerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const playback = useOptionalMusicPlayback()

  useEffect(() => {
    const root = rootRef.current
    if (!root || !playback) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || entry.intersectionRatio < SCROLL_PLAY_RATIO) return
        playback.tryStartPlayback()
      },
      { threshold: [0, SCROLL_PLAY_RATIO, 0.5] },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [playback])

  return <div ref={rootRef} className="w-full">{children}</div>
}
