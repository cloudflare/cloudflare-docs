---
pcx_content_type: reference
title: Resize images
weight: 1
---

# Resize images

Resizing images in Cloudflare Images works by creating variants of your image. Variants let you specify how images should be resized for different use cases. Cloudflare Images ships with a default `public` variant, but you can create up to 100 variants to fit your needs.

Each variant has several properties, including the width and height of resized images.

![Configure variants in Cloudflare Images](/images/images/variants.png)

## How to resize an image

{{<Aside type="note">}}Cloudflare Images does not resize SVGs. Refer to [SVG files](/images/cloudflare-images/upload-images/formats-limitations/#svg-files) for more information.{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images** > **Variants**.
3. Name your variant and select **Add New Variant**.
4. Define variables for your new variant, such as resizing options, type of fit, and what do to with metadata.

{{</tab>}}
{{<tab label="api" no-code="true">}}

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/variants" \
  -H "Authorization: Bearer <API_TOKEN>" \     
  -H "Content-Type: application/json" \
  --data '{"id":"<NAME_OF_THE_VARIANT>","options":{"fit":"scale-down","metadata":"none","width":1366,"height":768},"neverRequireSignedURLs":true}
```

Refer to the [API documentation](/api/operations/cloudflare-images-variants-list-variants) for more information regarding creating variants via API.

{{</tab>}}
{{</tabs>}}

## Fit options

The **Fit** property describes how the width and height dimensions should be interpreted. The chart below describes each of the options:

{{<table-wrap>}}

| Fit Options | Behavior |
| --- | --- |
| Scale down  | Image will be shrunk in size to fully fit within the given width or height, but will not be enlarged. |
| Contain     | Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio. |
| Cover       | Image will be resized to exactly fill the entire area specified by width and height, and will be cropped if necessary. |
| Crop        | Image will be shrunk and cropped to fit within the area specified by width and height. The image will not be enlarged. For images smaller than the given dimensions it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`. |
| Pad         | Image will be resized (shrunk or enlarged) to be as large as possible within the given width or height while preserving the aspect ratio, and the extra area will be filled with a background color (white by default). |

{{</table-wrap>}}

## Metadata options

Variants allow you to choose what to do with your image's metadata information, on the **Metadata** property:

- Strip all metadata
- Strip all metadata except copyright
- Keep all metadata

## Override image-level access

Selecting the **Always allow public access** option will make a particular variant always publicly accessible, even when [making images private](/images/cloudflare-images/make-an-image-private/).