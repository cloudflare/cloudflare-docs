---
order: 2
---

# FetchEvent Lifecycle

When working with the [`fetch` event](/runtime-apis/fetch-event) inside the Workers runtime, it helps to have a good idea of its lifecycle.

The [FetchEvent](/runtime-apis/fetch-event) lifecycle starts when Cloudflare’s edge network receives a request whose URL is mapped to a Worker function, either by running on workers.dev, or being mapped to a [route](/platform/routes); this causes the Workers runtime to trigger a `fetch` event and creates a FetchEvent Object to pass to the first event handler in the Workers function registered for `fetch`.

The event handler can use any of the following to control what happens next:

## `respondWith()`

Intercepts the request and allows users to send a custom response.

If a `fetch` event handler does not call `respondWith()`, the runtime delivers the event to the next registered `fetch` event handler. If no event handler calls `respondWith()`, the runtime proxies the request to the origin. If the Worker is itself your origin, (always true for workers.dev sites), then you must have a `respondWith()` called for a valid response.

## `waitUntil()`

Extends the lifetime of the event using a `Promise` passed into the function. You can use this method to notify the runtime to wait for tasks, such as streaming and caching, that run longer than the usual time it takes to send a response. This is good for handling logging and analytics to third-party services, where you don’t want to block the `response`.

## `passThroughOnException()`

Causes the script to "fail open" (meaning the execution of code is not halted) on unhandled exceptions. Instead of returning a runtime error response, the runtime proxies the request to its destination. To prevent JavaScript errors from causing entire requests to fail on uncaught exceptions, `passThroughOnException()` causes the Workers runtime to yield control to the origin server.
