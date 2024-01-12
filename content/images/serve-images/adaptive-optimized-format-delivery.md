---
pcx_content_type: how-to
title: Adaptive optimized format delivery
weight: 7
---

# Adaptive optimized format delivery

Cloudflare Images automatically transcodes uploaded PNG, JPEG and GIF files to the more efficient AVIF and WebP formats. This happens whenever the customer browser supports them. If the browser does not support AVIF, Cloudflare Images will fall back to WebP. If there is no support for WebP, then Cloudflare Images will serve compressed files in the original format.]

Cloudflare tries to choose the requested codec, but we operate on a best-effort basis and there are limits that our system needs to follow to satisfy all customers.

AVIF encoding, in particular, can be an order of magnitude slower than encoding to other formats. Cloudflare will fall back to WebP or JPEG if the image is too large to be encoded quickly.

Uploaded SVG files are served as [sanitized SVGs](/images/upload-images/#supported-image-formats).