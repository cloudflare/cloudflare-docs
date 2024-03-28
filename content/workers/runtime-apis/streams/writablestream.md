---
pcx_content_type: configuration
title: WritableStream
---

# WritableStream

## Background

A `WritableStream` can be acquired from:

* Constructing a `new WritableStream(...)` directly, or
* From the `writable` property of a `TransformStream`

Developers should refer to [MDN's `WritableStream` documentation](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) for general details on using the `WritableStream` API.

```js
// Creating a WritableStream from scratch...
const writable = new WritableStream({
  write(chunk) {
    console.log(chunk);
  }
});

// ...

// Getting a WritableStream from a TransformStream...
const { readable, writable } = new TransformStream();
const writer = writable.getWriter();
```

---

## Related resources

- [Streams](/workers/runtime-apis/streams/)
- [Writable streams in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#ws-model)
- [MDN's `WritableStream` documentation](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream)
