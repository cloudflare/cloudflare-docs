---
pcx_content_type: configuration
title: ReadableStream
---

# ReadableStream

## Background

A `ReadableStream` is returned by the `readable` property inside [`TransformStream`](/workers/runtime-apis/streams/transformstream/). On the Workers ecosystem, `ReadableStream` cannot be created directly using the `ReadableStream` constructor.

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


- {{<code>}}tee(){{</code>}}

The `ReadableStream` API has a method `tee()` that will split the flow of data from the
`ReadableStream` into two separate `ReadableStream` instances.

In the [standard definition](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee) of the `ReadableStream` API, the `tee()` method creates two
separate `ReadableStream` instances (called "branches") that share a single `Reader` that
consumes the data from the original `ReadableStream` (let's call it the "trunk"). When one
of the two branches uses the shared `Reader` to pull data from the trunk, that data is
used to fulfill the read request from the pulling branch, and a copy of the data is pushed
into a queue in the other branch. That copied data accumulates in memory until something
starts reading from it.

This spec defined behavior presents a problem for us in that it is possible for one branch
to consume data at a far greater pace than the other, causing the slower branch to accumulate
data in memory without any backpressure controls.

In our implementation, we have modified the `tee()` method implementation to avoid this
issue.

Each branch maintains it's own data buffer. But instead of those buffers containing a
copy of the data, they contain a collection of refcounted references to the data. The
backpressure signaling to the trunk is based on the branch wait the most unconsumed data
in its buffer.

```
   +----------------+
   | pull algorithm |
   +----------------+
           |
           ⊽          ..........................................................
   +---------------+  .   +---------------------+      +-------------------+
   | enqueue(data) | ---> | push data to branch | ---> | has pending read? |
   +---------------+  .   +---------------------+      +-------------------+
               |      .                                no |    yes |
               |      .       +-------------------+       |  +--------------+
               |      .       | add data to queue | <-----+  | fulfill read |
               |      .       +-------------------+          +--------------+
               |      ............................................................
               |      .   +---------------------+      +-------------------+
               +--------> | push data to branch | ---> | has pending read? |
                      .   +---------------------+      +-------------------+
                      .                                no |    yes |
                      .       +-------------------+       |  +--------------+
                      .       | add data to queue | <-----+  | fulfill read |
                      .       +-------------------+          +--------------+
                      ............................................................

```

Unfortunately, with this model, we cannot completely avoid the possibility of one branch
reading much slower than the other but we do prevent the memory pileup that would otherwise
occur *so long as the underlying source of the `ReadableStream` is paying proper attention to
the backpressure signaling mechanisms*.



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
