import { useMemo } from 'react'

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
  color: string
  size: number
  drift: number
}

/** Visual-only celebration — confetti and sparkles, no text. */
export function RevealCelebration() {
  const confetti = useMemo<ConfettiPiece[]>(() => {
    const colors = [
      'var(--wedding-secondary)',
      'var(--wedding-primary)',
      'color-mix(in srgb, var(--wedding-secondary) 70%, white)',
      'color-mix(in srgb, var(--wedding-primary) 75%, white)',
    ]
    return Array.from({ length: 64 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.3 + Math.random() * 1.2,
      color: colors[id % colors.length],
      size: 5 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 90,
    }))
  }, [])

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, id) => ({
        id,
        left: 12 + Math.random() * 76,
        top: 15 + Math.random() * 70,
        delay: Math.random() * 0.5,
        scale: 0.6 + Math.random() * 0.8,
      })),
    [],
  )

  return (
    <div className="reveal-celebration" aria-hidden="true">
      <div className="reveal-celebration__confetti">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="reveal-celebration__piece"
            style={{
              left: `${piece.left}%`,
              width: piece.size,
              height: piece.size * 0.65,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              ['--confetti-drift' as string]: `${piece.drift}px`,
            }}
          />
        ))}
      </div>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="reveal-celebration__sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            transform: `scale(${s.scale})`,
          }}
        />
      ))}
      <div className="reveal-celebration__flash" />
    </div>
  )
}
