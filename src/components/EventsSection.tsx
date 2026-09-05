import type { ReactNode } from 'react'
import type { SectionLabels, WeddingEvent } from '../types/wedding'
import { scrollToVenueMap } from '../utils/scrollToVenue'
import { FloralDivider } from './DecorativeElements'

interface EventCardProps {
  event: WeddingEvent
}

function EventDetail({
  icon,
  children,
  onClick,
}: {
  icon: string
  children: ReactNode
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="mt-0.5 text-base opacity-70" aria-hidden="true">
        {icon}
      </span>
      <span className="font-heading text-sm leading-relaxed opacity-90">{children}</span>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-start gap-3 rounded-lg py-1.5 text-left transition-opacity active:opacity-70"
      >
        {content}
      </button>
    )
  }

  return <div className="flex items-start gap-3 py-1.5">{content}</div>
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article
      className="overflow-hidden rounded-2xl shadow-sm"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--wedding-bg) 90%, white)',
        border: '1px solid color-mix(in srgb, var(--wedding-accent) 15%, transparent)',
      }}
    >
      {event.image && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
            }}
          />
        </div>
      )}

      <div className="p-5">
        <h3
          className="font-script mb-4 text-3xl"
          style={{ color: event.accentColor ?? 'var(--wedding-primary)' }}
        >
          {event.name}
        </h3>

        <EventDetail icon="🕒">{event.time}</EventDetail>
        <EventDetail icon="📅">{event.date}</EventDetail>
        <EventDetail icon="📍" onClick={scrollToVenueMap}>
          <span
            className="underline decoration-dotted underline-offset-4"
            style={{ color: 'var(--wedding-primary)' }}
          >
            {event.venue}
          </span>
          <span className="mt-0.5 block text-xs opacity-50">Tap to view on map</span>
        </EventDetail>

        {event.description && (
          <div
            className="mt-4 rounded-xl px-4 py-3.5"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--wedding-accent) 6%, transparent)',
              borderLeft: '2px solid color-mix(in srgb, var(--wedding-secondary) 60%, transparent)',
            }}
          >
            <p className="font-heading text-sm leading-relaxed opacity-85">{event.description}</p>
          </div>
        )}

        {event.dressCode && (
          <div className="mt-4 rounded-xl px-4 py-3" style={{ backgroundColor: 'color-mix(in srgb, var(--wedding-accent) 8%, transparent)' }}>
            <p className="section-label mb-1 opacity-60">Dress Code</p>
            <p className="font-heading text-sm">{event.dressCode}</p>
          </div>
        )}

      </div>
    </article>
  )
}

interface EventsSectionProps {
  events: WeddingEvent[]
  labels?: SectionLabels
}

export function EventsSection({ events, labels }: EventsSectionProps) {
  return (
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">
          {labels?.eventsSubtitle ?? 'Save the Dates'}
        </p>
        <h2
          className="font-heading mb-2 text-2xl font-light tracking-wide md:text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          {labels?.eventsTitle ?? 'Wedding Events'}
        </h2>
      </div>

      <FloralDivider />

      <div className="flex flex-col gap-8 py-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
