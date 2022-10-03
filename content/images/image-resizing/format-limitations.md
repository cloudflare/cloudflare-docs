---
pcx_content_type: reference
title: Formats and limitations
meta:
    title: Supported formats and limitations
weight: 3
---

# Supported formats and limitations

## Supported formats

* JPEG
* PNG
* GIF (including animations)
* WebP
* SVG

## Supported features

Image Resizing can:

* Resize and generate JPEG and PNG images, and optionally AVIF or WebP.
* Save animations as GIF or animated WebP.
* Support ICC color profiles in JPEG and PNG images.
* Preserve JPEG metadata (metadata of other formats is discarded).
* Convert the first frame of GIF animations to a still image.

## Not supported

Image Resizing does not:

* Resize SVGs since this format is inherently scalable and does not need resizing.
* Support HEIC (HEIF) format. Cloudflare does not plan to support this format.

AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.

{{<render file="_svg.md">}}

## Maximum sizes

Maximum image size is 100 megapixels (for example, 10,000×10,000 pixels large). Maximum file size is 70 MB. GIF animations are limited to 100 megapixels total (sum of sizes of all frames).
