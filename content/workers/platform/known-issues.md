---
pcx-content-type: concept
title: Known issues
---

# Known issues

Below are some known bugs and issues to be aware of when using Cloudflare Workers.

## Route specificity

- When defining route specificity, a trailing `/*` in your pattern may not act as expected.

Consider two different Workers, each deployed to the same zone. Worker A is assigned the `example.com/images/*` route and Worker B is given the `example.com/images*` route pattern. With these in place, here are how the following URLs will be resolved:

    // (A) example.com/images/*
    // (B) example.com/images*

    "example.com/images"
    // -> B
    "example.com/images123"
    // -> B
    "example.com/images/hello"
    // -> B

You will notice that all examples trigger Worker B. This includes the final example, which exemplifies the unexpected behavior.

## wrangler dev

- When running `wrangler dev`, all outgoing requests are given the `cf-workers-preview-token` header, which Cloudflare recognizes as a preview request. This applies to the entire Cloudflare network, so making HTTP requests to other Cloudflare zones is currently discarded for security reasons. To enable a workaround, insert the following code into your Worker script:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> request </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Request</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">url</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> incomingRequest</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">headers</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">delete</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'cf-workers-preview-token'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">request</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
