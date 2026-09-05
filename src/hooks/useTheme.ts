import { useEffect } from 'react'
import type { WeddingTheme } from '../types/wedding'

const FONT_MAP: Record<string, string> = {
  'Cormorant Garamond': "'Cormorant Garamond', Georgia, serif",
  Montserrat: "'Montserrat', system-ui, sans-serif",
  'Great Vibes': "'Great Vibes', cursive",
  'Playfair Display': "'Playfair Display', Georgia, serif",
  'Dancing Script': "'Dancing Script', cursive",
}

function resolveFont(fontName: string): string {
  return FONT_MAP[fontName] ?? `'${fontName}', serif`
}

export function useTheme(theme: WeddingTheme): void {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--wedding-primary', theme.primaryColor)
    root.style.setProperty('--wedding-secondary', theme.secondaryColor)
    root.style.setProperty('--wedding-accent', theme.accentColor)
    root.style.setProperty('--wedding-bg', theme.backgroundColor)
    root.style.setProperty('--wedding-text', theme.textColor)
    root.style.setProperty('--font-heading', resolveFont(theme.headingFont))
    root.style.setProperty('--font-body', resolveFont(theme.bodyFont))
    root.style.setProperty('--font-script', resolveFont(theme.scriptFont))
    document.body.style.backgroundColor = theme.backgroundColor
    document.body.style.color = theme.textColor
  }, [theme])
}

export function getGoogleMapsUrl(
  latitude?: number | null,
  longitude?: number | null,
  address?: string,
  googleMapsUrl?: string,
): string {
  if (googleMapsUrl) return googleMapsUrl
  if (latitude != null && longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
  }
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  }
  return 'https://maps.google.com'
}

export function getGoogleMapsEmbedUrl(
  latitude?: number | null,
  longitude?: number | null,
  address?: string,
): string {
  if (latitude != null && longitude != null) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
  }
  if (address) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
  }
  return ''
}
