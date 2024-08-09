---
pcx_content_type: reference
title: Caching
meta:
  title: Caching and data revalidation in your Next.js app
---

# Caching and data revalidation

[`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) supports [caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data) and [revalidating](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) data returned by subrequests you make in your app by calling [`fetch()`](/workers/runtime-apis/fetch/).

By default, all `fetch()` subrequests you make in your Next.js app are cached. Refer to the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/caching#opting-out-1) for information about how to disable caching for an individual subrequest, or for an entire route.

[The cache persists across deployments](https://nextjs.org/docs/app/building-your-application/caching#data-cache). You are responsible for revalidating/purging this cache.

## Storage options

You can configure your Next.js app to write cache entries to and read from either [Workers KV](/kv/) or the [Cache API](/workers/runtime-apis/cache/).

### Workers KV (recommended)

It takes an extra step to enable, but Cloudflare recommends caching data using [Workers KV](/kv/).

When you write cached data to Workers KV, you write to storage that can be read by any Cloudflare location. This means your app can fetch data, cache it in KV, and then subsequent requests anywhere around the world can read from this cache.

Note that Workers KV is eventually consistent, which means that it can take up to 60 seconds for updates to be reflected globally.

To use Workers KV as the cache for your Next.js app, [add a KV binding](/pages/functions/bindings/#kv-namespaces) to your Pages project, and set the name of the binding to `__NEXT_ON_PAGES__KV_SUSPENSE_CACHE`.

### Cache API (default)

The [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) is the default option for caching data in your Next.js app. You do not need to take any action to enable the Cache API.

In contrast with Workers KV, when you write data using the Cache API, data is only cached in the Cloudflare location that you are writing data from.