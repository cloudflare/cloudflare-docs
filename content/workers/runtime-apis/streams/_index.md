---
pcx_content_type: navigation
title: Streams
meta:
  title: Streams - Runtime APIs
  description: A web standard API that allows JavaScript to programmatically access and process streams of data.
---

# Streams

The [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) is a web standard API that allows JavaScript to programmatically access and process streams of data.

{{<directory-listing>}}

Workers do not need to prepare an entire response body before delivering it to `event.respondWith()`. You can use a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/) to stream a response body after sending the front matter (that is, HTTP status line and headers). This allows you to minimize:

- The visitor’s time-to-first-byte.
- The buffering done in the Worker.

Minimizing buffering is especially important for processing or transforming response bodies larger than the Worker's memory limit. For these cases, streaming is the only implementation strategy.

{{<Aside type="note">}}

Cloudflare Workers is capable of streaming responses using the [Streams APIs](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). To maintain the streaming behavior, you should only modify the response body using the methods in the Streams APIs. If your Worker only forwards subrequest responses to the client verbatim without reading their body text, then its body handling is already optimal and you do not have to use these APIs.

{{</Aside>}}

A basic pass-through usage of streams:

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    // Fetch from origin server.
    const response = await fetch(request);

    // ... and deliver our Response while that’s running.
    return new Response(response.body, response);
  }
}
```

{{</tab>}}
{{<tab label="js/sw">}}

```js
addEventListener('fetch', event => {
  event.respondWith(fetchAndStream(event.request));
});

async function fetchAndStream(request) {
  // Fetch from origin server.
  const response = await fetch(request);

  // ... and deliver our Response while that’s running.
  return new Response(response.body, response);
}
```
{{</tab>}}
{{</tabs>}}

---

## Common issues

{{<Aside type="warning" header="Warning">}}

The Streams API is only available inside of the [Request context](/workers/runtime-apis/request/), e.g. inside the `fetch` event listener callback.

{{</Aside>}}

---

## Related resources

* [MDN’s Streams API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
* [Streams API spec](https://streams.spec.whatwg.org/)
* Write your Worker code in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
