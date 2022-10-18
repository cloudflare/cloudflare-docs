---
pcx_content_type: reference
title: Formats and limitations
meta:
    title: Supported formats and limitations
weight: 3
---

# Supported formats and limitations

## Supported input formats

* JPEG
* PNG
* GIF (including animations)
* WebP (no animations)
* SVG

## Supported output formats

* JPEG
* PNG
* GIF (including animations)
* WebP (including animations)
* SVG
* AVIF

## Supported features

Image Resizing can:

* Resize and generate JPEG and PNG images, and optionally AVIF or WebP.
* Save animations as GIF or animated WebP.
* Support ICC color profiles in JPEG and PNG images.
* Preserve JPEG metadata (metadata of other formats is discarded).
* Convert the first frame of GIF animations to a still image.

## Limitations

* SVG files are passed through without resizing. This format is inherently scalable and does not need resizing.
* HEIC (HEIF) format is not supported. Cloudflare does not plan to support this format.

AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.

{{<render file="_svg.md">}}

## Maximum sizes

- Maximum image dimension is 12,000 pixels. 
- Maximum image area is limited to 100 megapixels (for example, 10,000×10,000 pixels large). 
- Maximum file size is 70 MB.
- GIF animations are limited to 100 megapixels total (sum of sizes of all frames). Note that GIF is an outdated format and has very inefficient compression. High-resolution animations will be slow to process and will have very large file sizes. For video clips we recommend using [video formats like MP4 and WebM instead](/stream/).
