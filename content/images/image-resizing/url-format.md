---
pcx_content_type: reference
title: URL format
weight: 4
---

# URL format

You can convert and resize images by requesting them via a specially-formatted URL. This way you do not need to write any code, only change HTML markup of your website to use the new URLs. The format is:

```txt
https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
```

Here is a breakdown of each part of the URL:

{{<definitions>}}
- `<ZONE>`
  - Your domain name on Cloudflare. Unlike other third-party image resizing services, Image Resizing does not use a separate domain name for an API. Every Cloudflare zone with Image Resizing enabled can handle resizing itself. In URLs used on your website this part can be omitted, so that URLs start with `/cdn-cgi/image/`.

- `/cdn-cgi/image/`
  - A fixed prefix that identifies that this is a special path handled by Cloudflare's built-in Worker.

- `<OPTIONS>`
  - A comma-separated list of options such as `width`, `height`, and `quality`.

- `<SOURCE-IMAGE>`
  - An absolute path on the origin server, or an absolute URL (starting with `https://` or `http://`), pointing to an image to resize. The path is not URL-encoded, so the resizing URL can be safely constructed by concatenating `/cdn-cgi/image/options` and the original image URL. For example: `/cdn-cgi/image/width=100/https://s3.example.com/bucket/image.png`.
{{</definitions>}}

Here is an example of an URL with `<OPTIONS>` set to `width=80,quality=75` and a `<SOURCE-IMAGE>` of `uploads/avatar1.jpg`:

```html
<img src="/cdn-cgi/image/width=80,quality=75/uploads/avatar1.jpg" />
```

{{<render file="_ir-svg-aside.md">}}

## Options

You must specify at least one option. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

{{<render file="_supported-properties.md">}}

<!-- rotate is not a generally useful option, so it’s only documented in the advanced section -->

## Recommended image sizes

Ideally, image sizes should match exactly the size they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`. If the exact size is not known ahead of time, use the [responsive images technique](/images/image-resizing/responsive-images/).

If you cannot use the `<img srcset>` markup, and have to hardcode specific maximum sizes, Cloudflare recommends the following sizes:

- Maximum of 1920 pixels for desktop browsers.
- Maximum of 960 pixels for tablets.
- Maximum of 640 pixels for mobile phones.

Here is an example of markup to configure a maximum size for your image:

```txt
/cdn-cgi/image/fit=scale-down,width=1920/<YOUR-IMAGE>
```

The `fit=scale-down` option ensures that the image will not be enlarged unnecessarily.

You can detect device type by enabling the `CF-Device-Type` header [via Page Rule](https://support.cloudflare.com/hc/articles/229373388).

## Caching

Resizing causes the original image to be fetched from the origin server and cached — following the usual rules of HTTP caching, `Cache-Control` header, etc.. Requests for multiple different image sizes are likely to reuse the cached original image, without causing extra transfers from the origin server.

{{<Aside type="note">}}

If Custom Cache Keys are used for the origin image, the origin image might not be cached and might result in more calls to the origin.

{{</Aside>}}
 
Resized images follow the same caching rules as the original image they were resized from, except the minimum cache time is one hour. If you need images to be updated more frequently, add `must-revalidate` to the `Cache-Control` header. Resizing supports cache revalidation, so we recommend serving images with the `Etag` header. Refer to the [Cache docs for more information](/cache/concepts/cache-control/#revalidation).

We do not support purging of resized variants individually. URLs starting with `/cdn-cgi/` cannot be purged. However, purging of the original image's URL will also purge all of its resized variants.
