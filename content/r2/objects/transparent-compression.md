---
title: Transparent decompression
pcx-content-type: how-to
---

# Transparent decompression

Transparent decompression reduces the size of files that are stored, which can help with reducing bandwidth to your origin. With transparent decompression, files are automatically decompressed, but you can still access and use the files or data in their original format. When supported, Cloudflare will always request the compressed content from your web server.

## Content encoding

The `Accept-Encoding` request HTTP header indicates support for compressed content. However, if the header is missing, the content will still be decompressed during the request. 



