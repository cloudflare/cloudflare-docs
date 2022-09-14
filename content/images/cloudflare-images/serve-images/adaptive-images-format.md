---
pcx_content_type: reference
title: Adaptive image format
meta:
    title: Adaptive optimized format delivery
layout: single
weight: 1
---

# Adaptive optimized format delivery

Cloudflare Images automatically transcodes uploaded PNG, JPEG and GIF files to the more efficient AVIF format. This happens whenever the customer browser supports it. If the browser does not support AVIF, Cloudflare will fall back to WebP. If there is no support for WebP, then Cloudflare Images will serve your original files.

When you upload SVG files, Cloudflare serves them after they have been [sanitized by `svg-hush`](/images/cloudflare-images/upload-images/formats-limitations/#sanitized-svgs).