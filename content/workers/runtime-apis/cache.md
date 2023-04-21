---
pcx_content_type: configuration
title: Cache
---

# Cache

## Background

The [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) allows fine grained control of reading and writing from the [Cloudflare global network](https://www.cloudflare.com/network/) cache.

The Cache API is available globally but the contents of the cache do not replicate outside of the originating data center. A `GET /users` response can be cached in the originating data center, but will not exist in another data center unless it has been explicitly created.

{{<Aside type="warning" header="Tiered caching">}}

The `cache.put` method is not compatible with tiered caching. Refer to [Cache API](/workers/learning/how-the-cache-works/#cache-api) for more information. To perform tiered caching, use the [fetch API](/workers/learning/how-the-cache-works/#interacting-with-the-cloudflare-cache).

{{</Aside>}}

However, any Cache API operations in the Cloudflare Workers dashboard editor, [Playground](/workers/learning/playground/) previews, and any `*.workers.dev` deployments will have no impact. For Workers fronted by [Cloudflare Access](https://www.cloudflare.com/teams/access/), the Cache API is not currently available. Only Workers deployed to custom domains have access to functional `cache` operations.

{{<Aside type="note">}}

This individualized zone cache object differs from Cloudflare’s Global CDN. For details, refer to [How the Cache Works](/workers/learning/how-the-cache-works/).

{{</Aside>}}

---

## Accessing Cache

The `caches.default` API is strongly influenced by the web browsers’ Cache API, but there are some important differences. For instance, Cloudflare Workers runtime exposes a single global cache object.

```js
let cache = caches.default;
await cache.match(request);
```

You may create and manage additional Cache instances via the [`caches.open`](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open) method.

```js
let myCache = await caches.open('custom:cache');
await myCache.match(request);
```

---

## Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

{{<definitions>}}

- `Cache-Control`
  - Controls caching directives. This is consistent with [Cloudflare Cache-Control Directives](/cache/about/cache-control#cache-control-directives). Refer to [Edge TTL](/cache/how-to/configure-cache-status-code#edge-ttl) for a list of HTTP response codes and their TTL when `Cache-Control` directives are not present.
- `Cache-Tag`
  - Allows resource purging by tag(s) later (Enterprise only).
- `ETag`
  - Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
- `Expires` {{<type>}}string{{</type>}}
  - A string that specifies when the resource becomes invalid.
- `Last-Modified`
  - Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

{{</definitions>}}

This differs from the web browser Cache API as they do not honor any headers on the request or response.

{{<Aside type="note">}}

Responses with `Set-Cookie` headers are never cached, because this sometimes indicates that the response contains unique data. To store a response with a `Set-Cookie` header, either delete that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.

Use the `Cache-Control` method to store the response without the `Set-Cookie` header.

{{</Aside>}}

---

## Methods

### Put

```js
cache.put(request, response);
```

{{<definitions>}}

- {{<code>}}put(request, response){{</code>}} {{<type>}}Promise{{</type>}}

  - Attempts to add a response to the cache, using the given request as the key. Returns a promise that resolves to `undefined` regardless of whether the cache successfully stored the response.

{{</definitions>}}

{{<Aside type="note">}}

The `stale-while-revalidate` and `stale-if-error` directives are not supported when using the `cache.put` or `cache.match` methods.

{{</Aside>}}

#### Parameters

{{<definitions>}}

- `request` {{<type>}}string{{</type>}} | {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}}

  - Either a string or a [`Request`](/workers/runtime-apis/request/) object to serve as the key. If a string is passed, it is interpreted as the URL for a new Request object.

- `response` {{<type-link href="/runtime-apis/response">}}Response{{</type-link>}}
  - A [`Response`](/workers/runtime-apis/response/) object to store under the given key.

{{</definitions>}}

#### Invalid parameters

`cache.put` will throw an error if:

- the `request` passed is a method other than `GET`.
- the `response` passed has a `status` of [`206 Partial Content`](https://www.webfx.com/web-development/glossary/http-status-codes/what-is-a-206-status-code/).
- the `response` passed contains the header `Vary: *`. The value of the `Vary` header is an asterisk (`*`). Refer to the [Cache API specification](https://w3c.github.io/ServiceWorker/#cache-put) for more information.

#### Errors

`cache.put` returns a `413` error if `Cache-Control` instructs not to cache or if the response is too large.

### `Match`

```js
cache.match(request, options);
```

{{<definitions>}}

- {{<code>}}match(request, options){{</code>}} {{<type-link href="/runtime-apis/response">}}Promise{`<Response | undefined>`}{{</type-link>}}

  - Returns a promise wrapping the response object keyed to that request.

{{</definitions>}}

{{<Aside type="note">}}

The `stale-while-revalidate` and `stale-if-error` directives are not supported when using the `cache.put` or `cache.match` methods.

{{</Aside>}}

#### Parameters

{{<definitions>}}

- `request` {{<type>}}string{{</type>}} | {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}}

  - The string or [`Request`](/workers/runtime-apis/request/) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

- `options`
  - Can contain one possible property: `ignoreMethod` (Boolean). When `true`, the request is considered to be a `GET` request regardless of its actual value.

{{</definitions>}}

Unlike the browser Cache API, Cloudflare Workers do not support the `ignoreSearch` or `ignoreVary` options on `match()`. You can accomplish this behavior by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

{{<definitions>}}

- `Range`

  - Results in a `206` response if a matching response with a Content-Length header is found. Your Cloudflare cache always respects range requests, even if an `Accept-Ranges` header is on the response.

- `If-Modified-Since`

  - Results in a `304` response if a matching response is found with a `Last-Modified` header with a value after the time specified in `If-Modified-Since`.

- `If-None-Match`

  - Results in a `304` response if a matching response is found with an `ETag` header with a value that matches a value in `If-None-Match`.

- `cache.match()`
  - Never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns is fulfilled with `undefined`.

{{</definitions>}}

#### Errors

`cache.match` generates a `504` error response when the requested content is missing or expired. The Cache API does not expose this `504` directly to the Worker script, instead returning `undefined`. Nevertheless, the underlying `504` is still visible in Cloudflare Logs.

If you use Cloudflare Logs, you may see these `504` responses with the `RequestSource` of `edgeWorkerCacheAPI`. Again, these are expected if the cached asset was missing or expired. Note that `edgeWorkerCacheAPI` requests are already filtered out in other views, such as Cache Analytics. To filter out these requests or to filter requests by end users of your website only, refer to [Filter end users](/analytics/graphql-api/features/filtering/#filter-end-users).

### `Delete`

```js
cache.delete(request, options);
```

{{<definitions>}}

- {{<code>}}delete(request, options){{</code>}} {{<type-link href="/runtime-apis/response">}}Promise{`<boolean>`}{{</type-link>}}

{{</definitions>}}

Deletes the `Response` object from the cache and returns a `Promise` for a Boolean response:

- `true`: The response was cached but is now deleted
- `false`: The response was not in the cache at the time of deletion.

{{<Aside type="warning" header="Global purges">}}

The `cache.delete` method only purges content of the cache in the data center that the Worker was invoked. For global purges, refer to [Purging assets stored with the Cache API](/workers/learning/how-the-cache-works/#purging-assets-stored-with-the-cache-api).

{{</Aside>}}

#### Parameters

{{<definitions>}}

- `request` {{<type>}}string{{</type>}} | {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}}

  - The string or [`Request`](/workers/runtime-apis/request/) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

- `options` {{<type>}}object{{</type>}}
  - Can contain one possible property: `ignoreMethod` (Boolean). Consider the request method a GET regardless of its actual value.

{{</definitions>}}

---

## Related resources

- [How the Cache works](/workers/learning/how-the-cache-works/)
- [Configure your CDN](/workers/tutorials/configure-your-cdn/)
- [Example: using the Cache API](/workers/examples/cache-api/)
- [Example: caching POST requests](/workers/examples/cache-post-request/)
