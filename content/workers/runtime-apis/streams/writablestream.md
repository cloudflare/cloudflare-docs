---
pcx-content-type: configuration
title: WritableStream
---

# WritableStream

## Background

A `WritableStream` is the `writable` property of a [`TransformStream`](/workers/runtime-apis/streams/transformstream/). On the Workers platform, `WritableStream` cannot be directly created using the `WritableStream` constructor.

A typical way to write to a `WritableStream` is to simply pipe a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/) to it.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">readableStream</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">pipeTo</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">writableStream</span><span class="CodeBlock--token-punctuation">)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">then</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">log</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'All data successfully written!'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">catch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">e</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">error</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'Something went wrong!'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> e</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

To write to a `WritableStream` directly, you must use its writer.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> writer </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> writableStream</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">getWriter</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">writer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">write</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">data</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Refer to the [WritableStreamDefaultWriter](/workers/runtime-apis/streams/writablestreamdefaultwriter/) documentation for further detail.

## Properties

{{<definitions>}}

- `locked` {{<type>}}boolean{{</type>}}

  - A Boolean value to indicate if the writable stream is locked to a writer.

{{</definitions>}}

## Methods

{{<definitions>}}

- {{<code>}}abort(reason{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}Promise\<void>{{</type>}}

      *   Aborts the stream. This method returns a promise that fulfills with a response `undefined`. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying sink’s abort algorithm. If this writable stream is one side of a [TransformStream](/workers/runtime-apis/streams/transformstream/), then its abort algorithm causes the transform’s readable side to become errored with `reason`.

      {{<Aside type="warning" header="Warning">}}

  Any data not yet written is lost upon abort.
  {{</Aside>}}

- `getWriter()` {{<type-link href="/runtime-apis/streams/writablestreamdefaultwriter">}}WritableStreamDefaultWriter{{</type-link>}}

  - Gets an instance of `WritableStreamDefaultWriter` and locks the `WritableStream` to that writer instance.

{{</definitions>}}

## Related resources

- [Using Streams.](/workers/learning/using-streams/)
- [Writable streams in the WHATWG Streams API specification.](https://streams.spec.whatwg.org/#ws-model)
