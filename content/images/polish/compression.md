---
pcx-content-type: reference
title: Polish compression
---

# Polish compression

With Lossless and Lossy modes, Cloudflare attempts to strip as much metadata as possible. However, Cloudflare cannot guarantee stripping all metadata because other factors, such as caching status, might affect which metadata is finally sent in the response.

{{<Aside type="warning" header="Warning">}}

Polish may not be applied to origin responses that contain a `Vary` header. The only accepted `Vary` header is `Vary: Accept-Encoding`.

{{</Aside>}}

## Compression options

### Off

Polish is disabled and no compression is applied.

### Lossless

The lossless option attempts to strip most metadata, like EXIF data, but does not change the image detail. Effectively, when uncompressed, a lossless image is identical to the original. On average, lossless compression reduces file size by 21 percent.

This option applies a lossless compression to GIF and PNG files.


### Lossy

Lossy attempts to strip most metadata and compresses images by approximately 15 percent. When uncompressed, some of the redundant information from the original image is lost. On average, using Lossy mode reduces file size by 48 percent. Lossy has the same effect as Lossless when applied to PNG.

This option applies a lossy compression to JPEG files.

### WebP

WebP is a modern image format providing superior lossless and lossy compression for images. WebP lossless images are approximately 26 percent smaller than PNGs, while lossy images are 25 to 34 percent smaller than JPEGs. WebP is supported in all browsers except for Internet Explorer and KaiOS. Safari supports WebP from iOS 14 and macOS 11 (Big Sur). You can learn more in our [blog post](https://blog.cloudflare.com/a-very-webp-new-year-from-cloudflare/).

Polish creates and caches a WebP version of the image and delivers it to the browser if the `Accept` header from the browser includes WebP, and the compressed image is significantly smaller than the lossy or lossless compression:

```txt
Accept: image/avif,image/webp,image/*,*/*;q=0.8
```

#### File sizes with WebP

WebP cannot distinguish image data from the artifacts introduced in highly compressed JPEG images. As a result, the WebP algorithm ends up encoding unnecessary data. Sometimes, this leads to a bigger than expected image file size after compression.

Cloudflare tries to balance quality and image file size with Polish, and will not compress the image if the final result is below a certain quality threshold.

## Polish interaction with Image optimization

Polish will not be applied to URLs using Image Resizing. Resized images already have lossy compression applied where possible, so they do not need the optimizations provided by Polish. Use the `format=auto` option to allow use of WebP and AVIF formats.