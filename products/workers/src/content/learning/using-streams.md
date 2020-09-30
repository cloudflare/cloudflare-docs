---
order: 7
---

# Using Streams

The [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) is a web standard API that allows JavaScript to programmatically access and process streams of data.

Workers scripts don’t need to prepare an entire response body before delivering it to `event.respondWith()`. You can use [`TransformStream`](/runtime-apis/streams/transformstream) to stream a response body _after_ sending the front matter (that is, HTTP status line and headers). This allows you to minimize:

- The visitor’s time-to-first-byte.
- The buffering done in the Workers script.

Minimizing buffering is especially important for processing or transforming response bodies larger than the Workers script memory limit. For these cases, streaming is the only implementation strategy.

<Aside>

__Note:__ By default, the Cloudflare Workers service streams. Only use these APIs for _modifying_ the response body while maintaining streaming behavior. If your Workers script only passes subrequest responses back to the client verbatim without reading their body text, then its body handling is already optimal and you don’t have to use these APIs.

</Aside>

The two primitives developers use to perform active streaming are [`TransformStream`](/runtime-apis/streams/transformstream) and the [`ReadableStream.pipeTo()`](/runtime-apis/streams/readablestream#methods) method.

A basic pass-through usage of streams looks like this:

```js
addEventListener("fetch", event => {
  event.respondWith(fetchAndStream(event.request))
})

async function fetchAndStream(request) {
  // Fetch from origin server.
  let response = await fetch(request)

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  let { readable, writable } = new TransformStream()

  // Start pumping the body. NOTE: No await!
  response.body.pipeTo(writable)

  // ... and deliver our Response while that’s running.
  return new Response(readable, response)
}
```

Note that we call `response.body.pipeTo(writable)` but do _not_ `await` it. This is so it does not block the forward progress of the remainder of the `fetchAndStream()` function. It continues to run asynchronously until the response is complete or the client disconnects.

The runtime can continue running a function (`response.body.pipeTo(writable)`) after a response is returned to the client. This example just pumps the subrequest response body to the final response body; however, you can use more complicated logic, such as adding a prefix or a suffix to the body or to process it somehow.

--------------------------------

## Common issues

<Aside type="warning" header="Warning">

The Streams API is only available inside of the [Request context](/runtime-apis/request), i.e. inside the `fetch` event listener callback.

</Aside>

--------------------------------

## See also

- [Streams API Reference](/runtime-apis/streams)
- [MDN’s Streams API documentation.](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [Streams API Specification](https://streams.spec.whatwg.org/)
