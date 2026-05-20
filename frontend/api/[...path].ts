import type { VercelRequest, VercelResponse } from '@vercel/node'

/** Proxies /api/* to Spring Boot (set BACKEND_URL on Vercel). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const backend = process.env.BACKEND_URL
  if (!backend) {
    return res.status(503).json({ success: false, message: 'BACKEND_URL not set on Vercel' })
  }

  const segments = req.query.path
  const path = Array.isArray(segments) ? segments.join('/') : segments || ''
  const url = new URL(`${backend.replace(/\/$/, '')}/api/${path}`)

  Object.entries(req.query).forEach(([key, val]) => {
    if (key === 'path' || val === undefined) return
    url.searchParams.set(key, Array.isArray(val) ? val.join(',') : String(val))
  })

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (req.headers.authorization) headers.Authorization = String(req.headers.authorization)
  const contentType = req.headers['content-type']
  if (contentType) headers['Content-Type'] = String(contentType)

  let body: string | undefined
  if (req.method && !['GET', 'HEAD'].includes(req.method)) {
    body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {})
  }

  try {
    const upstream = await fetch(url.toString(), { method: req.method, headers, body })
    const ct = upstream.headers.get('content-type') || 'application/json'
    res.setHeader('Content-Type', ct)
    res.status(upstream.status)
    if (ct.includes('json')) return res.json(await upstream.json())
    return res.send(await upstream.text())
  } catch (e) {
    console.error(e)
    return res.status(502).json({ success: false, message: 'Backend unreachable' })
  }
}
