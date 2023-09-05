---
pcx_content_type: reference
title: Formats and limitations
weight: 5
meta:
    title: Supported image formats and limitations
---

# Supported image formats and limitations

You can upload the following image formats to Cloudflare Images:

- PNG
- GIF
- JPEG
- WebP (Cloudflare Images does not support uploading animated WebP files)
- SVG

## Dimensions and sizes

These are the maximum allowed sizes and dimensions Cloudflare Images supports:

- Maximum image dimension is 12,000 pixels.
- Maximum image area is limited to 100 megapixels (for example, 10,000×10,000 pixels).
- Image metadata is limited to 1024 bytes.
- Images have a 10 megabyte (MB) size limit.
- Animated GIFs, including all frames, are limited to 50 megapixels (MP).

For image transformations, Cloudflare Images has similar limits to [Image Resizing](/images/image-resizing/format-limitations/#format-limitations).

{{<render file="_svg.md">}}
