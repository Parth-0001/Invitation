export interface WeddingTheme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  headingFont: string
  bodyFont: string
  scriptFont: string
  decorativePattern?: string
  borderStyle?: 'none' | 'floral' | 'minimal' | 'gold'
}

export interface PersonInfo {
  name: string
  photo?: string
  description?: string
  parentLabel?: string
  parents?: string[]
  family?: string[]
}

export interface WeddingEvent {
  id: string
  name: string
  date: string
  time: string
  venue: string
  address?: string
  dressCode?: string
  description?: string
  image?: string
  latitude?: number | null
  longitude?: number | null
  googleMapsUrl?: string
  accentColor?: string
}

export interface GalleryPhoto {
  id: string
  url: string
  alt?: string
  caption?: string
}

export interface GalleryVideo {
  id: string
  url: string
  thumbnail?: string
  title?: string
  type: 'upload' | 'embed'
}

export interface MusicConfig {
  title: string
  artist?: string
  audioUrl: string
  coverImage?: string
  sectionHeading?: string
}

export interface VenueInfo {
  name: string
  address: string
  latitude?: number | null
  longitude?: number | null
  googleMapsUrl?: string
  image?: string
}

export interface FamilyGroup {
  side: string
  heading?: string
  members: string[]
}

export interface InvitationMessage {
  heading: string
  scriptHeading?: string
  message: string
  image?: string
}

export interface SharePageConfig {
  headline: string
  subheadline?: string
  message: string
  buttonText: string
  hint?: string
}

export interface SectionLabels {
  eventsSubtitle?: string
  eventsTitle?: string
  coupleSubtitle?: string
  coupleTitle?: string
  groomRole?: string
  brideRole?: string
}

export interface WeddingData {
  slug: string
  theme: WeddingTheme
  heroDecoration?: 'engagement' | 'wedding' | 'default'
  sectionLabels?: SectionLabels
  couple: {
    groom: PersonInfo
    bride: PersonInfo
    displayNames: string
  }
  wedding: {
    dateTime: string
    heroMessage: string
    scratchRevealLabel: string
    scratchRevealContent: {
      label: string
      value: string
    }
    countdownStartedMessage?: string
    countdownCompleteMessage?: string
  }
  events: WeddingEvent[]
  gallery: {
    heading?: string
    photos: GalleryPhoto[]
    videos: GalleryVideo[]
  }
  music?: MusicConfig
  venue: VenueInfo
  invitationMessage?: InvitationMessage
  familyGroups?: FamilyGroup[]
  sharePage?: SharePageConfig
  sectionOrder?: string[]
}
