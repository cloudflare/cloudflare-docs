---
pcx-content-type: concept
title: Service Worker syntax
weight: 0
---

# Service Worker syntax

A Worker written in Service Worker syntax consists of two parts:

1.  An [event listener](/workers/runtime-apis/add-event-listener/) that listens for [`FetchEvents`](/workers/runtime-apis/fetch-event/), and
2.  An event handler that returns a [Response](/workers/runtime-apis/response/) object which is passed to the event’s `.respondWith()` method.

When a request is received on one of Cloudflare’s edge servers for a URL matching a Workers script, it passes the request to the Workers runtime. This dispatches a [`FetchEvent`](/workers/runtime-apis/fetch-event/) in the [isolate](/workers/learning/how-workers-works/#isolates) where the script is running.

```js
---
filename: ~/my-worker/index.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  });
}
```

Below is an example of the request response workflow:

1.  An event listener for the `FetchEvent` tells the script to listen for any request coming to your Worker. The event handler is passed the `event` object, which includes `event.request`, a [`Request`](/workers/runtime-apis/request/) object which is a representation of the HTTP request that triggered the `FetchEvent`.

2.  The call to [`.respondWith()`](/workers/runtime-apis/fetch-event/#methods) lets the Workers runtime intercept the request in order to send back a custom response (in this example, the plain text “Hello worker!”).

    - The `FetchEvent` handler typically culminates in a call to the method `.respondWith()` with either a [`Response`](/workers/runtime-apis/response/) or `Promise<Response>` that determines the response.

    - The `FetchEvent` object also provides [two other methods](/workers/runtime-apis/fetch-event/#methods) to handle unexpected exceptions and operations that may complete after a response is returned.

Learn more about [the `FetchEvent` lifecycle](/workers/runtime-apis/fetch-event/#lifecycle-methods).