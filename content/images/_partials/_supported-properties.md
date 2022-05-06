---
_build:
  publishResources: false
  render: never
  list: never
---

{{<definitions>}}

***Options supported by Cloudflare Images, Image Resizing and Workers integration***

- `width=x`
  - Specifies maximum width of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- `height=x`
  - Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- `dpr=x`
  - Device Pixel Ratio. Default is `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

- `fit`
  - Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Available modes are:
  
  - `fit=scale-down`
    - Similar to `contain`, but the image is never enlarged. If the image is larger than given `width` or `height`, it will be resized. Otherwise its original size will be kept.

  - `fit=contain`
    - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio.

  - `fit=cover`
    - Resizes (shrinks or enlarges) to fill the entire area of `width` and `height`. If the image has an aspect ratio different from the ratio of `width` and `height`, it will be cropped to fit.

  - `fit=crop`
    - Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image will not be enlarged. For images smaller than the given dimensions, it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`. See also `trim`.

  - `fit=pad`
    - Resizes to the maximum size that fits within the given `width` and `height`, and then fills the remaining area with a `background` color (white by default). This mode is not recommended, since you can achieve the same effect more efficiently with the `contain` mode and the CSS `object-fit: contain` property.

- `gravity` or `g`
  - When cropping with `fit: "cover"` and `fit: "crop"`, this parameter defines the side or point that should not be cropped.

  - `gravity=auto`
    - Selects focal point based on saliency detection (using maximum symmetric surround algorithm).

  - `gravity=side` and `gravity=XxY` (Image Resizing and Cloudflare Images)
    - A side (`"left"`, `"right"`, `"top"`, `"bottom"`) or coordinates specified on a scale from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. The X and Y coordinates are separated by lowercase `x`. For example, `0x1` means left and bottom, `0.5x0.5` is the center, `0.5x0.33` is a point in the top third of the image.
  
  - Workers integration
    - A string `"left"`, `"right"`, `"top"`, `"bottom"`, or `"center"` (the default). `{fit: "cover", gravity: "top"}` will crop bottom or left and right sides as necessary, but will not crop anything from the top.
    - An object `{x, y}` containing focal point coordinates in the original image expressed as fractions ranging from `0.0` (top or left) to `1.0` (bottom or right), with `0.5` being the center. `{fit: "cover", gravity: {x:0.5, y:0.2}}` will crop each side to preserve as much as possible around a point at 20% of the height of the source image.

- `anim=false`
  - Reduces animations to still images. This setting is recommended to avoid large animated GIF files, or flashing images.

- `sharpen=x`
  - Specifies strength of sharpening filter. The value is a floating-point number between `0` (no sharpening) and `10` (maximum). `1` is a recommended value.

- `blur=x`
  - Blur radius between `1` (slight blur) and `250` (maximum). Be aware that you cannot use this option to reliably obscure image content, because savvy users can modify an image's URL and remove the blur option. Use Workers to control which options can be set.

- `metadata`
  - Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

  - `metadata=keep`
    - Preserve most of the image metadata (including GPS location) when possible.

  - `metadata=copyright`
    - Discard all metadata except EXIF copyright tag. This is the default for JPEG images.

  - `metadata=none`
    - Discard all invisible metadata.

<br/>

***Options supported by Cloudflare Images***

- `trim`
    - Four numbers in pixels separated by a semicolon; in the form of `top;right;bottom;left`; ex: `20;30;20;0`

- `rotate`
  - Number of degrees (`90`, `180`, or `270`) to rotate the image by. `width` and `height` options refer to axes after rotation.

- `background`
  - Background color to add underneath the image. Applies only to images with transparency (for example, PNG). Accepts any CSS color, such as `#RRGGBB` and `rgba(…)`.

- `contrast`
  - Increase contrast by a factor. A value of `1.0` equals no change, a value of `0.5` equals low contrast, and a value of `2.0` equals high contrast. `0` is ignored.

- `brightness`
  - Increase brightness by a factor. A value of `1.0` equals no change, a value of `0.5` equals half brightness, and a value of `2.0` equals twice as bright. `0` is ignored.

- `gamma`
  - Increase exposure by a factor. A value of `1.0` equals no change, a value of `0.5` darkens the image, and a value of `2.0` lightens the image. `0` is ignored.

<br/>

***Options supported by Image Resizing***

- `quality=x`
  - Specifies quality for images in JPEG, WebP, and AVIF formats. The quality is in a 1-100 scale, but useful values are between `50` (low quality, small file size) and `90` (high quality, large file size). `85` is the default. When using the PNG format, an explicit quality setting allows use of PNG8 (palette) variant of the format.

- `format=auto`
  - Allows serving of the WebP or AVIF format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.

- `onerror=redirect`
  - In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via Worker. This option should not be used if there is a chance the source image is very large. This option is ignored if the image is from another domain, but you can use it with subdomains.

***Options supported by Workers integration***

- `trim`
  - An object with four properties `{top, right, bottom, left}` that specify a number of pixels to cut off on each side. Allows removal of borders or cutting out a specific fragment of an image. Trimming is performed before resizing or rotation. Takes `dpr` into account.

- `quality`
  - Quality setting from 1-100 (useful values are in 60-90 range). Lower values make images look worse, but load faster. The default is `85`. Quality `100` will generate very large image files, and is not recommended.
  
    In case of PNG images, an explicit quality setting enables use of 8-bit (palette) variant of the format, using [pngquant](https://pngquant.org)'s quality scale. Images that cannot meet the requested quality with 256 colors will fall back to 24-bit PNG format or JPEG if they are opaque.

- `format`
  - Output format to generate. Options are:
    - `avif` — Generate images in AVIF format if possible (with WebP as a fallback).
    - `webp` — Generate images in Google WebP format. Set `quality` to `100` to get the WebP lossless format.
    - `json` — Instead of generating an image, outputs information about the image in JSON format. The JSON object will contain image size (before and after resizing), source image’s MIME type, file size, etc.

    Other supported formats (PNG, JPEG, animated GIF) are used by default if no other format is specified.

    To automatically serve WebP or AVIF formats to browsers that support them, check if the `Accept` header contains `image/webp` or `image/avif`, and set the format option accordingly.

{{</definitions>}}
