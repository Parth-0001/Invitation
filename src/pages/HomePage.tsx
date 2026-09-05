import { Link } from 'react-router-dom'
import { getDefaultWedding } from '../data'
import { useTheme } from '../hooks/useTheme'
import {
  DiamondSparkle,
  EngagementHeroBackdrop,
  InterlockingRingsHero,
  RingDivider,
} from '../components/EngagementDecorations'

export function HomePage() {
  const data = getDefaultWedding()

  useTheme(
    data?.theme ?? {
      primaryColor: '#8b2942',
      secondaryColor: '#d4a574',
      accentColor: '#8b2942',
      backgroundColor: '#faf7f4',
      textColor: '#3d2b2b',
      headingFont: 'Cormorant Garamond',
      bodyFont: 'Montserrat',
      scriptFont: 'Great Vibes',
    },
  )

  if (!data) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6 text-center">
        <p className="font-script text-4xl text-[#8b2942]">No invitation available</p>
      </div>
    )
  }

  const share = data.sharePage ?? {
    headline: "You're Invited",
    subheadline: 'Save the Date',
    message: 'An engagement celebration awaits you.\nWe would be honoured by your presence.',
    buttonText: 'Click Here for the Invitation',
    hint: 'Tap below to view the full invitation',
  }

  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-12 text-center"
      style={{
        background: `radial-gradient(ellipse at 50% 20%, color-mix(in srgb, var(--wedding-secondary) 20%, transparent) 0%, transparent 50%), linear-gradient(180deg, var(--wedding-bg) 0%, color-mix(in srgb, var(--wedding-secondary) 10%, var(--wedding-bg)) 100%)`,
        color: 'var(--wedding-text)',
      }}
    >
      <EngagementHeroBackdrop />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <InterlockingRingsHero className="animate-ring-glow mb-6 h-24 w-48" />

        <p className="section-label mb-3 opacity-60">{share.subheadline}</p>

        <h1
          className="font-script mb-4 text-5xl leading-tight md:text-6xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          {share.headline}
        </h1>

        <RingDivider className="mb-6 h-7 w-12 opacity-80" />

        <p className="font-heading mb-10 max-w-xs whitespace-pre-line text-base leading-relaxed opacity-75">
          {share.message}
        </p>

        <Link
          to={`/${data.slug}`}
          className="group flex min-h-[56px] w-full max-w-xs items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-widest uppercase shadow-lg transition-all active:scale-[0.98]"
          style={{
            backgroundColor: 'var(--wedding-accent)',
            color: 'white',
            boxShadow: '0 8px 24px color-mix(in srgb, var(--wedding-accent) 35%, transparent)',
          }}
        >
          {share.buttonText}
          <span className="transition-transform group-active:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </Link>

        {share.hint && (
          <p className="mt-5 text-xs tracking-wide opacity-45 animate-pulse-soft">{share.hint}</p>
        )}

        <div className="mt-10 flex items-center gap-3 opacity-50">
          <DiamondSparkle className="h-3 w-3" />
          <DiamondSparkle className="h-4 w-4" />
          <DiamondSparkle className="h-3 w-3" />
        </div>
      </div>
    </div>
  )
}
