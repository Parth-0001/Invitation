type FilmTone = 'light' | 'cream' | 'gold' | 'wine' | 'hero'

interface FilmCurveProps {
  position: 'top' | 'bottom'
  tone: FilmTone
  className?: string
}

/** Soft wave between story sections */
export function FilmCurve({ position, tone, className = '' }: FilmCurveProps) {
  return (
    <div
      className={`film-curve film-curve--${position} film-curve--tone-${tone} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 48" preserveAspectRatio="none">
        <path
          className="film-curve__fill"
          d={
            position === 'bottom'
              ? 'M0 8 C120 44, 280 0, 400 24 L400 48 L0 48 Z'
              : 'M0 48 C120 4, 280 44, 400 20 L400 0 L0 0 Z'
          }
        />
      </svg>
    </div>
  )
}
