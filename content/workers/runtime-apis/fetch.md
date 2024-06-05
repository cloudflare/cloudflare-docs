---
pcx_content_type: configuration
title: Fetch
meta:
  description: An interface for asynchronously fetching resources via HTTP requests inside of a Worker.
---

# Fetch

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

{{<Aside type="note">}}

Asynchronous tasks such as `fetch` must be executed within a [handler](/workers/runtime-apis/handlers/). If you try to call `fetch()` within [global scope](https://developer.mozilla.org/en-US/docs/Glossary/Global_scope), your Worker will throw an error. Learn more about [the Request context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

{{<Aside type="warning" header="Worker to Worker">}}

Worker-to-Worker `fetch` requests are possible with [Service bindings](/workers/runtime-apis/bindings/service-bindings/).

{{</Aside>}}

## Syntax

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
---
highlight: [3-7]
---
export default {
  async scheduled(event, env, ctx) {
    return await fetch("https://example.com", {
      headers: {
        "X-Source": "Cloudflare-Workers",
      },
    });
  },
};
```
{{</tab>}}
{{<tab label="js/sw">}}
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
{{</tab>}}
{{</tabs>}}

{{<definitions>}}

- {{<code>}}fetch(resource, options {{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type-link href="/runtime-apis/response">}}Promise`<Response>`{{</type-link>}}

  - Fetch returns a promise to a Response.

{{</definitions>}}

### Parameters

{{<definitions>}}

- [`resource`](https://developer.mozilla.org/en-US/docs/Web/API/fetch#resource) {{<type-link href="/workers/runtime-apis/request/">}}Request{{</type-link>}} | {{<type>}}string{{</type>}} | {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/URL">}}URL{{</type>}}

- `options` {{<type-link href="/runtime-apis/request/#the-cf-property-requestinitcfproperties">}}options{{</type-link>}}
  - An object that defines the content and behavior of the request.

{{</definitions>}}

---

## How the `Accept-Encoding` header is handled

When making a subrequest with the `fetch()` API, you can specify which forms of compression to prefer that the server will respond with (if the server supports it) by including the [`Accept-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header.

Workers supports both the gzip and brotli compression algorithms. Usually it is not necessary to specify `Accept-Encoding` or `Content-Encoding` headers in the Workers Runtime production environment – brotli or gzip compression is automatically requested when fetching from an origin and applied to the response when returning data to the client, depending on the capabilities of the client and origin server.

To support requesting brotli from the origin, you must enable the [`brotli_content_encoding`](/workers/configuration/compatibility-dates/#brotli-content-encoding-support) compatibility flag in your Worker. Soon, this compatibility flag will be enabled by default for all Workers past an upcoming compatibility date.

### Passthrough behavior

One scenario where the Accept-Encoding header is useful is for passing through compressed data from a server to the client, where the Accept-Encoding allows the worker to directly receive the compressed data stream from the server without it being decompressed beforehand. As long as you do not read the body of the compressed response prior to returning it to the client and keep the `Content-Encoding` header intact, it will "pass through" without being decompressed and then recompressed again. This can be helpful when using Workers in front of origin servers or when fetching compressed media assets, to ensure that the same compression used by the origin server is used in the response that your Worker returns.

In addition to a change in the content encoding, recompression is also needed when a response uses an encoding not supported by the client. As an example, when a Worker requests either brotli or gzip as the encoding but the client only supports gzip, recompression will still be needed if the server returns brotli-encoded data to the server (and will be applied automatically). Note that this behavior may also vary based on the [compression rules](/rules/compression-rules/), which can be used to configure what compression should be applied for different types of data on the server side.

```typescript
export default {
  async fetch(request) {
    // Accept brotli or gzip compression
    const headers = new Headers({
      'Accept-Encoding': "br, gzip"
    });
    let response = await fetch("https://developers.cloudflare.com", {method: "GET", headers});

    // As long as the original response body is returned and the Content-Encoding header is
    // preserved, the same encoded data will be returned without needing to be compressed again.
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
}
```

## Related resources

- [Example: use `fetch` to respond with another site](/workers/examples/respond-with-another-site/)
- [Example: Fetch HTML](/workers/examples/fetch-html/)
- [Example: Fetch JSON](/workers/examples/fetch-json/)
- [Example: cache using Fetch](/workers/examples/cache-using-fetch/)
- Write your Worker code in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
