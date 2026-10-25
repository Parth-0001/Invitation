import { useCallback, useEffect, useRef, useState } from 'react'
import type { MusicConfig } from '../types/wedding'
import { publicUrl } from '../utils/publicUrl'
import { FloralDivider } from './DecorativeElements'

const PLAY_VOLUME = 0.5
const SCROLL_PLAY_RATIO = 0.35

interface MusicPlayerProps {
  music: MusicConfig
}

export function MusicPlayer({ music }: MusicPlayerProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasAutoStartedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  const coverSrc = music.coverImage
    ? music.coverImage.startsWith('http')
      ? music.coverImage
      : publicUrl(music.coverImage)
    : null

  const playAtVolume = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || loadError) return false

    audio.volume = PLAY_VOLUME
    try {
      await audio.play()
      setIsPlaying(true)
      setAutoplayBlocked(false)
      return true
    } catch {
      setAutoplayBlocked(true)
      setIsPlaying(false)
      return false
    }
  }, [loadError])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      await playAtVolume()
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = PLAY_VOLUME

    const onEnded = () => setIsPlaying(false)
    const onError = () => setLoadError(true)
    const onCanPlay = () => setLoadError(false)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || loadError || hasAutoStartedRef.current) return

        if (entry.intersectionRatio >= SCROLL_PLAY_RATIO) {
          hasAutoStartedRef.current = true
          void playAtVolume()
        }
      },
      { threshold: [0, SCROLL_PLAY_RATIO, 0.5, 0.75, 1] },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [loadError, playAtVolume])

  return (
    <section ref={sectionRef} className="section-padding py-14">
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
        className="music-player-card mx-auto mt-6 flex max-w-md items-center gap-4 p-4 sm:gap-5 sm:p-5"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--wedding-accent) 6%, var(--wedding-bg))',
          border: '1px solid color-mix(in srgb, var(--wedding-accent) 18%, transparent)',
        }}
      >
        {coverSrc && (
          <div className="music-player-disc" aria-hidden="true">
            <div className={`music-player-disc__spinner ${isPlaying ? 'music-player-disc__spinner--active' : ''}`}>
              <div className="music-player-disc__ring" />
              <div className="music-player-disc__label">
                <img src={coverSrc} alt="" className="music-player-disc__img" />
              </div>
              <div className="music-player-disc__hole" />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1 text-left">
          <p className="font-script truncate text-2xl leading-tight" style={{ color: 'var(--wedding-primary)' }}>
            {music.title}
          </p>
          {music.artist && (
            <p className="mt-0.5 truncate text-[0.65rem] font-medium uppercase tracking-[0.18em] opacity-55">
              {music.artist}
            </p>
          )}

          {loadError ? (
            <p className="mt-2 text-xs leading-relaxed opacity-70">
              Audio could not load. Check <code className="text-[0.65rem]">{music.audioUrl}</code>
            </p>
          ) : autoplayBlocked ? (
            <p className="mt-2 text-xs opacity-55">Tap play — your browser may block auto-play until you interact.</p>
          ) : (
            <p className="mt-2 text-xs opacity-45">
              {isPlaying ? 'Now playing' : 'Starts when you reach this section'}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          disabled={loadError}
          className="music-player-play flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-95 disabled:opacity-40 sm:h-14 sm:w-14"
          style={{ backgroundColor: 'var(--wedding-accent)' }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <audio ref={audioRef} src={publicUrl(music.audioUrl)} preload="auto" loop />
    </section>
  )
}
