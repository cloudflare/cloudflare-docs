---
pcx-content-type: configuration
---

# Cache

## Background

The [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) allows fine grained control of reading and writing from the [Cloudflare edge network](https://www.cloudflare.com/network/) cache.

The Cache API is available globally but the contents of the cache do not replicate outside of the originating data center. A `GET /users` response can be cached in the originating data center, but will not exist in another data center unless it has been explicitly created.

However, any Cache API operations in the Cloudflare Workers dashboard editor, [Playground](/learning/playground) previews, and any `*.workers.dev` deployments will have no impact. For Workers fronted by [Cloudflare Access](https://www.cloudflare.com/teams/access/), the Cache API is not currently available. Only Workers deployed to custom domains have access to functional `cache` operations.

<Aside type="note">

This individualized zone cache object differs from Cloudflare’s Global CDN. For details, refer to [How the Cache Works](/learning/how-the-cache-works).

</Aside>

***

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

***

## Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

<Definitions>

*   `Cache-Control`
    *   Controls caching directives. This is consistent with [Cloudflare Cache-Control Directives](https://developers.cloudflare.com/cache/about/cache-control#cache-control-directives). Refer to [Edge TTL](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code#edge-ttl) for a list of HTTP response codes and their TTL when `Cache-Control` directives are not present.
*   `Cache-Tag`
    *   Allows resource purging by tag(s) later (Enterprise only).
*   `ETag`
    *   Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
*   `Expires` <Type>string</Type>
    *   A string that specifies when the resource becomes invalid.
*   `Last-Modified`
    *   Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

</Definitions>

This differs from the web browser Cache API as they do not honor any headers on the request or response.

<Aside type="note">

Responses with `Set-Cookie` headers are never cached, because this sometimes indicates that the response contains unique data. To store a response with a `Set-Cookie` header, either delete that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.

Use the `Cache-Control` method to store the response without the `Set-Cookie` header.

</Aside>

***

## Methods

### Put

```js
cache.put(request, response)
```

<Definitions>

*   <Code>put(request, response)</Code> <Type>Promise</Type>

    *   Adds to the cache a response keyed to the given request. Returns a promise that resolves to `undefined` once the cache stores the response.

</Definitions>

<Aside type="note">

The `stale-while-revalidate` and `stale-if-error` directives are not supported when using the `cache.put` or `cache.match` methods.

</Aside>

#### Parameters

<Definitions>

*   `request` <Type>string</Type> | <TypeLink href="/runtime-apis/request">Request</TypeLink>
    *   Either a string or a [`Request`](/runtime-apis/request) object to serve as the key. If a string is passed, it is interpreted as the URL for a new Request object.

*   `response` <TypeLink href="/runtime-apis/response">Response</TypeLink>
    *   A [`Response`](/runtime-apis/response) object to store under the given key.

</Definitions>

#### Invalid parameters

`cache.put` will throw an error if:

*   the `request` passed is a method other than `GET`.
*   the `response` passed has a `status` of [`206 Partial Content`](https://httpstatuses.com/206).
*   the `response` passed contains the header `Vary: *` (required by the Cache API specification).

#### Errors

`cache.put` returns a `413` error if `Cache-Control` instructs not to cache or if the response is too large.

### `Match`

```js
cache.match(request, options)
```

<Definitions>

*   <Code>match(request, options)</Code> <TypeLink href="/runtime-apis/response">Promise{`<Response>`}</TypeLink>

    *   Returns a promise wrapping the response object keyed to that request.

</Definitions>

<Aside type="note">

The `stale-while-revalidate` and `stale-if-error` directives are not supported when using the `cache.put` or `cache.match` methods.

</Aside>

#### Parameters

<Definitions>

*   `request` <Type>string</Type> | <TypeLink href="/runtime-apis/request">Request</TypeLink>

    *   The string or [`Request`](/runtime-apis/request) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

*   `options`
    *   Can contain one possible property: `ignoreMethod` (Boolean). When `true`, the request is considered to be a `GET` request regardless of its actual value.

</Definitions>

Unlike the browser Cache API, Cloudflare Workers do not support the `ignoreSearch` or `ignoreVary` options on `match()`. You can accomplish this behavior by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

<Definitions>

*   `Range`
    *   Results in a `206` response if a matching response with a Content-Length header is found. Your Cloudflare cache always respects range requests, even if an `Accept-Ranges` header is on the response.

*   `If-Modified-Since`
    *   Results in a `304` response if a matching response is found with a `Last-Modified` header with a value after the time specified in `If-Modified-Since`.

*   `If-None-Match`
    *   Results in a `304` response if a matching response is found with an `ETag` header with a value that matches a value in `If-None-Match`.

*   `cache.match()`
    *   Never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns is fulfilled with `undefined`.

</Definitions>

#### Errors

`cache.match` returns a `504` error when the content is stale.

### `Delete`

```js
cache.delete(request, options)
```

<Definitions>

*   <Code>delete(request, options)</Code> <TypeLink href="/runtime-apis/response">Promise{`<boolean>`}</TypeLink>

</Definitions>

Deletes the `Response` object from the cache and returns a `Promise` for a Boolean response:

*   `true`: The response was cached but is now deleted
*   `false`: The response was not in the cache at the time of deletion.

#### Parameters

<Definitions>

*   `request` <Type>string</Type> | <TypeLink href="/runtime-apis/request">Request</TypeLink>

    *   The string or [`Request`](/runtime-apis/request) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

<!-- What type is this? -->

*   `options`
    *   Can contain one possible property: `ignoreMethod` (Boolean) Consider the request method a GET regardless of its actual value.

</Definitions>

***

## Related resources

*   [How the Cache works](/learning/how-the-cache-works)
*   [Configure your CDN](/tutorials/configure-your-cdn)
*   [Example: using the Cache API](/examples/cache-api)
*   [Example: caching POST requests](/examples/cache-post-request)
