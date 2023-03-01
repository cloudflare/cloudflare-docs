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

![Serving images with Cloudflare Images](/images/static/image-delivery-url.png)

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

## Browser TTL

Browser TTL controls how long an image stays in a browser's cache and specifically configures the `cache-control` response header.

### Default TTL

By default, an image's TTL is set to two days to meet user needs, such as re-uploading an image under the same [Custom ID](/images/cloudflare-images/upload-images/custom-id/).

## Custom setting

You can use two custom settings to control the Browser TTL, an account or a named variant. To adjust how long a browser should keep an image in the cache, set the TTL in seconds, similar to how the `max-age` header is set. The value should be an interval between one hour to one year.

### Browser TTL for an account

Setting the Browser TTL per account overrides the default TTL.

```bash
---
header: Example
---
curl --request PATCH 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_TAG>/images/v1/config' \
--header 'Authorization: Bearer <BEARER_TOKEN>' \
--header 'Content-Type: application/json' \
-d @config.json
config.json:
{
    "browser_tll": 31536000
}
```

When the Browser TTL is set to one year for all images, the response for the `cache-control` header is essentially `public`, `max-age=31536000`, `stale-while-revalidate=7200`.

### Browser TTL for a named variant

Setting the Browser TTL for a named variant is a more granular option that overrides all of the above when creating or updating an image variant, specifically the `browser_ttl` option in seconds.

```bash
---
header: Example
---
curl --request POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_TAG>/images/v1/variants' \
--header 'Authorization: Bearer <BEARER_TOKEN>' \
--header 'Content-Type: application/json' \
-d @config.json
variant.json:
{
    "id":"avatar",
    "options": {
       "width":100,
       "browser_tll": 86400
    },
}
```

When the Browser TTL is set to one day for images requested with this variant, the response for the `cache-control` header is essentially `public`, `max-age=86400`, `stale-while-revalidate=7200`.

{{<Aside type="note">}}

[Private images](/images/cloudflare-images/make-an-image-private/) do not respect default or custom TTL settings. The private images cache time is set according to the expiration time and can be as short as one hour.

{{</Aside>}}
