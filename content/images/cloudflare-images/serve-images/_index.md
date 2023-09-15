---
pcx_content_type: reference
title: Serve images
layout: single
weight: 7
---

# Serve images

To serve images uploaded to Cloudflare Images, you need three pieces of information:

* Your Images account hash.
* Image ID.
* Variant name.

Assuming you have at least one image uploaded to Images, you will find the basic URL format on your Images dashboard, under **Developer Resources**:

![Serving images with Cloudflare Images](/images/images/image-delivery-url.png)

A typical image delivery URL looks like this:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
```

In this example, you need to replace `<ACCOUNT_HASH>` with your Images account hash, and the `<IMAGE_ID>` and `<VARIANT_NAME>` to begin serving images. 

All the information you need to create an image delivery URL is under the **Developer Resources** section. You can also select **Preview** next to the image you want to serve. This will open a preview of the image with an **Image URL** you can copy. This link will have a fully formed Images URL. Here is an example of what that looks like:

```txt
https://imagedelivery.net/ZWd9g1K7eljCn_KDTu_MWA/083eb7b2-5392-4565-b69e-aff66acddd00/public
```

In this example:

* `ZWd9g1K7eljCn_KDTu_MWA` is the Images account hash.
* `083eb7b2-5392-4565-b69e-aff66acddd00` is the image ID; you can also use [Custom IDs](/images/cloudflare-images/upload-images/custom-id) instead of the generated ID.
* `public` is the variant name.

When a client requests an image, Cloudflare Images will pick the optimal format. This is determined by client headers and the image type. Refer to [Adaptive optimized format delivery](/images/cloudflare-images/serve-images/adaptive-images-format/) for more information.
