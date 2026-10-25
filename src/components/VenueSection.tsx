import type { VenueInfo } from '../types/wedding'
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from '../hooks/useTheme'
import { VENUE_MAP_SECTION_ID } from '../utils/scrollToVenue'

interface VenueSectionProps {
  venue: VenueInfo
}

export function VenueSection({ venue }: VenueSectionProps) {
  const embedUrl = getGoogleMapsEmbedUrl(venue.latitude, venue.longitude, venue.address)
  const mapsUrl = getGoogleMapsUrl(
    venue.latitude,
    venue.longitude,
    venue.address,
    venue.googleMapsUrl,
  )

  return (
    <section className="film-section pb-8 pt-0 sm:pb-10 sm:pt-2">
      <div className="film-venue-card">
        <div className="film-venue-card__header text-center">
          <h3 className="font-script text-3xl md:text-4xl" style={{ color: 'var(--wedding-primary)' }}>
            {venue.name}
          </h3>
          <p className="font-heading mx-auto mt-3 max-w-xs text-sm leading-relaxed opacity-80">
            {venue.address}
          </p>
        </div>

        <div id={VENUE_MAP_SECTION_ID} className="scroll-mt-6">
          {embedUrl && (
            <div className="film-venue-card__map overflow-hidden rounded-2xl">
              <iframe
                src={embedUrl}
                title={`Map showing ${venue.name}`}
                className="h-56 w-full border-0 sm:h-64 md:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}

          <div className={`flex justify-center ${embedUrl ? 'mt-6' : 'mt-0'}`}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="film-cta-button inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium tracking-wider uppercase transition-transform active:scale-[0.98]"
            >
              Open in Maps ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
