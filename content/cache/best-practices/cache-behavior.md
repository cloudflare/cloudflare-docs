---
title: Cache behavior
pcx_content_type: concept
---

# Cache behavior

In this page, we document how Cloudflare's cache system behaves in interaction with `HEAD` requests and with `Set-Cookie` response header.

## Interaction of `HEAD` requests with Cache

Cloudflare converts `HEAD` requests to `GET` requests for cacheable requests.

When you make a `HEAD` request for a cacheable resource and Cloudflare does not have that resource in the edge cache, a cache miss happens. Cloudflare will send a `GET` request to your origin, cache the full response and return the response headers only. Make sure the origin server is setup to handle `GET` requests, even if only `HEAD` requests are expected, so that compatibility with this behavior is ensured.

## Interaction of `Set-Cookie` response header with Cache

For non-cacheable requests, `Set-Cookie` is always preserved. For cacheable requests, there are three possible behaviors:

- `Set-Cookie` is returned from origin and the default cache level is used. If origin cache control is not enabled, Cloudflare removes the `Set-Cookie` and caches the asset. If origin cache control is enabled, Cloudflare does not cache the asset and preserves the `Set-Cookie`.

- `Set-Cookie` is returned from origin and the cache level is set to `Cache Everything`. In this case, Cloudflare preserves the `Set-Cookie` but does not cache the asset. A cache `MISS` will be returned every time.

- `Set-Cookie` is returned from origin, the cache level is set to `Cache Everything` and edge cache TTL is set. In this case, Cloudflare removes the `Set-Cookie` and the asset is cached.

> In this case, Cloudflare preserves the `Set-Cookie` but a cache `MISS` forever is returned, this means that the asset is not cached and `MISS` is returned every time.
