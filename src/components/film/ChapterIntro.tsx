interface ChapterIntroProps {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function ChapterIntro({ title, subtitle, align = 'center' }: ChapterIntroProps) {
  return (
    <header className={`film-chapter-intro ${align === 'left' ? 'text-left' : 'text-center'}`}>
      <h2 className="film-chapter-intro__title font-heading">{title}</h2>
      {subtitle && <p className="film-chapter-intro__subtitle section-label">{subtitle}</p>}
      <div className="film-chapter-intro__line" aria-hidden="true" />
    </header>
  )
}
