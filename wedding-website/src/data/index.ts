import type { WeddingData } from '../types/wedding'
import parthJanvi from './parth-janvi.json'

const weddings: Record<string, WeddingData> = {
  'parth-janvi': parthJanvi as WeddingData,
}

export function getWeddingBySlug(slug: string): WeddingData | undefined {
  return weddings[slug]
}

export function getAllWeddingSlugs(): string[] {
  return Object.keys(weddings)
}

export function getDefaultWedding(): WeddingData | undefined {
  const slug = Object.keys(weddings)[0]
  return slug ? weddings[slug] : undefined
}

export { weddings }
