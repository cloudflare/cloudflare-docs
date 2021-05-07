---
order: 1000
type: example
summary: Determine how to cache a resource by setting TTLs, custom cache keys, and cache headers in a fetch request.
tags:
  - API
  - JAMstack
---

# Cache using fetch

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
async function handleRequest(request) {
  const url = new URL(request.url)

  // Only use the path for the cache key, removing query strings
  // and always store using HTTPS e.g. https://www.example.com/file-uri-here
  const someCustomKey = `https://${url.hostname}${url.pathname}`

  let response = await fetch(request, {
    cf: {
      // Always cache this fetch regardless of content type
      // for a max of 5 seconds before revalidating the resource
      cacheTtl: 5,
      cacheEverything: true,
      //Enterprise only feature, see Cache API for other plans
      cacheKey: someCustomKey,
    },
  })
  // Reconstruct the Response object to make its headers mutable.
  response = new Response(response.body, response)

  // Set cache control headers to cache on browser for 25 minutes
  response.headers.set("Cache-Control", "max-age=1500")
  return response
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
```

--------------------------------

<ContentColumn>

## Caching HTML resources

```js
// Force Cloudflare to cache an asset
fetch(event.request, { cf: { cacheEverything: true } })
```
Setting the cache level to Cache Everything will override the default "cacheability" of the asset. For TTL, Cloudflare will still rely on headers set by the origin.

## Custom cache keys

<Aside>

__Note:__ This feature is available only to enterprise customers.

</Aside>

A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both. For more about cache keys see Using Custom Cache Keys support article.

```js
// Set cache key for this request to "some-string".
fetch(event.request, { cf: { cacheKey: "some-string" } })
```

Normally, Cloudflare computes the cache key for a request based on the request's URL. Sometimes, though, you'd like different URLs to be treated as if they were the same for caching purposes. For example, say your web site content is hosted from both Amazon S3 and Google Cloud Storage - you have the same content in both places, and you use a Worker to randomly balance between the two. However, you don't want to end up caching two copies of your content. You could utilize custom cache keys to cache based on the original request URL rather than the subrequest URL:

```js
addEventListener("fetch", (event) => {
  let url = new URL(event.request.url)
  if (Math.random() < 0.5) {
    url.hostname = "example.s3.amazonaws.com"
  }
  else {
    url.hostname = "example.storage.googleapis.com"
  }

  let request = new Request(url, event.request)
  event.respondWith(
    fetch(request, {
      cf: { cacheKey: event.request.url },
    })
  )
})
```

Remember, Workers operating on behalf of different zones cannot affect each other's cache. You can only override cache keys when making requests within your own zone (in the above example `event.request.url` was the key stored), or requests to hosts that are not on Cloudflare. When making a request to another Cloudflare zone (e.g. belonging to a different Cloudflare customer), that zone fully controls how its own content is cached within Cloudflare; you cannot override it.

## Override based on origin response code

<Aside>

__Note:__ This feature is available only to enterprise customers.

</Aside>

```js
// Force response to be cached for 86400 seconds for 200 status
// codes, 1 second for 404, and do not cache 500 errors.
fetch(request, {
  cf: { cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 } },
})
```

This option is a version of the cacheTtl feature which chooses a TTL based on the response's status code and does not automatically set `cacheEverything: true`. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache directives sent by the origin.

### TTL interpretation

<Definitions>

- __Positive values__
  - Indicate in seconds how long Cloudflare should cache the asset for.

- __`0`__
  - The asset will get cached but expire immediately (revalidate from origin every time).

- __`-1` or any negative value__
  - will instruct Cloudflare not to cache at all.

</Definitions>

</ContentColumn>
