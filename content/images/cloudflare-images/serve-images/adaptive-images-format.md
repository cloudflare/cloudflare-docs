---
pcx_content_type: reference
title: Adaptive image format
meta:
    title: Adaptive optimized format delivery
layout: single
weight: 1
---

# Adaptive optimized format delivery

Cloudflare Images automatically serves AVIF and WebP when the browser supports these efficient image formats, regardless of the format you upload. 

The first format that Cloudflare Images will try to serve is AVIF. It will fall back to WebP if the browser does not support AVIF. If the browser does not support either AVIF or WebP, Cloudflare Images will default to serving the [image format you uploaded](/images/cloudflare-images/upload-images/supported-formats/).