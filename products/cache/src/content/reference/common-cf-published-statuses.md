---
title: Common Cf-Polished statuses
order: 21
pcx-content-type: navigation
---

# Common Cf-Polished statuses

Below is a list of common Cf-Polished statuses and how to troubleshoot them. If a Cf-Polished header is not returned, try using single-file cache purge to purge the image. The Cf-Polished header may also be missing if the origin is sending non-image Content-Type, or non-cacheable Cache-Control.

- `input_too_large`: The input image is too large or complex to process and needs a lower resolution. Cloudflare recommends using .png or .jpeg images that are less than 1,000px and 10MB.
- `not_compressed` or `not_needed`: The image was fully optimized at the origin server and no compression was applied.
- `webp_bigger`: Polish attempted to convert to WebP, but the image was optimized at the origin server or was created using a low quality setting. Because the WebP version doesn’t exist, the status is set on the JPEG/PNG version of the response.
- `cannot_optimize` or `internal_error`: The input image is corrupted or incomplete at the origin server. Upload a new version of the image to the origin server.
- `format_not_supported`: The input image format is not supported (e.g. BMP, TIFF) or the origin server is using additional optimization software that is not compatible with Polish. Try converting the input image to a web-compatible format (e.g. PNG, JPEG) and/or disabling additional optimization software at the origin server.
- `vary_header_present`: The origin web server has sent a `Vary` header with a value other than accept-encoding. If the origin web server is attempting to support WebP, disable WebP at the origin web server and let Polish perform the WebP conversion. Polish will still work if the accept-encoding is not the only header listed within the Vary header.
