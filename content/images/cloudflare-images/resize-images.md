---
pcx-content-type: reference
title: Resize images
weight: 4
---

# Resize images

Cloudflare Images supports Variants that specify how images should be resized for different use cases. You can configure up to 20 variants.

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

## Named Variants

You can create variants with the Images API. For example:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/variants" \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    --data '{"id":"<NAME_OF_THE_VARIANT>","options":{"fit":"scale-down","metadata":"none","width":1366,"height":768},"neverRequireSignedURLs":true}'
```

Refer to [Create a variant documentation](https://api.cloudflare.com/#cloudflare-images-variants-create-a-variant) for more information.

## Flexible variants

Flexible variants allow you to specify ahead of time which images will need variants. This is defined during the upload.

Flexible variants are not enabled by default. To activate flexible variants for your account:

```bash
curl -X PATCH https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/config \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    --data '{"flexible_variants": true}'
```

Once done it is possible to use resizing parameters on any Cloudflare Image. For example:

```txt
https://imagedelivery.net/<ACCOUNT_ID>/<IMAGE_ID/w=400,sharpen=3
```

### Supported properties

Flexible variants support the following properties:

- `w` , `width`
- `h` , `height`
- `dpr`
- `fit`
- `g` , `gravity`
- `sharpen`
- `blur`
- `contrast`
- `brightness`
- `gamma`
- `rotate`
- `trim` (in its form “top;right;left;bottom” )
- `background`
- `metadata`
- `anim`

### Unsupported properties:

Flexible variants do not support the following properties:

- `quality`
- `format`