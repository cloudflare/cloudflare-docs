---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/218505467-Using-ETag-Headers-with-Cloudflare
title: Using ETag Headers with Cloudflare
---

# Using ETag Headers with Cloudflare

ETag headers identify whether the version of a resource cached in the browser is the same as the resource at the web server. A visitor’s browser stores ETags. When a visitor revisits a site, the browser compares each ETag to the one it stored. Matching values cause a `304 Not-Modified HTTP` response that indicates the cached resource version is current. Cloudflare supports both strong and weak ETags configured at your origin web server.

## Weak ETags

Weak ETag headers indicate a cached resource is semantically equivalent to the version on the web server but not necessarily byte-for-byte identical. Cloudflare supports weak ETag headers on all plans.

{{<Aside type="note">}}
When using weak ETag headers, disable [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/) and [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) to ensure Cloudflare does not remove the ETag headers set by your origin web server.
{{</Aside>}}

## Strong ETags

Strong ETag headers ensure the resource in browser cache and on the web server are byte-for-byte identical. Domains on [Enterprise](https://www.cloudflare.com/pricing/) plans enable strong ETag headers via a **Respect Strong ETags** [Page Rule](/rules/page-rules/) and lower plans customers can enable strong ETag headers using [Cache Rules](/cache/how-to/cache-rules/).

### Behavior with Respect Strong ETags enabled

When you enable **Respect Strong ETags** via Page Rules or Cache Rules, Cloudflare will use strong ETag header validation to ensure that resources in the Cloudflare cache and on the origin server are byte-for-byte identical.

However, in some situations Cloudflare will convert strong ETags to weak ETags. For example, given the following conditions:

- **Respect Strong ETags** is enabled
- [Brotli compression](/speed/optimization/content/brotli/) is enabled
- The origin server's response includes an `etag: "foobar"` strong ETag header

The Cloudflare network will take the following actions, depending on the visitor's `accept-encoding` header and the compression used in the origin server's response:

{{<table-wrap>}}

`accept-encoding`<br>header from visitor | Compression used in origin server response | Cloudflare actions
-----------|--------|--------
`gzip, br` | GZIP   | Return GZIP-compressed response to visitor with strong ETag header: `etag: "foobar"`.
`gzip, br` | Brotli | Return Brotli-compressed response to visitor with strong ETag header: `etag: "foobar"`.
`br`       | GZIP   | Decompress GZIP and return uncompressed response to visitor with weak ETag header: `etag: W/"foobar"`.
`gzip`     | Brotli | Decompress Brotli and return uncompressed response to visitor with weak ETag header: `etag: W/"foobar"`.
`gzip`     | (none) | Return uncompressed response to visitor with strong ETag header: `etag: "foobar"`.

{{</table-wrap>}}

Enabling **Respect Strong ETags** in Cloudflare automatically disables Rocket Loader, Minification, Email Obfuscation, Automatic HTTPS Rewrites, Mirage, Server-side Excludes (SSE), and Railgun (deprecated).

### Behavior with Respect Strong ETags disabled

When **Respect Strong ETags** is disabled, Cloudflare will preserve strong ETag headers set by the origin web server if all the following conditions apply:

- The origin server sends a response compressed using GZIP or Brotli, or an uncompressed response.
- If the origin server sends a compressed response, the visitor accepts the same compression (GZIP, Brotli), according to the `accept-encoding` header.
- [Rocket Loader](/speed/optimization/content/rocket-loader/), [Minification](/speed/optimization/content/auto-minify/), [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/), and [Railgun](/railgun/) (deprecated) features are disabled.

In all other situations, Cloudflare will either convert strong ETag headers to weak ETag headers or remove the strong ETag (for example, when using Minification). For example, given the following conditions:

- **Respect Strong ETags** is disabled
- [Brotli compression](/speed/optimization/content/brotli/) is enabled
- The origin server's response includes an `etag: "foobar"` strong ETag header

The Cloudflare network will take the following actions, depending on the visitor's `accept-encoding` header and the compression used in the origin server's response:

{{<table-wrap>}}

`accept-encoding`<br>header from visitor | Compression used in origin server response | Cloudflare actions
-----------|--------|--------
`gzip, br` | GZIP   | Decompress GZIP and return Brotli-compressed response to visitor (since Brotli compression is enabled) with weak ETag header: `etag: W/"foobar"`.
`gzip, br` | Brotli | Return Brotli-compressed response to visitor with strong ETag header: `etag: "foobar"`.
`br`       | GZIP   | Decompress GZIP and return Brotli-compressed response to visitor with weak ETag header: `etag: W/"foobar"`.
`gzip`     | Brotli | Decompress Brotli and return GZIP-compressed response to visitor with weak ETag header: `etag: W/"foobar"`.
`gzip`     | (none) | Compress origin response using GZIP and return it to visitor with weak ETag header: `etag: W/"foobar"`.

{{</table-wrap>}}

## Important remarks

* You must set the value in a strong ETag header using double quotes (for example, `etag: "foobar"`). If you use an incorrect format, Cloudflare will remove the ETag header instead of converting it to a weak ETag. 

* If a resource is cacheable and there is a cache miss, Cloudflare does not send ETag headers to the origin server. This is because Cloudflare requires the full response body to fill its cache.
