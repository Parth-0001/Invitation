import type { InvitationMessage } from '../types/wedding'

interface MessageSectionProps {
  message: InvitationMessage
  presentation?: 'default' | 'film'
}

export function MessageSection({ message, presentation = 'film' }: MessageSectionProps) {
  if (presentation === 'film') {
    return (
      <section className="section-padding py-10">
        <div className="film-quote-card">
          <div className="film-quote-card__corner film-quote-card__corner--tl" aria-hidden="true" />
          <div className="film-quote-card__corner film-quote-card__corner--br" aria-hidden="true" />
          <p className="section-label mb-4 opacity-75">{message.heading}</p>
          {message.scriptHeading && (
            <p className="font-script mb-3 text-4xl leading-tight opacity-95">{message.scriptHeading}</p>
          )}
          <div className="film-quote-card__divider" aria-hidden="true" />
          <p className="font-heading mx-auto max-w-[17rem] whitespace-pre-line text-lg leading-relaxed font-light">
            {message.message}
          </p>
          {message.image && (
            <div className="mx-auto mt-8 max-w-xs overflow-hidden rounded-2xl">
              <img src={message.image} alt="" className="w-full object-cover" loading="lazy" />
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section
      className="film-section py-10 text-center sm:py-16"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--wedding-accent) 92%, black)',
        color: 'white',
      }}
    >
      <p className="section-label mb-4 opacity-80">{message.heading}</p>
      {message.scriptHeading && (
        <p className="font-script mb-2 text-3xl md:text-4xl opacity-95">{message.scriptHeading}</p>
      )}
      <p className="font-heading mx-auto max-w-xs whitespace-pre-line text-lg leading-relaxed font-light opacity-90">
        {message.message}
      </p>
    </section>
  )
}
