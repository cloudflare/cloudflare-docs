---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-
title: Brotli compression
weight: 1
---

# Brotli compression

Cloudflare applies Brotli compression to help speed up page load times for your visitors. Cloudflare will select Brotli compression as the preferred content encoding method if multiple compression methods are supported by the client. If the client does not indicate that Brotli compression is supported, then gzip compression will be applied.

## Availability

{{<feature-table id="speed.brotli">}}

## Resources

{{<directory-listing>}}