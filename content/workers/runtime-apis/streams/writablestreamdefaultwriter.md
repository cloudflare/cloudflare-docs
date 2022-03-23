---
title: WritableStream DefaultWriter
pcx-content-type: configuration
meta:
  title: WritableStreamDefaultWriter
---

<!-- The space in the title was introduced to create a pleasing line-break in the title in the sidebar. -->

# WritableStreamDefaultWriter

## Background

A writer is used when you want to write directly to a [`WritableStream`](/workers/runtime-apis/streams/writablestream/), rather than piping data to it from a [`ReadableStream`](/workers/runtime-apis/streams/readablestream/). For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">writeArrayToStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">array</span><span class="CodeBlock--token-parameter CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-parameter"> writableStream</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> writer </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> writableStream</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">getWriter</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  array</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">forEach</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">chunk</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> writer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">write</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">chunk</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">catch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> writer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">close</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">writeArrayToStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-number">1</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">2</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">3</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">4</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">5</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> writableStream</span><span class="CodeBlock--token-punctuation">)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">then</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">log</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'All done!'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">catch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">e</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">error</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'Error with the stream: '</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">+</span><span class="CodeBlock--token-plain"> e</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Properties

{{<definitions>}}

- `desiredSize` {{<type>}}int{{</type>}}

  - The size needed to fill the stream’s internal queue, as an integer. Always returns 1, 0 (if the stream is closed), or `null` (if the stream has errors).

- `closed` {{<type>}}Promise\<void>{{</type>}}

  - A promise that indicates if the writer is closed. The promise is fulfilled when the writer stream is closed and rejected if there is an error in the stream.

{{</definitions>}}

## Methods

{{<definitions>}}

- {{<code>}}abort(reason{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} {{<type>}}Promise\<void>{{</type>}}

      *   Aborts the stream. This method returns a promise that fulfills with a response `undefined`. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying sink’s abort algorithm. If this writable stream is one side of a [TransformStream](/workers/runtime-apis/streams/transformstream/), then its abort algorithm causes the transform’s readable side to become errored with `reason`.

        {{<Aside type="warning" header="Warning">}}

  Any data not yet written is lost upon abort.
  {{</Aside>}}

- `close()` {{<type>}}Promise\<void>{{</type>}}

  - Attempts to close the writer. Remaining writes finish processing before the writer is closed. This method returns a promise fulfilled with `undefined` if the writer successfully closes and processes the remaining writes, or rejected on any error.

- `releaseLock()` {{<type>}}void{{</type>}}

  - Releases the writer’s lock on the stream. Once released, the writer is no longer active. You can call this method before all pending `write(chunk)` calls are resolved. This allows you to queue a `write` operation, release the lock, and begin piping into the writable stream from another source, as shown in the example below.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> writer </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> writable</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">getWriter</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">// Write a preamble.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">writer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">write</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">TextEncoder</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">encode</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'foo bar'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">// While that’s still writing, pipe the rest of the body from somewhere else.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">writer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">releaseLock</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> someResponse</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">body</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">pipeTo</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">writable</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

- {{<code>}}write(chunk{{<param-type>}}any{{</param-type>}}){{</code>}} {{<type>}}Promise\<void>{{</type>}}

  - Writes a chunk of data to the writer and returns a promise that resolves if the operation succeeds.

{{</definitions>}}

## Related resources

- [Using Streams](/workers/learning/using-streams/)
- [Writable streams in the WHATWG Streams API specification](https://streams.spec.whatwg.org/#ws-model)
