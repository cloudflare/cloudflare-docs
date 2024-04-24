---
_build:
  publishResources: false
  render: never
  list: never

name: "Streams BYOB reader detaches buffer"
sort_date: "2021-11-10"
enable_date: "2021-11-10"
enable_flag: "streams_byob_reader_detaches_buffer"
disable_flag: "streams_byob_reader_does_not_detach_buffer"
---

Originally, the Workers runtime did not detach the `ArrayBuffer`s from user-provided TypedArrays when using the [BYOB reader's `read()` method](/workers/runtime-apis/streams/readablestreambyobreader/#methods), as required by the Streams spec, meaning it was possible to inadvertently reuse the same buffer for multiple `read()` calls. This change makes Workers conform to the spec.

User code should never try to reuse an `ArrayBuffer` that has been passed into a [BYOB reader's `read()` method](/workers/runtime-apis/streams/readablestreambyobreader/#methods). Instead, user code can reuse the `ArrayBuffer` backing the result of the `read()` promise, as in the example below.

```js
// Consume and discard `readable` using a single 4KiB buffer.
let reader = readable.getReader({ mode: "byob" });
let arrayBufferView = new Uint8Array(4096);
while (true) {
  let result = await reader.read(arrayBufferView);
  if (result.done) break;
  // Optionally something with `result` here.
  // Re-use the same memory for the next `read()` by creating
  // a new Uint8Array backed by the result's ArrayBuffer.
  arrayBufferView = new Uint8Array(result.value.buffer);
}
```

The more recently added extension method `readAtLeast()` will always detach the `ArrayBuffer` and is unaffected by this feature flag setting.
