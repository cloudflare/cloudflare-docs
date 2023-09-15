---
title: Web standards
pcx_content_type: configuration
meta:
  title: JavaScript and web standards
---

# JavaScript and web standards

The Workers runtime provides the following standardized APIs for use by Workers running on Cloudflare's global network.

---

## JavaScript standards

Cloudflare Workers uses the V8 JavaScript engine from Google Chrome. The Workers runtime is updated at least once a week, to at least the version that is currently used by Chrome's stable release. This means you can safely use the latest JavaScript features, with no need for transpilers.

All of the [standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) supported by the current Google Chrome stable release are supported, with a few notable exceptions:

- `eval()` is not allowed for security reasons.
- `new Function` is not allowed for security reasons.
- `Date.now()` returns the time of the last I/O; it does not advance during code execution.

---

## Web global APIs

The following methods are available per the [Worker Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope):

### Base64 utility methods

{{<definitions>}}

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/atob">}}atob(){{</type-link>}}

  - Decodes a string of data which has been encoded using base-64 encoding.

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/btoa">}}btoa(){{</type-link>}}

  - Creates a base-64 encoded ASCII string from a string of binary data.

{{</definitions>}}

### Timers

{{<definitions>}}

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/setInterval">}}setInterval(){{</type-link>}}

  - Schedules a function to execute every time a given number of milliseconds elapses.

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/clearInterval">}}clearInterval(){{</type-link>}}

  - Cancels the repeated execution set using [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval).

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/setTimeout">}}setTimeout(){{</type-link>}}

  - Schedules a function to execute in a given amount of time.

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout">}}clearTimeout(){{</type-link>}}

  - Cancels the delayed execution set using [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

{{</definitions>}}

{{<Aside type="note">}}

Timers are only available inside of [the Request Context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

### `EventTarget` and `Event`

The [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) and [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) API allow objects to publish and subscribe to events.

### `AbortController` and `AbortSignal`

The [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) APIs provide a common model for canceling asynchronous operations.

### Fetch global

{{<definitions>}}

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/fetch">}}fetch(){{</type-link>}}

  - Starts the process of fetching a resource from the network. Refer to [Fetch API](/workers/runtime-apis/fetch/).

{{</definitions>}}

{{<Aside type="note">}}

The Fetch API is only available inside of [the Request Context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

---

## Encoding API

Both `TextEncoder` and `TextDecoder` support UTF-8 encoding/decoding.

[Refer to the MDN documentation for more information](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).

The [`TextEncoderStream`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoderStream) and [`TextDecoderStream`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoderStream) classes are also available.

---

## URL API

The URL API supports URLs conforming to HTTP and HTTPS schemes.

[Refer to the MDN documentation for more information](https://developer.mozilla.org/en-US/docs/Web/API/URL)

{{<Aside type="note">}}

The default URL class behavior differs from the URL Spec documented above.

A new spec-compliant implementation of the URL class can be enabled using the `url_standard` [compatibility flag](/workers/configuration/compatibility-dates/#compatibility-flags).

{{</Aside>}}

---

## Compression Streams

The `CompressionStream` and `DecompressionStream` classes support the deflate, deflate-raw and gzip compression methods.

[Refer to the MDN documentation for more information](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API)

---

## URLPattern API

The `URLPattern` API provides a mechanism for matching URLs based on a convenient pattern syntax.

[Refer to the MDN documentation for more information](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern).

---

## `navigator.userAgent`

When the [`global_navigator`](/workers/configuration/compatibility-dates/#global-navigator) compatibility flag is set, the [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) property is available with the value `'Cloudflare-Workers'`. This can be used, for example, to reliably determine that code is running within the Workers environment.

## Unhandled promise rejections

The [`unhandledrejection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event) event is emitted by the global scope when a JavaScript promise is rejected without a rejection handler attached.

The [`rejectionhandled`](https://developer.mozilla.org/en-US/docs/Web/API/Window/rejectionhandled_event) event is emitted by the global scope when a JavaScript promise rejection is handled late (after a rejection handler is attached to the promise after an `unhandledrejection` event has already been emitted).

```js
---
header: worker.js
---
addEventListener('unhandledrejection', (event) => {
  console.log(event.promise);  // The promise that was rejected.
  console.log(event.reason);  // The value or Error with which the promise was rejected.
});

addEventListener('rejectionhandled', (event) => {
  console.log(event.promise);  // The promise that was rejected.
  console.log(event.reason);  // The value or Error with which the promise was rejected.
});
```
