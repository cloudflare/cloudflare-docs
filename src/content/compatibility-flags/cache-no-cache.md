---
name: "Enable `cache: no-cache` HTTP standard API"
sort_date: "2025-08-07"
enable_date: "2025-08-07"
enable_flag: "cache_no_cache_enabled"
disable_flag: "cache_no_cache_disabled"
---

When you enable the `cache_no_cache_enabled` compatibility flag, you can specify the `no-cache`
value for the `cache` property of the Request interface. When this compatibility flag is not
enabled, or `cache_option_disabled` is set, the Workers runtime will throw a `TypeError` saying
`Unsupported cache mode: no-cache`.

When this flag is enabled you can instruct Cloudflare to force its cache to revalidate the
response from a subrequest you make from your Worker using the [`fetch()`
API](/workers/runtime-apis/fetch/):

When `no-cache` is specified:

- All requests have the headers `Pragma: no-cache` and `Cache-Control: no-cache` are set on them.

- Subrequests to origins not hosted by Cloudflare force Cloudflare's cache to revalidate with the
  origin.

Revalidating with the origin means that the Worker request will first look for a match in Cloudflare's cache, then:

- If there is a match, a conditional request is sent to the origin, regardless of whether or not the match is fresh or stale. If the resource has not changed, the
  cached version is returned. If the resource has changed, it will be downloaded from the origin, updated in the cache, and returned.
- If there is no match, Workers will make a standard request to the origin and cache the response.

Examples using `cache: 'no-cache'`:

```js
const response = await fetch("https://example.com", { cache: "no-cache" });
```

The cache value can also be set on a `Request` object.

```js
const request = new Request("https://example.com", { cache: "no-cache" });
const response = await fetch(request);
```
