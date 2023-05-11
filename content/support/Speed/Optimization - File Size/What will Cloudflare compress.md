---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-
title: What will Cloudflare compress
---

# What will Cloudflare compress?



In addition to Cloudflare's [CDN](/cache/) [caching static content](/cache/about/default-cache-behavior/) and [auto-minification](https://support.cloudflare.com/hc/en-us/articles/200168196-How-do-I-minify-HTML-CSS-and-JavaScript-to-optimize-my-site-) of CSS, JS & HTML to speed up your site, Cloudflare also provides gzip and brotli compression to help site owners. 

Cloudflare will return gzip or brotli encoded responses to compatible clients / browsers for the following content-types:

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

If you do not want a particular response from your origin to be encoded, you can disable this by setting `cache-control: no-transform` at your origin web server.

___

## Does Cloudflare compress resources?

Yes, Cloudflare applies **gzip** and **brotli** compression to some types of content. We also gzip items based on the browser's UserAgent to help speed up page loading time.

If you're already using gzip we will honor your gzip settings as long as you're passing the details in a header from your web server for the files.

Cloudflare only supports the content types **gzip** towards your origin server and can also only deliver content either **gzip compressed**, **brotli compressed**, or **not compressed**.

Cloudflare's reverse proxy is also able to convert between compressed formats and uncompressed formats, meaning that it can pull content from a customer's origin server via gzip and serve it to clients uncompressed (or vice versa). This is done independently of caching.

{{<Aside type="warning">}}
Please note: The Accept-Encoding header is not respected and will be
removed.
{{</Aside>}}

___

## Enable Brotli compression

By default, Brotli is enabled for domain on Free and Pro plans and disabled for domains on Business and Enterprise plans.

1.  [Log in to the Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2.  Click the **Speed** app.
3.  Click the **Optimization** tab.
4.  Toggle the Brotli switch to **On**.
