---
pcx_content_type: how-to
title: Transform via URL
weight: 21
---

# Transform via URL

Cloudflare Images lets you optimize any publicly available image on the Internet. Through the specially formatted transformation URL, you can specify how an image should be resized or manipulated.

Learn how to configure the transformation URL to optimize any image that is stored outside of Images.

Before you begin, make sure to [enable transformations for your zone](/images/get-started/#enable-transformations).

{{<Aside type="note">}}

To optimize images that are stored in Cloudflare Images, use the image delivery URL.

{{</Aside>}}

## Format 

The default transformation URL uses the following structure:

```txt
https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
```

Here is a breakdown of each part of the URL:

{{<definitions>}}

- `<ZONE>`
  - Your domain name at Cloudflare. Transformations can be requested on every Cloudflare zone that has transformations enabled.

- `/cdn-cgi/image/`
  - A fixed prefix that identifies that this path is a request to optimize an image. To hide this part, you can set up Transform Rules to [serve images from a custom path](/images/transform-images/serve-images-custom-paths/#serve-images-from-custom-paths-1/).

- `<OPTIONS>`
  - A list of optimization parameters, separated by a comma. A valid URL must specify at least one parameter.

- `<SOURCE-IMAGE>`
  - The original image that you want to transform. You can use an absolute path on the origin server or an absolute URL that starts with `https://` or `http://`.
{{</definitions>}}

Below is an example URL that delivers an image with the following optimizations:

- Automatically changes the focal point to the auto-detected face, then crops the image to fit into a 150x150 square.
- Delivers the image in the most efficient format for the requesting browser.

![Original image modified to use the face parameter and use the most efficient format for the browser.](/images/images/format.jpg)

```html
https://example.com/cdn-cgi/image/w=150,h=150,f=auto,fit=crop,gravity=face,zoom=0.5/https://example.r2.dev/image.jpg
```

{{<render file="_ir-svg-aside.md">}}

## Parameters

This section describes all of the parameters and their corresponding options that you can use to resize, crop, compress, and manipulate your images.

Each transformation URL must specify at least one parameter. You can apply multiple parameters in the same request by separating them with a comma. Spaces are not allowed.

{{<render file="_supported-properties.md">}}

<!-- rotate is not a generally useful option, so it’s only documented in the advanced section -->

## Recommended image sizes

Ideally, image sizes should match exactly the size they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`. If the exact size is not known ahead of time, use the [responsive images technique](/images/manage-images/create-variants/).

If you cannot use the `<img srcset>` markup, and have to hardcode specific maximum sizes, Cloudflare recommends the following sizes:

- Maximum of 1920 pixels for desktop browsers.
- Maximum of 960 pixels for tablets.
- Maximum of 640 pixels for mobile phones.

Here is an example of markup to configure a maximum size for your image:

```txt
/cdn-cgi/image/fit=scale-down,width=1920/<YOUR-IMAGE>
```

The `fit=scale-down` option ensures that the image will not be enlarged unnecessarily.

You can detect device type by enabling the `CF-Device-Type` header [via Page Rule](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only).

## Caching

Resizing causes the original image to be fetched from the origin server and cached — following the usual rules of HTTP caching, `Cache-Control` header, etc.. Requests for multiple different image sizes are likely to reuse the cached original image, without causing extra transfers from the origin server.

{{<Aside type="note">}}

If Custom Cache Keys are used for the origin image, the origin image might not be cached and might result in more calls to the origin.

{{</Aside>}}
 
Resized images follow the same caching rules as the original image they were resized from, except the minimum cache time is one hour. If you need images to be updated more frequently, add `must-revalidate` to the `Cache-Control` header. Resizing supports cache revalidation, so we recommend serving images with the `Etag` header. Refer to the [Cache docs for more information](/cache/concepts/cache-control/#revalidation).

Cloudflare Images does not support purging resized variants individually. URLs starting with `/cdn-cgi/` cannot be purged. However, purging of the original image's URL will also purge all of its resized variants.
