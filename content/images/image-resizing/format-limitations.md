---
pcx_content_type: reference
title: Formats and limitations
meta:
    title: Supported formats and limitations
weight: 3
---

# Supported formats and limitations

Cloudflare Image Resizing can:

- Read JPEG, PNG, GIF (including animations), and WebP images.
    * SVG is not supported, since this format is inherently scalable and does not need resizing.
    * Cloudflare does not plan to support the HEIC (HEIF) format.
- Resize and generate JPEG and PNG images, and optionally AVIF or WebP.
- Save animations as GIF or animated WebP.
- Support ICC color profiles in JPEG and PNG images.
- Preserve JPEG metadata. Metadata of other formats is discarded.
- Convert the first frame of GIF animations to a still image.

AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.
