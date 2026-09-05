import type { VenueInfo } from '../types/wedding'
import { getGoogleMapsEmbedUrl, getGoogleMapsUrl } from '../hooks/useTheme'
import { VENUE_MAP_SECTION_ID } from '../utils/scrollToVenue'
import { FloralDivider } from './DecorativeElements'

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
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">Location</p>
        <h2
          className="font-heading mb-2 text-2xl font-light tracking-wide md:text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          Find Us Here
        </h2>
      </div>

      <FloralDivider />

      <div className="py-6 text-center">
        <h3
          className="font-script mb-3 text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          {venue.name}
        </h3>
        <p className="font-heading mx-auto max-w-xs text-sm leading-relaxed opacity-80">
          📍 {venue.address}
        </p>
      </div>

      {venue.image && (
        <div className="mb-6 overflow-hidden rounded-2xl">
          <img
            src={venue.image}
            alt={venue.name}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div id={VENUE_MAP_SECTION_ID} className="scroll-mt-6">
        {embedUrl && (
          <div className="overflow-hidden rounded-2xl shadow-md">
            <iframe
              src={embedUrl}
              title={`Map showing ${venue.name}`}
              className="h-64 w-full border-0 md:h-72"
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
            className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium tracking-wider uppercase transition-opacity active:opacity-80"
            style={{
              backgroundColor: 'var(--wedding-accent)',
              color: 'white',
            }}
          >
            Open in Maps ↗
          </a>
        </div>
      </div>
    </section>
  )
}
