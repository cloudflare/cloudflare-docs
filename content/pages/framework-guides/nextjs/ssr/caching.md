---
pcx_content_type: reference
title: Caching
meta:
  title: Caching and data revalidation in your Next.js app
---


# Caching and data revalidation

`@cloudflare/next-on-pages` comes with support for data revalidation and caching for fetch requests. This is done in our router and acts as an extension to Next.js' built-in functionality.

Caching in Next.js applications (thus applications built using `@cloudflare/next-on-pages` as well) is enabled by default. If you wish to opt-out of this caching please refer to the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/caching#opting-out-1).

Cache is persisted across deployments, which mirrors the [Next.js documented behavior](https://nextjs.org/docs/app/building-your-application/caching#data-cache). You are responsible for revalidating/purging this cache. It is not handled for you by `@cloudflare/next-on-pages` or Cloudflare Pages.

## Storage Options

There are currently two different storage options that `@cloudflare/next-on-pages` supports, the Cache API and Workers KV.

In the future, support will be available for creating custom cache interfaces and using different bindings.

### Workers KV (recommended)

[Workers KV](/kv/) is a low-latency key-value store that is ideal for storing data that should be globally distributed. KV is eventually consistent, which means that it will take up to 60 seconds for updates to be reflected globally.

Contrary to the Vercel Data Cache and [Workers Cache API](#cache-api), the KV storage is global (and not regional), this naturally changes the data availability and the effect of operations such as the on-demand revalidation.

To use Workers KV for caching all you need to do is to [add a KV binding](/pages/functions/bindings/#kv-namespaces) to your Pages project with the name `__NEXT_ON_PAGES__KV_SUSPENSE_CACHE`.

We recommend KV as a caching solution because it offers the same performance benefits, but is easier to inspect the cache content and purge or invalidate outdated entries.

### Cache API

The [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) is a per data-center cache that is ideal for storing data that is not required to be accessible globally.

It is worth noting that Vercel's Data Cache is regional (and not global) the same applies to Workers Cache API, so with this storage option there is no difference in terms of data availability. This includes cache related operations such as the [Next.js' on-demand revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation).