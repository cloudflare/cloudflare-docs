export async function onRequestGet() {
  const schemaUrl = "https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json"

  const req = new Request(schemaUrl)

  const cache = caches.default
  let response = await cache.match(req)

  if (!response) {
    response = await fetch(req)
    let schema = await response.json()

    const pathsByTag = {}

    Object.keys(schema.paths).forEach(key => {
      const path = schema.paths[key]
      const tag = Object.values(path)[0].tags[0]
      if (!pathsByTag[tag]) pathsByTag[tag] = []
      pathsByTag[tag].push({ path, key })
    })

    const sortedPaths = {}
    const sortedTags = Object.keys(pathsByTag).sort()
    sortedTags.forEach(tag => {
      const tagArray = pathsByTag[tag]
      tagArray.forEach(({ key, path }) => {
        if (sortedPaths[key]) console.log('key already exists')
        sortedPaths[key] = path
      })
    })

    let sortedSchema = Object.assign({}, schema, { paths: sortedPaths })

    response = new Response(JSON.stringify(sortedSchema), {
      headers: { 'Content-type': 'application/json' }
    })
  }

  return response
}
