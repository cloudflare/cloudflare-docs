---
pcx_content_type: configuration
title: ReadableStream
---

# ReadableStream

## Background

A `ReadableStream` is returned by the `readable` property inside [`TransformStream`](/workers/runtime-apis/streams/transformstream/).

## Properties

{{<definitions>}}

- `locked` {{<type>}}boolean{{</type>}}
  - A Boolean value that indicates if the readable stream is locked to a reader.

{{</definitions>}}

## Methods

{{<definitions>}}

- {{<code>}}pipeTo(destination{{<param-type>}}WritableStream{{</param-type>}}, options{{<param-type>}}PipeToOptions{{</param-type>}}){{</code>}} : {{<type>}}Promise\<void>{{</type>}}

  - Pipes the readable stream to a given writable stream `destination` and returns a promise that is fulfilled when the `write` operation succeeds or rejects it if the operation fails.

- {{<code>}}getReader(options{{<param-type>}}Object{{</param-type>}}){{</code>}} : {{<type-link href="/runtime-apis/streams/readablestreamdefaultreader">}}ReadableStreamDefaultReader{{</type-link>}}

  - Gets an instance of `ReadableStreamDefaultReader` and locks the `ReadableStream` to that reader instance. This method accepts an object argument indicating options. The only supported option is `mode`, which can be set to `byob` to create a [`ReadableStreamBYOBReader`](/workers/runtime-apis/streams/readablestreambyobreader/), as shown here:

```js
let reader = readable.getReader({ mode: 'byob' });
```

{{</definitions>}}

### `PipeToOptions`

{{<definitions>}}

- `preventClose` {{<type>}}bool{{</type>}}

  - When `true`, closure of the source `ReadableStream` will not cause the destination `WritableStream` to be closed.

- `preventAbort` {{<type>}}bool{{</type>}}

  - When `true`, errors in the source `ReadableStream` will no longer abort the destination `WritableStream`. `pipeTo` will return a rejected promise with the error from the source or any error that occurred while aborting the destination.

{{</definitions>}}

---

## Related resources

- [Streams](/workers/runtime-apis/streams/)
- [Readable streams in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#rs-model)
- [MDN’s `ReadableStream` documentation](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
