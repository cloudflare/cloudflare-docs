---
pcx-content-type: how-to
title: Export image
weight: 9
meta:
  title: Export a single image
---

# Export a single image

You can export a single image from Cloudflare Images. This feature is supported both in the Cloudflare dashboard and via API.

## Export a single image in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Click **Images**.
3. Find the image you want to export and click **Export**.

Your image will be downloaded to your computer.

## Export a single image via API

To download an image via API, the syntax is as follows:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">GET accounts/&ltACCOUNT_ID&gt/images/v1/&ltIMAGE_ID&gt/blob</span></div></span></span></span></code></pre>{{</raw>}}

Example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X GET </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/accounts/023e105f4ecef8ad9ca31a8372d0c353/images/v1/ZxR0pLaXRldlBtaFhhO2FiZGVnaA/blob&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: user@example.com&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">     -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Refer to the [API documentation](https://api.cloudflare.com/#cloudflare-images-base-image) for more information.