---
pcx_content_type: configuration
title: TransformStream
---

# TransformStream

## Background

A transform stream consists of a pair of streams: a writable stream, known as its writable side, and a readable stream, known as its readable side. Writes to the writable side result in new data being made available for reading from the readable side.

The Workers platform currently only implements an identity transform stream, a type of transform stream which forwards all chunks written to its writable side to its readable side, without any changes.

## Constructor

```js
let { readable, writable } = new TransformStream();
```

{{<definitions>}}

- `TransformStream()` {{<type>}}TransformStream{{</type>}}

  - Returns a new identity transform stream.

{{</definitions>}}

## Properties

{{<definitions>}}

- `readable` {{<type-link href="/workers/runtime-apis/streams/readablestream/">}}ReadableStream{{</type-link>}}
  - An instance of a `ReadableStream`.
- `writable` {{<type-link href="/workers/runtime-apis/streams/writablestream/">}}WritableStream{{</type-link>}}
  - An instance of a `WritableStream`.

{{</definitions>}}

## `IdentityTransformStream`

The current implementation of `TransformStream` in the Workers platform is not current compliant with the [Streams Standard](https://streams.spec.whatwg.org/#transform-stream) and we will soon be making changes to the implementation to make it conform with the specification. In preparation for doing so, we have introduced the `IdentityTransformStream` class that implements behavior identical to the current `TransformStream` class. This type of stream forwards all chunks of byte data (in the form of `TypedArray`s) written to its writable side to its readable side, without any changes.

The `IdentityTransformStream` readable side supports [bring your own buffer (BYOB) reads](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamBYOBReader).

### Constructor

```js
let { readable, writable } = new IdentityTransformStream();
```

{{<definitions>}}

- `IdentityTransformStream()` {{<type>}}IdentityTransformStream{{</type>}}

  - Returns a new identity transform stream.

{{</definitions>}}

### Properties

{{<definitions>}}

- `readable` {{<type-link href="/workers/runtime-apis/streams/readablestream/">}}ReadableStream{{</type-link>}}
  - An instance of a `ReadableStream`.
- `writable` {{<type-link href="/workers/runtime-apis/streams/writablestream/">}}WritableStream{{</type-link>}}
  - An instance of a `WritableStream`.

{{</definitions>}}

## `FixedLengthStream`

The `FixedLengthStream` is a specialization of `IdentityTransformStream` that limits the total number of bytes that the stream will passthrough. It is useful primarily because, when using `FixedLengthStream` to produce either a `Response` or `Request`, the fixed length of the stream will be used as the `Content-Length` header value as opposed to use chunked encoding when using any other type of stream. An error will occur if too many, or too few bytes are written through the stream.

### Constructor

```js
let { readable, writable } = new FixedLengthStream(1000);
```

{{<definitions>}}

- `FixedLengthStream(length)` {{<type>}}FixedLengthStream{{</type>}}

  - Returns a new identity transform stream.
  - `length` maybe a `number` or `bigint` with a maximum value of `2^53 - 1`.

{{</definitions>}}

### Properties

{{<definitions>}}

- `readable` {{<type-link href="/workers/runtime-apis/streams/readablestream/">}}ReadableStream{{</type-link>}}
  - An instance of a `ReadableStream`.
- `writable` {{<type-link href="/workers/runtime-apis/streams/writablestream/">}}WritableStream{{</type-link>}}
  - An instance of a `WritableStream`.

{{</definitions>}}

## Related resources

- [Using Streams.](/workers/learning/using-streams/)
- [Transform Streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#transform-stream)
