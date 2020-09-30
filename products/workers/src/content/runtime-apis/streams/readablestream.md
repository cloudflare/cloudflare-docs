# ReadableStream

## Background

A `ReadableStream` is returned by the `readable` property inside [`TransformStream`](/runtime-apis/streams/transformstream). On the Workers platform, `ReadableStream`
cannot be created directly using the `ReadableStream` constructor.

## Properties

<Definitions>

- `locked` <Type>boolean</Type>
  - A Boolean value that indicates if the readable stream is locked to a reader.

</Definitions>

## Methods

<Definitions>

- <Code>pipeTo(destination<ParamType>WritableStream</ParamType>, options<ParamType>PipeToOptions</ParamType>)</Code> <Type>Promise&lt;void></Type>

  - Pipes the readable stream to a given writable stream `destination` and returns a promise that is fulfilled when the `write` operation succeeds or rejects it if the operation fails.

- <Code>getReader(options<ParamType>Object</ParamType>)</Code> <TypeLink href="/runtime-apis/streams/readablestreamdefaultreader">ReadableStreamDefaultReader</TypeLink>

  - Gets an instance of `ReadableStreamDefaultReader` and locks the `ReadableStream` to that reader instance. This method accepts an object argument indicating _options_.  The only supported option is `mode`, which can be set to `byob` to create a [`ReadableStreamBYOBReader`](/runtime-apis/streams/readablestreambyobreader), as shown here:

    ```js
    let reader = readable.getReader({ mode: "byob" })
    ```

</Definitions>

### `PipeToOptions`

<Definitions>

- `preventClose` <Type>bool</Type>

  - When `true`, closure of the source `ReadableStream` will not cause the destination `WritableStream` to be closed.

- `preventAbort` <Type>bool</Type>

  - When `true`, errors in the source `ReadableStream` will no longer abort the destination `WritableStream`. `pipeTo` will return a rejected promise with the error from the source or any error that occurred while aborting the destination.

</Definitions>

## See also

- [Using Streams.](/learning/using-streams)
- [Readable streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#rs-model)
- [MDN’s ReadableStream documentation.](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
