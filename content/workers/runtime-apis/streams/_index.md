---
pcx_content_type: navigation
title: Streams
layout: single
---

# Streams

The [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) is a web standard API that allows JavaScript to programmatically access and process streams of data.

{{<directory-listing>}}

Workers do not need to prepare an entire response body before delivering it to `event.respondWith()`. You can use [`TransformStream`](/workers/runtime-apis/streams/transformstream/) to stream a response body after sending the front matter (that is, HTTP status line and headers). This allows you to minimize:

- The visitor’s time-to-first-byte.
- The buffering done in the Worker.

Minimizing buffering is especially important for processing or transforming response bodies larger than the Worker's memory limit. For these cases, streaming is the only implementation strategy.

{{<Aside type="note">}}

By default, Cloudflare Workers is capable of streaming responses using the [Streams APIs](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). To maintain the streaming behavior, you should only modify the response body using the methods in the Streams APIs. If your Worker only forwards subrequest responses to the client verbatim without reading their body text, then its body handling is already optimal and you do not have to use these APIs.

{{</Aside>}}

The two primitives developers use to perform active streaming are [`TransformStream`](/workers/runtime-apis/streams/transformstream/) and the [`ReadableStream.pipeTo()`](/workers/runtime-apis/streams/readablestream/#methods) method.

A basic pass-through usage of streams:

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    // Fetch from origin server.
    let response = await fetch(request);

    // Create an identity TransformStream (a.k.a. a pipe).
    // The readable side will become our new response body.
    let { readable, writable } = new TransformStream();

    // Start pumping the body. NOTE: No await!
    response.body.pipeTo(writable);

    // ... and deliver our Response while that’s running.
    return new Response(readable, response);
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
  let response = await fetch(request);

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  let { readable, writable } = new TransformStream();

  // Start pumping the body. NOTE: No await!
  response.body.pipeTo(writable);

  // ... and deliver our Response while that’s running.
  return new Response(readable, response);
}
```
{{</tab>}}
{{</tabs>}}

This example calls `response.body.pipeTo(writable)` but does not `await` it. This is so it does not block the forward progress of the remainder of the `fetchAndStream()` function. It continues to run asynchronously until the response is complete or the client disconnects.

The runtime can continue running a function (`response.body.pipeTo(writable)`) after a response is returned to the client. This example pumps the subrequest response body to the final response body. However, you can use more complicated logic, such as adding a prefix or a suffix to the body or to process it somehow.

---

## Common issues

{{<Aside type="warning" header="Warning">}}

The Streams API is only available inside of the [Request context](/workers/runtime-apis/request/), inside the `fetch` event listener callback.

{{</Aside>}}

---

## Related resources

- [MDN’s Streams API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [Streams API spec](https://streams.spec.whatwg.org/)