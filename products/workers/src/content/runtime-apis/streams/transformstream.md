# TransformStream

## Background

A transform stream consists of a pair of streams: a writable stream, known as its writable side, and a readable stream, known as its readable side. Writes to the writable side result in new data being made available for reading from the readable side.

The Workers platform currently only implements an “identity transform stream”, a type of transform stream which forwards all chunks written to its writable side to its readable side, without any changes.

## Constructor

```js
let { readable, writable } = new TransformStream()
```

<Definitions>

- `TransformStream()` <Type>TransformStream</Type>

    - Returns a new identity transform stream.

</Definitions>

## Properties

<Definitions>

- `readable` <TypeLink href="#readablestream">ReadableStream</TypeLink>
    - An instance of a `ReadableStream`.
- `writable` <TypeLink href="#writablestream">WritableStream</TypeLink>
    - An instance of a `WritableStream`.

</Definitions>

## See also

- [Using Streams.](/learning/using-streams)
- [Transform Streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#transform-stream)
