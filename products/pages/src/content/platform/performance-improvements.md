---
order: 10
pcx-content-type: concept
---

# Performance Improvements

Cloudflare Pages supports performance improvement by removing the overhead on media assets and offering image compression. 
 
<Aside type="note">

If you have a custom domain set up in your Pages project, configuring your performance settings in **Speed** on the Cloudflare dashboard will override the performance settings configured in Pages. 

</Aside>

## Brotli compression

Cloudflare applies [Brotli](https://www.brotli.pro/) compression to help speed up page load times for your visitors. Brotli compression is selected as the preferred content-encoding method if multiple compression methods are supported by the client. If the client does not indicate that Brotli is supported, the gzip compression will be applied. 

The Brotli compression option is automatically turned on for all Pages sites and cannot be turned off in the **Pages** dashboard.
However, if your project is tied to a custom domain, you may adjust your Brotli settings in **Speed** > **Optimization** > moving the **Brotli** toggle to **Off*.
 
You can learn more about [how Cloudflare handles compression by reviewing this support article](https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-).

## Polish 

Polish improves image loading time by optimizing images hosted on your `*.pages.dev`site. It reduces image file size by removing metadata (date and time, camera manufacturer, model, etc.) by compressing images where possible. Smaller images result in faster load time for images and web applications. 
 
There are two options for configuration with different performance effects on images -- _Lossless_ and _Lossy_. You can choose between these two options by going to **Speed** > **Optimization** > **Polish**.


### Lossless 

Lossless image option reduces the size of image files without impacting the visual quality. In this option, metadata is removed from PNG, GIF and JPEG but the lossless compression is done on GIF and PNG.


### Lossy 

This Polish option reduces the file size of JPEG images using lossy compression which may reduce image quality.

<Aside heading="Note">
 
Making the decision on what form of optimization to use is mostly based on your individual use case. You can review the variety of resources to learn more about [the difference between Lossy and Lossless image compression on Imagify's blog](https://imagify.io/blog/lossless-vs-lossy-image-compression/).

</Aside>

### Serving WebP images 

Whether you choose _Lossy_ or _Lossless_, you also have the option of enabling WebP for your images. If the client requesting the image supports the WebP image codec, Cloudflare will serve a WebP version of the image if offering a performance advantage over the existing format. 

<Aside heading="Status Code">

Large JPEG images are converted to progressive images with WebP enabled. Visitors will see increasingly detailed images as the file is downloaded. 

</Aside>

### How to turn on Polish

By default, all new projects will have Polish enabled with the _Lossy_ and the **WebP** setting.  To update your configuration, log into the Cloudflare dashboard and go to **Speed** > **Optimization** > **Polish**.
