import type { ReactNode } from 'react'
import type { SectionLabels, WeddingEvent } from '../types/wedding'
import { scrollToVenueMap } from '../utils/scrollToVenue'
import { FloralDivider } from './DecorativeElements'

interface EventCardProps {
  event: WeddingEvent
  presentation?: 'default' | 'film'
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
      <span className="mt-0.5 text-base opacity-70" aria-hidden="true">{icon}</span>
      <span className="font-heading text-sm leading-relaxed opacity-90">{children}</span>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-11 w-full items-start gap-3 rounded-lg py-2.5 text-left transition-opacity active:opacity-70"
      >
        {content}
      </button>
    )
  }

  return <div className="flex min-h-11 items-start gap-3 py-2.5">{content}</div>
}

export function EventCard({ event, presentation = 'film' }: EventCardProps) {
  if (presentation === 'film') {
    return (
      <article className="film-event-poster">
        {event.image && (
          <div className="film-event-poster__visual cinematic-event-visual">
            <img src={event.image} alt={event.name} loading="lazy" />
            <div className="film-event-poster__shade" />
            <div className="film-event-poster__headline">
              <p className="section-label mb-1 text-white/80">Ceremony</p>
              <h3 className="font-script text-4xl text-white drop-shadow-md">{event.name}</h3>
            </div>
          </div>
        )}

        <div className="film-event-poster__body">
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
            <p className="film-event-poster__copy font-heading">{event.description}</p>
          )}
        </div>
      </article>
    )
  }

  return (
    <article
      className="overflow-hidden rounded-2xl shadow-sm"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--wedding-bg) 90%, white)',
        border: '1px solid color-mix(in srgb, var(--wedding-accent) 15%, transparent)',
      }}
    >
      {event.image && (
        <div className="cinematic-event-visual relative h-52 overflow-hidden md:h-56">
          <img src={event.image} alt={event.name} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-script mb-4 text-3xl" style={{ color: event.accentColor ?? 'var(--wedding-primary)' }}>
          {event.name}
        </h3>
        <EventDetail icon="🕒">{event.time}</EventDetail>
        <EventDetail icon="📅">{event.date}</EventDetail>
      </div>
    </article>
  )
}

interface EventsSectionProps {
  events: WeddingEvent[]
  labels?: SectionLabels
  presentation?: 'default' | 'film'
}

export function EventsSection({ events, labels, presentation = 'film' }: EventsSectionProps) {
  if (presentation !== 'film') {
    return (
      <section className="section-padding py-14">
        <div className="text-center">
          <p className="section-label mb-2 opacity-60">{labels?.eventsSubtitle ?? 'Save the Dates'}</p>
          <h2 className="font-heading mb-2 text-2xl font-light tracking-wide md:text-3xl" style={{ color: 'var(--wedding-primary)' }}>
            {labels?.eventsTitle ?? 'Wedding Events'}
          </h2>
        </div>
        <FloralDivider />
        <div className="flex flex-col gap-8 py-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} presentation="default" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="film-section pb-6 pt-0 sm:pb-8 sm:pt-2">
      <div className="flex flex-col gap-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} presentation="film" />
        ))}
      </div>
    </section>
  )
}
