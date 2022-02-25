---
pcx-content-type: configuration
title: TransformStream
---

# TransformStream

## Background

A transform stream consists of a pair of streams: a writable stream, known as its writable side, and a readable stream, known as its readable side. Writes to the writable side result in new data being made available for reading from the readable side.

The Workers platform currently only implements an identity transform stream, a type of transform stream which forwards all chunks written to its writable side to its readable side, without any changes.

## Constructor

```js
let { readable, writable } = new TransformStream()
```

{{<definitions>}}

*   `TransformStream()` {{<type>}}TransformStream{{</type>}}

    *   Returns a new identity transform stream.

{{</definitions>}}

## Properties

{{<definitions>}}

*   `readable` {{<type-link href="#readablestream">}}ReadableStream{{</type-link>}}
    *   An instance of a `ReadableStream`.
*   `writable` {{<type-link href="#writablestream">}}WritableStream{{</type-link>}}
    *   An instance of a `WritableStream`.

{{</definitions>}}

## See also

*   [Using Streams.](/workers/learning/using-streams/)
*   [Transform Streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#transform-stream)
