---
title: ReadableStream BYOBReader
pcx-content-type: configuration
meta:
  title: ReadableStreamBYOBReader
---

<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# ReadableStreamBYOBReader

<!-- TODO: See EW-2105. Should we document this if it isn’t effectively using buffer space? -->

## Background

`BYOB` is an abbreviation of bring your own buffer. A `ReadableStreamBYOBReader` allows reading into a developer-supplied buffer, thus minimizing copies.

An instance of `ReadableStreamBYOBReader` is functionally identical to [`ReadableStreamDefaultReader`](/workers/runtime-apis/streams/readablestreamdefaultreader/) with the exception of the `read` method.

A `ReadableStreamBYOBReader` is not instantiated via its constructor. Rather, it is retrieved from a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/):
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> readable</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> writable </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">TransformStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> reader </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> readable</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">getReader</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-literal-property">mode</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'byob'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Methods

{{<definitions>}}

- {{<code>}}read(buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} {{<type-link href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">}}Promise\<ReadableStreamBYOBReadResult>{{</type-link>}}

  - Returns a promise with the next available chunk of data read into a passed-in buffer.

- {{<code>}}readAtLeast(minBytes, buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} {{<type-link href="https://streams.spec.whatwg.org/#dictdef-readablestreambyobreadresult">}}Promise\<ReadableStreamBYOBReadResult>{{</type-link>}}

  - Returns a promise with the next available chunk of data read into a passed-in buffer. The promise will not resolve until at least `minBytes` have been read.

{{</definitions>}}

## Common issues

{{<Aside type="warning" header="Warning">}}

`read` provides no control over the minimum number of bytes that should be read into the buffer. Even if you allocate a 1 MiB buffer, the kernel is perfectly within its rights to fulfill this read with a single byte, whether or not an EOF immediately follows.

In practice, the Workers team has found that `read` typically fills only 1% of the provided buffer.

`readAtLeast` is a non-standard extension to the Streams API which allows users to specify that at least `minBytes` bytes must be read into the buffer before resolving the read.

{{</Aside>}}

## Related resources

- [Using Streams](/workers/learning/using-streams/)
- [Background about BYOB readers in the Streams API WHATWG specification](https://streams.spec.whatwg.org/#byob-readers)
