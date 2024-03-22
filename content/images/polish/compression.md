---
pcx_content_type: reference
title: Polish compression
weight: 2
---

# Polish compression

With Lossless and Lossy modes, Cloudflare attempts to strip as much metadata as possible. However, Cloudflare cannot guarantee stripping all metadata because other factors, such as caching status, might affect which metadata is finally sent in the response.

{{<Aside type="warning" header="Warning">}}

Polish may not be applied to origin responses that contain a `Vary` header. The only accepted `Vary` header is `Vary: Accept-Encoding`.

{{</Aside>}}

## Compression options

### Off

Polish is disabled and no compression is applied. Disabling Polish does not revert previously polished images to original, until they expire or are purged from the cache.

### Lossless

The Lossless option attempts to reduce file sizes without changing any of the image pixels, keeping images identical to the original. It removes most metadata, like EXIF data, and losslessly recompresses image data. JPEG images may be converted to progressive format. On average, lossless compression reduces file sizes by 21 percent compared to unoptimized image files.

The Lossless option prevents conversion of JPEG to WebP, because this is always a lossy operation.

### Lossy

The Lossy option applies significantly better compression to images than then the Lossless option, at a cost of small quality loss. When uncompressed, some of the redundant information from the original image is lost. On average, using Lossy mode reduces file sizes by 48 percent.

This option also removes metadata from images. The Lossy option mainly affects JPEG images, but PNG images may also be compressed in a lossy way, or converted to JPEG when this improves compression.

### WebP

When enabled, in addition to other optimizations, Polish creates versions of images converted to the WebP format.

WebP compression is quite effective on PNG images, reducing file sizes by approximately 26 percent.
It may reduce file sizes of JPEG images by around 17 percent, but this [depends on several factors](/images/polish/no-webp/).
WebP is supported in all browsers except for Internet Explorer and KaiOS. You can learn more in our [blog post](https://blog.cloudflare.com/a-very-webp-new-year-from-cloudflare/).

The WebP version is served only when the `Accept` header from the browser includes WebP, and the WebP image is significantly smaller than the lossy or lossless recompression of the original format:

```txt
Accept: image/avif,image/webp,image/*,*/*;q=0.8
```

Polish only converts standard image formats <em>to</em> the WebP format. If the origin server serves WebP images, Polish will not convert them, and will not optimize them.

#### File size, image quality, and WebP

Lossy formats like JPEG and WebP are able to generate files of any size, and every image could theoretically be made smaller. However, reduction in file size comes at a cost of reduction in image quality. Reduction of file sizes below each format's optimal size limit causes disproportionally large losses in quality. Re-encoding of files that are already optimized reduces their quality more than it reduces their file size.

Cloudflare will not convert from JPEG to WebP when the conversion would make the file bigger, or would reduce image quality by more than it would save in file size.

If you choose the Lossless Polish setting, then WebP will be used very rarely. This is due to the fact that, in this mode, WebP is only adequate for PNG images, and cannot improve compression for JPEG images.

Although WebP compresses better than JPEG on average, there are exceptions, and in some occasions JPEG compresses better than WebP. Cloudflare tries to detect these cases and keep the JPEG format.

If you serve low-quality JPEG images at the origin (quality setting 60 or lower), it may not be beneficial to convert them to WebP. This is because low-quality JPEG images have blocky edges and noise caused by compression, and these distortions increase file size of WebP images. We recommend serving high-quality JPEG images (quality setting between 80 and 90) at your origin server to avoid this issue.

If your server or Content Management System (CMS) has a built-in image converter or optimizer, it may interfere with Polish. It does not make sense to apply lossy optimizations twice to images, because quality degradation will be larger than the savings in file size.

## Polish interaction with Image optimization

Polish will not be applied to URLs using image transformations. Resized images already have lossy compression applied where possible, so they do not need the optimizations provided by Polish. Use the `format=auto` option to allow use of WebP and AVIF formats.
