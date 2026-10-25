import type { PersonInfo, SectionLabels } from '../types/wedding'
import { publicUrl } from '../utils/publicUrl'
import { FloralDivider } from './DecorativeElements'

interface PersonCardProps {
  role: string
  person: PersonInfo
}

function PersonCard({ role, person }: PersonCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {person.photo && (
        <div
          className="cinematic-portrait mb-5 h-36 w-36 border-2 p-1 md:h-44 md:w-44"
          style={{ borderColor: 'var(--wedding-secondary)' }}
        >
          <img
            src={publicUrl(person.photo)}
            alt={person.name}
            className="cinematic-portrait__img h-full w-full rounded-full"
            loading="lazy"
          />
        </div>
      )}

      <p className="section-label mb-2 opacity-60">{role}</p>
      <h3 className="font-script mb-3 text-4xl md:text-5xl" style={{ color: 'var(--wedding-primary)' }}>
        {person.name}
      </h3>

      {person.description && (
        <p className="font-heading mb-4 text-base italic opacity-70">{person.description}</p>
      )}

      {person.parents && person.parents.length > 0 && (
        <div className="mt-2">
          <p className="section-label mb-2 opacity-50">{person.parentLabel ?? 'Child of'}</p>
          {person.parents.map((parent) => (
            <p key={parent} className="font-heading text-sm opacity-80">
              {parent}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function FilmPersonCard({ role, person }: PersonCardProps) {
  return (
    <article className="film-person-card film-person-card--circle">
      {person.photo && (
        <div
          className="film-person-card__portrait cinematic-portrait mx-auto mb-4 h-36 w-36 border-2 p-1.5 sm:h-40 sm:w-40"
          style={{ borderColor: 'var(--wedding-secondary)' }}
        >
          <img
            src={publicUrl(person.photo)}
            alt={person.name}
            className="cinematic-portrait__img h-full w-full rounded-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <h3 className="film-person-card__circle-name font-heading">{person.name}</h3>
      <p className="section-label mt-2 mb-3 opacity-55">{role}</p>
      {person.description && (
        <p className="film-person-card__circle-copy font-heading text-[0.9rem] italic leading-relaxed opacity-75">
          {person.description}
        </p>
      )}
      {person.parents && person.parents.length > 0 && (
        <div className="film-person-card__circle-family mt-5 border-t border-[color-mix(in_srgb,var(--wedding-secondary)_30%,transparent)] pt-4">
          <p className="section-label mb-2 opacity-45">{person.parentLabel ?? 'Child of'}</p>
          {person.parents.map((parent) => (
            <p key={parent} className="font-heading text-[0.82rem] leading-snug opacity-85">
              {parent}
            </p>
          ))}
        </div>
      )}
    </article>
  )
}

interface CoupleSectionProps {
  groom: PersonInfo
  bride: PersonInfo
  labels?: SectionLabels
  presentation?: 'default' | 'film'
}

export function CoupleSection({ groom, bride, labels, presentation = 'film' }: CoupleSectionProps) {
  if (presentation === 'film') {
    return (
      <section className="film-section w-full pb-4 pt-0 sm:pb-6 sm:pt-2">
        <header className="film-couple-intro text-center">
          <p className="section-label mb-2 opacity-60">{labels?.coupleSubtitle ?? 'Introducing'}</p>
          <h2
            className="film-chapter-intro__title font-heading"
            style={{ color: 'var(--wedding-primary)' }}
          >
            {labels?.coupleTitle ?? 'The Couple'}
          </h2>
          <div className="film-chapter-intro__line" aria-hidden="true" />
        </header>

        <div className="film-couple-stage">
          <FilmPersonCard role={labels?.groomRole ?? 'The Groom-to-be'} person={groom} />
          <div className="film-couple-ornament font-script" aria-hidden="true">&</div>
          <FilmPersonCard role={labels?.brideRole ?? 'The Bride-to-be'} person={bride} />
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">{labels?.coupleSubtitle ?? 'Introducing'}</p>
        <h2
          className="font-heading mb-8 text-2xl font-light tracking-wide md:text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          {labels?.coupleTitle ?? 'The Couple'}
        </h2>
      </div>

      <FloralDivider />

      <div className="flex flex-col gap-12 py-8">
        <PersonCard role={labels?.groomRole ?? 'The Groom'} person={groom} />
        <FloralDivider />
        <PersonCard role={labels?.brideRole ?? 'The Bride'} person={bride} />
      </div>
    </section>
  )
}
