---
title: Vary for images
pcx_content_type: concept
---

# Vary for images

`Vary` is an HTTP response header that allows origins to serve variants of the same content that can be used depending on the browser sending the request.

Cloudflare sits in between the browser and the origin. When Cloudflare receives the origin’s response, the specific image variant is cached so that subsequent requests from browsers with the same image preferences can be served from cache. This also means that serving multiple image variants for the same asset will create distinct cache entries.

`Vary` for Images reduces the content-negotiation process by parsing a request’s `Accept` header, which is sent to the origin to deliver the correct content to the browser.

Vary for images is available for Pro, Business, and Enterprise customers.

## File extensions

You can use vary for images on the file extensions below if the origin server sends the `Vary: Accept` response header. If the origin server sends `Vary: Accept` but does not serve the set variant, the response is not cached and displays `BYPASS` in the cache status in the response header. Additionally, the list of variant types the origin serves for each extension must be configured so that Cloudflare decides which variant to serve without contacting the origin server.

<details>
<summary>
  File extensions enabled for varying
</summary>

<div>
  <ul>
    <li>.avif</li>
    <li>.bmp</li>
    <li>.gif</li>
    <li>.jpg</li>
    <li>.jpeg</li>
    <li>.jp2</li>
    <li>.png</li>
    <li>.tif</li>
    <li>.tiff</li>
    <li>.webp</li>
  </ul>
</div>
</details>

To begin using Vary for Images, refer to [Enable Vary for Images](/cache/how-to/enable-vary-for-images/). To learn more about purging varied images, refer to [Purge varied images](/cache/how-to/purge-cache/#purge-varied-images).
