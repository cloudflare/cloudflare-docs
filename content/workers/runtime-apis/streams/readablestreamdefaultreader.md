---
title: ReadableStream DefaultReader
pcx_content_type: configuration
meta:
  title: ReadableStreamDefaultReader
---

<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# ReadableStreamDefaultReader

## Background

A reader is used when you want to read from a [ReadableStream](/workers/runtime-apis/streams/readablestream/), rather than piping its output to a [WritableStream](/workers/runtime-apis/streams/writablestream/).

A `ReadableStreamDefaultReader` is not instantiated via its constructor. Rather, it is retrieved from a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/):

```js
const { readable, writable } = new TransformStream();
const reader = readable.getReader();
```

## Properties

{{<definitions>}}

- `closed` {{<type>}}Promise{{</type>}}

  - A promise indicating if the reader is closed. The promise is fulfilled when the reader stream closes and is rejected if there is an error in the stream.

{{</definitions>}}

## Methods

{{<definitions>}}

- `read()` {{<type>}}Promise{{</type>}}

  - A promise that returns the next available chunk of data being passed through the reader queue.

- {{<code>}}cancel(reason{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}void{{</type>}}

  - Cancels the stream. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying source’s cancel algorithm -- if this readable stream is one side of a [TransformStream](/workers/runtime-apis/streams/transformstream/), then its cancel algorithm causes the transform’s writable side to become errored with `reason`.

  {{<Aside type="warning" header="Warning">}}
Any data not yet read is lost.
  {{</Aside>}}

- `releaseLock()` {{<type>}}void{{</type>}}

  - Releases the lock on the readable stream. A lock cannot be released if the reader has pending read operations. A `TypeError` is thrown and the reader remains locked.

{{</definitions>}}

## Related resources

- [Using Streams](/workers/learning/using-streams/)
- [Readable streams in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#rs-model)
