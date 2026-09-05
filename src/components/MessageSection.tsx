import type { InvitationMessage } from '../types/wedding'
import { FloralDivider } from './DecorativeElements'

interface MessageSectionProps {
  message: InvitationMessage
}

export function MessageSection({ message }: MessageSectionProps) {
  return (
    <section
      className="section-padding py-16 text-center"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--wedding-accent) 92%, black)',
        color: 'white',
      }}
    >
      <p className="section-label mb-4 opacity-80">{message.heading}</p>

      {message.scriptHeading && (
        <p className="font-script mb-2 text-3xl md:text-4xl opacity-95">{message.scriptHeading}</p>
      )}

      <FloralDivider className="opacity-30 [&_.decorative-line]:bg-white/30" />

      <p className="font-heading mx-auto max-w-xs whitespace-pre-line text-lg leading-relaxed font-light opacity-90">
        {message.message}
      </p>

      {message.image && (
        <div className="mx-auto mt-8 max-w-xs overflow-hidden rounded-2xl">
          <img src={message.image} alt="" className="w-full object-cover" loading="lazy" />
        </div>
      )}
    </section>
  )
}
