/**
 * Resolves an app-owned asset path against the deployment base URL
 * (`import.meta.env.BASE_URL`), so `/avatar/x.png` becomes `/portfolio/avatar/x.png`
 * on GitHub Pages but stays `/avatar/x.png` in local dev.
 *
 * External URLs (http/https), data URIs and mailto links pass through untouched.
 */
export function asset(path: string): string {
  if (!path) return path
  if (/^(https?:|data:|mailto:|tel:)/i.test(path)) return path
  const base = import.meta.env.BASE_URL // always ends with '/'
  return base + path.replace(/^\//, '')
}
