# Resizing with Workers

There are two ways of using image resizing. One is the [default URL scheme](/images/about/), which provides an easy, declarative way of specifying image dimensions and other options.
The other way is to use a JavaScript API in a [Worker](https://developers.cloudflare.com/workers/about/). Workers give powerful programmatic control over every image request.

* You can use a custom URL scheme, e.g. instead of specifying pixel dimensions in image URLs, use preset names such as `thumbnail` and `large`.
* Hide the actual location of the original image. You can store images in an external S3 bucket or a hidden folder on your server without exposing that information in URLs.
* Implement content negotiation to adapt image sizes, formats and quality dynamically based on the device and condition of the network.

The resizing feature is accessed via the [options](https://developers.cloudflare.com/workers/reference/cloudflare-features/) of a `fetch()` subrequest inside a Worker.

## Fetch options

The `fetch()` function accepts parameters in the second argument inside ```{cf: {image: {…}}}``` object. The parameters are:

<dl>

<dt><code>width</code></dt>
<dd>Maximum width in image pixels. The value must be an integer.</dd>

<dt><code>height</code></dt>
<dd>Maximum height in image pixels.</dd>

<dt><code>dpr</code></dt>
<dd>Device Pixel Ratio. Default <code>1</code>. Multiplier for <code>width</code>/<code>height</code> that makes it easier to specify higher-DPI sizes in <code>&lt;img srcset&gt;</code>.</dd>

<dt><code>fit</code></dt>
<dd>Resizing mode as a string. It affects interpretation of <code>width</code> and <code>height</code>:

<dl>

  <dt><code>scale-down</code></dt>
  <dd>Similar to <code>contain</code>, but the image is never enlarged. If the image is larger than given <code>width</code> or <code>height</code>, it will be resized. Otherwise its original size will be kept.</dd>

  <dt><code>contain</code></dt>
  <dd>Resizes to the maximum size that fits within the given <code>width</code> and <code>height</code>. If only a single dimension is given (e.g. only <code>width</code>), the image will be shrunk or enlarged to exactly match that dimension. Aspect ratio is always preserved.</dd>

  <dt><code>cover</code></dt>
  <dd>Resizes (shrinks or enlarges) to fill the entire area of <code>width</code> and <code>height</code>. If the image has an aspect ratio different from the ratio of <code>width</code> and <code>height</code>, it will be cropped to fit.</dd>

  <dt><code>crop</code></dt>
  <dd>The image will shrunk and cropped to fit within the area specified by <code>width</code> and <code>height</code>. The image won’t be enlarged. For images smaller than the given dimensions it’s the same as <code>scale-down</code>. For images larger than the given dimensions, it’s the same as <code>cover</code>. See also <code>trim</code>.</dd>

  <dt><code>pad</code></dt>
  <dd>Resizes to the maximum size that fits within the given <code>width</code> and <code>height</code>, and then fills the remaining area with a <code>background</code> color (white by default). Use of this mode is not recommended, as the same effect can be more efficiently achieved with the <code>contain</code> mode and the CSS <code>object-fit: contain</code> property.</dd>

</dl>
</dd>

<dt><code>gravity</code></dt>
<dd><p>When cropping with <code>fit: "cover"</code> and <code>fit: "crop"</code>, this defines the side or point that should be left uncropped.</p>
<p>There are three ways of specifying gravity:</p>
<ul>
<li>A string <code>"left"</code>, <code>"right"</code>, <code>"top"</code>, <code>"bottom"</code> or <code>"center"</code> (the default). <code>&#123;fit: "cover", gravity: "top"&#125;</code> will crop bottom or left and right sides as necessary, but won't crop anything from the top.</li>
<li><code>"auto"</code>, which selects focal point based on saliency detection (using maximum symmetric surround algorithm),</li>
<li>An object <code>&#123;x, y&#125;</code> containing focal point coordinates in the original image expressed as <em>fractions</em> ranging from <code>0.0</code> (top or left) to <code>1.0</code> (bottom or right), <code>0.5</code> being the center. <code>&#123;fit: "cover", gravity: &#123;x:0.5, y:0.2&#125;&#125;</code> will crop each side to preserve as much as possible around a point at 20% of the height of the source image.</li>
</ul>
</dd>

<dt><code>trim</code></dt>
<dd>
<p>An object with four properties <code>{'{left, top, right, bottom}'}</code> that specify a number of pixels to cut off on each side. Allows removal of borders or cutting out a specific fragment of an image. Trimming is performed before resizing or rotation. Takes <code>dpr</code> into account.</p>
</dd>

<dt><code>quality</code></dt>
<dd>Quality setting from 1-100 (useful values are in 60-90 range). Lower values make images look worse, but load faster. The default is 85. Quality 100 will generate very large image files, and is not recommended. This setting applies only to JPEG and WebP images. It doesn’t have any effect on PNG.</dd>

<dt><code>format</code></dt>
<dd>
Output format to generate. It can be:

<ul>

  <li><code>avif</code> — generate images in AVIF format.</li>
  <li><code>webp</code> — generate images in Google WebP format. Set <code>quality</code> to <code>100</code> to get the WebP-lossless format.</li>
  <li><code>json</code> — instead of generating an image, outputs information about the image, in JSON format. The JSON object will contain image size (before and after resizing), source image's MIME type, file size, etc.
  </li>

</ul>

<p>Other supported formats (PNG, JPEG, animated GIF) are used by default if no other format is specified.</p>

<p>To automatically serve WebP or AVIF formats to browsers that support them, check if the `Accept` header contains `image/webp` or `image/avif`, and set the format option accordingly.</p>
</dd>

<dt><code>metadata</code></dt>
<dd>What EXIF data should be preserved in the output image. Note that EXIF rotation and embedded color profiles are always applied ("baked in" into the image), and aren't affected by this option. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

<dl>

  <dt><code>keep</code></dt>
  <dd>Preserve most of EXIF metadata, including GPS location if there's any.</dd>

  <dt><code>copyright</code></dt>
  <dd>Only keep the copyright tag, and discard everything else. This is the default behavior for JPEG files.</dd>

  <dt><code>none</code></dt>
  <dd>Discard all invisible EXIF metadata. Currently WebP and PNG output formats always discard metadata.</dd>

</dl>
</dd>

<dt><code>background</code></dt>
<dd>Background color to add underneath the image. Applies only to images with transparency (such as PNG). Accepts any CSS color (<code>#RRGGBB</code>, <code>rgba(…)</code>, <code>hsl(…)</code>, etc.)</dd>

<dt><code>rotate</code></dt>
<dd>Number of degrees (90, 180, 270) to rotate the image by. <code>width</code> and <code>height</code> options refer to axes after rotation.</dd>

<dt><code>sharpen</code></dt>
<dd>Strength of sharpening filter to apply to the image. Floating-point number between <code>0</code> (no sharpening, default) and <code>10</code> (max). <code>1.0</code> is a recommended value for downscaled images.</dd>

</dl>

In your worker, where you'd fetch the image using `fetch(request)`, add options like this:

```js
fetch(imageURL, {
    cf: {
        image: {
            fit: "scale-down",
            width: 800,
            height: 600,
        }
    }
});
```

These typings are also available in [our Workers TypeScript definitions library](https://github.com/cloudflare/workers-types).

### Configuring a worker

Create a new script in Workers section of the Dashboard. Scope your worker script to a path dedicated to serving assets, such as `/images/*`, `/assets/*`, etc. Only supported image formats can be resized. Attempt to "resize" any other type of resource (CSS, HTML) will result in an error.

<div class="notices warning"><p>Do not set up the image resizing worker for the entire zone (<code style="background: none">/*</code>). This will block all non-image requests and make your website inaccessible.</p></div>

It's best to keep the path handled by the worker separate from the path to original (unresized) images to avoid request loops caused by the image resizing worker calling itself. For example, store your images in `example.com/originals/` directory, and handle resizing via `example.com/thumbnails/*` path that fetches images from the `/originals/` directory. If source images are stored in a location that is handled by a Worker, you must prevent the worker from creating an infinite loop.

#### Preventing request loops

To perform resizing and optimizations, the worker must be able to fetch the original, unresized image from your origin server. If the path handled by your Worker overlaps with the path where images are stored on your server, it could cause an infinite loop by the worker trying to request images from itself.
You must detect which requests have to go straight to the origin server. When `image-resizing` string is present in the `Via` header that's a request coming from another worker, and should be directed straight to the origin server, like this:

```js
addEventListener('fetch', event => {
  // if this request is coming from image resizing worker,
  // avoid causing an infinite loop by resizing it again:
  if (/image-resizing/.test(event.request.headers.get("via"))) {
    return fetch(event.request);
  }
  // now you can safely use image resizing here
}
```

### Lack of preview in the Dashboard

<div class="notices info"><p>Image resizing is not simulated in the preview of Worker scripts in the editor in the Dashboard.</p></div>

The script preview of the Worker editor ignores `fetch()` options, and will always fetch unresized images. To see the effect of image resizing you must deploy the worker script and use it outside of the editor. We apologize for the inconvenience.

#### Error handling

When an image can't be resized, e.g. because the image doesn't exist, or resizing parameters were invalid, the response will have an HTTP status indicating an error (e.g. 400, 404, 502, etc.).

By default, the error will be forwarded to the browser, but you can decide how to handle errors. For example, you can redirect the browser to the original, unresized image instead:

```js
const response = await fetch(imageURL, options);
if (response.ok) {
  return response;
} else {
  return response.redirect(imageURL, 307);
}
```

Keep in mind that if the original images on your server are very large, it may be better not to display failing images at all, than to fall back to overly large images that could use too much bandwidth, memory, or break page layout.

You can also replace failed images with a placeholder image:

```js
const response = await fetch(imageURL, options);
if (response.ok) {
  return response;
} else {
  return fetch("https://img.example.com/blank-placeholder.png"); // change to a URL on your server
}
```

### An example worker

Assuming you [set up a worker](https://developers.cloudflare.com/workers/writing-workers/) on `https://example.com/image-resizing` to handle URLs like this: `https://example.com/image-resizing?width=80&image=https://example.com/uploads/avatar1.jpg`

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  // Parse request URL to get access to query string
  let url = new URL(request.url);

  // Cloudflare-specific options are in the cf object.
  let options = { cf: { image: {} } }

  // Copy parameters from query string to request options.
  // You can implement various different parameters here.
  if (url.searchParams.has("fit")) options.cf.image.fit = url.searchParams.get("fit");
  if (url.searchParams.has("width")) options.cf.image.width = url.searchParams.get("width");
  if (url.searchParams.has("height")) options.cf.image.height = url.searchParams.get("height");
  if (url.searchParams.has("quality")) options.cf.image.quality = url.searchParams.get("quality");

  // Get URL of the original (full size) image to resize.
  // You could adjust the URL here, e.g. prefix it with a fixed address of your server,
  // so that user-visible URLs are shorter and cleaner.
  const imageURL = url.searchParams.get("image");

  // Build a request that passes through request headers,
  // so that automatic format negotiation can work.
  const imageRequest = new Request(imageURL, {
    headers: request.headers,
  });

  // Returning fetch() with resizing options will pass through response with the resized image.
  return fetch(imageRequest, options);
}
```

When testing image resizing, please deploy the script first. Resizing won't be active in the on-line editor in the Dashboard.
