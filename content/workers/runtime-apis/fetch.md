---
pcx-content-type: configuration
title: Fetch
---

# Fetch

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

The `fetch` method is implemented on the `ServiceWorkerGlobalScope`. Refer to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more information.

{{<Aside type="note">}}

Asynchronous tasks such as `fetch` are not executed at the top level in a Worker script and must be executed within a `FetchEvent` handler such as [`respondWith`](/workers/runtime-apis/fetch-event/#methods). Learn more about [the Request context](/workers/runtime-apis/request/#the-request-context).

{{</Aside>}}

{{<Aside type="warning" header="Worker to Worker">}}

It is not currently (January 2022) possible to send fetch requests to other Workers (Worker to Worker) within the same zone. The origin server, if any, will receive the request instead. However, sending requests to Workers within other zones is possible and will work as normal.

{{</Aside>}}

---

## Constructor

<!-- This code example needs more work -->
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'fetch'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// NOTE: can’t use fetch here, as we’re not in an async scope yet</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">respondWith</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">eventHandler</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">async</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">eventHandler</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle</span></div></span><span class="CodeBlock--row CodeBlock--row-is-highlighted"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> resp </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> resp</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

<!-- Where do we have the return type in this format? -->

{{<definitions>}}

- {{<code>}}fetch(){{</code>}} {{<type-link href="/runtime-apis/response">}}Promise{`<Response>`}{{</type-link>}}

  - Fetch returns a promise to a Response.

{{</definitions>}}

---

## Properties

{{<definitions>}}

- `request` {{<type-link href="/runtime-apis/request">}}Request{{</type-link>}} | {{<type>}}string{{</type>}}

  - The [`Request`](/workers/runtime-apis/request/) object or a string represents the URL to fetch.

- `init` {{<type-link href="/runtime-apis/request#requestinit">}}RequestInit{{</type-link>}}
  - The content of the request.

{{</definitions>}}

---

## Related resources

- [Example: use `fetch` to respond with another site](/workers/examples/respond-with-another-site/)
- [Example: Fetch HTML](/workers/examples/fetch-html/)
- [Example: Fetch JSON](/workers/examples/fetch-json/)
- [Example: cache using Fetch](/workers/examples/cache-using-fetch/)
