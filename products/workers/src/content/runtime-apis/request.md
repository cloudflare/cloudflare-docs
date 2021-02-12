# Request

The `Request` interface represents an HTTP request, and is part of the Fetch API.

## Background

The most common way you’ll encounter a `Request` object is as a property of an incoming `FetchEvent`.

```js
---
highlight: [2]
---
addEventListener("fetch", event => {
  let request = event.request // Request object

  // ...
})
```

You may also want to construct a `Request` yourself when you need to modify a request object, because a `FetchEvent`’s `request` property is immutable.

```js
addEventListener("fetch", event => {
  const request = event.request
  const url = "https://example.com"

  const modifiedRequest = new Request(url, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    redirect: request.redirect
  })

  // ...
})
```

The global `fetch` method itself invokes the `Request` constructor, thus the [`RequestInit`](#requestinit) and [`RequestInitCfProperties`](#requestinitcfproperties) types defined below also describe the valid parameters that can be passed to `fetch`.

<Aside header="Learn more">

Read [Understanding the FetchEvent Lifecycle](/learning/fetch-event-lifecycle) for a deeper understanding of these fundamental Workers concepts.

</Aside>

## Constructor

```js
let request = new Request(input [, init])
```

### Parameters

<Definitions>

- `input` <Type>string | Request</Type>

  - Either a string that contains a URL, or an existing `Request` object.

- `init` <TypeLink href="#requestinit">RequestInit</TypeLink> <PropMeta>optional</PropMeta>

  - Optional options object that contains settings to apply to the `Request`.

</Definitions>

#### `RequestInit`

<Definitions>

- `cf` <TypeLink href="#requestinitcfproperties">RequestInitCfProperties</TypeLink> <PropMeta>optional</PropMeta>

  - Cloudflare-specific properties that can be set on the `Request` that control how Cloudflare’s edge handles the request.

- `method` <Type>string</Type> <PropMeta>optional</PropMeta>

  - The HTTP request method. The default is `GET`.

- `headers` <Type>Headers</Type> <PropMeta>optional</PropMeta>

  - A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

- `body` <Type>string | ReadableStream | FormData | URLSearchParams</Type> <PropMeta>optional</PropMeta>

  - The request body, if any.

- `redirect` <Type>string</Type> <PropMeta>optional</PropMeta>

  - The redirect mode to use: `follow`, `error`, or `manual`. The default  for a new `Request` object is `follow`. Note, however, that the incoming `Request` property of a `FetchEvent` will have redirect mode `manual`.

</Definitions>

#### `RequestInitCfProperties`
An object containing Cloudflare-specific properties that can be set on the `Request` object. For example:

```js
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```

Invalid or incorrectly-named keys in the `cf` object will be silently ignored. Consider using TypeScript and [`@cloudflare/workers-types`](https://github.com/cloudflare/workers-types) to ensure proper use of the `cf` object.

<Definitions>

- `apps` <Type>boolean</Type> <PropMeta>optional</PropMeta>

  - Whether [Cloudflare Apps](https://www.cloudflare.com/apps/) should be enabled for this request. Defaults to `true`.

- `cacheEverything` <Type>boolean</Type> <PropMeta>optional</PropMeta>

  - This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting the page rule [“Cache Level” (to “Cache Everything”)](https://support.cloudflare.com/hc/en-us/articles/200172266). Defaults to `false`.

- `cacheKey` <Type>string</Type> <PropMeta>optional</PropMeta>

  - A request’s cache key is what determines if two requests are “the same” for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both.

- `cacheTtl` <Type>number</Type> <PropMeta>optional</PropMeta>

  - This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: [“Edge Cache TTL”](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and [“Cache Level” (to “Cache Everything”)](https://support.cloudflare.com/hc/en-us/articles/200172266).

- `cacheTtlByStatus` <Type>{ [key: string]: number }</Type> <PropMeta>optional</PropMeta>

  - This option is a version of the `cacheTtl` feature which chooses a TTL based on the response’s status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache instructives sent by the origin. For example: `{ "200-299": 86400, 404: 1, "500-599": 0 }`.

- `minify` <Type>{ javascript?: boolean; css?: boolean; html?: boolean; }</Type> <PropMeta>optional</PropMeta>

  - Enables or disables [AutoMinify](https://www.cloudflare.com/website-optimization/) for various file types. For example: `{ javascript: true, css: true, html: false }`.

- `mirage` <Type>boolean</Type> <PropMeta>optional</PropMeta>

  - Whether [Mirage](https://www.cloudflare.com/website-optimization/mirage/) should be enabled for this request, if otherwise configured for this zone. Defaults to `true`.

- `polish` <Type>string</Type> <PropMeta>optional</PropMeta>

  - Sets [Polish](https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/) mode. The possible values are `lossy`, `lossless` or `off`.

- `resolveOverride` <Type>string</Type> <PropMeta>optional</PropMeta>

  - Directs the request to an alternate origin server by overriding the DNS lookup. The value of `resolveOverride` specifies an alternate hostname which will be used when determining the origin IP address, instead of using the hostname specified in the URL. The `Host` header of the request will still match what is in the URL. Thus, `resolveOverride` allows a request to be sent to a different server than the URL / `Host` header specifies. However, `resolveOverride` will only take effect if both the URL host and the host specified by `resolveOverride` are within your zone. If either specifies a host from a different zone / domain, then the option will be ignored for security reasons. If you need to direct a request to a host outside your zone (while keeping the `Host` header pointing within your zone), first create a CNAME record within your zone pointing to the outside host, and then set `resolveOverride` to point at the CNAME record. Note that, for security reasons, it is not possible to set the `Host` header to specify a host outside of your zone unless the request is actually being sent to that host.

- `scrapeShield` <Type>boolean</Type> <PropMeta>optional</PropMeta>

  - Whether [ScrapeShield](https://blog.cloudflare.com/introducing-scrapeshield-discover-defend-dete/) should be enabled for this request, if otherwise configured for this zone. Defaults to `true`.

</Definitions>

--------------------------------

## Properties

All properties of an incoming `Request` object (i.e. `event.request`) are read only. To modify a request, you must create a new `Request` object and pass the options to modify to its [constructor](#constructor).

<Definitions>

- `body` <Type>ReadableStream</Type> <PropMeta>read-only</PropMeta>

  - Stream of the body contents.

- `bodyUsed` <Type>Boolean</Type> <PropMeta>read-only</PropMeta>

  - Declares whether the body has been used in a response yet.

- `cf` <TypeLink href="#incomingrequestcfproperties">IncomingRequestCfProperties</TypeLink> <PropMeta>read-only</PropMeta>

  - An object containing properties about the incoming request provided by Cloudflare’s edge network.

- `headers` <Type>Headers</Type> <PropMeta>read-only</PropMeta>

  - A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

- `method` <Type>string</Type> <PropMeta>read-only</PropMeta>

  - Contains the request’s method, e.g. `GET`, `POST`, etc.

- `redirect` <Type>string</Type> <PropMeta>read-only</PropMeta>

  - Contains the mode for how redirects are handled. It may be one of `follow`, `error`, or `manual`.

- `url` <Type>string</Type> <PropMeta>read-only</PropMeta>

  - Contains the URL of the request.

</Definitions>

### `IncomingRequestCfProperties`

In addition to the properties on the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) object, the `request.cf` object on an inbound `Request` contains information about the request provided by Cloudflare’s edge.

All plans have access to:

<Definitions>

- `asn` <Type>string</Type>

  - ASN of the incoming request, e.g. `395747`.

- `colo` <Type>string</Type>

  - The three-letter [`IATA`](https://en.wikipedia.org/wiki/IATA_airport_code) airport code of the data center that the request hit, e.g. `"DFW"`.

- `country` <Type>string | null</Type>

  - Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header, e.g. `"US"`.

- `httpProtocol` <Type>string</Type>

  - HTTP Protocol, e.g. `"HTTP/2"`.

- `requestPriority` <Type>string | null</Type>

  - The browser-requested prioritization information in the request object, e.g. `"weight=192;exclusive=0;group=3;group-weight=127"`.

- `tlsCipher` <Type>string</Type>

  - The cipher for the connection to Cloudflare, e.g. `"AEAD-AES128-GCM-SHA256"`.

- `tlsClientAuth` <Type>Object | null</Type>

  - Only set when using Cloudflare Access or API Shield. Object with the following properties: `certIssuerDNLegacy`, `certIssuerDN`, `certIssuerDNRFC2253`, `certSubjectDNLegacy`, `certVerified`, `certNotAfter`, `certSubjectDN`, `certFingerprintSHA1`, `certNotBefore`, `certSerial`, `certPresented`, `certSubjectDNRFC2253`.

- `tlsVersion` <Type>string</Type>

  - The TLS version of the connection to Cloudflare, e.g. `TLSv1.3`.

</Definitions>

Business and Enterprise scripts have access to:

<Definitions>

- `city` <Type>string | null</Type>

  - City of the incoming request, e.g. `"Austin"`.

- `continent` <Type>string | null</Type>

  - Continent of the incoming request, e.g. `"NA"`.

- `latitude` <Type>string | null</Type>

  - Latitude of the incoming request, e.g. `"30.27130"`.

- `longitude` <Type>string | null</Type>

  - Longitude of the incoming request, e.g. `"-97.74260"`.

- `postalCode` <Type>string | null</Type>

  - Postal code of the incoming request, e.g. `"78701"`.

- `metroCode` <Type>string | null</Type>

  - Metro code (DMA) of the incoming request, e.g. `"635"`.

- `region` <Type>string | null</Type>

  - If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request, e.g. `"Texas"`.

- `regionCode` <Type>string | null</Type>

  - If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first level region associated with the IP address of the incoming request, e.g. `"TX"`.

- `timezone` <Type>string</Type>

  - Timezone of the incoming request, e.g. `"America/Chicago"`.

</Definitions>

--------------------------------

## Methods

### Instance methods

These methods are only available on an instance of a `Request` object or through its prototype.

<Definitions>

- `clone()` <Type>Promise&lt;Request></Type>

  - Creates a copy of the `Request` object.

- `arrayBuffer()` <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) representation of the request body.

- `formData()` <Type>Promise&lt;FormData></Type>

  - Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.

- `json()` <Type>Promise&lt;Object></Type>

  - Returns a promise that resolves with a JSON representation of the request body.

- `text()` <Type>Promise&lt;string></Type>

  - Returns a promise that resolves with a string (text) representation of the request body.

</Definitions>

--------------------------------

## The request context

The `Request` context is the context of the `"fetch"` event callback. It is important to note that due to how workers are executed, asynchronous tasks (e.g. `fetch`) can only be run _inside_ the request context.

The request context is available inside of the [`FetchEvent` handler](/runtime-apis/fetch-event/):

```js
addEventListener("fetch", event => {
  // Request context available here
  event.respondWith(/*...*/)
})
```

### When passing a promise to fetch event `.respondWith()`

If you pass a Response promise to the fetch event [`.respondWith()`](/runtime-apis/fetch-event/#methods) method, the request context is active during any asynchronous tasks which run before the Response promise has settled. You can pass the event to an async handler, for example:

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

This code snippet will throw during script startup, and the `"fetch"` event
listener will never be registered.
