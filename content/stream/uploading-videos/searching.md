---
pcx-content-type: how-to
title: Searching over videos
---

# Searching over videos

You can search for videos by name through the Stream API by adding a `search` query parameter to the [list media files](https://api.cloudflare.com/#stream-videos-list-videos) endpoint.

## What you will need

To make API requests you will need a [Cloudflare API token](https://www.cloudflare.com/a/account/my-account) and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

## cURL example

This example lists media where the name matches `puppy.mp4`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X GET </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/accounts/</span><span class="CodeBlock--token-string CodeBlock--token-variable">$ACCOUNT</span><span class="CodeBlock--token-string">/stream?search=puppy&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H </span><span class="CodeBlock--token-string">&quot;Authorization: Bearer </span><span class="CodeBlock--token-string CodeBlock--token-variable">$TOKEN</span><span class="CodeBlock--token-string">&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H </span><span class="CodeBlock--token-string">&quot;Content-Type: application/json&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
