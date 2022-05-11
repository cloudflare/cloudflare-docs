---
pcx-content-type: reference
title: Resize images
weight: 4
---

# Resize images

Cloudflare Images supports variants that specify how images should be resized for different use cases. You can configure up to 20 variants.

Each variant has properties including the width and height of resized images.

![Configure variants in Cloudflare Images](/images/static/variants.png)

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

You can also create variants via API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/variants" \
  -H "Authorization: Bearer <API_TOKEN>" \     
  -H "Content-Type: application/json" \
  --data '{"id":"<NAME_OF_THE_VARIANT>","options":{"fit":"scale-down","metadata":"none","width":1366,"height":768},"neverRequireSignedURLs":true}
```

## Flexible variants

If you need more flexibility when creating variants than the Cloudflare Images dashboard allows, you can use the API to create flexible variants. Flexible variants allow you to create variants with dynamic resizing. This option is not enabled by default. To activate flexible variants for your account:

```bash
curl -X PATCH https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/config \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    --data '{"flexible_variants": true}'
```

Once activated it is possible to use resizing parameters on any Cloudflare Image. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID/w=400,sharpen=3
```

Note that flexible variants cannot be used for images that require a [signed delivery URL](/images/cloudflare-images/serve-images/serve-private-images-using-signed-url-tokens/).

{{<Aside type="warning" header="Warning">}}

Enabling flexible variants on your account effectively allows anyone to obtain untransformed, full-resolution images and their metadata by changing variant properties in the URL.

{{</Aside>}}

### Supported properties

You must specify at least one option. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

{{<render file="_supported-properties.md">}}