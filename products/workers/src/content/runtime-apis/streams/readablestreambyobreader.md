---
title: ReadableStream BYOBReader
---
<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# ReadableStreamBYOBReader

<!-- TODO: See EW-2105. Should we document this if it isn’t effectively using buffer space? -->

## Background

`BYOB` is an abbreviation of "bring your own buffer." A `ReadableStreamBYOBReader` allows reading into a developer-supplied buffer, thus minimizing copies.

An instance of `ReadableStreamBYOBReader` is functionally identical to [`ReadableStreamDefaultReader`](/runtime-apis/streams/readablestreamdefaultreader) with the exception of the `read` method.

A `ReadableStreamBYOBReader` is not instantiated via its constructor. Rather, it is retrieved from a [`ReadableStream`](/runtime-apis/streams/readablestream):

```js
const { readable, writable } = new TransformStream()
const reader = readable.getReader({ mode: "byob" })
```

## Methods

<Definitions>

- <Code>read(buffer<ParamType>ArrayBufferView</ParamType>)</Code> <TypeLink href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">Promise&lt;ReadableStreamBYOBReadResult></TypeLink>

  - Returns a promise with the next available chunk of data read into a passed-in buffer.

</Definitions>

## Common issues

  <Aside type="warning" header="Warning">

  `read` provides no control over the minimum number of bytes that should be read into the buffer. Even if you allocate a 1MiB buffer, the kernel is perfectly within its rights to fulfill this read with a single byte, whether or not an EOF immediately follows.

  In practice, we have found that `read` typically fills only 1% of the provided buffer.

  Workers team is considering implementing or proposing a change to the Streams API to allow users to specify `minBytes` that should be read into the buffer before resolving the read.

  </Aside>

## See also

- [Using Streams.](/learning/using-streams)
- [Background about BYOB readers in the Streams API WHATWG specification.](https://streams.spec.whatwg.org/#byob-readers)
