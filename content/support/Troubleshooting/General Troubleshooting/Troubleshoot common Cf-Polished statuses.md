---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4412244347917-Troubleshoot-common-Cf-Polished-statuses
title: Troubleshoot common Cf-Polished statuses
---

# Troubleshoot common Cf-Polished statuses



## Overview

If a `Cf-Polished` header is not returned, try [using single-file cache purge](/cache/how-to/purge-cache) to purge the image. The `Cf-Polished` header may also be missing if the origin is sending non-image `Content-Type`, or non-cacheable `Cache-Control`.

-   `input_too_large`: The input image is too large or complex to process, and needs a lower resolution. Cloudflare recommends using PNG or JPEG images that are less than 1,000 pixels and 10 MB.
-   `not_compressed` or `not_needed`: The image was fully optimized at the origin server and no compression was applied.
-   `webp_bigger`: Polish attempted to convert to WebP, but the image was optimized at the origin server or was created using a low quality setting. Because the WebP version does not exist, the status is set on the JPEG/PNG version of the response.
-   `cannot_optimize` or `internal_error`: The input image is corrupted or incomplete at the origin server. Upload a new version of the image to the origin server.
-   `format_not_supported`: The input image format is not supported (for example, BMP or TIFF) or the origin server is using additional optimization software that is not compatible with Polish. Try converting the input image to a web-compatible format (like PNG or JPEG) and/or disabling additional optimization software at the origin server.
-   `vary_header_present`: The origin web server has sent a `Vary` header with a value other than `accept-encoding`. If the origin web server is attempting to support WebP, disable WebP at the origin web server and let Polish perform the WebP conversion. Polish will still work if `accept-encoding` is the only header listed within the `Vary` header.
