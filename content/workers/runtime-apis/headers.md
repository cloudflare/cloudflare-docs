---
pcx-content-type: configuration
title: Headers
---

# Headers

## Background

All HTTP request and response headers are available through the [Headers API](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

When a header name possesses multiple values, those values will be concatenated as a single, comma-delimited string value. This means that `Headers.get` will always return a string or a `null` value. This applies to all header names except for `Set-Cookie`, which requires `Headers.getAll`. This is documented below in [Differences](#differences).
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> headers </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Headers</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">get</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment">//=&gt null</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">set</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'123'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">get</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment">//=&gt &quot;123&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">set</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'hello'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">get</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment">//=&gt &quot;hello&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">append</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'world'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">get</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'x-foo'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment">//=&gt &quot;hello, world&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Differences

- Despite the fact that the `Headers.getAll` method has been made obsolete, Cloudflare still offers this method but only for use with the `Set-Cookie` header. This is because cookies will often contain date strings, which include commas. This can make parsing multiple values in a `Set-Cookie` header more difficult. Any attempts to use `Headers.getAll` with other header names will throw an error. A brief history `Headers.getAll` is available in this [GitHub issue](https://github.com/whatwg/fetch/issues/973).

- In Cloudflare Workers, the `Headers.get` method returns a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) instead of a [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString), which is specified by the spec. For most scenarios, this should have no noticeable effect. To compare the differences between these two string classes, refer to this [Playground example](https://cloudflareworkers.com/#97c644202d0ef43fd73acb6b045529e8:https://tutorial.cloudflareworkers.com).

## Cloudflare headers

Cloudflare sets a number of [its own custom headers on incoming requests](/fundamentals/get-started/http-request-headers) and outgoing responses. While some may be used for its own tracking and bookkeeping, many of these can be useful to your own applications – or Workers – too.

### Request headers

<details>
<summary>CF-Connecting-IP</summary>
<div>

In same-zone Worker subrequests, the value of `CF-Connecting-IP` reflects the value of `x-real-ip` (the client’s IP). `x-real-ip` can be altered by the user in their Worker script.

In cross-zone subrequests from one Cloudflare customer zone to another Cloudflare customer zone, the `CF-Connecting-IP` value will be set to the Worker client IP address `'2a06:98c0:3600::103'` for security reasons.

For Worker subrequests destined for a non-Cloudflare customer zone, the `CF-Connecting-IP` and `x-real-ip` headers will both reflect the client's IP address, with only the `x-real-ip` header able to be altered.

When no Worker subrequest is triggered, `cf-connecting-ip` reflects the client's IP address and the `x-real-ip` header is stripped.

</div>
</details>

<details>
<summary>CF-Worker</summary>
<div>

Added to all Worker subrequests sent via `fetch()`. Set to the name of the zone which owns the Worker making the subrequest. For example, a Worker script on route for `foo.example.com/*` from `example.com` will have all subrequests with the header:

`CF-Worker`: `example.com`

The intended purpose of this header is to provide a means for recipients (for example, origins, load balancers, other Workers) to recognize, filter, and route traffic generated by Workers on specific zones.

{{<Aside type="note">}}

When configuring Cloudflare Firewall Rules, do not match on this header. Firewall Rules are applied before Cloudflare adds the `CF-Worker` header. Instead, use the `cf.worker.upstream_zone`(https://tinyurl.com/2wx4senh) dynamic field, which contains the same value and exists for the same purpose.

{{</Aside>}}

</div>
</details>

<details>
<summary>CF-EW-Via</summary>
<div>

Used for loop detection, similar to the `CDN-Loop` [header](https://blog.cloudflare.com/preventing-request-loops-using-cdn-loop/).

</div>
</details>
