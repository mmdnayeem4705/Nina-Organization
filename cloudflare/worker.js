/**
 * Cloudflare Worker — edge proxy to Spring Boot backend
 * Deploy: npx wrangler deploy
 * Set secret: wrangler secret put BACKEND_URL
 */
export default {
  async fetch(request, env) {
    const backend = env.BACKEND_URL
    if (!backend) {
      return new Response(JSON.stringify({ error: 'BACKEND_URL not configured' }), { status: 503 })
    }

    const url = new URL(request.url)
    const target = new URL(backend)
    target.pathname = url.pathname
    target.search = url.search

    const headers = new Headers(request.headers)
    headers.set('Host', new URL(backend).host)

    return fetch(target.toString(), {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    })
  },
}
