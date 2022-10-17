export async function onRequestGet() {
  const schemaUrl = "https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.yaml"

  const req = new Request(schemaUrl)

  const cache = caches.default
  let response = await cache.match(req)

  if (!response) {
    response = await fetch(req, {
      cf: {
        cacheTtl: 60,
        cacheEverything: true
      }
    })
  }

  return response
}
