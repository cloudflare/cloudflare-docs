---
pcx-content-type: configuration
title: Request header modification examples
weight: 5
---

# Request header modification examples

The following examples illustrate how to perform request header modifications with Transform Rules:

- [Add an HTTP request header with a static value](#add-an-http-request-header-with-a-static-value)
- [Add an HTTP request header with the current bot score](#add-an-http-request-header-with-the-current-bot-score)
- [Remove an HTTP request header](#remove-an-http-request-header)

## Add an HTTP request header with a static value

The following HTTP Request Header Modification Rule adds a header named `X-Source` with a static value (`Cloudflare`) to the request:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">starts_with(http.request.uri.path, &quot;/en/&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

{{</example>}}

## Add an HTTP request header with the current bot score

The following HTTP Request Header Modification Rule adds a header named `X-Bot-Score` with the current bot score to the request:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">starts_with(http.request.uri.path, &quot;/en/&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

{{</example>}}

## Remove an HTTP request header

The following HTTP Request Header Modification Rule removes the `cf-connecting-ip` header from the request:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">starts_with(http.request.uri.path, &quot;/private/&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

Selected operation under **Modify request header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
