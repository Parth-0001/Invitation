export const VENUE_MAP_SECTION_ID = 'venue-map'

export function scrollToVenueMap(): void {
  document.getElementById(VENUE_MAP_SECTION_ID)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
