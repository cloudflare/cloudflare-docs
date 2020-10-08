---
title: Basics
alwaysopen: false
weight: 5
hidden: false
showNew: false
---

You can transform images on Cloudflare's edge platform. You can resize, adjust quality, and convert images to WebP or AVIF format on demand. We will automatically cache every derived image at the edge, so you only need to store one original image at your origin. This way you can quickly and easily adapt images to your site's layout and your visitors' screen sizes without maintaining a server-side image processing pipeline on your servers.

Image processing [integrates well with Workers, which enables advanced integrations](/images/worker/), such as custom URL schemes, content negotiation and responsive images based on Client Hints.

## Getting started

Image Resizing is available today for Business and Enterprise Customers.  To enable it, login to the Cloudflare Dashboard and navigate to the Speed Tab. There you’ll find the section for Image Resizing which you can enable with one click.

There are two ways to use image resizing: via pre-defined URL format (described below) or [via Workers](/images/worker/) that handle advanced use-cases.

## The default URL format

You can convert and resize images by requesting them via a specially-formatted URL. This way you don't need to write any code, only change HTML markup of your website to use the new URLs. The format is:

https://**zone**/cdn-cgi/image/**options**/**source-image**

e.g.

```html
<img src="/cdn-cgi/image/width=80,quality=75/uploads/avatar1.jpg">
```

where:

<dl>
<dt><code>zone</code></dt>
<dd>is your domain name on Cloudflare. Unlike other 3rd party image resizing services, we don't use a separate domain name for an API. Every Cloudflare zone with image resizing enabled can handle resizing itself. In URLs used on your website this part can be omitted, so that URLs start with  <code>/cdn-cgi/image/</code>.</dd>

<dt><code>/cdn-cgi/image/</code></dt>
<dd>is a fixed prefix that identifies that this is a special path handled by Cloudflare.</dd>

<dt><code>options</code></dt>
<dd>is a comma-separated list of options such as <code>width</code>, <code>height</code>, and <code>quality</code>.</dd>

<dt><code>source-image</code></dt>
<dd>is an absolute path on the origin server, or an absolute URL (starting with <code>https://</code> or <code>http://</code>), pointing to an image to resize. The path is not URL-encoded, so the resizing URL can be safely constructed by concatenating <code>/cdn-cgi/image/options</code> and the original image URL, e.g. <code>/cdn-cgi/image/width=100/https://s3.example.com/bucket/image.png</code>.</dd>
</dl>

### Options
At least one option must be specified. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

<dl>
<dt><code>width=<var>x</var></code> or <code>w=<var>x</var></code></dt>
<dd>Specifies maximum width of the image in pixels. Exact behavior depends on the <code>fit</code> mode (described below).</dd>

<dt><code>height=<var>x</var></code> or <code>h=<var>x</var></code></dt>
<dd>Specifies maximum height of the image in pixels. Exact behavior depends on the <code>fit</code> mode (described below).</dd>

<dt><code>dpr=<var>x</var></code></dt>
<dd>Device Pixel Ratio. Default <code>1</code>. Multiplier for <code>width</code>/<code>height</code> that makes it easier to specify higher-DPI sizes in <code>&lt;img srcset&gt;</code>.</dd>

<dt><code>fit=<var>mode</var></code></dt>
<dd>Affects interpretation of <code>width</code> and <code>height</code>. All resizing modes preserve aspect ratio. Available modes are:

<ul>
  <li><code>fit=<var>scale-down</var></code> The image will be shrunk in size to fully fit within the given <code>width</code> or <code>height</code>, but won't be enlarged.</li>

  <li><code>fit=<var>contain</var></code> The image will be resized (shrunk or enlarged) to be as large as possible within the given <code>width</code> or <code>height</code> while preserving the aspect ratio.</li>

  <li><code>fit=<var>cover</var></code> The image will be resized to exactly fill the entire area specified by <code>width</code> and <code>height</code>, and will cropped if necessary.</li>

  <li><code>fit=<var>crop</var></code> The image will shrunk and cropped to fit within the area specified by <code>width</code> and <code>height</code>. The image won't be enlarged. For images smaller than the given dimensions it's the same as <code>scale-down</code>. For images larger than the given dimensions, it's the same as <code>cover</code>.</li>

  <li><code>fit=<var>pad</var></code> The image will be resized (shrunk or enlarged) to be as large as possible within the given <code>width</code> or <code>height</code> while preserving the aspect ratio, and the extra area will be filled with a <code>background</code> color (white by default). Transparent background may be very expensive, and it's better to use <code>fit=<var>contain</var></code> and CSS <code>object-fit: contain</code> property instead.</li>

</ul>
</dd>

<dt><code>gravity=auto</code>, <code>gravity=<var>side</var></code> or <code>gravity=<var>X</var>x<var>Y</var></code> or <code>g=<var>X</var>x<var>Y</var></code></dt>
<dd>When cropping with <code>fit=<var>cover</var></code>, specifies the most important side or point in the image that shouldn't be cropped off. If it's <code>auto</code>, the point will be guessed by looking for areas that stand out the most from image background. Alternatively, it can be a side <code>left</code>, <code>right</code>, <code>top</code>, <code>bottom</code> or coordinates specified on a scale from <code>0.0</code> (top or left) to <code>1.0</code> (bottom or right), <code>0.5</code> being the center. The X and Y coordinates are separated by lowercase <code>x</code>, e.g. <code>0x1</code> means left and bottom, <code>0.5x0.5</code> is the center, <code>0.5x0.33</code> is a point in the top third of the image.</dd>

<dt><code>quality=<var>x</var></code> or <code>q=<var>x</var></code></dt>
<dd>Specifies quality for images in JPEG, WebP and AVIF formats. The quality is in 1-100 scale, but useful values are between 50 (low quality, small file size) and 90 (high quality, large file size). 85 is the default. It doesn't do anything for PNG.</dd>

<dt><code>format=auto</code> or <code>f=auto</code></dt>
<dd>Allows serving of the WebP format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.</dd>

<dt><code>sharpen=<var>x</var></code></dt>
<dd>Specifies strength of sharpening filter. The value is a floating-point number between 0 (no sharpening) and 10 (max). 1 is a recommended value.</dd>

<dt><code>onerror=redirect</code></dt>
<dd>In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via worker. This option shouldn't be used if the source images may be very large. This option is ignored if the image is from another domain (subdomains are OK).</dd>

<dt><code>metadata=<var>mode</var></code></dt>
<dd>Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

<ul>
  <li><code>metadata=keep</code> Preserve most of the image metadata (including GPS location) when possible.</li>

  <li><code>metadata=copyright</code> Discard all metadata except EXIF copyright tag. This is the default for JPEG images.</li>

  <li><code>metadata=none</code> Discard all invisible metadata.</li>
</ul>
</dd>
</dl>

<!-- rotate is not a generally useful option, so it's only documented in the advanced section -->

### Supported formats and limitations

The service generates JPEG and PNG images, and optionally AVIF or WebP. It can save animations as GIF or animated WebP.

The service can read JPEG, PNG, GIF (including animations), and WebP images.

The service supports ICC color profiles in JPEG and PNG images. JPEG metadata can be preserved. Metadata of other formats is discarded.

### Recommended image sizes

Ideally, images sizes should match exactly the size they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`. If the exact size is not known ahead of time, use [responsive images technique](/images/responsive/).

If you can't use the `<img srcset>` markup, and have to hardcode specific maximum sizes, we recommend:

* maximum 1920 pixels for desktop browsers,
* maximum 960 pixels for tablets,
* maximum 640 pixels for mobile phones.

```
/cdn-cgi/image/fit=scale-down,width=1920/your-image.jpg
```

The `fit=scale-down` option ensures that the image won't be enlarged unnecessarily.

You can detect device type using [`CF-Device-Type` header](https://support.cloudflare.com/hc/en-us/articles/229373388-Cache-Content-by-Device-Type-Mobile-Tablet-Desktop-) enabled via Page Rule.

### Image optimization and interaction with Polish

Polish won't be applied to URLs using image resizing. Resized images already have lossy compression applied where possible, so they don't need optimizations provided by Polish.


### Caching

Resizing causes the original image to be fetched from the origin server and cached (following the usual rules of HTTP caching, `Cache-Control` header, etc.). Requests for multiple different image sizes are likely to reuse the cached original image, without causing extra transfers from the origin server.

Resized images follow the same caching rules as the original image they were resized from (i.e. the `Cache-Control` header is from the original to the resized image). We do not support purging of resized variants individually, but purging of the original image URL will also purge all of its resized variants.
