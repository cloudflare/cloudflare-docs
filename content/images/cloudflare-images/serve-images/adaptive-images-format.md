---
pcx_content_type: reference
title: Adaptive image format
meta:
    title: Adaptive optimized format delivery
layout: single
weight: 1
---

# Adaptive optimized format delivery

Cloudflare Images automatically transcodes uploaded PNG, JPEG and GIF files to the more efficient AVIF and WebP formats. This happens whenever the customer browser supports them. If the browser does not support AVIF, Cloudflare Images will fall back to WebP. If there is no support for WebP, then Cloudflare Images will serve compressed files in the original format.

Uploaded SVG files are served as [sanitized SVGs](/images/cloudflare-images/upload-images/formats-limitations/#sanitized-svgs).