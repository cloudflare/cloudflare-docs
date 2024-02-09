---
title: Revalidation and request collapsing
pcx_content_type: concept
---

# Revalidation and request collapsing

Revalidation is a caching mechanism that involves checking the [freshness](/cache/concepts/retention-vs-freshness/) of cached data before serving it to a client or user. If a cached object is no longer [fresh](/cache/concepts/retention-vs-freshness/#freshness-ttl) and Cloudflare receives a request for it, a request is made to the origin to revalidate the object in the Cloudflare cache.

## Example scenarios

Consider the following example scenarios.

### Example 1

One-thousand (1,000) requests arrive simultaneously at Cloudflare's network, and the requested resource was in Cloudflare but cannot be served because its TTL configuration indicates it is no longer fresh. This means that the resource needs to be served from the origin server. In this case, one request will go to the origin to be revalidated, while the other 999 requests will be served from cache with the status of [UPDATING](/cache/concepts/default-cache-behavior/#cloudflare-cache-responses). This means that the resource, although expired, is served stale from Cloudflare's cache, while the origin server is updating it. This behavior is defined by the [`stale-while-revalidate`](/cache/concepts/cache-control/#revalidation) directive in `cache-control`. If you do not wish to serve stale content, set the directive to zero seconds, `stale-while-revalidate=0`.

### Example 2

One-thousand (1,000) requests arrive simultaneously at a single Cloudflare data center, and the requested asset is not in Cloudflare's cache (a cache miss). These requests will use a {{<glossary-tooltip term_id="cache lock">}}cache lock{{</glossary-tooltip>}} to communicate with your origin. This means that only the first request will go to origin to fetch the asset. The remaining 999 requests wait for the first request to fetch the data, after which the response is [streamed](https://blog.cloudflare.com/introducing-concurrent-streaming-acceleration/) to all the waiting requests. The cache lock ensures that Cloudflare only sends the origin one request at a time for a given asset from a location in Cloudflare's network, preventing the origin from getting too much traffic.