import { padCountdown, useCountdown } from '../hooks/useCountdown'
import { FloralDivider } from './DecorativeElements'

interface CountdownSectionProps {
  dateTime: string
  completeMessage?: string
  presentation?: 'default' | 'film'
}

function CountdownUnit({
  value,
  label,
  film = false,
}: {
  value: string
  label: string
  film?: boolean
}) {
  if (film) {
    return (
      <div className="film-countdown-unit">
        <span className="film-countdown-unit__value font-heading tabular-nums">{value}</span>
        <span className="film-countdown-unit__label section-label">{label}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-4xl font-light tabular-nums md:text-5xl" style={{ color: 'var(--wedding-primary)' }}>
        {value}
      </span>
      <span className="section-label mt-1 opacity-60">{label}</span>
    </div>
  )
}

export function CountdownSection({
  dateTime,
  completeMessage,
  presentation = 'film',
}: CountdownSectionProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(dateTime)

  if (isComplete) {
    return (
      <section className="section-padding py-10 text-center">
        <div className="film-glass-panel film-glass-panel--center">
          <p className="font-script text-3xl md:text-4xl" style={{ color: 'var(--wedding-primary)' }}>
            {completeMessage ?? 'The celebration has begun ❤️'}
          </p>
        </div>
      </section>
    )
  }

  if (presentation === 'film') {
    return (
      <section className="film-section py-4 sm:py-6">
        <div className="film-countdown-stage">
          <div className="film-countdown-glow" aria-hidden="true" />
          <div className="film-glass-panel">
            <div className="film-countdown-grid">
              <CountdownUnit film value={padCountdown(days)} label="Days" />
              <CountdownUnit film value={padCountdown(hours)} label="Hours" />
              <CountdownUnit film value={padCountdown(minutes)} label="Min" />
              <CountdownUnit film value={padCountdown(seconds)} label="Sec" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding py-10">
      <FloralDivider />
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 py-6">
        <CountdownUnit value={padCountdown(days)} label="Days" />
        <CountdownUnit value={padCountdown(hours)} label="Hours" />
        <CountdownUnit value={padCountdown(minutes)} label="Min" />
        <CountdownUnit value={padCountdown(seconds)} label="Sec" />
      </div>
      <FloralDivider />
    </section>
  )
}
