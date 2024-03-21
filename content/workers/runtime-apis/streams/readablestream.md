---
pcx_content_type: configuration
title: ReadableStream
---

# ReadableStream

## Background

A `ReadbleStream` can be acquired from:

* The `request.body` or `response.body` property when using the `fetch()` API or in a fetch event handler,
* Constructing a `new ReadableStream(...)` directly, or
* From the `readable` property of a `TransformStream`

Developers should refer to [MDN’s `ReadableStream` documentation](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) for general details on using the `ReadableStream` API.

```js
// Getting a ReadableStream from a fetch...
const resp = await fetch('http://example.org');

// resp.body is a ReadableStream
const readable = resp.body;
const reader = readable.getReader();
await reader.read();

// ...

// Creating a ReadableStream from scratch...
const readable = new ReadableStream({
  pull(controller) {
    controller.enqueue('Hello, ');
    controller.enqueue('world!');
    controller.close();
  }
});

// ...

// Getting a ReadableStream from a TransformStream...
const { readable, writable } = new TransformStream();
const reader = readable.getReader();

// ...
```

## Workers-specific extensions and details

### `readAtLeast` in BYOB-Readers

There are generally two types of streams: byte-oriented and value-oriented. A byte-oriented stream is a stream that is read in chunks of bytes, while a value-oriented stream is read in chunks of values. The `readAtLeast` method is a worker-specific extension to the `ReadableStreamBYOBReader` interface that allows you to read a minimum number of bytes from a byte-oriented stream.

**Using this extension is no longer necessary as the standard streams API now includes a `min` option that accomplishes the same task.**

```js
const rs = new ReadableStream({
  type: 'bytes',
  pull(controller) {
    controller.enqueue(new Uint8Array([1, 2, 3, 4, 5]));
    controller.close();
  }
});

const byobReader = rs.getReader({ mode: 'byob' });

// Read at least 3 bytes and at most 5 bytes.
// The read promise will not be resolved until at least 3 bytes have been read
const result = await byobReader.readAtLeast(3, new Uint8Array(5));

// **** NOTE: USING readAtLeast IS NO LONGER NECESSARY ****
// **** Instead, use the new standard API ****
const result = await byobReader.read(new Uint8Array(5), { min: 3 });
```

### Data buffering in `tee()` streams

Per the specification of [`ReadableStream`](https://streams.spec.whatwg.org/#rs-model), when a `ReadableStream` is teed, the data flows at the rate of the *fastest* reader. This means that if one teed branch is reading data slower than the other, the data will be buffered in the slower branch. This can lead to memory exhaustion if the slower branch is reading data at a much slower rate than the faster branch.

In the Workers runtime, the `tee()` method has been modified to limit buffering in such scenarios. The fastest branch will still be able to read buffered data at its own pace, but rather than each tee branch maintaining a separate buffer, the data will be held in a shared buffer that will be freed only when all branches have read the data. Importantly, this shared buffer will signal backpressure to the original stream at the pace of the slowest reader. This protects against slow readers causing memory exhaustion.


---

## Related resources

- [`ReadableStream` in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#rs-model)
- [MDN’s `ReadableStream` documentation](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
