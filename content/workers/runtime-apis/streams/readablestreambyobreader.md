---
title: ReadableStream BYOBReader
pcx_content_type: configuration
meta:
  title: ReadableStreamBYOBReader
---

<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# ReadableStreamBYOBReader

<!-- TODO: See EW-2105. Should we document this if it isn’t effectively using buffer space? -->

## Background

`BYOB` is an abbreviation of bring your own buffer. A `ReadableStreamBYOBReader` allows reading into a developer-supplied buffer, thus minimizing copies.

An instance of `ReadableStreamBYOBReader` is functionally identical to [`ReadableStreamDefaultReader`](/workers/runtime-apis/streams/readablestreamdefaultreader/) with the exception of the `read` method.

A `ReadableStreamBYOBReader` is not instantiated via its constructor. Rather, it is retrieved from a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/):

```js
const { readable, writable } = new TransformStream();
const reader = readable.getReader({ mode: 'byob' });
```

## Methods

{{<definitions>}}

- {{<code>}}read(buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} {{<type-link href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">}}Promise\<ReadableStreamBYOBReadResult>{{</type-link>}}

  - Returns a promise with the next available chunk of data read into a passed-in buffer.

- {{<code>}}readAtLeast(minBytes, buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} {{<type-link href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">}}Promise\<ReadableStreamBYOBReadResult>{{</type-link>}}

  - Returns a promise with the next available chunk of data read into a passed-in buffer. The promise will not resolve until at least `minBytes` have been read.

{{</definitions>}}

## Common issues

{{<Aside type="warning" header="Warning">}}

`read` provides no control over the minimum number of bytes that should be read into the buffer. Even if you allocate a 1 MiB buffer, the kernel is perfectly within its rights to fulfill this read with a single byte, whether or not an EOF immediately follows.

In practice, the Workers team has found that `read` typically fills only 1% of the provided buffer.

`readAtLeast` is a non-standard extension to the Streams API which allows users to specify that at least `minBytes` bytes must be read into the buffer before resolving the read.

{{</Aside>}}

## Related resources

- [Using Streams](/workers/learning/using-streams/)
- [Background about BYOB readers in the Streams API WHATWG specification](https://streams.spec.whatwg.org/#byob-readers)
