/** Resolve local public-folder paths for GitHub Pages subpath deployment. */
export function publicUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const normalized = path.startsWith('/') ? path.slice(1) : path
  const encoded = normalized.split('/').map((segment) => encodeURIComponent(segment)).join('/')
  return `${import.meta.env.BASE_URL}${encoded}`
}
