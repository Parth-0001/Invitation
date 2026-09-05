import type { WeddingData } from '../types/wedding'
import { FloralTop } from './DecorativeElements'
import {
  EngagementHeroBackdrop,
  InterlockingRingsHero,
  RingDivider,
  DiamondSparkle,
} from './EngagementDecorations'

interface HeroSectionProps {
  wedding: WeddingData['wedding']
  displayNames: string
  heroDecoration?: WeddingData['heroDecoration']
}

export function HeroSection({ wedding, displayNames, heroDecoration = 'default' }: HeroSectionProps) {
  const isEngagement = heroDecoration === 'engagement'

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
      style={{
        background: isEngagement
          ? `radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--wedding-secondary) 18%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--wedding-bg) 0%, color-mix(in srgb, var(--wedding-secondary) 12%, var(--wedding-bg)) 100%)`
          : `linear-gradient(180deg, var(--wedding-bg) 0%, color-mix(in srgb, var(--wedding-secondary) 15%, var(--wedding-bg)) 100%)`,
      }}
    >
      {isEngagement && <EngagementHeroBackdrop />}

      <div
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20"
        style={{ backgroundColor: 'var(--wedding-accent)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-15"
        style={{ backgroundColor: 'var(--wedding-secondary)' }}
      />

      {isEngagement ? (
        <div className="relative z-10 mb-4 animate-fade-in-up">
          <InterlockingRingsHero className="animate-ring-glow mx-auto h-28 w-52 md:h-32 md:w-60" />
          <div className="mt-2 flex items-center justify-center gap-4">
            <DiamondSparkle className="h-3 w-3 opacity-70" />
            <DiamondSparkle className="h-4 w-4" />
            <DiamondSparkle className="h-3 w-3 opacity-70" />
          </div>
        </div>
      ) : (
        <FloralTop className="relative z-10 mb-8 w-48 opacity-80" />
      )}

      <p className="section-label relative z-10 mb-6 animate-fade-in-up opacity-70">
        {wedding.heroMessage}
      </p>

      <h1
        className="font-script relative z-10 animate-fade-in-up text-5xl leading-tight md:text-7xl"
        style={{
          color: 'var(--wedding-primary)',
          animationDelay: '0.2s',
        }}
      >
        {displayNames}
      </h1>

      <div className="relative z-10 my-6 flex items-center gap-3 animate-fade-in-up opacity-80">
        <div className="decorative-line w-12" />
        {isEngagement ? (
          <RingDivider className="h-8 w-14" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="var(--wedding-accent)" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
        <div className="decorative-line w-12" />
      </div>

      <p
        className="section-label relative z-10 animate-fade-in-up opacity-50"
        style={{ animationDelay: '0.4s' }}
      >
        {wedding.scratchRevealLabel}
      </p>

      <div className="absolute bottom-8 z-10 animate-pulse-soft opacity-40">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
