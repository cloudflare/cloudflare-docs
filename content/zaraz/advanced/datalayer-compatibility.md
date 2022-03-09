---
pcx-content-type: reference
title: Data layer compatibility mode
weight: 0
---

# Data layer compatibility mode

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. This way you can keep your current implementation and Cloudflare Zaraz will automatically collect your events.

In this case, you will keep using the `dataLayer.push` function to send data from the client-side to Zaraz:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dataLayer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">push</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-literal-property">event</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'eventName'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-literal-property">property1</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'value'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

When building a trigger, the only required field is `event`, which will be used as the name of the event you are tracking. The following example shows how to track a purchase event — note that the parameters inside the object depend on what you want to track:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dataLayer</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">push</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-literal-property">event</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'purchase'</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-literal-property">price</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'24'</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-literal-property">currency</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'USD'</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-literal-property">transactionID</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'12345678'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Cloudflare Zaraz then translates the `dataLayer.push()` call to a `zaraz.track()` call. So, `dataLayer.push({event: "purchase", price: "24", "currency": "USD"})` is equivalent to `zaraz.track("purchase", {"price": "24", "currency": "USD"})`.

To track a `dataLayer.push` function, create a trigger with `zaraz.track()`. The following example triggers a `dataLayer.push()` function with a `purchase` event:

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ------------ | --------------------------- | --------------- | ------------ |
| _Match rule_ | `{{ client.__zarazTrack }}` | _Contains_      | `purchase`   |

{{</table-wrap>}}

We do not recommend using `dataLayer`. However, as many websites employ it, Cloudflare Zaras has this automatic translation layer that converts it to `zaraz.track()`.