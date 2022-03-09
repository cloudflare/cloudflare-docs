---
pcx-content-type: configuration
title: TransformStream
---

# TransformStream

## Background

A transform stream consists of a pair of streams: a writable stream, known as its writable side, and a readable stream, known as its readable side. Writes to the writable side result in new data being made available for reading from the readable side.

The Workers platform currently only implements an identity transform stream, a type of transform stream which forwards all chunks written to its writable side to its readable side, without any changes.

## Constructor
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> readable</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> writable </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">TransformStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<definitions>}}

- `TransformStream()` {{<type>}}TransformStream{{</type>}}

  - Returns a new identity transform stream.

{{</definitions>}}

## Properties

{{<definitions>}}

- `readable` {{<type-link href="#readablestream">}}ReadableStream{{</type-link>}}
  - An instance of a `ReadableStream`.
- `writable` {{<type-link href="#writablestream">}}WritableStream{{</type-link>}}
  - An instance of a `WritableStream`.

{{</definitions>}}

## See also

- [Using Streams.](/workers/learning/using-streams/)
- [Transform Streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#transform-stream)
