interface RingProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

/** Large interlocking rings — the hero focal point for engagement */
export function InterlockingRingsHero({
  className = '',
  primaryColor = 'var(--wedding-accent)',
  secondaryColor = 'var(--wedding-secondary)',
}: RingProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left ring */}
      <circle
        cx="72"
        cy="62"
        r="38"
        stroke={secondaryColor}
        strokeWidth="3.5"
        fill="none"
        opacity="0.9"
      />
      <circle cx="72" cy="62" r="38" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.25" />

      {/* Right ring — overlaps */}
      <circle
        cx="128"
        cy="62"
        r="38"
        stroke={secondaryColor}
        strokeWidth="3.5"
        fill="none"
        opacity="0.9"
      />
      <circle cx="128" cy="62" r="38" stroke={primaryColor} strokeWidth="1" fill="none" opacity="0.25" />

      {/* Gem on top ring */}
      <path
        d="M128 18 L134 28 L128 34 L122 28 Z"
        fill={secondaryColor}
        opacity="0.95"
      />
      <path
        d="M128 18 L134 28 L128 34 L122 28 Z"
        stroke={primaryColor}
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      {/* Gem facets */}
      <line x1="128" y1="18" x2="128" y2="34" stroke={primaryColor} strokeWidth="0.5" opacity="0.3" />
      <line x1="122" y1="28" x2="134" y2="28" stroke={primaryColor} strokeWidth="0.5" opacity="0.3" />

      {/* Inner shine on rings */}
      <path
        d="M58 48 Q72 42 86 48"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M114 48 Q128 42 142 48"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

/** Compact rings for dividers */
export function RingDivider({
  className = '',
  primaryColor = 'var(--wedding-accent)',
  secondaryColor = 'var(--wedding-secondary)',
}: RingProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="14" stroke={secondaryColor} strokeWidth="2.5" fill="none" />
      <circle cx="42" cy="22" r="14" stroke={secondaryColor} strokeWidth="2.5" fill="none" />
      <path d="M42 6 L45 12 L42 15 L39 12 Z" fill={secondaryColor} />
      <circle cx="22" cy="22" r="14" stroke={primaryColor} strokeWidth="0.5" fill="none" opacity="0.3" />
      <circle cx="42" cy="22" r="14" stroke={primaryColor} strokeWidth="0.5" fill="none" opacity="0.3" />
    </svg>
  )
}

/** Single ring for floating background decoration */
export function SingleRing({
  className = '',
  secondaryColor = 'var(--wedding-secondary)',
}: RingProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="40" cy="42" r="28" stroke={secondaryColor} strokeWidth="2.5" fill="none" opacity="0.5" />
      <path d="M40 12 L43 18 L40 21 L37 18 Z" fill={secondaryColor} opacity="0.6" />
      <path d="M24 32 Q40 26 56 32" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

/** Diamond sparkle accent */
export function DiamondSparkle({
  className = '',
  color = 'var(--wedding-secondary)',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2 L16 10 L12 22 L8 10 Z" fill={color} opacity="0.7" />
      <path d="M12 2 L16 10 L12 14 L8 10 Z" fill="white" opacity="0.25" />
      <path d="M4 10 L12 10 L12 22 L4 10" fill={color} opacity="0.3" />
      <path d="M20 10 L12 10 L12 22 L20 10" fill={color} opacity="0.3" />
    </svg>
  )
}

/** Full hero background layer — floating rings & sparkles */
export function EngagementHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <SingleRing className="animate-float-slow absolute -top-4 -left-6 h-24 w-24 opacity-30" />
      <SingleRing className="animate-float-delayed absolute top-24 -right-8 h-20 w-20 rotate-12 opacity-25" />
      <SingleRing className="animate-float-slow absolute bottom-32 -left-10 h-16 w-16 -rotate-15 opacity-20" />
      <SingleRing className="animate-float-delayed absolute right-6 bottom-20 h-14 w-14 rotate-45 opacity-25" />

      <DiamondSparkle className="animate-sparkle absolute top-[18%] left-[12%] h-5 w-5" />
      <DiamondSparkle className="animate-sparkle-delayed absolute top-[22%] right-[15%] h-4 w-4" />
      <DiamondSparkle className="animate-sparkle absolute bottom-[35%] left-[8%] h-3 w-3" />
      <DiamondSparkle className="animate-sparkle-delayed absolute right-[10%] bottom-[40%] h-6 w-6" />
      <DiamondSparkle className="animate-sparkle absolute top-[40%] right-[6%] h-3 w-3 opacity-60" />

      {/* Soft ring outline watermark */}
      <svg
        className="absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="70" stroke="var(--wedding-secondary)" strokeWidth="8" />
        <circle cx="100" cy="100" r="85" stroke="var(--wedding-accent)" strokeWidth="4" />
      </svg>
    </div>
  )
}
