/** Tiny shimmer placeholder for next/image `blurDataURL` on remote/unoptimized-at-build images. */
function shimmer(w: number, h: number) {
  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eef2fc" offset="20%" />
      <stop stop-color="#dbe3f8" offset="50%" />
      <stop stop-color="#eef2fc" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eef2fc" />
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`
}

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
