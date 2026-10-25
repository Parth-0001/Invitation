import { useMusicPlayback } from '../context/MusicPlaybackContext'
import { publicUrl } from '../utils/publicUrl'

export function MusicPlayer() {
  const { music, isPlaying, loadError, autoplayBlocked, autoplaySuppressed, togglePlay } = useMusicPlayback()

  const coverSrc = music.coverImage
    ? music.coverImage.startsWith('http')
      ? music.coverImage
      : publicUrl(music.coverImage)
    : null

  return (
    <section className="film-section py-8 sm:py-10">
      <div
        className="music-player-card mx-auto mt-2 flex w-full max-w-md items-center gap-3 p-3.5 sm:mt-6 sm:gap-5 sm:p-5"
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
              {isPlaying
                ? 'Now playing'
                : autoplaySuppressed
                  ? 'Paused — tap play when you like'
                  : 'Starts when you scratch or reach the couple'}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          disabled={loadError}
          className="music-player-play flex h-12 w-12 min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform active:scale-95 disabled:opacity-40 touch-manipulation sm:h-14 sm:w-14"
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
    </section>
  )
}
