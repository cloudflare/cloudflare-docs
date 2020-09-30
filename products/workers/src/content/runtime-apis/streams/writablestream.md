# WritableStream

## Background

A `WritableStream` is the `writable` property of a [`TransformStream`](/runtime-apis/streams/transformstream). On the Workers platform, `WritableStream` can’t be directly created using the `WritableStream` constructor.

A typical way to write to a `WritableStream` is to simply pipe a [`ReadableStream`](/runtime-apis/streams/readablestream) to it.

```js
readableStream.pipeTo(writableStream)
  .then(() => console.log("All data successfully written!"))
  .catch(e => console.error("Something went wrong!", e))
```

To write to a `WritableStream` directly, you must use its writer.

```js
const writer = writableStream.getWriter()
writer.write(data)
```

See the [WritableStreamDefaultWriter](/runtime-apis/streams/writablestreamdefaultwriter) documentation for further detail.

## Properties

<Definitions>

- `locked` <Type>boolean</Type>

  - A Boolean value to indicate if the writable stream is locked to a writer.

</Definitions>

## Methods

<Definitions>

- <Code>abort(reason<ParamType>string</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Promise&lt;void></Type>

  - Aborts the stream. This method returns a promise that fulfills with a response `undefined`. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying sink’s abort algorithm. If this writable stream is one side of a [TransformStream](/runtime-apis/streams/transformstream), then its abort algorithm causes the transform’s readable side to become errored with `reason`.

  <Aside type="warning" header="Warning">

  Any data not yet written is lost upon abort.

  </Aside>

- `getWriter()` <TypeLink href="/runtime-apis/streams/writablestreamdefaultwriter">WritableStreamDefaultWriter</TypeLink>

  - Gets an instance of `WritableStreamDefaultWriter` and locks the `WritableStream` to that writer instance.

</Definitions>

## See also

- [Using Streams.](/learning/using-streams)
- [Writable streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#ws-model)
