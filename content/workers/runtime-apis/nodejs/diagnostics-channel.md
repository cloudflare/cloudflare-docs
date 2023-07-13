---
pcx_content_type: configuration
title: Diagnostics Channel
---

# Diagnostics channel

{{<render file="_nodejs-compat-howto.md">}}

The [`diagnostics_channel`](https://nodejs.org/dist/latest-v20.x/docs/api/diagnostics_channel.html) module provides an API to create named channels to report arbitrary message data for diagnostics purposes. The API is essentially a simple event pub/sub model that is specifically designed to support low-overhead diagnostics reporting.

```js

```js
import {
  channel,
  hasSubscribers,
  subscribe,
  unsubscribe,
  tracingChannel,
} from 'node:diagnostics_channel';

// For publishing messages to a channel, acquire a channel object:
const myChannel = channel('my-channel');

// Any JS value can be published to a channel.
myChannel.publish({ foo: 'bar' });

// For receiving messages on a channel, use subscribe:

subscribe('my-channel', (message) => {
  console.log(message);
});
```

All `Channel` instances are singletons per each Isolate/context (for example, the same entry point). Subscribers are always invoked synchronously and in the order they were registered, much like an `EventTarget` or Node.js `EventEmitter` class.

## Integration with Tail Workers

When using [Tail Workers](/workers/platform/tail-workers/), all messages published to any channel will be forwarded also to the [Tail Worker](/workers/platform/tail-workers/). Within the Tail Worker, the diagnostic channel messages can be accessed via the `diagnosticsChannelEvents` property:

```js
export default {
  async tail(events) {
    for (const event of events.diagnosticsChannelEvents) {
      console.log(event.timestamp, event.channel, event.message);
    }
  }
}
```

Note that message published to the tail worker is passed through the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) (same mechanism as the [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) API) so only values that can be successfully cloned are supported.

## `TracingChannel`

Per the Node.js documentation, "[`TracingChannel`](https://nodejs.org/api/diagnostics_channel.html#class-tracingchannel) is a collection of \[Channels\] which together express a single traceable action. `TracingChannel` is used to formalize and simplify the process of producing events for tracing application flow."

```js
import { tracingChannel } from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks'

const channels = tracingChannel('my-channel');
const requestId = new AsyncLocalStorage();
channels.start.bindStore(requestId);

channels.subscribe({
  start(message) {
    console.log(requestId.getStore());  // { requestId: '123' }
    // Handle start message
  },
  end(message) {
    console.log(requestId.getStore());  // { requestId: '123' }
    // Handle end message
  },
  asyncStart(message) {
    console.log(requestId.getStore());  // { requestId: '123' }
    // Handle asyncStart message
  },
  asyncEnd(message) {
    console.log(requestId.getStore());  // { requestId: '123' }
    // Handle asyncEnd message
  },
  error(message) {
    console.log(requestId.getStore());  // { requestId: '123' }
    // Handle error message
  },
});

// The subcriber handlers will be invoked while tracing the execution of the async
// function passed into `channel.tracePromise`...
channel.tracePromise(async () => {
  // Perform some asynchronous work...
}, { requestId: '123' });
```

Refer to the [Node.js documentation for `diagnostics_channel`](https://nodejs.org/dist/latest-v20.x/docs/api/diagnostics_channel.html) for more information.
