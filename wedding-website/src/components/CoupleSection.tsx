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
        <div className="mb-5 overflow-hidden rounded-full border-2 p-1" style={{ borderColor: 'var(--wedding-secondary)' }}>
          <img
            src={publicUrl(person.photo)}
            alt={person.name}
            className="h-36 w-36 rounded-full object-cover md:h-40 md:w-40"
            loading="lazy"
          />
        </div>
      )}

      <p className="section-label mb-2 opacity-60">{role}</p>
      <h3
        className="font-script mb-3 text-4xl md:text-5xl"
        style={{ color: 'var(--wedding-primary)' }}
      >
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

interface CoupleSectionProps {
  groom: PersonInfo
  bride: PersonInfo
  labels?: SectionLabels
}

export function CoupleSection({ groom, bride, labels }: CoupleSectionProps) {
  return (
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">
          {labels?.coupleSubtitle ?? 'Introducing'}
        </p>
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
