---
pcx_content_type: reference
title: Cloudflare Image Resizing
weight: 3
---

# Cloudflare Image Resizing

With Image Resizing, you can transform images on Cloudflare’s edge platform. You can resize, adjust quality, and convert images to WebP or AVIF format on demand. Cloudflare will automatically cache every derived image at the edge, so you only need to store one original image at your origin.

Cloudflare Image Resizing lets you:

* Quickly and easily adapt images to your site’s layout and your visitors’ screen sizes without maintaining a server-side image processing pipeline on your servers.
* Integrate [image processing with Workers](/images/image-resizing/resize-with-workers/), which enables advanced integrations such as custom URL schemes, content negotiation, and responsive images based on Client Hints.

You can use Cloudflare Image Resizing with either a [pre-defined URL format](/images/image-resizing/url-format/) or, for advanced use cases, with [Cloudflare Workers](/images/image-resizing/resize-with-workers/).

## Availability

{{<feature-table id="speed.image_resizing">}}