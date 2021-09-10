---
order: 10
pcx-content-type: concept
---

# Performance Improvements

Cloudflare Pages now includes performance improvements to serve pages of your projects by removing the overhead on media assets and offering compressions. Some of these features are listed below.

## Brotli compression.

Cloudflare applies Brotli compression to help speed up page load times for your visitors.  Brotli compression  is selected as the preferred content encoding method if multiple compression methods are supported by the client. If the client does not indicate that Brotli is supported, the gzip compression will be applied. 

You can learn more about [how cloudflare handles compression](https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-) in this support document. 


## Polish 

Polish improves image loading time by optimizing image hosted on your “domain.pages.dev”. It reduces image file size by removing metadata (date and time, camera manufacturer, model, etc.) by compressing images where possible, smaller images mean faster load time for images and web apps.

By default, the Polish option is turned off for projects, it does come with two other options that have different performance effects on images, namely Lossy and lossless.

### Lossless 

Lossless image option reduces the size of image files without impacting the visual quality. In this option, metadata is removed from PNG, GIF and JPEG but the lossless compression is done on GIF and PNG.


### Lossy 

This polish option, reduces the file size of JPEG images using lossy compression which may reduce image quality.


### Serving WebP images 

When the client requesting the image supports the WebP image codec, Cloudflare will serve a WebP version of the image when WebP offers a performance advantage over the existing format. 

<Aside heading="Status Code">

**Note: ** Large Jpeg images are converted to progressive images. Visitors will see increasingly detailed images as file is downloaded. 

</Aside>