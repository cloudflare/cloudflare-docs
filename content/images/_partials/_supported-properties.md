---
_build:
  publishResources: false
  render: never
  list: never
---

**Caption:**
- CI: Cloudflare Images
- IR: Image Resizing
- WI: Workers integration

{{<definitions>}}

***CI, IR, WI***

- `width=x` or `w=x`
  - Specifies maximum width of the image in pixels. Exact behavior depends on the `fit` mode (described below).

***CI, IR, WI***

- `height=x` or `h=x`
  - Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below).

***CI, IR, WI***

- `dpr=x`
  - Device Pixel Ratio. Default is `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

***CI, IR, WI***

- `fit`
  - Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Available modes are:
  
  - `fit=scale-down`
    - Image will be shrunk in size to fully fit within the given `width` or `height`, but will not be enlarged.

  - `fit=contain`
    - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio.

  - `fit=cover`
    - Image will be resized to exactly fill the entire area specified by `width` and `height`, and will be cropped if necessary.

  - `fit=crop`
    - Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image will not be enlarged. For images smaller than the given dimensions, it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`.

  - `fit=pad`
    - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio, and the extra area will be filled with a `background` color (white by default). Transparent background may be very expensive, and it is better to use `fit=contain` and CSS `object-fit: contain` property instead.

***CI, IR, WI***

- `gravity` or `g`
  - Specifies the most important side or point in the image that should not be cropped off when cropping with `fit=cover`.

  - `gravity=auto`
    - The point will be guessed by looking for areas that stand out the most from image background.

  - `gravity=side` and `gravity=XxY`
    - A side (`"left"`, `"right"`, `"top"`, `"bottom"`) or coordinates specified on a scale from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. The X and Y coordinates are separated by lowercase `x`. For example, `0x1` means left and bottom, `0.5x0.5` is the center, `0.5x0.33` is a point in the top third of the image.

***CI, IR, WI***

- `anim=false`
  - Reduces animations to still images. This setting is recommended to avoid large animated GIF files, or flashing images.

***CI, IR, WI***

- `sharpen=x`
  - Specifies strength of sharpening filter. The value is a floating-point number between `0` (no sharpening) and `10` (maximum). `1` is a recommended value.

***CI, IR, WI***

- `blur=x`
  - Blur radius between `1` (slight blur) and `250` (maximum). Be aware that you cannot use this option to reliably obscure image content, because savvy users can modify an image's URL and remove the blur option. Use Workers to control which options can be set.

***CI, IR, WI***

- `metadata`
  - Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

  - `metadata=keep`
    - Preserve most of the image metadata (including GPS location) when possible.

  - `metadata=copyright`
    - Discard all metadata except EXIF copyright tag. This is the default for JPEG images.

  - `metadata=none`
    - Discard all invisible metadata.

***CI, IR, WI***

- `trim`
    - Four numbers in pixels separated by a semicolon; in the form of `top;right;bottom;left`; ex: `20;30;20;0`

***CI***

- `rotate`
  - Number of degrees (`90`, `180`, or `270`) to rotate the image by. `width` and `height` options refer to axes after rotation.

***CI***

- `background`
  - Background color to add underneath the image. Applies only to images with transparency (for example, PNG). Accepts any CSS color, such as `#RRGGBB` and `rgba(…)`.

***CI***

- `contrast`
  - Increase contrast by a factor. A value of `1.0` equals no change, a value of `0.5` equals low contrast, and a value of `2.0` equals high contrast. `0` is ignored.

***CI***

- `brightness`
  - Increase brightness by a factor. A value of `1.0` equals no change, a value of `0.5` equals half brightness, and a value of `2.0` equals twice as bright. `0` is ignored.

***CI***

- `gamma`
  - Increase exposure by a factor. A value of `1.0` equals no change, a value of `0.5` darkens the image, and a value of `2.0` lightens the image. `0` is ignored.

***IR***

- `quality=x` or `q=x`
  - Specifies quality for images in JPEG, WebP, and AVIF formats. The quality is in a 1-100 scale, but useful values are between `50` (low quality, small file size) and `90` (high quality, large file size). `85` is the default. When using the PNG format, an explicit quality setting allows use of PNG8 (palette) variant of the format.

***IR***

- `format=auto` or `f=auto`
  - Allows serving of the WebP or AVIF format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.

***IR***

- `onerror=redirect`
  - In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via Worker. This option should not be used if there is a chance the source image is very large. This option is ignored if the image is from another domain, but you can use it with subdomains.


{{</definitions>}}
