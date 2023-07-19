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

Polish is disabled and no compression is applied.

### Lossless

The Lossless option attempts to strip most metadata, like EXIF data, but does not change the image detail. Effectively, when uncompressed, a lossless image is identical to the original. On average, lossless compression reduces file size by 21 percent.

This option attempts to remove EXIF data from GIF, PNG, and JPEG files. However, it only applies lossless compression to GIF and PNG files, as JPEG files are inherently lossy.


### Lossy

The Lossy option attempts to strip most metadata and compresses images by approximately 15 percent. When uncompressed, some of the redundant information from the original image is lost. On average, using Lossy mode reduces file size by 48 percent.

Although this option tries to remove EXIF data from GIF, PNG, and JPEG files, it only applies compression to JPEG files. Lossy has the same effect as Lossless when applied to PNG.

### WebP

WebP provides superior savings in file size when compared to PNG or JPEG. WebP lossless images are approximately 26 percent smaller than PNGs, while lossy images are around 17 percent smaller than JPEG files. WebP is supported in all browsers except for Internet Explorer and KaiOS. You can learn more in our [blog post](https://blog.cloudflare.com/a-very-webp-new-year-from-cloudflare/).

Polish creates and caches a WebP version of the image and delivers it to the browser if the `Accept` header from the browser includes WebP, and the compressed image is significantly smaller than the lossy or lossless compression:

```txt
Accept: image/avif,image/webp,image/*,*/*;q=0.8
```

#### File size, image quality, and WebP

Lossy formats like JPEG and WebP are able to generate files of any size, and every image could theoretically be made smaller. However, reduction in file size comes at a cost of reduction in image quality. Reduction of file sizes below each format's optimal size limit causes disproportionally large losses in quality. Re-encoding of files that are already optimized reduces their quality more than it reduces their file size.

Cloudflare will not convert from JPEG to WebP when the conversion would make the file bigger, or would reduce image quality by more than it would save in file size.

If you choose the Lossless Polish setting, then WebP will be used very rarely. This is due to the fact that, in this mode, WebP is only adequate for PNG images, and cannot improve compression for JPEG images.

Although WebP compresses better than JPEG on average, there are exceptions, and in some occasions JPEG compresses better than WebP. Cloudflare tries to detect these cases and keep the JPEG format.

If you serve low-quality JPEG images at the origin (quality setting 60 or lower), it may not be beneficial to convert them to WebP. This is because low-quality JPEG images have blocky edges and noise caused by compression, and these distortions increase file size of WebP images. We recommend serving high-quality JPEG images (quality setting between 80 and 90) at your origin server to avoid this issue.

If your server or Content Management System (CMS) has a built-in image converter or optimizer, it may interfere with Polish. It does not make sense to apply lossy optimizations twice to images, because quality degradation will be larger than the savings in file size.

## Polish interaction with Image optimization

Polish will not be applied to URLs using Image Resizing. Resized images already have lossy compression applied where possible, so they do not need the optimizations provided by Polish. Use the `format=auto` option to allow use of WebP and AVIF formats.