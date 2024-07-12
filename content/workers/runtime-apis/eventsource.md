---
pcx_content_type: configuration
title: EventSource
meta:
  description: EventSource is a server-sent event API that allows a server to push events to a client.
---

# EventSource

## Background

The [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface is a server-sent event API that allows a server to push events to a client. The `EventSource` object is used to receive server-sent events. It connects to a server over HTTP and receives events in a text-based format.

### Constructor

```js
let eventSource = new EventSource(url, options);
```

{{<definitions>}}

- `url` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/URL">}}USVString{{</type-link>}} - The URL to which to connect.
- `options` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource">}}EventSourceInit{{</type-link>}} - An optional dictionary containing any optional settings.

{{</definitions>}}

By default, the `EventSource` will use the global `fetch()` function under the
covers to make requests. If you need to use a different fetch implementation as
provided by a Cloudflare Workers binding, you can pass the `fetcher` option:

```js
export default {
  async fetch(req, env) {
    let eventSource = new EventSource(url, { fetcher: env.MYFETCHER });
    // ...
  }
};
```

Note that the `fetcher` option is a Cloudflare Workers specific extension.

### Properties

{{<definitions>}}

- `eventSource.url` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/EventSource/url">}}USVString{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - The URL of the event source.
- `eventSource.readyState` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/EventSource/readyState">}}USVString{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - The state of the connection.
- `eventSource.withCredentials` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/EventSource/withCredentials">}}Boolean{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - A Boolean indicating whether the `EventSource` object was instantiated with cross-origin (CORS) credentials set (`true`), or not (`false`).

{{</definitions>}}

### Methods

{{<definitions>}}

- `eventSource.close()`
  - Closes the connection.
- `eventSource.onopen`
  - An event handler called when a connection is opened.
- `eventSource.onmessage`
  - An event handler called when a message is received.
- `eventSource.onerror`
  - An event handler called when an error occurs.

{{</definitions>}}

### Events

{{<definitions>}}

- `message`
  - Fired when a message is received.
- `open`
  - Fired when the connection is opened.
- `error`
  - Fired when an error occurs.

{{</definitions>}}

### Class Methods

{{<definitions>}}

- {{<code>}}EventSource.from(readableStream{{<type-link href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream">}}ReadableStream{{</type-link>}}) : EventSource{{</code>}}
  - This is a Cloudflare Workers specific extension that creates a new `EventSource` object from an existing `ReadableStream`. Such an instance does not initiate a new connection but instead attaches to the provided stream.

{{</definitions>}}
