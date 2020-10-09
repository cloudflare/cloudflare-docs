---
order: 1
---

# URL format

You can convert and resize images by requesting them via a specially-formatted URL. This way you don’t need to write any code, only change HTML markup of your website to use the new URLs. The format is:

```txt
https://ZONE/cdn-cgi/image/OPTIONS/SOURCE-IMAGE
```

Here’s a breakdown of each part of the URL:

<Definitions>

- `zone`
  - Your domain name on Cloudflare. Unlike other 3rd party image resizing services, we don’t use a separate domain name for an API. Every Cloudflare zone with image resizing enabled can handle resizing itself. In URLs used on your website this part can be omitted, so that URLs start with `/cdn-cgi/image/`.

- `/cdn-cgi/image/`
  - A fixed prefix that identifies that this is a special path handled by Cloudflare.

- `options`
  - A comma-separated list of options such as `width`, `height`, and `quality`.

- `source-image`
  - An absolute path on the origin server, or an absolute URL (starting with `https://` or `http://`), pointing to an image to resize. The path is not URL-encoded, so the resizing URL can be safely constructed by concatenating `/cdn-cgi/image/options` and the original image URL, e.g. `/cdn-cgi/image/width=100/https://s3.example.com/bucket/image.png`.

</Definitions>

Here’s an example of a URL with `options` set to `width=80,quality=75` and a `source-image` of `uploads/avatar1.jpg`.

```html
<img src="/cdn-cgi/image/width=80,quality=75/uploads/avatar1.jpg">
```

## Options

At least one option must be specified. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

<Definitions>

- `width=x` or __`w=x`__
  - Specifies maximum width of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- `height=x` or __`h=x`__
  - Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below).

- `dpr=x`
  - Device Pixel Ratio. Default `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

- `fit`
  - Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Available modes are:

    <Definitions>

    - `fit=scale-down`
      - Image will be shrunk in size to fully fit within the given `width` or `height`, but won’t be enlarged.

    - `fit=contain`
      - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio.

    - `fit=cover`
      - Image will be resized to exactly fill the entire area specified by `width` and `height`, and will cropped if necessary.

    - `fit=crop`
      - Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image won’t be enlarged. For images smaller than the given dimensions it’s the same as `scale-down`. For images larger than the given dimensions, it’s the same as `cover`.

    - `fit=pad`
      - Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio, and the extra area will be filled with a `background` color (white by default). Transparent background may be very expensive, and it’s better to use `fit=contain` and CSS `object-fit: contain` property instead.

    </Definitions>

- `gravity` or __`g`__
  - When cropping with `fit=cover`, specifies the most important side or point in the image that shouldn’t be cropped off.

    <Definitions>

    - `gravity=auto`
      - The point will be guessed by looking for areas that stand out the most from image background

    - `gravity=side` and __`gravity=XxY`__
      - If a side (`left`, `right`, `top`, `bottom`) or coordinates specified on a scale from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. The X and Y coordinates are separated by lowercase `x`, e.g. `0x1` means left and bottom, `0.5x0.5` is the center, `0.5x0.33` is a point in the top third of the image.

    </Definitions>

- `quality=x` or __`q=x`__
  - Specifies quality for images in JPEG, WebP and AVIF formats. The quality is in 1-100 scale, but useful values are between 50 (low quality, small file size) and 90 (high quality, large file size). 85 is the default. It doesn’t do anything for PNG.

- `format=auto` or __`f=auto`__
  - Allows serving of the WebP format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used.

- `sharpen=x`
  - Specifies strength of sharpening filter. The value is a floating-point number between 0 (no sharpening) and 10 (max). 1 is a recommended value.

- `onerror=redirect`
  - In case of a fatal error that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via worker. This option shouldn’t be used if the source images may be very large. This option is ignored if the image is from another domain (subdomains are OK).

- `metadata`
  - Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Note that if the Polish feature is enabled, all metadata may have been removed already and this option may have no effect.

    <Definitions>

    - `metadata=keep`
      - Preserve most of the image metadata (including GPS location) when possible.

    - `metadata=copyright`
      - Discard all metadata except EXIF copyright tag. This is the default for JPEG images.

    - `metadata=none`
      - Discard all invisible metadata.

    </Definitions>

</Definitions>

<!-- rotate is not a generally useful option, so it’s only documented in the advanced section -->

## Supported formats and limitations

The service generates JPEG and PNG images, and optionally AVIF or WebP. It can save animations as GIF or animated WebP.

The service can read JPEG, PNG, GIF (including animations), and WebP images.

The service supports ICC color profiles in JPEG and PNG images. JPEG metadata can be preserved. Metadata of other formats is discarded.

## Recommended image sizes

Ideally, images sizes should match exactly the size they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`. If the exact size is not known ahead of time, use [responsive images technique](/responsive-images).

If you can’t use the `<img srcset>` markup, and have to hardcode specific maximum sizes, we recommend:

* maximum 1920 pixels for desktop browsers,
* maximum 960 pixels for tablets,
* maximum 640 pixels for mobile phones.

```txt
/cdn-cgi/image/fit=scale-down,width=1920/your-image.jpg
```

The `fit=scale-down` option ensures that the image won’t be enlarged unnecessarily.

You can detect device type using [`CF-Device-Type` header](https://support.cloudflare.com/hc/en-us/articles/229373388-Cache-Content-by-Device-Type-Mobile-Tablet-Desktop-) enabled via Page Rule.

## Image optimization and interaction with Polish

Polish won’t be applied to URLs using image resizing. Resized images already have lossy compression applied where possible, so they don’t need optimizations provided by Polish.

## Caching

Resizing causes the original image to be fetched from the origin server and cached (following the usual rules of HTTP caching, `Cache-Control` header, etc.). Requests for multiple different image sizes are likely to reuse the cached original image, without causing extra transfers from the origin server.

Resized images follow the same caching rules as the original image they were resized from (i.e. the `Cache-Control` header is from the original to the resized image). We do not support purging of resized variants individually, but purging of the original image URL will also purge all of its resized variants.
