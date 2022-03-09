---
pcx-content-type: reference
title: Domains not proxied by Cloudflare
weight: 0
meta:
  title: Use Zaraz on domains not proxied by Cloudflare
---

# Use Zaraz on domains not proxied by Cloudflare

You can load Zaraz on domains that are not proxied through Cloudflare. However, you will need to create a separate domain, or subdomain, proxied by Cloudflare (also [known as orange-clouded](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) domains), and load the script from it:

1. Create a new subdomain like `my-subdomain.example.com` and proxy it through Cloudflare. Refer to [Enabling the Orange Cloud](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) for more information.
2. Add the following script to your main website’s HTML, immediately before the `</head>` tag closes:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-html" language="html"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">script</span><span class="CodeBlock--token-tag"> </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">src</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">https://my-subdomain.example.com/cdn-cgi/zaraz/i.js</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">script</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}