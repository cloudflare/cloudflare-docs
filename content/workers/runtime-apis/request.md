---
pcx_content_type: configuration
title: Request
meta:
  description: Interface that represents an HTTP request.
---

# Request

The [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) interface represents an HTTP request and is part of the [Fetch API](/workers/runtime-apis/fetch/).

## Background

The most common way you will encounter a `Request` object is as a property of an incoming request:

```js
---
highlight: [2]
---
export default {
	async fetch(request, env, ctx) { 
		return new Response('Hello World!');
	},
};
```

You may also want to construct a `Request` yourself when you need to modify a request object, because the incoming request parameter is immutable.

```js
export default {
	async fetch(request, env, ctx) { 
        const url = "https://example.com";
        const modifiedRequest = new Request(url, request);
		// ...
	},
};
```

The [`fetch() handler`](/workers/runtime-apis/handlers/fetch/) invokes the `Request` constructor. The [`RequestInit`](#options) and [`RequestInitCfProperties`](#the-cf-property-requestinitcfproperties) types defined below also describe the valid parameters that can be passed to the [`fetch() handler`](/workers/runtime-apis/handlers/fetch/).

---

## Constructor

```js
let request = new Request(input, options)
```

### Parameters

{{<definitions>}}

*   `input` {{<type>}}string | Request{{</type>}}

    *   Either a string that contains a URL, or an existing `Request` object.

*   `options` {{<type-link href="#options">}}options{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Optional options object that contains settings to apply to the `Request`.

{{</definitions>}}

#### `options`

An object containing properties that you want to apply to the request.

{{<definitions>}}

*   `cf` {{<type-link href="#the-cf-property-requestinitcfproperties">}}RequestInitCfProperties{{</type-link>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Cloudflare-specific properties that can be set on the `Request` that control how Cloudflare’s global network handles the request.

*   `method` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   The HTTP request method. The default is `GET`. In Workers, all [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) are supported, except for [`CONNECT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT).

*   `headers` {{<type>}}Headers{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

*   `body` {{<type>}}string | ReadableStream | FormData | URLSearchParams{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   The request body, if any.
    *   Note that a request using the GET or HEAD method cannot have a body.

*   `redirect` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   The redirect mode to use: `follow`, `error`, or `manual`. The default  for a new `Request` object is `follow`. Note, however, that the incoming `Request` property of a `FetchEvent` will have redirect mode `manual`.

{{</definitions>}}

#### The `cf` property (`RequestInitCfProperties`)

An object containing Cloudflare-specific properties that can be set on the `Request` object. For example:

```js
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```

Invalid or incorrectly-named keys in the `cf` object will be silently ignored. Consider using TypeScript and [`@cloudflare/workers-types`](https://github.com/cloudflare/workers-types) to ensure proper use of the `cf` object.

{{<definitions>}}

*   `apps` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Whether [Cloudflare Apps](https://www.cloudflare.com/apps/) should be enabled for this request. Defaults to `true`.

*   `cacheEverything` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *    Treats all content as static and caches all [file types](/cache/concepts/default-cache-behavior#default-cached-file-extensions) beyond the Cloudflare default cached content. Respects cache headers from the origin web server. This is equivalent to setting the Page Rule [**Cache Level** (to **Cache Everything**)](/rules/page-rules/reference/settings/). Defaults to `false`.
        This option applies to `GET` and `HEAD` request methods only.

*   `cacheKey` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   A request’s cache key is what determines if two requests are the same for caching purposes. If a request has the same cache key as some previous request, then Cloudflare can serve the same cached response for both.

*   `cacheTags` {{<type>}}Array\<string\>{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   This option appends additional [**Cache-Tag**](/cache/how-to/purge-cache/purge-by-tags/) headers to the response from the origin server. This allows for purges of cached content based on tags provided by the Worker, without modifications to the origin server. This is performed using the [**Purge by Tag**](/cache/how-to/purge-cache/purge-by-tags/#purge-using-cache-tags) feature, which is currently only available to Enterprise zones. If this option is used in a non-Enterprise zone, the additional headers will not be appended.

*   `cacheTtl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two Page Rules: [**Edge Cache TTL**](/cache/how-to/edge-browser-cache-ttl/) and [**Cache Level** (to **Cache Everything**)](/rules/page-rules/reference/settings/). The value must be zero or a positive number. A value of `0` indicates that the cache asset expires immediately. This option applies to `GET` and `HEAD` request methods only.

*   `cacheTtlByStatus` {{<type>}}{ \[key: string]: number }{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   This option is a version of the `cacheTtl` feature which chooses a TTL based on the response’s status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time and override cache instructives sent by the origin. For example: `{ "200-299": 86400, "404": 1, "500-599": 0 }`. The value can be any integer, including zero and negative integers. A value of `0` indicates that the cache asset expires immediately. Any negative value instructs Cloudflare not to cache at all. This option applies to `GET` and `HEAD` request methods only.

*   `image` {{<type>}}Object | null{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Enables [Image Resizing](/images/transform-images/) for this request. The possible values are described in [Transform images via Workers](/images/transform-images/transform-via-workers/) documentation.

*   `minify` {{<type>}}{ javascript?: boolean; css?: boolean; html?: boolean; }{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Enables or disables [AutoMinify](https://www.cloudflare.com/website-optimization/) for various file types. For example: `{ javascript: true, css: true, html: false }`.

*   `mirage` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Whether [Mirage](https://www.cloudflare.com/website-optimization/mirage/) should be enabled for this request, if otherwise configured for this zone. Defaults to `true`.

*   `polish` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Sets [Polish](https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/) mode. The possible values are `lossy`, `lossless` or `off`.

*   `resolveOverride` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Directs the request to an alternate origin server by overriding the DNS lookup. The value of `resolveOverride` specifies an alternate hostname which will be used when determining the origin IP address, instead of using the hostname specified in the URL. The `Host` header of the request will still match what is in the URL. Thus, `resolveOverride` allows a request to be sent to a different server than the URL / `Host` header specifies. However, `resolveOverride` will only take effect if both the URL host and the host specified by `resolveOverride` are within your zone. If either specifies a host from a different zone / domain, then the option will be ignored for security reasons. If you need to direct a request to a host outside your zone (while keeping the `Host` header pointing within your zone), first create a CNAME record within your zone pointing to the outside host, and then set `resolveOverride` to point at the CNAME record. Note that, for security reasons, it is not possible to set the `Host` header to specify a host outside of your zone unless the request is actually being sent to that host.

*   `scrapeShield` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Whether [ScrapeShield](https://blog.cloudflare.com/introducing-scrapeshield-discover-defend-dete/) should be enabled for this request, if otherwise configured for this zone. Defaults to `true`.

*   `webp` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    *   Enables or disables [WebP](https://blog.cloudflare.com/a-very-webp-new-year-from-cloudflare/) image format in [Polish](/images/polish/).

{{</definitions>}}

---

## Properties

All properties of an incoming `Request` object (that is, `event.request`) are read only. To modify a request, create a new `Request` object and pass the options to modify to its [constructor](#constructor).

{{<definitions>}}

*   `body` {{<type>}}ReadableStream{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   Stream of the body contents.

*   `bodyUsed` {{<type>}}Boolean{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   Declares whether the body has been used in a response yet.

*   `cf` {{<type-link href="#incomingrequestcfproperties">}}IncomingRequestCfProperties{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   An object containing properties about the incoming request provided by Cloudflare’s global network.

*   `headers` {{<type>}}Headers{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

    {{<Aside type="note">}}
Note that, compared to browsers, Cloudflare Workers imposes very few restrictions on what headers you are allowed to send. For example, a browser will not allow you to set the `Cookie` header, since the browser is responsible for handling cookies itself. Workers, however, has no special understanding of cookies, and treats the `Cookie` header like any other header.
    {{</Aside>}}

    {{<Aside type="warning">}}
If the response is a redirect and the redirect mode is set to `follow` (see below), then all headers will be forwarded to the redirect destination, even if the destination is a different hostname or domain. This includes sensitive headers like `Cookie`, `Authorization`, or any application-specific headers. If this is not the behavior you want, you should set redirect mode to `manual` and implement your own redirect policy. Note that redirect mode defaults to `manual` for requests that originated from the Worker's client, so this warning only applies to `fetch()`es made by a Worker that are not proxying the original request.
    {{</Aside>}}

*   `method` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   Contains the request’s method, for example, `GET`, `POST`, etc.

*   `redirect` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   The redirect mode to use: `follow`, `error`, or `manual`. The `fetch` method will automatically follow redirects if the redirect mode is set to `follow`. If set to `manual`, the `3xx` redirect response will be returned to the caller as-is. The default for a new `Request` object is `follow`. Note, however, that the incoming `Request` property of a `FetchEvent` will have redirect mode `manual`.

*   `url` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

    *   Contains the URL of the request.

{{</definitions>}}

### `IncomingRequestCfProperties`

In addition to the properties on the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) object, the `request.cf` object on an inbound `Request` contains information about the request provided by Cloudflare’s global network.

All plans have access to:

{{<definitions>}}

*   `asn` {{<type>}}Number{{</type>}}

    *   ASN of the incoming request, for example, `395747`.

*   `asOrganization` {{<type>}}string{{</type>}}

    *   The organization which owns the ASN of the incoming request, for example, `Google Cloud`.

*   `botManagement` {{<type>}}Object | null{{</type>}}

    *   Only set when using Cloudflare Bot Management. Object with the following properties: `score`, `verifiedBot`, `staticResource`, `ja3Hash`, and `detectionIds`. Refer to [Bot Management Variables](/bots/reference/bot-management-variables/) for more details.

*   `clientAcceptEncoding` {{<type>}}string | null{{</type>}}

    *   If Cloudflare replaces the value of the `Accept-Encoding` header, the original value is stored in the `clientAcceptEncoding` property, for example, `"gzip, deflate, br"`.

*   `colo` {{<type>}}string{{</type>}}

    *   The three-letter [`IATA`](https://en.wikipedia.org/wiki/IATA_airport_code) airport code of the data center that the request hit, for example, `"DFW"`.

*   `country` {{<type>}}string | null{{</type>}}

    *   Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header, for example, `"US"`.

*   `isEUCountry` {{<type>}}string | null{{</type>}}

    *   If the country of the incoming request is in the EU, this will return `"1"`. Otherwise, this property will be omitted.

*   `httpProtocol` {{<type>}}string{{</type>}}

    *   HTTP Protocol, for example, `"HTTP/2"`.

*   `requestPriority` {{<type>}}string | null{{</type>}}

    *   The browser-requested prioritization information in the request object, for example, `"weight=192;exclusive=0;group=3;group-weight=127"`.

*   `tlsCipher` {{<type>}}string{{</type>}}

    *   The cipher for the connection to Cloudflare, for example, `"AEAD-AES128-GCM-SHA256"`.

*   `tlsClientAuth` {{<type>}}Object | null{{</type>}}

    *   Only set when using Cloudflare Access or API Shield (mTLS). Object with the following properties: `certFingerprintSHA1`, `certFingerprintSHA256`, `certIssuerDN`, `certIssuerDNLegacy`, `certIssuerDNRFC2253`, `certIssuerSKI`, `certIssuerSerial`, `certNotAfter`, `certNotBefore`, `certPresented`, `certRevoked`, `certSKI`, `certSerial`, `certSubjectDN`, `certSubjectDNLegacy`, `certSubjectDNRFC2253`, `certVerified`.

*   `tlsClientHelloLength` {{<type>}}string{{</type>}}

    *   The length of the client hello message sent in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/). For example, `"508"`. Specifically, the length of the bytestring of the client hello, after the hexidecimal bytes have been decoded.

*   `tlsClientRandom` {{<type>}}string{{</type>}}

    *   The value of the 32-byte random value provided by the client in a [TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/). Refer to [RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.2) for more details.

*   `tlsVersion` {{<type>}}string{{</type>}}

    *   The TLS version of the connection to Cloudflare, for example, `TLSv1.3`.

*   `city` {{<type>}}string | null{{</type>}}

    *   City of the incoming request, for example, `"Austin"`.

*   `continent` {{<type>}}string | null{{</type>}}

    *   Continent of the incoming request, for example, `"NA"`.

*   `latitude` {{<type>}}string | null{{</type>}}

    *   Latitude of the incoming request, for example, `"30.27130"`.

*   `longitude` {{<type>}}string | null{{</type>}}

    *   Longitude of the incoming request, for example, `"-97.74260"`.

*   `postalCode` {{<type>}}string | null{{</type>}}

    *   Postal code of the incoming request, for example, `"78701"`.

*   `metroCode` {{<type>}}string | null{{</type>}}

    *   Metro code (DMA) of the incoming request, for example, `"635"`.

*   `region` {{<type>}}string | null{{</type>}}

    *   If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request, for example, `"Texas"`.

*   `regionCode` {{<type>}}string | null{{</type>}}

    *   If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first-level region associated with the IP address of the incoming request, for example, `"TX"`.

*   `timezone` {{<type>}}string{{</type>}}

    *   Timezone of the incoming request, for example, `"America/Chicago"`.

{{</definitions>}}

{{<Aside type="warning">}}

The `request.cf` object is not available in the Cloudflare Workers dashboard or Playground preview editor.

{{</Aside>}}

---

## Methods

### Instance methods

These methods are only available on an instance of a `Request` object or through its prototype.

{{<definitions>}}

*   `clone()` : {{<type>}}Promise\<Request>{{</type>}}

    *   Creates a copy of the `Request` object.

*   `arrayBuffer()` : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) representation of the request body.

*   `formData()` : {{<type>}}Promise\<FormData>{{</type>}}

    *   Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.

*   `json()` : {{<type>}}Promise\<Object>{{</type>}}

    *   Returns a promise that resolves with a JSON representation of the request body.

*   `text()` : {{<type>}}Promise\<string>{{</type>}}

    *   Returns a promise that resolves with a string (text) representation of the request body.

{{</definitions>}}

---

## The `Request` context

Each time a Worker is invoked by an incoming HTTP request, the [`fetch()` handler](/workers/runtime-apis/handlers/fetch) is called on your Worker. The `Request` context starts when the `fetch()` handler is called, and asynchronous tasks (such as making a subrequest using the [`fetch() API`](/workers/runtime-apis/fetch/)) can only be run inside the `Request` context:

```js
export default {
	async fetch(request, env, ctx) {
        // Request context starts here
		return new Response('Hello World!');
	},
};
```

### When passing a promise to fetch event `.respondWith()`

If you pass a Response promise to the fetch event `.respondWith()` method, the request context is active during any asynchronous tasks which run before the Response promise has settled. You can pass the event to an async handler, for example:

```js
addEventListener("fetch", event => {
  event.respondWith(eventHandler(event))
})

// No request context available here

async function eventHandler(event){
  // Request context available here
  return new Response("Hello, Workers!")
}
```

### Errors when attempting to access an inactive `Request` context

Any attempt to use APIs such as `fetch()` or access the `Request` context during script startup will throw an exception:

```js
const promise = fetch("https://example.com/") // Error
async function eventHandler(event){..}
```

This code snippet will throw during script startup, and the `"fetch"` event listener will never be registered.

***

### Set the `Content-Length` header

The `Content-Length` header will be automatically set by the runtime based on whatever the data source for the `Request` is. Any value manually set by user code in the `Headers` will be ignored. To have a `Content-Length` header with a specific value specified, the `body` of the `Request` must be either a `FixedLengthStream` or a fixed-length value just as a string or `TypedArray`.

A `FixedLengthStream` is an identity `TransformStream` that permits only a fixed number of bytes to be written to it.

```js
  const { writable, readable } = new FixedLengthStream(11);

  const enc = new TextEncoder();
  const writer = writable.getWriter();
  writer.write(enc.encode("hello world"));
  writer.end();

  const req = new Request('https://example.org', { method: 'POST', body: readable });
```

Using any other type of `ReadableStream` as the body of a request will result in Chunked-Encoding being used.

---

## Related resources

* [Examples: Modify request property](/workers/examples/modify-request-property/)
* [Examples: Accessing the `cf` object](/workers/examples/accessing-the-cloudflare-object/)
* [Reference: `Response`](/workers/runtime-apis/response/)
* Write your Worker code in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
