---
name: "Enable `cache: no-store` HTTP standard API"
sort_date: "2024-11-11"
enable_date: "2024-11-11"
enable_flag: "cache_option_enabled"
disable_flag: "cache_option_disabled"
---

When you enable the `cache_option_enabled` compatibility flag, you can specify a value for the `cache` property of the Request interface.
When this compatibility flag is not enabled, or `cache_option_disabled` is set, the Workers runtime will throw an `Error` saying `The 'cache' field on
'RequestInitializerDict' is not implemented.`

When this flag is enabled you can instruct Cloudflare not to cache the response from a subrequest you make from your Worker using the [`fetch()` API](/workers/runtime-apis/fetch/):

The only cache option enabled with `cache_option_enabled` is `'no-store'`.
Specifying any other value will cause the Workers runtime to throw a `TypeError` with the message `Unsupported cache mode: <the-mode-you-specified>`.

When `no-store` is specified:

- All requests have the headers `Pragma: no-cache` and `Cache-Control: no-cache` are set on them.

- Subrequests to origins not hosted by Cloudflare bypass Cloudflare's cache.

Examples using `cache: 'no-store'`:

```js
const response = await fetch("https://example.com", { cache: "no-store" });
```

The cache value can also be set on a `Request` object.

```js
const request = new Request("https://example.com", { cache: "no-store" });
const response = await fetch(request);
```
