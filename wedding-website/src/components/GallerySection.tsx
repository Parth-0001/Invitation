import { useCallback, useEffect, useRef, useState } from 'react'
import type { GalleryPhoto } from '../types/wedding'
import { FloralDivider } from './DecorativeElements'

interface LightboxProps {
  photos: GalleryPhoto[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const touchStartX = useRef(0)

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % photos.length)
  }, [photos.length])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev()
      else goNext()
    }
  }

  const photo = photos[index]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
        aria-label="Close"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white md:left-6"
        aria-label="Previous photo"
      >
        ‹
      </button>

      <div
        className="flex max-h-[90dvh] max-w-[95vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={photo.url}
          alt={photo.alt ?? `Photo ${index + 1}`}
          className="max-h-[80dvh] max-w-full object-contain"
        />
        {photo.caption && (
          <p className="mt-3 text-center text-sm text-white/80">{photo.caption}</p>
        )}
        <p className="mt-2 text-xs text-white/50">
          {index + 1} / {photos.length}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white md:right-6"
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  )
}

interface GallerySectionProps {
  heading?: string
  photos: GalleryPhoto[]
  videos: import('../types/wedding').GalleryVideo[]
}

export function GallerySection({ heading, photos, videos }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (photos.length === 0 && videos.length === 0) return null

  return (
    <section className="section-padding py-14">
      <div className="text-center">
        <p className="section-label mb-2 opacity-60">Memories</p>
        <h2
          className="font-heading mb-2 text-2xl font-light tracking-wide md:text-3xl"
          style={{ color: 'var(--wedding-primary)' }}
        >
          {heading ?? 'Photos & Videos'}
        </h2>
      </div>

      <FloralDivider />

      <div className="grid grid-cols-2 gap-2 py-6 md:gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl"
          >
            <img
              src={photo.url}
              alt={photo.alt ?? 'Wedding photo'}
              className="h-full w-full object-cover transition-transform duration-300 group-active:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-active:bg-black/10" />
          </button>
        ))}
      </div>

      {videos.length > 0 && (
        <div className="flex flex-col gap-4">
          {videos.map((video) => (
            <div key={video.id} className="relative overflow-hidden rounded-xl">
              {video.type === 'embed' ? (
                <iframe
                  src={video.url}
                  title={video.title ?? 'Wedding video'}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.url}
                  poster={video.thumbnail}
                  controls
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
