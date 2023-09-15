---
pcx_content_type: configuration
title: WritableStream
---

# WritableStream

## Background

A `WritableStream` is the `writable` property of a [`TransformStream`](/workers/runtime-apis/streams/transformstream/). On the Workers platform, `WritableStream` cannot be directly created using the `WritableStream` constructor.

A typical way to write to a `WritableStream` is to pipe a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/) to it.

```js
readableStream
  .pipeTo(writableStream)
  .then(() => console.log('All data successfully written!'))
  .catch(e => console.error('Something went wrong!', e));
```

To write to a `WritableStream` directly, you must use its writer.

```js
const writer = writableStream.getWriter();
writer.write(data);
```

Refer to the [WritableStreamDefaultWriter](/workers/runtime-apis/streams/writablestreamdefaultwriter/) documentation for further detail.

## Properties

{{<definitions>}}

- `locked` {{<type>}}boolean{{</type>}}

  - A Boolean value to indicate if the writable stream is locked to a writer.

{{</definitions>}}

## Methods

{{<definitions>}}

- {{<code>}}abort(reason{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Promise\<void>{{</type>}}

  - Aborts the stream. This method returns a promise that fulfills with a response `undefined`. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying sink’s abort algorithm. If this writable stream is one side of a [TransformStream](/workers/runtime-apis/streams/transformstream/), then its abort algorithm causes the transform’s readable side to become errored with `reason`.

  {{<Aside type="warning" header="Warning">}}
Any data not yet written is lost upon abort.
  {{</Aside>}}

- `getWriter()` : {{<type-link href="/runtime-apis/streams/writablestreamdefaultwriter">}}WritableStreamDefaultWriter{{</type-link>}}

  - Gets an instance of `WritableStreamDefaultWriter` and locks the `WritableStream` to that writer instance.

{{</definitions>}}

---

## Related resources

- [Streams](/workers/runtime-apis/streams/)
- [Writable streams in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#ws-model)
