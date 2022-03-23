---
pcx-content-type: concept
title: Using Streams
weight: 0
---

# Using Streams

The [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) is a web standard API that allows JavaScript to programmatically access and process streams of data.

Workers scripts do not need to prepare an entire response body before delivering it to `event.respondWith()`. You can use [`TransformStream`](/workers/runtime-apis/streams/transformstream/) to stream a response body after sending the front matter (that is, HTTP status line and headers). This allows you to minimize:

- The visitor’s time-to-first-byte.
- The buffering done in the Workers script.

Minimizing buffering is especially important for processing or transforming response bodies larger than the Workers script memory limit. For these cases, streaming is the only implementation strategy.

{{<Aside type="note">}}

By default, Cloudflare Workers is capable of streaming responses using the [Streams APIs](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). To maintain the streaming behavior, you should only modify the response body using the methods in the Streams APIs. If your Worker only forwards subrequest responses to the client verbatim without reading their body text, then its body handling is already optimal and you do not have to use these APIs.

{{</Aside>}}

The two primitives developers use to perform active streaming are [`TransformStream`](/workers/runtime-apis/streams/transformstream/) and the [`ReadableStream.pipeTo()`](/workers/runtime-apis/streams/readablestream/#methods) method.

A basic pass-through usage of streams:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'fetch'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">respondWith</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">fetchAndStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">async</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetchAndStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// Fetch from origin server.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> response </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// Create an identity TransformStream (a.k.a. a pipe).</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// The readable side will become our new response body.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> readable</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> writable </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">TransformStream</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// Start pumping the body. NOTE: No await!</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  response</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">body</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">pipeTo</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">writable</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// ... and deliver our Response while that’s running.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Response</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">readable</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> response</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

This example calls `response.body.pipeTo(writable)` but does not `await` it. This is so it does not block the forward progress of the remainder of the `fetchAndStream()` function. It continues to run asynchronously until the response is complete or the client disconnects.

The runtime can continue running a function (`response.body.pipeTo(writable)`) after a response is returned to the client. This example just pumps the subrequest response body to the final response body; however, you can use more complicated logic, such as adding a prefix or a suffix to the body or to process it somehow.

---

## Common issues

{{<Aside type="warning" header="Warning">}}

The Streams API is only available inside of the [Request context](/workers/runtime-apis/request/), inside the `fetch` event listener callback.

{{</Aside>}}

---

## Related resources

- [Streams API Reference](/workers/runtime-apis/streams/)
- [MDN’s Streams API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [Streams API Specification](https://streams.spec.whatwg.org/)
