import { Link, useParams } from 'react-router-dom'
import { getWeddingBySlug } from '../data'
import { WeddingPageContent } from '../components/WeddingPageContent'

export function WeddingPage() {
  const { slug } = useParams<{ slug: string }>()
  const data = slug ? getWeddingBySlug(slug) : undefined

  if (!data) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-script text-4xl text-[#8b2942]">Invitation not found</p>
        <p className="mt-4 text-sm opacity-60">
          The invitation you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-[#8b2942] px-6 py-3 text-sm text-white"
        >
          Go Home
        </Link>
      </div>
    )
  }

  return <WeddingPageContent data={data} />
}
