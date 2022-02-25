---
title: Web standards
pcx-content-type: configuration
meta:
  title: JavaScript and web standards
---

# JavaScript and web standards

The Workers runtime provides the following standardized APIs for use by scripts running at the edge.

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

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob">}}atob(){{</type-link>}}

  - Decodes a string of data which has been encoded using base-64 encoding.

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa">}}btoa(){{</type-link>}}

  - Creates a base-64 encoded ASCII string from a string of binary data.

{{</definitions>}}

### Timers

{{<definitions>}}

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval">}}setInterval(){{</type-link>}}

  - Schedules a function to execute every time a given number of milliseconds elapses.

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval">}}clearInterval(){{</type-link>}}

  - Cancels the repeated execution set using [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout">}}setTimeout(){{</type-link>}}

  - Schedules a function to execute in a given amount of time.

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout">}}clearTimeout(){{</type-link>}}

  - Cancels the delayed execution set using [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

{{</definitions>}}

{{<Aside type="note">}}

Timers are only available inside of [the Request Context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

### EventTarget and Event

The [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) and [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) API allow objects to publish and subscribe to events.

### AbortController and AbortSignal

The [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) APIs provide a common model for canceling asynchronous operations.

### Fetch global

{{<definitions>}}

- {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">}}fetch(){{</type-link>}}

  - Starts the process of fetching a resource from the network. Refer to [Fetch API](/workers/runtime-apis/fetch/).

{{</definitions>}}

{{<Aside type="note">}}

The Fetch API is only available inside of [the Request Context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

---

## Encoding API

Both `TextEncoder` and `TextDecoder` support UTF-8 encoding/decoding.

[Refer to the MDN documentation for more information](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).

---

## URL API

The URL API supports URLs conforming to HTTP and HTTPs schemes.

[Refer to the MDN documentation for more information](https://developer.mozilla.org/en-US/docs/Web/API/URL)

{{<Aside type="note">}}

The Workers’ Runtime’s URL class behavior differs from the URL Spec documented above. If you would like to use another URL implementation, you can [shim the URL class using webpack](/workers/cli-wrangler/webpack/#shimming-globals).

{{</Aside>}}
