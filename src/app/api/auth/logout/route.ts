const cookieFlags =
  `HttpOnly; Path=/; Max-Age=0; SameSite=Lax` +
  (process.env.NODE_ENV === 'production' ? '; Secure' : '')

export async function POST() {
  const res = Response.json({ ok: true })
  res.headers.set('Set-Cookie', `admin_token=; ${cookieFlags}`)
  return res
}
