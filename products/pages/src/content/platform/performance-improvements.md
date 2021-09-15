---
order: 10
pcx-content-type: concept
---

# Performance Improvements

Cloudflare Pages supports performance improvement by removing the overhead on media assets and offering image compression. 
 
<Aside type="note">

If you have a custom domain set up in your Pages project, configuring your performance settings in **Speed** on the Cloudflare dashboard will override the performance settings configured your **Pages project**.

</Aside>

## Brotli compression

Cloudflare applies [Brotli](https://www.brotli.pro/) compression to speed up load times for your visitors. If multiple compression methods are supported by the client, Brotli compression is selected as the preferred content-encoding method. If the client does not indicate that Brotli is supported, the gzip compression will be applied. 

The Brotli compression option is automatically turned on for all Pages sites and cannot be turned off in the **Pages** dashboard.
However, if your Pages project has a custom domain set up, you may adjust your Brotli settings in the Cloudflare dashboard by going to **Speed** > **Optimization** > moving the **Brotli** toggle to **Off*.
 
You can learn more about [how Cloudflare handles compression by reviewing this support article](https://support.cloudflare.com/hc/en-us/articles/200168396-What-will-Cloudflare-compress-).

## Polish 

Polish improves image load time by optimizing images hosted on your `*.pages.dev`site. Polish reduces image file size by removing metadata (such as date and time, camera manufacturer, model, etc.) by compressing images where possible. Smaller file size results in faster load time for images and web applications. 
 
There are two options for Polish configuration with different performance effects on images -- _Lossless_ and _Lossy_ --. You can choose between these two options by going to **Speed** > **Optimization** > **Polish**.


### Lossless 

The _Lossless_ Polish option reduces the size of image files without impacting the visual quality. With _Lossless_, metadata is removed from PNG, GIF, and JPEGs. However, Lossless compression applied to GIF and PNGs only.


### Lossy 

This Polish option reduces the file size of JPEG images using lossy compression which may reduce image quality. Using Lossy also enables WebP for your images. If the client requesting the image supports the WebP image codec and WebP offers a performance advantage over the existing format, Cloudflare will serve a WebP version of the image.

Large JPEG images are converted to progressive images with WebP enabled, and visitors will see increasingly detailed images as the file is downloaded. 
 
<Aside heading="Note">
 
Your individual use case will determine which form of optimization right for your project. You can refer to [the difference between Lossy and Lossless image compression on Imagify's blog](https://imagify.io/blog/lossless-vs-lossy-image-compression/) to learn more about which option is right for you..

</Aside>

### How to turn on Polish

By default, all new projects will have Polish enabled with the _Lossy_ and the **WebP** setting.  To update your configuration, log into the Cloudflare dashboard and go to **Speed** > **Optimization** > **Polish**.
