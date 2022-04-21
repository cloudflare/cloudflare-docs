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

Named variants allow you to specify ahead of time which images will need variants. This is defined during the upload. You can create variants with the Images API. For example:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/variants" \
    -H "Authorization: Bearer <API_TOKEN>" \
    -H "Content-Type: application/json" \
    --data '{"id":"<NAME_OF_THE_VARIANT>","options":{"fit":"scale-down","metadata":"none","width":1366,"height":768},"neverRequireSignedURLs":true}'
```

Refer to [Create a variant documentation](https://api.cloudflare.com/#cloudflare-images-variants-create-a-variant) for more information.

## Flexible variants

Flexible variants allow you to create variants with dynamic resizing. Flexible variants are not enabled by default. To activate flexible variants for your account:

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

Flexible variants supports the following properties:

{{<definitions>}}

- `width=x` or `w=x`
  - Specifies maximum width of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- `height=x` or `h=x`
  - Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- `dpr=x`
  - Device Pixel Ratio. Default is `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

- `fit`
  - Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Available modes are:
  
  - `fit=scale-down`
    - Image will be shrunk in size to fully fit within the given `width` or `height`, but will not be enlarged.

  - `fit=contain`
    - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio.

  - `fit=cover`
    - Image will be resized to exactly fill the entire area specified by `width` and `height`, and will cropped if necessary.

  - `fit=crop`
    - Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image will not be enlarged. For images smaller than the given dimensions it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`.

  - `fit=pad`
    - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio, and the extra area will be filled with a `background` color (white by default). Transparent background may be very expensive, and it is better to use `fit=contain` and CSS `object-fit: contain` property instead.

- `gravity` or `g`
  - Cropping with `fit=cover` specifies the most important side or point in the image that should not be cropped off.

  - `gravity=auto`
    - The point will be guessed by looking for areas that stand out the most from image background.

  - `gravity=side` and `gravity=XxY`
    - A side (`"left"`, `"right"`, `"top"`, `"bottom"`) or coordinates specified on a scale from 0.0 (top or left) to 1.0 (bottom or right), 0.5 being the center. The X and Y coordinates are separated by lowercase x. For example, 0x1 means left and bottom, 0.5x0.5 is the center, 0.5x0.33 is a point in the top third of the image.

- `sharpen=x`
  - Specifies strength of sharpening filter. The value is a floating-point number between `0` (no sharpening) and `10` (maximum). `1` is a recommended value.

- `blur=x`
  - Blur radius between `1` (slight blur) and `250` (maximum). Be aware that you cannot use this option to reliably obscure image content, because savvy users can modify an image's URL and remove the blur option. Use Workers to control which options can be set.

- `trim`
    - In the form of `"left"`, `"right"`, `"top"`, `"bottom"`. Specified on a scale from `0;0` (top or left) to `1;0` (bottom or right), `0;5` being the center.

- `metadata`
  - Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

  - `metadata=keep`
    - Preserve most of the image metadata (including GPS location) when possible.

  - `metadata=copyright`
    - Discard all metadata except EXIF copyright tag. This is the default for JPEG images.

  - `metadata=none`
    - Discard all invisible metadata.

- `anim=false`
  - Reduces animations to still images. This setting is recommended to avoid large animated GIF files, or flashing images.

- `rotate`
  - Number of degrees (`90`, `180`, or `270`) to rotate the image by. `width` and `height` options refer to axes after rotation.

- `background`
  - Background color to add underneath the image. Applies only to images with transparency (for example, PNG). Accepts any CSS color, such as `#RRGGBB` and `rgba(…)`.

- `contrast`
- `brightness`
- `gamma`

{{</definitions>}}

### Unsupported properties:

Flexible variants do not support the following properties:

- `quality`
- `format`