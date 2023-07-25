---
title: WritableStream DefaultWriter
pcx_content_type: configuration
meta:
  title: WritableStreamDefaultWriter
---

<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# WritableStreamDefaultWriter

## Background

A writer is used when you want to write directly to a [`WritableStream`](/workers/runtime-apis/streams/writablestream/), rather than piping data to it from a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/). For example:

```js
function writeArrayToStream(array, writableStream) {
  const writer = writableStream.getWriter();
  array.forEach(chunk => writer.write(chunk).catch(() => {}));

  return writer.close();
}

writeArrayToStream([1, 2, 3, 4, 5], writableStream)
  .then(() => console.log('All done!'))
  .catch(e => console.error('Error with the stream: ' + e));
```

## Properties

{{<definitions>}}

- `writer.desiredSize` {{<type>}}int{{</type>}}

  - The size needed to fill the stream’s internal queue, as an integer. Always returns 1, 0 (if the stream is closed), or `null` (if the stream has errors).

- `writer.closed` {{<type>}}Promise\<void>{{</type>}}

  - A promise that indicates if the writer is closed. The promise is fulfilled when the writer stream is closed and rejected if there is an error in the stream.

{{</definitions>}}

## Methods

{{<definitions>}}

- {{<code>}}abort(reason{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise\<void>{{</type>}}

  - Aborts the stream. This method returns a promise that fulfills with a response `undefined`. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying sink’s abort algorithm. If this writable stream is one side of a [TransformStream](/workers/runtime-apis/streams/transformstream/), then its abort algorithm causes the transform’s readable side to become errored with `reason`.

  {{<Aside type="warning" header="Warning">}}
Any data not yet written is lost upon abort.
  {{</Aside>}}

- `close()` : {{<type>}}Promise\<void>{{</type>}}

  - Attempts to close the writer. Remaining writes finish processing before the writer is closed. This method returns a promise fulfilled with `undefined` if the writer successfully closes and processes the remaining writes, or rejected on any error.

- `releaseLock()` : {{<type>}}void{{</type>}}

  - Releases the writer’s lock on the stream. Once released, the writer is no longer active. You can call this method before all pending `write(chunk)` calls are resolved. This allows you to queue a `write` operation, release the lock, and begin piping into the writable stream from another source, as shown in the example below.

```js
let writer = writable.getWriter();
// Write a preamble.
writer.write(new TextEncoder().encode('foo bar'));
// While that’s still writing, pipe the rest of the body from somewhere else.
writer.releaseLock();
await someResponse.body.pipeTo(writable);
```

- {{<code>}}write(chunk{{<param-type>}}any{{</param-type>}}){{</code>}} : {{<type>}}Promise\<void>{{</type>}}

  - Writes a chunk of data to the writer and returns a promise that resolves if the operation succeeds.

{{</definitions>}}

---

## Related resources

- [Streams](/workers/runtime-apis/streams/)
- [Writable streams in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#ws-model)
