# Cache

## Background

The Cache API allows fine grained control of reading and writing from cache, and deciding exactly when to fetch data from your origin.

For each individual zone, the Cloudflare Workers runtime exposes a single global cache object: `caches.default`. Though this cache object persists on all of Cloudflare’s data centers, objects are not replicated to any other data centers.

The Service Workers Cache API is currently unimplemented in the Cloudflare Workers Preview. Cache API operations in the preview will have no impact. You must deploy the Worker on a zone to test cache operations.

<Aside>

__Note:__ This individualized zone cache object differs from Cloudflare’s Global CDN, for details see: [How the Cache Works](/learning/how-the-cache-works).

</Aside>

--------------------------------

## Constructor

```js
let cache = caches.default
```

This API is strongly influenced by the web browsers’ Cache API, but there are some important differences. For instance, Cloudflare Workers runtime exposes a single global cache object.

--------------------------------

## Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

<Definitions>

- `Cache-Control`
    - Controls caching directives. This is consistent with [Cloudflare Cache-Control Directives](https://support.cloudflare.com/hc/en-us/articles/115003206852-Origin-Cache-Control#h_4250342181031546894839080).
- `Cache-Tag`
    -  Allows resource purging by tag(s) later (Enterprise only).
- `ETag`
    - Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
- `Expires` <Type>string</Type>
    - A string that specifies when the resource becomes invalid.
- `Last-Modified`
    - Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

</Definitions>

This differs from the web browser Cache API as they do not honor any headers on the request or response.

<Aside>

__Note:__ Responses with `Set-Cookie` headers are never cached, because this sometimes indicates that the response contains unique data. To store a response with a `Set-Cookie` header, either delete that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.

Use the `Cache-Control` method to store the response without the `Set-Cookie` header.

</Aside>

--------------------------------

## Methods

### Put

```js
cache.put(request, response)
```

<Definitions>

- <Code>put(request, response)</Code> <Type>Promise</Type>

    - Adds to the cache a response keyed to the given request. Returns a promise that resolves to `undefined` once the cache stores the response.

</Definitions>

#### Parameters

<Definitions>

- `request` <Type>string</Type> | <TypeLink href="/runtime-apis/request">Request</TypeLink>
    - Either a string or a [`Request`](/runtime-apis/request) object to serve as the key. If a string is passed, it is interpreted as the URL for a new Request object.

- `response` <TypeLink href="/runtime-apis/response">Response</TypeLink>
    -  A [`Response`](/runtime-apis/response) object to store under the given key.

</Definitions>

#### Invalid parameters

`cache.put` throws an error if:
  - the `request` passed is a method other than `GET`
  - the `response` passed is a `status` of [`206 Partial Content`](https://httpstatuses.com/206)
  - the `response` passed contains the header `Vary: *` (required by the Cache API specification)

### `Match`

```js
cache.match(request, options)
```

<Definitions>

- <Code>match(request, options)</Code> <TypeLink href="/runtime-apis/response">Promise{`<Response>`}</TypeLink>

    - Returns a promise wrapping the response object keyed to that request.

</Definitions>

#### Parameters

<Definitions>

- `request` <Type>string</Type> | <TypeLink href="/runtime-apis/request">Request</TypeLink>

    - The string or [`Request`](/runtime-apis/request) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

- `options`
    -  Can contain one possible property: `ignoreMethod` (Boolean) Consider the request method a GET regardless of its actual value.

</Definitions>

Unlike the browser Cache API, Cloudflare Workers do not support the `ignoreSearch` or `ignoreVary` options on `match()`. You can accomplish this behavior by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

<Definitions>

- `Range`
    - Results in a `206` response if a matching response is found. Your Cloudflare cache always respects range requests, even if an `Accept-Ranges` header is on the response.

- `If-Modified-Since`
    - Results in a `304` response if a matching response is found with a `Last-Modified` header with a value after the time specified in `If-Modified-Since`.

- `If-None-Match`
    - Results in a `304` response if a matching response is found with an `ETag` header with a value that matches a value in `If-None-Match`.

- `cache.match()`
    - Never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns is fulfilled with `undefined`.

</Definitions>

### `Delete`

```js
cache.delete(request, options)
```

<Definitions>

- <Code>delete(request, options)</Code> <TypeLink href="/runtime-apis/response">Promise{`<boolean>`}</TypeLink>

</Definitions>

Deletes the `Response` object from the cache and returns a `Promise` for a Boolean response:

- `true`: The response was cached but is now deleted
- `false`: The response was not in the cache at the time of deletion.

#### Parameters

<Definitions>

- `request` <Type>string</Type> | <TypeLink href="/runtime-apis/request">Request</TypeLink>

    - The string or [`Request`](/runtime-apis/request) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

<!-- What type is this? -->
- `options`
    -  Can contain one possible property: `ignoreMethod` (Boolean) Consider the request method a GET regardless of its actual value.

</Definitions>

--------------------------------

## See also

- [How the Cache works](/learning/how-the-cache-works)
- [Configure your CDN](/tutorials/configure-your-cdn)
- [Example: using the Cache API](/examples/cache-api)
- [Example: caching POST requests](/examples/cache-post-request)
