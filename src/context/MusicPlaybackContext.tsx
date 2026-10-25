import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { MusicConfig } from '../types/wedding'
import { publicUrl } from '../utils/publicUrl'

const PLAY_VOLUME = 0.5

interface MusicPlaybackContextValue {
  music: MusicConfig
  isPlaying: boolean
  loadError: boolean
  autoplayBlocked: boolean
  /** Auto-start disabled after the guest pauses manually. */
  autoplaySuppressed: boolean
  tryStartPlayback: () => void
  togglePlay: () => void
}

const MusicPlaybackContext = createContext<MusicPlaybackContextValue | null>(null)

export function useMusicPlayback() {
  const ctx = useContext(MusicPlaybackContext)
  if (!ctx) {
    throw new Error('useMusicPlayback must be used within MusicPlaybackProvider')
  }
  return ctx
}

export function useOptionalMusicPlayback() {
  return useContext(MusicPlaybackContext)
}

interface MusicPlaybackProviderProps {
  music: MusicConfig
  children: ReactNode
}

export function MusicPlaybackProvider({ music, children }: MusicPlaybackProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  /** User pressed pause — do not auto-start again from scratch/scroll triggers. */
  const autoplaySuppressedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [autoplaySuppressed, setAutoplaySuppressed] = useState(false)

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

  const tryStartPlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio || loadError || autoplaySuppressedRef.current || !audio.paused) return
    void playAtVolume()
  }, [loadError, playAtVolume])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      autoplaySuppressedRef.current = true
      setAutoplaySuppressed(true)
      audio.pause()
      setIsPlaying(false)
    } else {
      await playAtVolume()
    }
  }, [playAtVolume])

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

  const value = useMemo(
    () => ({
      music,
      isPlaying,
      loadError,
      autoplayBlocked,
      autoplaySuppressed,
      tryStartPlayback,
      togglePlay,
    }),
    [music, isPlaying, loadError, autoplayBlocked, autoplaySuppressed, tryStartPlayback, togglePlay],
  )

  return (
    <MusicPlaybackContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={publicUrl(music.audioUrl)} preload="auto" loop className="sr-only" />
    </MusicPlaybackContext.Provider>
  )
}
