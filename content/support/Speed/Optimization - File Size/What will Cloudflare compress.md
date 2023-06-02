---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-
title: What will Cloudflare compress
---

# What will Cloudflare compress?

Cloudflare supports content compression both when delivering content to your website visitors and when requesting content from your origin server.

## Content compression from the Cloudflare network to website visitors

In addition to Cloudflare's [CDN](/cache/) [caching static content](/cache/concepts/default-cache-behavior/) and [auto-minifying](/support/speed/optimization-file-size/using-cloudflare-auto-minify/) CSS, JavaScript, and HTML content to speed up your site, Cloudflare supports gzip and Brotli compression when delivering content to website visitors.

If supported by visitors' web browsers, Cloudflare will return gzip or Brotli-encoded responses for the following content types:

```
text/html
text/richtext
text/plain
text/css
text/x-script
text/x-component
text/x-java-source
text/x-markdown
application/javascript
application/x-javascript
text/javascript
text/js
image/x-icon
image/vnd.microsoft.icon
application/x-perl
application/x-httpd-cgi
text/xml
application/xml
application/xml+rss
application/vnd.api+json
application/x-protobuf
application/json
multipart/bag
multipart/mixed
application/xhtml+xml
font/ttf
font/otf
font/x-woff
image/svg+xml
application/vnd.ms-fontobject
application/ttf
application/x-ttf
application/otf
application/x-otf
application/truetype
application/opentype
application/x-opentype
application/font-woff
application/eot
application/font
application/font-sfnt
application/wasm
application/javascript-binast
application/manifest+json
application/ld+json
application/graphql+json
application/geo+json
```

Cloudflare's global network can deliver content to website visitors using gzip compression, [Brotli compression](#enable-brotli-compression), or no compression, according to the values visitors provide in the `Accept-Encoding` request header.

### Enable Brotli compression

By default, Brotli compression is enabled for domain on Free and Pro plans and disabled for domains on Business and Enterprise plans.

To enable Brotli compression:

1. [Log in to the Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Speed** > **Optimization**.
3. For **Brotli**, toggle the switch to **On**.

---

## Content compression from origin servers to the Cloudflare network

When requesting content from your origin server, Cloudflare currently supports gzip compression or no compression.

If your origin server responds to a Cloudflare request using gzip compression, we will keep the same compression in the response sent to the website visitor if:

* You include a `Content-Encoding` header in your server response mentioning gzip compression.
* The client supports the compression algorithm.

Cloudflare's reverse proxy can also convert between compressed formats and uncompressed formats. Cloudflare can receive content from your origin server with gzip compression and serve it to visitors uncompressed (or vice versa), independently of caching.

If you do not want a particular response from your origin to be encoded with gzip/Brotli when delivered to website visitors, you can disable this by including a `cache-control: no-transform` HTTP header in the response from your origin web server.

{{<Aside type="warning" header="Warning">}}
Cloudflare will take into consideration the `Accept-Encoding` header value in website visitors' requests when sending responses to those visitors. However, when requesting content from your origin server, Cloudflare will send a different `Accept-Encoding` header, supporting only gzip compression.
{{</Aside>}}
