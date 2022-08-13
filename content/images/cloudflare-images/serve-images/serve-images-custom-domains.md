---
pcx_content_type: reference
title: Custom domains
layout: single
meta:
  title: Serve images from custom domains
weight: 2
---

# Serve images from custom domains

Image delivery is supported from all customer domains under the same Cloudflare account. To serve images through custom domains, an image URL should be adjusted to the following format:

```txt
https://example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
```

Example with a custom domain:

```txt
https://example.com/cdn-cgi/imagedelivery/ZWd9g1K7eljCn_KDTu_MWA/083eb7b2-5392-4565-b69e-aff66acddd00/public
```

In this example, `<ACCOUNT_HASH>`, `<IMAGE_ID>` and `<VARIANT_NAME>` are the same, but the hostname and prefix path is different:

- `example.com`: Cloudflare proxied domain under the same account as the Cloudflare Images.
- `/cdn-cgi/imagedelivery`: Path to trigger `cdn-cgi` image proxy.
- `ZWd9g1K7eljCn_KDTu_MWA`: The Images account hash.
- `083eb7b2-5392-4565-b69e-aff66acddd00`: The image ID.
- `public`: The variant name.
