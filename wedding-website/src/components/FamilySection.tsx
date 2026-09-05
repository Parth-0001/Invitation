import type { FamilyGroup } from '../types/wedding'
import { FloralDivider } from './DecorativeElements'

interface FamilySectionProps {
  groups: FamilyGroup[]
}

export function FamilySection({ groups }: FamilySectionProps) {
  if (groups.length === 0) return null

  return (
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">With Love</p>
        <h2
          className="font-heading mb-2 text-2xl font-light tracking-wide md:text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          Our Families
        </h2>
      </div>

      <FloralDivider />

      <div className="flex flex-col gap-10 py-6">
        {groups.map((group) => (
          <div key={group.side} className="text-center">
            <h3
              className="font-script mb-4 text-3xl"
              style={{ color: 'var(--wedding-primary)' }}
            >
              {group.heading ?? `The ${group.side}'s Family`}
            </h3>
            <div className="flex flex-col gap-2">
              {group.members.map((member) => (
                <p key={member} className="font-heading text-sm opacity-80">
                  {member}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
