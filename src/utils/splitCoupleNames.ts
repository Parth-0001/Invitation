/** Split "Parth & Janvi" into two lines; returns null if no ampersand pair. */
export function splitCoupleDisplayNames(displayNames: string): { first: string; second: string } | null {
  const parts = displayNames.split(/\s*&\s*/)
  if (parts.length !== 2) return null
  const first = parts[0].trim()
  const second = parts[1].trim()
  if (!first || !second) return null
  return { first, second }
}
