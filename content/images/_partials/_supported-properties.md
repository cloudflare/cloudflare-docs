---
_build:
  publishResources: false
  render: never
  list: never
---

### `anim`

Specifies whether animation frames should be preserved from input files. The default is `true`.

When the `format` parameter is specified, then `anim=false` will convert the first frame of a GIF animation into a still image.

This setting is recommended when enlarging images or processing arbitrary user-uploaded content, where large GIF animations can weigh tens or even hundreds of megabytes.

|   |   |
|---|---|
|![Image resized to fit=pad with background color filled in](/images/images/anim.gif)| ![Image resized to fit=pad with background color filled in](/images/images/anim-still.jpg)|
| <div style="text-align: center;">Original</div> | <div style="text-align: center;">`format=auto,anim=false`</div> |

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

### `background`

Specifies an opaque color to fill blank or transparent pixels in an image. The default is `%23FFFFFF`.

The background is visible in images with transparent pixels and images that are resized with `fit=pad`. An opaque color can be set by specifying a HEX color code formatted as `%23RRGGBB` or a CSS color name. 

![Image resized to fit=pad with background color filled in](/images/images/background.jpg)

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

### `blur`

Applies a blur radius to an image with a valid range of `0` (no blur) to `250` (maximum blur). The default is `0`.

This parameter should not be used to reliably obscure image content via URL, as the URL can be modified to remove the blur parameter. You can [restrict access to the original image](/images/transform-images/control-origin-access/) through Workers.

![Original image next to modified image with blur set to 50](/images/images/blur.jpg)

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

### `border`

Adds a border around the image. The border is added after resizing. Border width takes `dpr` into account, and can be specified either using a single `width` property, or individually for each side.

```js
---
header: Workers
---
cf: {image: {border: {color: "rgb(0,0,0,0)", top: 5, right: 10, bottom: 5, left: 10}}}
cf: {image: {border: {color: "#FFFFFF", width: 10}}}
```

### `brightness`

Adjusts the overall brightness of an image by a factor. The default is `1`.

- `0` has no change
- `0.5` equals half brightness
- `1` has no change
- `2` equals twice as bright

![Original image shown side by side against image brightened by 0.5 and 1.25](/images/images/brightness.jpg)

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

### `compression=fast`

Selects the output format that is quickest to compress. This slightly reduces the latency on a cache miss, but may result in an increased file size and lower image quality.

The `compression` parameter will usually override the `format` parameter and choose JPEG over more efficient formats like AVIF or WebP.

This option is not recommended, except in unusual circumstances like resizing uncacheable, dynamically-generated images.

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

### `contrast`

Adjusts the overall contrast of an image by a factor. The default is `1`.

- `0` has no change
- `0.5` applies low contrast
- `1` has no change
- `2` applies high contrast

![Original image shown side by side against image brightened by 0.5 and 1.25](/images/images/contrast.jpg)

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

### `device pixel ratio`

Specifies a multiplier to an image’s device pixel ratio so that you can optimize the image for each user’s device.

The device pixel ratio (DPR) is the ratio between physical pixels and logical pixels. Different devices will support different DPRs. A high DPR uses more physical pixels to display an image, which results in a more clear, crisp image.

The `dpr` parameter can be used with `srcset` to [make images responsive](/images/transform-images/make-responsive-images/).

The examples below show how the same image, transformed with different `dpr` options, will display within a 300x200 HTML image tag. A higher DPR will generate a better visual result.

![Original image shown side by side against an image with DPR set to 2.0 and 3.0](/images/images/dpr.jpg)

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

### `fit`

Specifies how an output image should fit within the specified dimensions.

Fit is performed after setting the `width` and `height` dimensions of an image.

Available options are `contain`, `cover`, `crop`, `pad`, and `scale-down`. The default is `contain`.

  - `scale-down`  
Resizes an image to fit within the specified dimensions while preserving the original aspect ratio and without upscaling the original image.

If the original image is smaller than the specified `width` or `height` dimensions, then it will remain the same size.

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
Resizes an image to be as large as possible and fit within the specified dimensions while preserving the original aspect ratio. 

If the original image is smaller than the specified `width` or `height` dimensions, then it will be scaled upwards, which may result in lower image quality. To prevent the image from scaling beyond its original size, use the `scale-down` option instead.

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

In the first example below, a request to transform a 300x200 image to 900x600 results in a lower quality image. 

In the second example, a request to transform a 900x600 image to 400x400 results in a 400x268 image since the image is resized to be as large as possible while still maintaining the original aspect ratio.

![Slightly blurry image of dog in a chair. Blurry effect is a result of trying to transform a smaller image into a larger image.](/images/images/contain-example.png)

```txt
// First example
/cdn-cgi/image/w=900,h=600,fit=contain/image.jpeg

// Second example
/cdn-cgi/image/w=400,h=400,fit=contain/image.jpeg
```

  - `cover`  
Resizes an image to fit the entire area and match the aspect ratio of the specified dimensions.

If the original image has an aspect ratio that is different from the ratio of the specified `width` or `height` dimensions, then the image will be cropped to fit.

If the original image is smaller than the specified `width` or `height` dimensions, then it will be scaled upwards, which may result in lower image quality. To prevent the image from scaling beyond its original size, use the `scale-down` option instead.

In the example below, a request to transform a 900x600 image to 400x400 crops the image to match the requested aspect ratio.

![Clearer image of dog in a chair. Modified image is clearer due to matching aspect ratio. ](/images/images/cover-example.png)

  ```js
  ---
  header: URL format
  ---
  fit=cover

  // Example:
  // /cdn-cgi/image/w=400,h=400,fit=cover/image.jpeg
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "cover"}}
  ```

  - `crop`  
Downscales and crops an image to fit within the specified dimensions. This will never upscale the image beyond its original size.

If the original image is smaller than the specified `width` or `height` dimensions, then it will remain the same size and maintain its original aspect ratio (like the `scale-down` option). 

If the original image is larger than the specified `width` or `height` dimensions, then it will resize to fit the entire area and match the aspect ratio of the specified dimensions (like the `cover` option).

  ```js
  ---
  header: URL format
  ---
  fit=crop

  // Example:
  // /cdn-cgi/image/w=600,h=600,fit=crop/image.jpeg
  ```

  ```js
  ---
  header: Workers
  ---
  cf: {image: {fit: "crop"}}
  ```

  - `pad`  
Resizes an image to the maximum size that fits within the specified dimensions and fills the remaining area with an opaque color. The color can be set using the `background` parameter; the default is `%23FFFFFF`.

If the original image is smaller than the specified `width` or `height` dimensions, then it will be scaled upwards, which may result in lower image quality.

This option is not recommended, since you can achieve the same effect more efficiently using the `contain` option and the CSS `object-fit: contain` property.  

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

### `format`

{{<Aside type="note" header="Note">}}At the moment, this setting only works directly with [image transformations](/images/transform-images/).{{</Aside>}}

Specifies the output format for the transformed image. By default, this parameter is unspecified.

When format is `unspecified`, then a standard format like JPEG or PNG will be used. Cloudflare will default to JPEG when possible due to the large size of PNG files.

Fit is performed after setting the `width` and `height` dimensions of an image.

Available options are `auto`, `avif`, `baseline-jpeg`, `jpeg`, and `json`.

#### `auto` 

  Automatically serves the most efficient format that the requesting browser supports. If this option is not specified, a standard format like JPEG or PNG will be used. Cloudflare will default to JPEG when possible due to the large size of PNG files.

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

For the `format:auto` option to work with a custom Worker, you need to parse the `Accept` header. Refer to [this example Worker](/images/transform-images/transform-via-workers/#an-example-worker) for a complete overview of how to set up an image transformation Worker.

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

### `gamma`

Adjusts the overall exposure of an image by a factor. The default is `1`.

- `0` has no change
- `0.5` darkens the image
- `1` has no change
- `2` lightens the image

![Series of images showing original picture, a darker image with gamma set to 0.5, and a brighter image with gamma set to 1.5](/images/images/gamma.jpg)

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

### `gravity`

Specifies how an image should be cropped when used with `fit=cover` and `fit=crop`.

Available options are `auto`, `face`, a side (`left`, `right`, `top`, `bottom`), and relative coordinates (`XxY` with a valid range of `0.0` to `1.0`).

#### `auto`  
Automatically sets the focal point by using a saliency algorithm to detect the most visually interesting pixels.

![Wide image of flower next to modified image where flower is center and extra space is cropped out.](/images/images/gravity.jpg)

  ```js
  ---
  header: URL format
  ---
  gravity=auto

  // Example
  // /cdn-cgi/image
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

#### `face` 

Automatically sets the focal point based on faces in an image. This can be combined with the zoom parameter to specify how closely the image should be cropped toward the face.

![Wide image of a woman next to modified image where the face is centered and extra space is cropped out.](/images/images/face.jpg)

```js
---
header: URL format alias
 ---
gravity=face
```

```js
---
header: Workers
---
cf: {image: {gravity: "face"}}
```

#### `left,right,top,bottom`

Sets the side of an image that should not be cropped.

```js
---
header: URL format alias
 ---
gravity=left
```

#### `XxY`

Outputs a resized image where the relative coordinates of the output image is positioned at the relative coordinates of the original image. The relative coordinates (`XxY`) are expressed as fractions of the image dimensions where the `X` and `Y` values have a valid range of `0.0` to `1.0`.

![Diagram displaying the range for coordinates when using the XxY parameter.](/images/images/xxy.png)

- For the horizontal value (`X`), `0.0` is the top and `1.0` is the bottom of the image.
- For the vertical value (`Y`), `0.0` is the left and `1.0 `is the right of the image.

In the example below, a request to transform a 900x900 image to 300x900 crops the image and maintains the original aspect ratio. With the `gravity` parameter set to 0.33x0, the relative position of the relative X value of the output image is positioned at the relative X value of the original image.

![Diagram displaying the cropped portion of an image when the gravity parameter is set to 0.33 by 0.](/images/images/xxy2.png)

```js
---
header: URL format
---
gravity=0x1
// This point is the bottom-left corner of the image

// Example
// /cdn-cgi/image/fit=crop,gravity=0.33x0,w=300,h=900/image.jpeg
```

### `height`

Specifies the maximum height of an image in pixels. Exact behavior depends on the `fit` parameter. This can be abbreviated to `h`.

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

### `metadata`

Controls the amount of invisible metadata (EXIF) that should be preserved for an image.

Color profiles and EXIF rotation are applied to the image even if the metadata is discarded.

Available options are `copyright`, `keep`, and `none`. The default for all JPEG images is `copyright`. For other output formats, all metadata is discarded.

{{<Aside type="note">}}

Even when choosing to keep EXIF metadata, Cloudflare will modify JFIF data (potentially invalidating it) to avoid the known incompatibility between the two standards. For more details, refer to [JFIF Compatibility](https://en.wikipedia.org/wiki/JPEG_File_Interchange_Format#Compatibility).

{{</Aside>}}

#### `copyright`  

Discards all metadata except EXIF copyright tag. This option works only for JPEG images.

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

#### `keep`  

Preserves most of EXIF metadata, including GPS location, if present.

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

#### `none`  

Discards all invisible EXIF metadata. If the output format is WebP or PNG, then all metadata will be discarded.

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

### `onerror=redirect`

{{<Aside type="note" header="Note">}}This parameter is not available for images that are stored in Cloudflare Images.{{</Aside>}}

Redirects the end-user to the URL of the original source image when a fatal error prevents the image from being transformed. 

This option works only if the image is in the same zone (subdomains are accepted). If the image is from a different zone, then the option does not have any effect.

This option may be useful in cases where an image requires user authentication and the image cannot be fetched anonymously via Worker. However, this option is not recommended if the source image is very large.


```js
---
header: URL format
---
onerror=redirect
```

### `quality`

Specifies the output quality of an image for JPEG, WebP, and AVIF formats with a valid range of `1` (low quality, small file size) to `100` (high quality, large file size). The default is 85. This can be abbreviated to `q`.

When the output format is PNG, then an explicit quality setting allows the use of PNG8 (palette) variant of the format.

![Two images, one showing a lower quality and smaller image next to a higher quality but larger image. ](/images/images/quality.jpg)


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

### `rotate`

Rotates an image by a number of degrees with valid values of a multiple of `90` (e.g. `90`, `180`, `270`).

Rotation is performed before resizing; `width` and `height` options will refer to the axes after the image is rotated.

![The original image followed by the image rotated 90 degrees and a third image rotated and cropped.](/images/images/rotate.jpg)

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

### `sharpen`

Applies a sharpening filter to an image with a valid range of `0` (no sharpening) to `250` (maximum strength), decimals allowed. The default is `0`.

`1` is the recommended value for downscaled images.

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

### `trim`

Specifies pixels to remove around the side of an image.

Trim takes into account the `dpr` parameter and is performed before resizing and rotation.

Available options are to trim by color or by specific the number of pixels to remove from a side.

#### `color`

Automatically trims the sides of the image based on the border color.

The `trim=color` option can be further adjusted with `trim.col`, `trim.col.keep`, and `trim.tol` parameters.

![Image of shoe with extra whitespace space next to image of shoe with whitespace trimmed.](/images/images/trim.jpg)

```js
---
header: URL format
---
trim=color
```

```js
---
header: Workers
---
cf: {image: {trim: {color}}}
```

This can be useful for removing whitespace around the subject of an image.

In the example below, the two original images have varying amounts of whitespace around the subjects, which can result in inconsistent thumbnails. When the images are placed in HTML `<div>` containers, then the black shoe appears much smaller than the pink shoe.

![Example of image placed in div containers which makes the two shoes in each image appear to be different sizes.](/images/images/trim2.png)

When the whitespace is removed using the `trim=color` option, then the subjects appear much closer in size, as shown below.

![Example of trimming by color and then placing images in containers to make the shoes in each image appear to be similar size.](/images/images/trim3.png)


#### `top;right;bottom;left`

Trim can be applied to a specific side or sides of an image using `trim.left`, `trim.top`, `trim.width` (right) and `trim.height` (bottom).

- `trim.top` specifies how much to remove from the top side of the image.
- `trim.height` sets the height of the image from the top side of the image, then trims everything below the specified height.
- `trim.left` specifies how much to remove from the left side of the image.
- `trim.width` sets the width of the image from the left side of the image, then trims everything to the right of the specified width.

![Examples of different trimming when applied to specific sides of an image.](/images/images/trim4.png)

```txt
trim.top=800
// This removes 800 pixels from the top of the image

trim.height=800
// This sets the height of the image to 800 pixels from the top of the image, then trims everything below that point

trim.left=800
// This removes 800 pixels from the left of the image

trim.width=800
// This sets the width of the image to 800 pixels from the left of the image, then trims everything to the right of that point
```

### `width`

Specifies the maximum width of an image in pixels. Exact behavior depends on the `fit` parameter. This can be abbreviated to `w`.

```js
---
header: URL format
---
width=500
```

```js
---
header: URL format alias
---
w=500
```


```js
---
header: Workers
---
cf: {image: {width: 500}}
```

### `zoom`

Specifies how closely the image is cropped toward the face when combined with the `gravity=face` option. Valid range is from `0` (includes as much of the background as possible) to `1` (crops the image as closely to the face as possible), decimals allowed. The default is `0`.

This controls the threshold for how much of the surrounding pixels around the face will be included in the image.

![Examples of different trimming when applied to specific sides of an image.](/images/images/zoom.jpg)
