interface FloralDecorationProps {
  className?: string
  color?: string
}

export function FloralTop({ className = '', color = 'var(--wedding-accent)' }: FloralDecorationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M100 20 C90 5, 70 5, 60 15 C50 25, 55 35, 70 35 C80 35, 90 28, 100 20 Z"
        fill={color}
        opacity="0.15"
      />
      <path
        d="M100 20 C110 5, 130 5, 140 15 C150 25, 145 35, 130 35 C120 35, 110 28, 100 20 Z"
        fill={color}
        opacity="0.15"
      />
      <circle cx="100" cy="20" r="4" fill={color} opacity="0.3" />
      <line x1="20" y1="20" x2="75" y2="20" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="125" y1="20" x2="180" y2="20" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

export function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-4 ${className}`}>
      <div className="decorative-line flex-1 max-w-16" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 12 C10 8, 6 8, 5 11 C4 14, 6 16, 9 16 C10.5 16, 11.5 14.5, 12 12 Z"
          fill="var(--wedding-accent)"
          opacity="0.4"
        />
        <path
          d="M12 12 C14 8, 18 8, 19 11 C20 14, 18 16, 15 16 C13.5 16, 12.5 14.5, 12 12 Z"
          fill="var(--wedding-accent)"
          opacity="0.4"
        />
      </svg>
      <div className="decorative-line flex-1 max-w-16" />
    </div>
  )
}

export function HeartIcon({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
