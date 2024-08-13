---
_build:
  publishResources: false
  render: never
  list: never

name: "Returning empty Uint8Array on final BYOB read"
sort_date: "2024-05-13"
enable_date: "2024-05-13"
enable_flag: "internal_stream_byob_return_view"
disable_flag: "internal_stream_byob_return_undefined"
---

In the original implementation of BYOB ("Bring your own buffer") `ReadableStreams`, the `read()` method would return `undefined` when the stream was closed and there was no more data to read. This behavior was inconsistent with the standard `ReadableStream` behavior, which returns an empty `Uint8Array` when the stream is closed.

When the `internal_stream_byob_return_view` flag is used, the BYOB `read()` will implement standard behavior.

```js
const resp = await fetch('https://example.org');
const reader = resp.body.getReader({ mode: 'byob' });
await result = await reader.read(new Uint8Array(10));

if (result.done) {
  // The result gives us an empty Uint8Array...
  console.log(result.value.byteLength); // 0

  // However, it is backed by the same underlying memory that was passed
  // into the read call.
  console.log(result.value.buffer.byteLength); // 10
}
```
