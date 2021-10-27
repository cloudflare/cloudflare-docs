---
order: 2
pcx-content-type: reference
---

# URL format

You can convert and resize images by requesting them via a specially-formatted URL. This way you do not need to write any code, only change HTML markup of your website to use the new URLs. The format is:

```txt
https://ZONE/cdn-cgi/image/OPTIONS/SOURCE-IMAGE
```

Here is a breakdown of each part of the URL:

<Definitions>

- `zone`
  - Your domain name on Cloudflare. Unlike other third-party image resizing services, we do not use a separate domain name for an API. Every Cloudflare zone with image resizing enabled can handle resizing itself. In URLs used on your website this part can be omitted, so that URLs start with `/cdn-cgi/image/`.

- `/cdn-cgi/image/`
  - A fixed prefix that identifies that this is a special path handled by Cloudflare's built-in Worker.

- `options`
  - A comma-separated list of options such as `width`, `height`, and `quality`.

- `source-image`
  - An absolute path on the origin server, or an absolute URL (starting with `https://` or `http://`), pointing to an image to resize. The path is not URL-encoded, so the resizing URL can be safely constructed by concatenating `/cdn-cgi/image/options` and the original image URL, e.g. `/cdn-cgi/image/width=100/https://s3.example.com/bucket/image.png`.

</Definitions>

Here is an example of an URL with `options` set to `width=80,quality=75` and a `source-image` of `uploads/avatar1.jpg`:

```html
<img src="/cdn-cgi/image/width=80,quality=75/uploads/avatar1.jpg">
```

## Options

At least one option must be specified. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

<Definitions>

- **`width=x`** or **`w=x`**
  - Specifies maximum width of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- **`height=x`** or **`h=x`**
  - Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- **`dpr=x`**
  - Device Pixel Ratio. Default is `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

- **`fit`**
  - Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Available modes are:

    <Definitions>

    - **`fit=scale-down`**
      - Image will be shrunk in size to fully fit within the given `width` or `height`, but will not be enlarged.

    - **`fit=contain`**
      - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio.

    - **`fit=cover`**
      - Image will be resized to exactly fill the entire area specified by `width` and `height`, and will cropped if necessary.

    - **`fit=crop`**
      - Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image will not be enlarged. For images smaller than the given dimensions it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`.

    - **`fit=pad`**
      - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio, and the extra area will be filled with a `background` color (white by default). Transparent background may be very expensive, and it is better to use `fit=contain` and CSS `object-fit: contain` property instead.

    </Definitions>

- **`gravity`** or **`g`**
  - Cropping with `fit=cover` specifies the most important side or point in the image that should not be cropped off.

    <Definitions>

    - **`gravity=auto`**
      - The point will be guessed by looking for areas that stand out the most from image background.

    - **`gravity=side`** and **`gravity=XxY`**
      - If a side (`left`, `right`, `top`, `bottom`) or coordinates specified on a scale from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. The X and Y coordinates are separated by lowercase `x`. For example, `0x1` means left and bottom, `0.5x0.5` is the center, `0.5x0.33` is a point in the top third of the image.

    </Definitions>

- **`quality=x`** or **`q=x`**
  - Specifies quality for images in JPEG, WebP, and AVIF formats. The quality is in 1-100 scale, but useful values are between `50` (low quality, small file size) and `90` (high quality, large file size). `85` is the default. When using the PNG format, an explicit quality setting allows use of PNG8 (palette) variant of the format.

- **`format=auto`** or **`f=auto`**
  - Allows serving of the WebP or AVIF format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.

- **`anim=false`**
  - Reduces animations to still images. This setting is recommended to avoid large animated GIF files, or flashing images.

- **`sharpen=x`**
  - Specifies strength of sharpening filter. The value is a floating-point number between `0` (no sharpening) and `10` (maximum). `1` is a recommended value.

- **`blur=x`**
  - Blur radius between `1` (slight blur) and `250` (maximum). Please beware that you can't use this option to reliably obscure image content, because savvy users can modify image's URL and remove the blur option. Use Workers to control which options can be set.

- **`onerror=redirect`**
  - In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via Worker. This option should not be used if there is a change the source images is very large. This option is ignored if the image is from another domain, but you can use it with subdomains.

- **`metadata`**
  - Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

    <Definitions>

    - **`metadata=keep`**
      - Preserve most of the image metadata (including GPS location) when possible.

    - **`metadata=copyright`**
      - Discard all metadata except EXIF copyright tag. This is the default for JPEG images.

    - **`metadata=none`**
      - Discard all invisible metadata.

    </Definitions>

</Definitions>

<!-- rotate is not a generally useful option, so it’s only documented in the advanced section -->

## Supported formats and limitations

Cloudflare Image resizing can:

* Read JPEG, PNG, GIF (including animations), and WebP images. SVG is not supported (this format is inherently scalable, and doesn't need resizing).
* Generate JPEG and PNG images, and optionally AVIF or WebP.
* Save animations as GIF or animated WebP.
* Support ICC color profiles in JPEG and PNG images. 
* Preserve JPEG metadata. Metadata of other formats is discarded.

AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.

## Recommended image sizes

Ideally, image sizes should match exactly the size they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`. If the exact size is not known ahead of time, use the [responsive images technique](/image-resizing/responsive-images).

If you cannot use the `<img srcset>` markup, and have to hardcode specific maximum sizes, Cloudflare recommends the following sizes:

* Maximum of 1920 pixels for desktop browsers.
* Maximum of 960 pixels for tablets.
* Maximum of 640 pixels for mobile phones.

Here is an example of markup to configure a maximum size for your image:

```txt
/cdn-cgi/image/fit=scale-down,width=1920/your-image.jpg
```

The `fit=scale-down` option ensures that the image will not be enlarged unnecessarily.

You can detect device type by enabling the `CF-Device-Type` header [via Page Rule](https://support.cloudflare.com/hc/articles/229373388).

## Image optimization and interaction with Polish

Polish will not be applied to URLs using Image Resizing. Resized images already have lossy compression applied where possible, so they do not need the optimizations provided by Polish. Use `format=auto` option to allow use of WebP and AVIF formats.

## Caching

Resizing causes the original image to be fetched from the origin server and cached — following the usual rules of HTTP caching, `Cache-Control` header, etc.. Requests for multiple different image sizes are likely to reuse the cached original image, without causing extra transfers from the origin server.

Resized images follow the same caching rules as the original image they were resized from, except the minimum cache time is one hour. If you need images to be updated more frequently, add `must-revalidate` to the `Cache-Control` header. Resizing supports cache revalidation, so we recommend serving images with the `Etag` header. Refer to the [Cache docs for more information](https://developers.cloudflare.com/cache/about/cache-control#revalidation).

We do not support purging of resized variants individually. URLs starting with `/cdn-cgi/` cannot be purged. However, purging of the original image's URL will also purge all of its resized variants.
