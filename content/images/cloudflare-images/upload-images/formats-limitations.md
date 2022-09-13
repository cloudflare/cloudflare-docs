---
pcx_content_type: reference
title: Supported image formats
weight: 5
---

# Supported image formats

You can upload the following image formats to Cloudflare Images:

- PNG
- GIF
- JPEG
- WebP
- SVG

## Dimensions and sizes

These are the maximum allowed sizes and dimensions Cloudflare Images supports:

- Images' height and width are limited to 10,000 pixels.
- Image metadata is limited to 1024 bytes.
- Images have a 10 megabyte (MB) size limit.
- Animated GIFs, including all frames, are limited to 100 megapixels (MP).

## SVG files

Cloudflare Images supports SVG files. However, as this is an inherently scalable format, Cloudflare does not resize your files As such, variants do not apply when using an SVG file. Variants, named or flexible, are intended to transform bitmap (raster) images into whatever size you want to serve them.

To serve an SVG fle, you can use any named variant as a placeholder to allow your image to be delivered. For example:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<SVG_ID>/public
```

If you intend to use flexible variants to serve your SVG files, you should pass `format=auto` as the parameter. Parameters are ignored when used with SVGs as Cloudflare does not resize images. However, you still need one parameter to make flexible variant calls valid. For example:

```txtx
https://imagedelivery.net/<ACCOUNT_HASH>/<SVG_ID/format=auto
```
