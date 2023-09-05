---
_build:
  publishResources: false
  render: never
  list: never
---

#### `anim`

Whether to preserve animation frames from input files. Default is `true`. Setting it to `false` reduces animations to still images. This setting is recommended when enlarging images or processing arbitrary user content, because large GIF animations can weigh tens or even hundreds of megabytes. It is also useful to set `anim:false` when using `format:"json"` to get the response quicker without the number of frames. Example:

```js
---
header: URL format
---
anim=false
```

```js
---
header: Workers
---
cf: {image: {anim: false}}
```

#### `background`

Background color to add underneath the image. Applies to images with transparency (for example, PNG) and images resized with `fit=pad`. Accepts any CSS color, such as `#RRGGBB` and `rgba(…)`. Example:

```js
---
header: URL format
---
background=%23RRGGBB

OR

background=red
```

```js
---
header: Workers
---
cf: {image: {background: "#RRGGBB"}}
```

#### `blur`

Blur radius between `1` (slight blur) and `250` (maximum). Be aware that you cannot use this option to reliably obscure image content, because savvy users can modify an image's URL and remove the blur option. Use Workers to control which options can be set. Example:

```js
---
header: URL format
---
blur=50
```

```js
---
header: Workers
---
cf: {image: {blur: 50}}
```

#### `border`

Adds a border around the image. The border is added after resizing. Border width takes `dpr` into account, and can be specified either using a single `width` property, or individually for each side.

```js
---
header: Workers
---
cf: {image: {border: {color: "rgb(0,0,0,0)", top: 5, right: 10, bottom: 5, left: 10}}}
cf: {image: {border: {color: "#FFFFFF", width: 10}}}
```

#### `brightness`

Increase brightness by a factor. A value of `1.0` equals no change, a value of `0.5` equals half brightness, and a value of `2.0` equals twice as bright. `0` is ignored. Example:

```js
---
header: URL format
---
brightness=0.5
```

```js
---
header: Workers
---
cf: {image: {brightness: 0.5}}
```

#### `compression=fast`

Slightly reduces latency on a cache miss by selecting a quickest-to-compress file format, at a cost of increased file size and lower image quality. It will usually override the `format` option and choose JPEG over WebP or AVIF. We do not recommend using this option, except in unusual circumstances like resizing uncacheable dynamically-generated images.

```js
---
header: URL format
---
compression=fast
```

```js
---
header: Workers
---
cf: {image: {compression: "fast"}}
```

#### `contrast`

Increase contrast by a factor. A value of `1.0` equals no change, a value of `0.5` equals low contrast, and a value of `2.0` equals high contrast. `0` is ignored. Example:

```js
---
header: URL format
---
contrast=0.5
```

```js
---
header: Workers
---
cf: {image: {contrast: 0.5}}
```

#### `dpr`

Device Pixel Ratio. Default is `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`. Example:

```js
---
header: URL format
---
dpr=1
```

```js
---
header: Workers
---
cf: {image: {dpr: 1}}
```

#### `fit`

Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Used as a string in Workers integration. Available modes are:

  - `scale-down`  
  Similar to `contain`, but the image is never enlarged. If the image is larger than given `width` or `height`, it will be resized. Otherwise its original size will be kept. Example:

  ```js
  ---
  header: URL format
  ---
  fit=scale-down
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "scale-down"}}
  ```

  - `contain`  
  Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio. If you only provide a single dimension (for example, only `width`), the image will be shrunk or enlarged to exactly match that dimension. Example:

  ```js
  ---
  header: URL format
  ---
  fit=contain
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "contain"}}
  ```

  - `cover`  
  Resizes (shrinks or enlarges) to fill the entire area of `width` and `height`. If the image has an aspect ratio different from the ratio of `width` and `height`, it will be cropped to fit. Example:

  ```js
  ---
  header: URL format
  ---
  fit=cover
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "cover"}}
  ```

  - `crop`  
  Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image will not be enlarged. For images smaller than the given dimensions, it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`. See also [`trim`](#trim). Example:

  ```js
  ---
  header: URL format
  ---
  fit=crop
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "crop"}}
  ```

  - `pad`  
  Resizes to the maximum size that fits within the given `width` and `height`, and then fills the remaining area with a `background` color (white by default). This mode is not recommended, since you can achieve the same effect more efficiently with the `contain` mode and the CSS `object-fit: contain` property. Example:

  ```js
  ---
  header: URL format
  ---
  fit=pad
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "pad"}}
  ```

#### `format`

{{<Aside type="note" header="Note">}}At the moment, this setting only works directly with [Image Resizing](/images/image-resizing/url-format/).{{</Aside>}}

The `auto` option will serve the WebP or AVIF format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.

Workers integration supports:
- `avif`: Generate images in AVIF format if possible (with WebP as a fallback).
- `webp`: Generate images in Google WebP format. Set the quality to `100` to get the WebP lossless format.
- `jpeg`: Generate images in interlaced progressive JPEG format, in which data is compressed in multiple passes of progressively higher detail.
- `baseline-jpeg`: Generate images in baseline sequential JPEG format. It should be used in cases when target devices don't support progressive JPEG or other modern file formats.
- `json`: Instead of generating an image, outputs information about the image in JSON format. The JSON object will contain data such as image size (before and after resizing), source image’s MIME type, and file size.

Example:

```js
---
header: URL format
---
format=auto
```

```js
---
header: URL format alias
---
f=auto
```

```js
---
header: Workers
---
cf: {image: {format: "avif"}}
```

For the `format:auto` option to work with a custom Worker, you need to parse the `Accept` header. Refer to [this example Worker](/images/image-resizing/resize-with-workers/#an-example-worker) for a complete overview of how to set up an Image Resizing Worker.

```js
---
header: Custom Worker for Image Resizing with `format:auto`
---
const accept = request.headers.get("accept");
let image = {};

if (/image\/avif/.test(accept)) {
    image.format = "avif";
} else if (/image\/webp/.test(accept)) {
    image.format = "webp";
}

return fetch(url, {cf:{image}});
```

#### `gamma`

Increase exposure by a factor. A value of `1.0` equals no change, a value of `0.5` darkens the image, and a value of `2.0` lightens the image. `0` is ignored. Example:

```js
---
header: URL format
---
gamma=0.5
```

```js
---
header: Workers
---
cf: {image: {gamma: 0.5}}
```

#### `gravity`

When cropping with `fit: "cover"` and `fit: "crop"`, this parameter defines the side or point that should not be cropped. Available options are:

  - `auto`  
  Selects focal point based on saliency detection (using maximum symmetric surround algorithm). Example:

  ```js
  ---
  header: URL format
  ---
  gravity=auto
  ```

  ```js
  ---
  header: URL format alias
  ---
  g=auto
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {gravity: "auto"}}
  ```

  - `side`  
  A side (`"left"`, `"right"`, `"top"`, `"bottom"`) or coordinates specified on a scale from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. The X and Y coordinates are separated by lowercase `x` in the URL format. For example, `0x1` means left and bottom, `0.5x0.5` is the center, `0.5x0.33` is a point in the top third of the image.

    For the Workers integration, use an object `{x, y}` to specify coordinates. It contains focal point coordinates in the original image expressed as fractions ranging from `0.0` (top or left) to `1.0` (bottom or right), with `0.5` being the center. `{fit: "cover", gravity: {x:0.5, y:0.2}}` will crop each side to preserve as much as possible around a point at 20% of the height of the source image. Example:

  ```js
  ---
  header: URL format
  ---
  gravity=left

  or

  gravity=0x1
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {gravity: "right"}}

  or

  cf: {image: {gravity: {x:0.5, y:0.2}}}
  ```

#### `height`

Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below). Example:

```js
---
header: URL format
---
height=250
```

```js
---
header: URL format alias
---
h=250
```

```js
---
header: Workers
---
cf: {image: {height: 250}}
```

#### `metadata`

Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option will have no effect. Options are:

  - `keep`  
  Preserves most of EXIF metadata, including GPS location if present. Example:

  ```js
  ---
  header: URL format
  ---
  metadata=keep
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {metadata: "keep"}}
  ```

  - `copyright`  
  Discard all metadata except EXIF copyright tag. This is the default behavior for JPEG images. Example:

  ```js
  ---
  header: URL format
  ---
  metadata=copyright
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {metadata: "copyright"}}
  ```

  - `none`  
  Discard all invisible EXIF metadata. Currently, WebP and PNG output formats always discard metadata. Example:

  ```js
  ---
  header: URL format
  ---
  metadata=none
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {metadata: "none"}}
  ```

#### `onerror=redirect`

{{<Aside type="note" header="Note">}}At the moment, this setting is ignored by Cloudflare Images.{{</Aside>}}

In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via Worker. This option should not be used if there is a chance the source image is very large. This option is ignored if the image is from another domain, but you can use it with subdomains. Example:

```js
---
header: URL format
---
onerror=redirect
```

```js
---
header: Workers
---
cf: {image: {onerror: "redirect"}}
```

#### `quality`

{{<Aside type="note" header="Note">}}At the moment, this setting is ignored by Cloudflare Images.{{</Aside>}}

Specifies quality for images in JPEG, WebP, and AVIF formats. The quality is in a 1-100 scale, but useful values are between `50` (low quality, small file size) and `90` (high quality, large file size). `85` is the default. When using the PNG format, an explicit quality setting allows use of PNG8 (palette) variant of the format. Example:

```js
---
header: URL format
---
quality=50
```

```js
---
header: URL format alias
---
q=50
```

```js
---
header: Workers
---
cf: {image: {quality: 50}}
```

#### `rotate`

Number of degrees (`90`, `180`, or `270`) to rotate the image by. `width` and `height` options refer to axes after rotation. Example:

```js
---
header: URL format
---
rotate=90
```

```js
---
header: Workers
---
cf: {image: {rotate: 90}}
```

#### `sharpen`

Specifies strength of sharpening filter to apply to the image. The value is a floating-point number between `0` (no sharpening, default) and `10` (maximum). `1` is a recommended value for downscaled images. Example:

```js
---
header: URL format
---
sharpen=2
```

```js
---
header: Workers
---
cf: {image: {sharpen: 2}}
```

#### `trim`

Specifies a number of pixels to cut off on each side. Allows removal of borders or cutting out a specific fragment of an image. Trimming is performed before resizing or rotation. Takes `dpr` into account. For Image Resizing and Cloudflare Images, use as four numbers in pixels separated by a semicolon, in the form of `top;right;bottom;left` or via separate values `trim.width`,`trim.height`, `trim.left`,`trim.top`. For the Workers integration, specify an object with properties: `{top, right, bottom, left, width, height}`. Example:

```js
---
header: URL format
---
trim=20;30;20;0
trim.width=678
trim.height=678
trim.left=30
trim.top=40
```

```js
---
header: Workers
---
cf: {image: {trim: {top: 12,  right: 78, bottom: 34, left: 56, width:678, height:678}}}
```

#### `width`

Specifies maximum width of the image in pixels. Exact behavior depends on the `fit` mode (described below). Example:

```js
---
header: URL format
---
width=250
```

```js
---
header: URL format alias
---
w=250
```


```js
---
header: Workers
---
cf: {image: {width: 250}}
```
