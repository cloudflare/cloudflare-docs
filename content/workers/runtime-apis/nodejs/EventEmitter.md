---
pcx_content_type: configuration
title: EventEmitter
---

# EventEmitter

{{<render file="_nodejs-compat-howto.md">}}

An `EventEmitter` is an object that emits named events that cause listeners to be called.

```js
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();
emitter.on('hello', (...args) => {
  console.log(...args);
});

emitter.emit('hello', 1, 2, 3);
```

The implementation in the Workers runtime fully supports the entire Node.js `EventEmitter` API. This includes the `captureRejections` option that allows improved handling of async functions as event handlers:

```js
const emitter = new EventEmitter({ captureRejections: true });
emitter.on('hello', async (...args) => {
  throw new Error('boom');
});
emitter.on('error', (err) => {
  // the async promise rejection is emitted here!
});
```

Refer to the [Node.js documentation for `EventEmitter`](https://nodejs.org/api/events.html#class-eventemitter) for more information.