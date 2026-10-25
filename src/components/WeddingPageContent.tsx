import { useTheme } from '../hooks/useTheme'
import type { WeddingData } from '../types/wedding'
import { MusicPlaybackProvider, useOptionalMusicPlayback } from '../context/MusicPlaybackContext'
import { CinematicExperience } from '../cinematic/CinematicExperience'
import { ScrollScene } from '../cinematic/ScrollScene'
import { CountdownSection } from './CountdownSection'
import { CoupleSection } from './CoupleSection'
import { EventsSection } from './EventsSection'
import { FamilySection } from './FamilySection'
import { GallerySection } from './GallerySection'
import { HeroSection } from './HeroSection'
import { MessageSection } from './MessageSection'
import { MusicPlaybackScrollTrigger } from './MusicPlaybackScrollTrigger'
import { MusicPlayer } from './MusicPlayer'
import { ScratchReveal } from './ScratchReveal'
import { VenueSection } from './VenueSection'
import { HeartIcon } from './DecorativeElements'

/** Set to false to restore pre-cinematic scroll (see docs/CINEMATIC-REVERT.md). */
const CINEMATIC_SCROLL_ENABLED = true

interface WeddingPageContentProps {
  data: WeddingData
}

function WeddingPageBody({ data }: WeddingPageContentProps) {
  const playback = useOptionalMusicPlayback()

  return (
    <div className="film-story wedding-container min-h-dvh">
      <HeroSection
        wedding={data.wedding}
        displayNames={data.couple.displayNames}
        heroDecoration={data.heroDecoration}
      />

      <ScrollScene
        variant="zoom"
        tone="gold"
        contentColumn
        chapter={{ title: 'Reveal the Date', subtitle: 'A moment of surprise' }}
      >
        <ScratchReveal
          label={data.wedding.scratchRevealLabel}
          revealLabel={data.wedding.scratchRevealContent.label}
          revealValue={data.wedding.scratchRevealContent.value}
          onScratchStart={playback?.tryStartPlayback}
        />
      </ScrollScene>

      <ScrollScene
        variant="rise"
        tone="cream"
        chapter={{ title: 'The Countdown', subtitle: 'Until we celebrate' }}
      >
        <CountdownSection
          dateTime={data.wedding.dateTime}
          completeMessage={data.wedding.countdownCompleteMessage}
          presentation="film"
        />
      </ScrollScene>

      <ScrollScene variant="dramatic" tone="light">
        <MusicPlaybackScrollTrigger>
          <CoupleSection
            groom={data.couple.groom}
            bride={data.couple.bride}
            labels={data.sectionLabels}
            presentation="film"
          />
        </MusicPlaybackScrollTrigger>
      </ScrollScene>

      {(data.gallery.photos.length > 0 || data.gallery.videos.length > 0) && (
        <ScrollScene
          variant="slide-right"
          tone="cream"
          chapter={{ title: 'Memories', subtitle: 'Gallery' }}
        >
          <GallerySection
            heading={data.gallery.heading}
            photos={data.gallery.photos}
            videos={data.gallery.videos}
          />
        </ScrollScene>
      )}

      <ScrollScene
        variant="slide-left"
        tone="wine"
        chapter={{
          title: data.sectionLabels?.eventsTitle ?? 'Engagement Events',
          subtitle: data.sectionLabels?.eventsSubtitle ?? 'Save the Date',
        }}
      >
        <EventsSection events={data.events} labels={data.sectionLabels} presentation="film" />
      </ScrollScene>

      {data.invitationMessage && (
        <ScrollScene
          variant="zoom"
          tone="wine"
          chapter={{ title: 'Our Words', subtitle: 'With love' }}
        >
          <MessageSection message={data.invitationMessage} presentation="film" />
        </ScrollScene>
      )}

      {data.familyGroups && data.familyGroups.length > 0 && (
        <ScrollScene variant="rise" tone="cream">
          <FamilySection groups={data.familyGroups} />
        </ScrollScene>
      )}

      {data.music && (
        <ScrollScene
          variant="slide-right"
          tone="gold"
          chapter={{ title: 'Soundtrack', subtitle: 'Our song' }}
        >
          <MusicPlayer />
        </ScrollScene>
      )}

      <ScrollScene
        variant="zoom"
        tone="light"
        chapter={{ title: 'Find Us', subtitle: 'Venue & directions' }}
      >
        <VenueSection venue={data.venue} />
      </ScrollScene>

      <footer className="cinematic-footer film-finale section-padding py-12 text-center sm:py-16">
        <div className="film-finale__ring" aria-hidden="true" />
        <HeartIcon
          className="relative z-10 mx-auto mb-4 h-6 w-6 opacity-50"
          style={{ color: 'var(--wedding-accent)' }}
        />
        <p className="relative z-10 font-script text-3xl" style={{ color: 'var(--wedding-primary)' }}>
          {data.couple.displayNames}
        </p>
        <p className="relative z-10 section-label mt-4 opacity-45">With love & gratitude</p>
      </footer>
    </div>
  )
}

export function WeddingPageContent({ data }: WeddingPageContentProps) {
  useTheme(data.theme)

  const page = (
    <CinematicExperience enabled={CINEMATIC_SCROLL_ENABLED}>
      <WeddingPageBody data={data} />
    </CinematicExperience>
  )

  if (!data.music) {
    return page
  }

  return <MusicPlaybackProvider music={data.music}>{page}</MusicPlaybackProvider>
}
