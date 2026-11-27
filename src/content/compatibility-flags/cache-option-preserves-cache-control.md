---
name: "`cache` option does not override the origin's `Cache-Control`"
sort_date: "2026-11-17"
enable_date: "2026-11-17"
enable_flag: "cache_option_preserves_cache_control"
disable_flag: "cache_option_overrides_cache_control"
---

When you enable the `cache_option_preserves_cache_control` compatibility flag, setting the `cache`
property of the Request interface to `no-cache` or `no-store` no longer overrides the
`Cache-Control` header of the origin's response when Cloudflare caches it.

Per the [Fetch standard](https://fetch.spec.whatwg.org/#concept-request-cache-mode), a request's
cache mode controls how the cache may use a stored response. It does not control how the response
may be cached:

- `no-cache` forces Cloudflare's cache to revalidate with the origin.
- `no-store` bypasses Cloudflare's cache.

Without this flag, `cache: 'no-cache'` also caches the response as if the origin had sent
`Cache-Control: no-cache`, and `cache: 'no-store'` as if it had sent `Cache-Control: no-store`.
For example, with `cache: 'no-cache'`, a response the origin marked `Cache-Control: no-store` is
cached as `no-cache`.

With this flag, the origin's `Cache-Control` is respected:

```js
// Revalidates with the origin; the response is cached according to the origin's Cache-Control.
const response = await fetch("https://example.com", { cache: "no-cache" });
```

To override the origin's `Cache-Control`, omit the `cache` option and set
[`cf.cacheControl`](/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties)
instead:

```js
const response = await fetch("https://example.com", {
	cf: { cacheControl: "no-cache" },
});
```
