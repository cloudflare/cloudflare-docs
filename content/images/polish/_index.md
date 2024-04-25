---
pcx_content_type: concept
title: Cloudflare Polish
weight: 7
---

# Cloudflare Polish

Cloudflare Polish is a one-click image optimization product that automatically optimizes images in your site. Polish strips metadata from images and reduces image size through lossy or lossless compression to accelerate the speed of image downloads.

When an image is fetched from your origin, our systems automatically optimize it in Cloudflare's cache. Subsequent requests for the same image will get the smaller, faster, optimized version of the image, improving the speed of your website.

![Example of Polish compression's quality.](/images/images/polish.png)

## Comparison

* <b>Polish</b> automatically optimizes all images served from your origin server. It keeps the same image URLs, and does not require changing markup of your pages.
* <b>Cloudflare Images</b> API allows you to create new images with resizing, cropping, watermarks, and other processing applied. These images get their own new URLs, and you need to embed them on your pages to take advantage of this service. Images created this way are already optimized, and there is no need to apply Polish to them.

## Availability

{{<feature-table id="speed.polish">}}
