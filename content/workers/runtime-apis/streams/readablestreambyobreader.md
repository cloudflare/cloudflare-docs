---
title: ReadableStream BYOBReader
pcx_content_type: configuration
meta:
  title: ReadableStreamBYOBReader
---

<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# ReadableStreamBYOBReader

## Background

`BYOB` is an abbreviation of bring your own buffer. A `ReadableStreamBYOBReader` allows reading into a developer-supplied buffer, thus minimizing copies.

An instance of `ReadableStreamBYOBReader` is functionally identical to [`ReadableStreamDefaultReader`](/workers/runtime-apis/streams/readablestreamdefaultreader/) with the exception of the `read` method.


```js
// Acquiring a BYOB reader from a fetch...
const resp = await fetch('http://example.org');
const reader = resp.body.getReader({ mode: 'byob' });

// ...

// Acquiring a BYOB reader from an IdentityTransformStream...
const { readable, writable } = new IdentityTransformStream();
const reader = readable.getReader({ mode: 'byob' });
```

---

## Methods

{{<definitions>}}

- {{<code>}}read(buffer{{<param-type>}}ArrayBufferView{{</param-type>}}, options{{<param-type>}}ReadOptions{{</param-type>}}){{</code>}} : {{<type-link href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">}}Promise\<ReadableStreamBYOBReadResult>{{</type-link>}}

  - Returns a promise with the next available chunk of data read into a passed-in buffer.
  - The `options` parameter is an object with a single property, `min`, which is the minimum number of bytes to read into the buffer. If `min` is not provided, the minimum is one byte.

- {{<code>}}readAtLeast(minBytes, buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} : {{<type-link href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">}}Promise\<ReadableStreamBYOBReadResult>{{</type-link>}}

  - Returns a promise with the next available chunk of data read into a passed-in buffer. The promise will not resolve until at least `minBytes` have been read. Note that use of this non-standard extension is no longer necessary. Use the `read(...)` method specifying the `min` option instead.

{{</definitions>}}

---

## Related resources

- [Streams](/workers/runtime-apis/streams/)
- [Background about BYOB readers in the Streams API WHATWG specification](https://streams.spec.whatwg.org/#byob-readers)
