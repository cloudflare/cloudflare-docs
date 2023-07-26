---
pcx_content_type: reference
title: Formats and limitations
meta:
    title: Supported formats and limitations
    description: Review the supported formats and limitations for Cloudflare Image Resizing.
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

{{<render file="_svg.md">}}

## Format limitations

Since some image formats require longer computational times than others, Cloudflare has to find a proper balance between the time it takes to generate an image and to transfer it over the Internet.

Resizing requests might not be fulfilled with the format the user expects due to these trade-offs Cloudflare has to make. Images differ in size, transformations, codecs and all of these different aspects influence what compression codecs are used.

Cloudflare tries to choose the requested codec, but we operate on a best-effort basis and there are limits that our system needs to follow to satisfy all customers.

AVIF encoding, in particular, can be an order of magnitude slower than encoding to other formats. Cloudflare will fall back to WebP or JPEG if the image is too large to be encoded quickly.

### Limits per format

Hard limits refers to the maximum image size to process. Soft limits refers to the limits existing when the system is overloaded.

File format  | Hard limits on the longest side (width or height) | Soft limits on the longest side (width or height)
------------ | ------------------------------------------------- | -------------------------------------------------
AVIF         | 3,200 pixels                                      | 640 pixels
Other        | 12,000 pixels                                     | N/A
WebP         | N/A                                               | 2,560 pixels for lossy; 1920 pixels for lossless

All images have to be less than 70 MB. The maximum image area is limited to 100 megapixels (for example, 10,000 x 10,000 pixels large).

GIF animations are limited to a total of 50 megapixels (the sum of sizes of all frames). Animations that exceed this will be passed through unchanged without applying any transformations. Note that GIF is an outdated format and has very inefficient compression. High-resolution animations will be slow to process and will have very large file sizes. For video clips, Cloudflare recommends using [video formats like MP4 and WebM instead](/stream/).

{{<Aside type="warning" header="Important">}}
SVG files are passed through without resizing. This format is inherently scalable and does not need resizing. Cloudflare does not support the HEIC (HEIF) format and does not plan to support it.

AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.

{{</Aside>}}
