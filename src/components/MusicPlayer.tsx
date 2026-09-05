import { useEffect, useRef, useState } from 'react'
import type { MusicConfig } from '../types/wedding'
import { publicUrl } from '../utils/publicUrl'
import { FloralDivider } from './DecorativeElements'

interface MusicPlayerProps {
  music: MusicConfig
}

export function MusicPlayer({ music }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    setHasInteracted(true)

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => setIsPlaying(false)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  return (
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">Soundtrack</p>
        <h2
          className="font-heading mb-2 text-2xl font-light tracking-wide md:text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          {music.sectionHeading ?? 'Music that feels like you'}
        </h2>
      </div>

      <FloralDivider />

      <div
        className="mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl shadow-md"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--wedding-accent) 8%, var(--wedding-bg))',
          border: '1px solid color-mix(in srgb, var(--wedding-accent) 20%, transparent)',
        }}
      >
        <div className="flex items-center gap-4 p-5">
          {music.coverImage && (
            <img
              src={music.coverImage}
              alt={music.title}
              className="h-16 w-16 rounded-xl object-cover"
            />
          )}

          <div className="min-w-0 flex-1">
            <p className="font-script truncate text-2xl" style={{ color: 'var(--wedding-primary)' }}>
              ♪ {music.title}
            </p>
            {music.artist && (
              <p className="text-xs uppercase tracking-wider opacity-60">{music.artist}</p>
            )}
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-95"
            style={{ backgroundColor: 'var(--wedding-accent)' }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {!hasInteracted && (
          <p className="px-5 pb-4 text-center text-xs opacity-50">Tap play to start the music</p>
        )}
      </div>

      <audio ref={audioRef} src={publicUrl(music.audioUrl)} preload="metadata" loop />
    </section>
  )
}
