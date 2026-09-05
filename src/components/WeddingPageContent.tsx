import { useTheme } from '../hooks/useTheme'
import type { WeddingData } from '../types/wedding'
import { CountdownSection } from './CountdownSection'
import { CoupleSection } from './CoupleSection'
import { EventsSection } from './EventsSection'
import { FamilySection } from './FamilySection'
import { GallerySection } from './GallerySection'
import { HeroSection } from './HeroSection'
import { MessageSection } from './MessageSection'
import { MusicPlayer } from './MusicPlayer'
import { ScratchReveal } from './ScratchReveal'
import { VenueSection } from './VenueSection'
import { HeartIcon } from './DecorativeElements'

interface WeddingPageContentProps {
  data: WeddingData
}

export function WeddingPageContent({ data }: WeddingPageContentProps) {
  useTheme(data.theme)

  return (
    <div className="wedding-container min-h-dvh">
      <HeroSection
        wedding={data.wedding}
        displayNames={data.couple.displayNames}
        heroDecoration={data.heroDecoration}
      />

      <ScratchReveal
        label={data.wedding.scratchRevealLabel}
        revealLabel={data.wedding.scratchRevealContent.label}
        revealValue={data.wedding.scratchRevealContent.value}
      />

      <CountdownSection
        dateTime={data.wedding.dateTime}
        completeMessage={data.wedding.countdownCompleteMessage}
      />

      <CoupleSection
        groom={data.couple.groom}
        bride={data.couple.bride}
        labels={data.sectionLabels}
      />

      <GallerySection
        heading={data.gallery.heading}
        photos={data.gallery.photos}
        videos={data.gallery.videos}
      />

      <EventsSection events={data.events} labels={data.sectionLabels} />

      {data.invitationMessage && <MessageSection message={data.invitationMessage} />}

      {data.familyGroups && data.familyGroups.length > 0 && (
        <FamilySection groups={data.familyGroups} />
      )}

      {data.music && <MusicPlayer music={data.music} />}

      <VenueSection venue={data.venue} />

      <footer className="section-padding py-12 text-center">
        <HeartIcon
          className="mx-auto mb-3 h-5 w-5 opacity-40"
          style={{ color: 'var(--wedding-accent)' }}
        />
        <p className="font-script text-2xl" style={{ color: 'var(--wedding-primary)' }}>
          {data.couple.displayNames}
        </p>
        <p className="section-label mt-3 opacity-40">With love & gratitude</p>
      </footer>
    </div>
  )
}
