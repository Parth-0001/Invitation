import { padCountdown, useCountdown } from '../hooks/useCountdown'
import { FloralDivider } from './DecorativeElements'

interface CountdownSectionProps {
  dateTime: string
  completeMessage?: string
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-heading text-4xl font-light tabular-nums md:text-5xl"
        style={{ color: 'var(--wedding-primary)' }}
      >
        {value}
      </span>
      <span className="section-label mt-1 opacity-60">{label}</span>
    </div>
  )
}

export function CountdownSection({ dateTime, completeMessage }: CountdownSectionProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(dateTime)

  if (isComplete) {
    return (
      <section className="section-padding py-10 text-center">
        <FloralDivider />
        <p className="font-script text-3xl md:text-4xl" style={{ color: 'var(--wedding-primary)' }}>
          {completeMessage ?? 'The celebration has begun ❤️'}
        </p>
        <FloralDivider />
      </section>
    )
  }

  return (
    <section className="section-padding py-10">
      <FloralDivider />
      <div className="mx-auto grid max-w-sm grid-cols-4 gap-2 py-6">
        <CountdownUnit value={padCountdown(days)} label="Days" />
        <CountdownUnit value={padCountdown(hours)} label="Hours" />
        <CountdownUnit value={padCountdown(minutes)} label="Minutes" />
        <CountdownUnit value={padCountdown(seconds)} label="Seconds" />
      </div>
      <FloralDivider />
    </section>
  )
}
