---
title: Resizing with Workers
order: 3
---

# Resizing with Cloudflare Workers

There are two ways of using image resizing. One is the [default URL scheme](/url-format), which provides an easy, declarative way of specifying image dimensions and other options.
The other way is to use a JavaScript API in a [Worker](https://developers.cloudflare.com/workers/learning/getting-started). Workers give powerful programmatic control over every image request.

* You can use a custom URL scheme, e.g. instead of specifying pixel dimensions in image URLs, use preset names such as `thumbnail` and `large`.
* Hide the actual location of the original image. You can store images in an external S3 bucket or a hidden folder on your server without exposing that information in URLs.
* Implement content negotiation to adapt image sizes, formats and quality dynamically based on the device and condition of the network.

The resizing feature is accessed via the [options](https://developers.cloudflare.com/workers/runtime-apis/request#requestinitcfproperties) of a [`fetch()` subrequest](https://developers.cloudflare.com/workers/runtime-apis/fetch) inside a Worker.

## Fetch options

The `fetch()` function accepts parameters in the second argument inside ```{cf: {image: {…}}}``` object. The parameters are:

<Definitions>

- `width`
  - Maximum width in image pixels. The value must be an integer.

- `height`
  - Maximum height in image pixels.

- `dpr`
  - Device Pixel Ratio. Default `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

- `fit`
  - Resizing mode as a string. It affects interpretation of `width` and `height`:

    <Definitions>

    - `scale-down`
      - Similar to `contain`, but the image is never enlarged. If the image is larger than given `width` or `height`, it will be resized. Otherwise its original size will be kept.

    - `contain`
      - Resizes to the maximum size that fits within the given `width` and `height`. If only a single dimension is given (e.g. only `width`), the image will be shrunk or enlarged to exactly match that dimension. Aspect ratio is always preserved.

    - `cover`
      - Resizes (shrinks or enlarges) to fill the entire area of `width` and `height`. If the image has an aspect ratio different from the ratio of `width` and `height`, it will be cropped to fit.

    - `crop`
      - The image will shrunk and cropped to fit within the area specified by `width` and `height`. The image won’t be enlarged. For images smaller than the given dimensions it’s the same as `scale-down`. For images larger than the given dimensions, it’s the same as `cover`. See also `trim`.

    - `pad`
      - Resizes to the maximum size that fits within the given `width` and `height`, and then fills the remaining area with a `background` color (white by default). Use of this mode is not recommended, as the same effect can be more efficiently achieved with the `contain` mode and the CSS `object-fit: contain` property.

    </Definitions>

- `gravity`

  - When cropping with `fit: "cover"` and `fit: "crop"`, this defines the side or point that should be left uncropped.

    There are three ways of specifying gravity:

    - A string `"left"`, `"right"`, `"top"`, `"bottom"` or `"center"` (the default). `{fit: "cover", gravity: "top"}` will crop bottom or left and right sides as necessary, but won’t crop anything from the top.
    - `"auto"`, which selects focal point based on saliency detection (using maximum symmetric surround algorithm),
    - An object `{x, y}` containing focal point coordinates in the original image expressed as <em>fractions</em> ranging from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. `{fit: "cover", gravity: {x:0.5, y:0.2}}` will crop each side to preserve as much as possible around a point at 20% of the height of the source image.

- `trim`
  - An object with four properties `{left, top, right, bottom}` that specify a number of pixels to cut off on each side. Allows removal of borders or cutting out a specific fragment of an image. Trimming is performed before resizing or rotation. Takes `dpr` into account.

- `quality`
  - Quality setting from 1-100 (useful values are in 60-90 range). Lower values make images look worse, but load faster. The default is 85. Quality 100 will generate very large image files, and is not recommended.

  In case of PNG images, an explicit quality setting enables use of 8-bit (palette) variant of the format, using [pngquant](https://pngquant.org)'s quality scale. Images that can't meet the requested quality with 256 colors will fall back to 24-bit PNG format or JPEG if they're opaque.

- `format`
  - Output format to generate. It can be:

    - `avif` — generate images in AVIF format.
    - `webp` — generate images in Google WebP format. Set `quality` to `100` to get the WebP-lossless format.
    - `json` — instead of generating an image, outputs information about the image, in JSON format. The JSON object will contain image size (before and after resizing), source image’s MIME type, file size, etc.

    Other supported formats (PNG, JPEG, animated GIF) are used by default if no other format is specified.

    To automatically serve WebP or AVIF formats to browsers that support them, check if the `Accept` header contains `image/webp` or `image/avif`, and set the format option accordingly.

- `anim`
  - Whether to preserve animation frames from input files (default `true`). Setting it to `false` reduces animations to still images. This setting is recommended when enlarging images or processing arbitrary user content, because large GIF animations can weigh tens or even hundreds of megabytes.

- `metadata`
  - What EXIF data should be preserved in the output image. Note that EXIF rotation and embedded color profiles are always applied ("baked in" into the image), and aren’t affected by this option. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

    <Definitions>

    - `keep`
      - Preserve most of EXIF metadata, including GPS location if there’s any.

    - `copyright`
      - Only keep the copyright tag, and discard everything else. This is the default behavior for JPEG files.

    - `none`
      - Discard all invisible EXIF metadata. Currently WebP and PNG output formats always discard metadata.

    </Definitions>

- `background`
  - Background color to add underneath the image. Applies only to images with transparency (e.g. PNG). Accepts any CSS color (`#RRGGBB`, `rgba(…)`, etc.).

- `rotate`
  - Number of degrees (90, 180, 270) to rotate the image by. `width` and `height` options refer to axes after rotation.

- `sharpen`
  - Strength of sharpening filter to apply to the image. Floating-point number between `0` (no sharpening, default) and `10` (max). `1.0` is a recommended value for downscaled images.

</Definitions>

In your worker, where you’d fetch the image using `fetch(request)`, add options like this:

```js
fetch(imageURL, {
  cf: {
    image: {
      fit: "scale-down",
      width: 800,
      height: 600
    }
  }
})
```

These typings are also available in [our Workers TypeScript definitions library](https://github.com/cloudflare/workers-types).

### Configuring a worker

Create a new script in Workers section of the Dashboard. Scope your worker script to a path dedicated to serving assets, such as `/images/*`, `/assets/*`, etc. Only supported image formats can be resized. Attempt to "resize" any other type of resource (CSS, HTML) will result in an error.

<Aside type="warning" header="Warning">

Do not set up the image resizing worker for the entire zone (`/*`). This will block all non-image requests and make your website inaccessible.

</Aside>

It’s best to keep the path handled by the worker separate from the path to original (unresized) images to avoid request loops caused by the image resizing worker calling itself. For example, store your images in `example.com/originals/` directory, and handle resizing via `example.com/thumbnails/*` path that fetches images from the `/originals/` directory. If source images are stored in a location that is handled by a Worker, you must prevent the worker from creating an infinite loop.

#### Preventing request loops

To perform resizing and optimizations, the worker must be able to fetch the original, unresized image from your origin server. If the path handled by your Worker overlaps with the path where images are stored on your server, it could cause an infinite loop by the worker trying to request images from itself.
You must detect which requests have to go straight to the origin server. When `image-resizing` string is present in the `Via` header that’s a request coming from another worker, and should be directed straight to the origin server, like this:

```js
addEventListener("fetch", event => {
  // If this request is coming from image resizing worker,
  // avoid causing an infinite loop by resizing it again:
  if (/image-resizing/.test(event.request.headers.get("via"))) {
    return fetch(event.request)
  }

  // Now you can safely use image resizing here
}
```

### Lack of preview in the Dashboard

<Aside>

__Note:__ Image resizing is not simulated in the preview of in the Workers dashboard editor.

</Aside>

The script preview of the Worker editor ignores `fetch()` options, and will always fetch unresized images. To see the effect of image resizing you must deploy the worker script and use it outside of the editor. We apologize for the inconvenience.

#### Error handling

When an image can’t be resized, e.g. because the image doesn’t exist, or resizing parameters were invalid, the response will have an HTTP status indicating an error (e.g. 400, 404, 502, etc.).

By default, the error will be forwarded to the browser, but you can decide how to handle errors. For example, you can redirect the browser to the original, unresized image instead:

```js
const response = await fetch(imageURL, options)

if (response.ok) {
  return response
} else {
  return response.redirect(imageURL, 307)
}
```

Keep in mind that if the original images on your server are very large, it may be better not to display failing images at all, than to fall back to overly large images that could use too much bandwidth, memory, or break page layout.

You can also replace failed images with a placeholder image:

```js
const response = await fetch(imageURL, options)
if (response.ok) {
  return response
} else {
  // Change to a URL on your server
  return fetch("https://img.example.com/blank-placeholder.png")
}
```

### An example worker

Assuming you [set up a worker](https://developers.cloudflare.com/workers/learning/getting-started) on `https://example.com/image-resizing` to handle URLs like this: `https://example.com/image-resizing?width=80&image=https://example.com/uploads/avatar1.jpg`

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  // Parse request URL to get access to query string
  let url = new URL(request.url)

  // Cloudflare-specific options are in the cf object.
  let options = { cf: { image: {} } }

  // Copy parameters from query string to request options.
  // You can implement various different parameters here.
  if (url.searchParams.has("fit")) options.cf.image.fit = url.searchParams.get("fit")
  if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width")
  if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height")
  if (url.searchParams.has("quality")) options.cf.image.quality = url.searchParams.get("quality")

  // Get URL of the original (full size) image to resize.
  // You could adjust the URL here, e.g. prefix it with a fixed address of your server,
  // so that user-visible URLs are shorter and cleaner.
  const imageURL = url.searchParams.get("image")

  // Build a request that passes through request headers,
  // so that automatic format negotiation can work.
  const imageRequest = new Request(imageURL, {
    headers: request.headers,
  })

  // Returning fetch() with resizing options will pass through response with the resized image.
  return fetch(imageRequest, options)
}
```

When testing image resizing, please deploy the script first. Resizing won’t be active in the on-line editor in the Dashboard.
