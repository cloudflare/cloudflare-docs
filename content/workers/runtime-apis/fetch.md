---
pcx_content_type: configuration
title: Fetch
---

# Fetch

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

The `fetch` method is implemented on the `ServiceWorkerGlobalScope`. Refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for more information.

{{<Aside type="note">}}

Asynchronous tasks such as `fetch` are not executed at the top level in a Worker script and must be executed within a `FetchEvent` handler such as [`respondWith`](/workers/runtime-apis/fetch-event/#respondwith). Learn more about [the Request context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

{{<Aside type="warning" header="Worker to Worker">}}

Worker-to-Worker `fetch` requests are now possible with [Service bindings](/workers/platform/bindings/about-service-bindings/).

{{</Aside>}}

---

## Constructor

<!-- This code example needs more work -->

```js
---
highlight: [8]
---
addEventListener('fetch', event => {
  // NOTE: can’t use fetch here, as we’re not in an async scope yet
  event.respondWith(eventHandler(event));
});

async function eventHandler(event) {
  // fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle
  const resp = await fetch(event.request);
  return resp;
}
```

<!-- Where do we have the return type in this format? -->

{{<definitions>}}

- {{<code>}}fetch(request, init {{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type-link href="/runtime-apis/response">}}Promise`<Response>`{{</type-link>}}

  - Fetch returns a promise to a Response.

{{</definitions>}}

### Parameters

{{<definitions>}}

- `request` {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}} | {{<type>}}string{{</type>}}

  - The [`Request`](/workers/runtime-apis/request/) object or a string represents the URL to fetch.

- `init` {{<type-link href="/runtime-apis/request#requestinit">}}RequestInit{{</type-link>}}
  - The content of the request.

{{</definitions>}}

---


## How the `Accept-Encoding` header is handled

When making a subrequest with the `fetch()` API, you can specify which forms of compression to prefer that the server will respond with (if the server supports it) by including the [`Accept-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header.

Workers supports both the gzip and brotli compression algorithms. For example, to make a subrequest and prefer that the response is encoded as brotli, and fall back to gzip if brotli is not supported by the server, you can specify `br, gzip` in the `Accept-Encoding` header, as shown in the example below:

```typescript
export default {
  async fetch(request, env) { 
    const headers = new Headers({
      'Accept-Encoding': "br, gzip"
    });
    const response = await fetch("https://developers.cloudflare.com", {method: "GET", headers});
    return new Response(`Content-Encoding: ${response.headers.get("Content-Encoding")}`);
  }
}
```

In order to read a response that is encoded as brotli within a Worker, you currently must enable the [`brotli_content_encoding`](/workers/platform/compatibility-dates/#brotli-content-encoding-support) compatibility flag in your Worker. Soon, this compatibility flag will be enabled for by default for all Workers past an upcoming compatibility date.

### Passthrough behavior

As long as you do not read the body of the response prior to returning it to the client, it will "pass through" without being decompressed and then recompressed again. This can be helpful when using Workers in front of origin servers or when fetching compressed media assets, to ensure that the same compression used by the origin server is used in the response that your Worker returns.


## Related resources

- [Example: use `fetch` to respond with another site](/workers/examples/respond-with-another-site/)
- [Example: Fetch HTML](/workers/examples/fetch-html/)
- [Example: Fetch JSON](/workers/examples/fetch-json/)
- [Example: cache using Fetch](/workers/examples/cache-using-fetch/)
