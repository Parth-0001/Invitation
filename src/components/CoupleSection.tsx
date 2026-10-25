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

function FilmPersonCard({ role, person, index }: PersonCardProps & { index: number }) {
  return (
    <article className={`film-person-card film-person-card--${index % 2 === 0 ? 'a' : 'b'}`}>
      {person.photo && (
        <div className="film-person-card__visual">
          <img src={publicUrl(person.photo)} alt={person.name} loading="lazy" />
          <div className="film-person-card__visual-shade" />
          <p className="film-person-card__role section-label">{role}</p>
          <h3 className="film-person-card__name font-script">{person.name}</h3>
        </div>
      )}
      <div className="film-person-card__body">
        {person.description && (
          <p className="font-heading text-sm italic leading-relaxed opacity-80">{person.description}</p>
        )}
        {person.parents && person.parents.length > 0 && (
          <div className="mt-4 border-t border-[color-mix(in_srgb,var(--wedding-secondary)_35%,transparent)] pt-4">
            <p className="section-label mb-2 opacity-45">{person.parentLabel ?? 'Child of'}</p>
            {person.parents.map((parent) => (
              <p key={parent} className="font-heading text-sm opacity-85">
                {parent}
              </p>
            ))}
          </div>
        )}
      </div>
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
      <section className="film-section pb-4 pt-0 sm:pb-6 sm:pt-2">
        <div className="film-couple-stage">
          <FilmPersonCard
            index={0}
            role={labels?.groomRole ?? 'The Groom-to-be'}
            person={groom}
          />
          <div className="film-couple-ornament font-script" aria-hidden="true">&</div>
          <FilmPersonCard
            index={1}
            role={labels?.brideRole ?? 'The Bride-to-be'}
            person={bride}
          />
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
