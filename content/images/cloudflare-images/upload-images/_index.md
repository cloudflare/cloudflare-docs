---
pcx-content-type: concept
title: Upload images
weight: 3
meta:
    title: API token to upload images
---

# Upload images

Cloudflare Images allows developers to upload images using different methods, for a wide range of use cases. When you upload an image, Cloudflare Images will attribute it an automatic default Universal Unique Identifier (UUID). You can, however, specify your own custom path and ID. Refer to [Custom ID](/images/cloudflare-images/upload-images/custom-id/) for more information.

{{<table-wrap>}}

Upload method          | When to use
---------------------- | -----------
Images dashboard       | Quick, one-time uploads where automation is not required.
API                    | A preferred way to upload images from your back-end services.
Direct Creator Uploads | Let your users upload images to Cloudflare Images without exposing your API key or token.
Upload via URL         | When it is useful to use a URL of an image instead of uploading its data.

{{</table-wrap>}}