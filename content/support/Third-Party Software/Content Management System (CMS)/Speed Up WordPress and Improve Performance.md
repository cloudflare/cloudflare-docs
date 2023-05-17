---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/228503147-Speed-Up-WordPress-and-Improve-Performance
title: Speed Up WordPress and Improve Performance
---

# Speed Up WordPress and Improve Performance



Cloudflare's CDN services can help cache your content across our giant global network, but performance isn't just about moving static files closer to your visitor. Cloudflare does more than offer a CDN, Cloudflare's optimisation features allow you to enhance the performance of your WordPress site beyond what a traditional CDN can do.

### Caching Anonymous Page Views

![Creating a cache rule for anonymous page views.](/support/static/hc-import-screen_shot_2017_03_09_at_16_54_36_1_.png)

Cloudflare's "[Bypass Cache on Cookie](https://support.cloudflare.com/hc/en-us/articles/236166048)" functionality allows non-logged-in pages to be fully cached by Cloudflare. This means your server can save time and resources by not having to regenerate pages where the HTML is effectively static, whilst not interfering with dynamic behaviour - as soon as a user logs-in to the WordPress dashboard or adds something to their WooCommerce, the Edge cache is bypassed.

{{<Aside type="note">}}
This feature is available to Business and Enterprise users. Instructions
on configuring this can be found in the article: [Caching Static HTML
with
WordPress/WooCommerce](https://support.cloudflare.com/hc/articles/236166048).
{{</Aside>}}

### Optimise Images

Images can be incredibly costly to page load times; fortunately, Cloudflare can dramatically help improve image load times. You can find these features in the Cloudflare dashboard, in the **Speed** **app** > **Optimization**.

After enabling **Polish,** you can dramatically improve image and web page load times by compressing images and stripping metadata. Lossless will strip most metadata, e.g. EXIF data, but doesn't change the image detail. Lossy will strip most metadata and compresses images by approximately 15 percent.

![The different options you have to configure Cloudflare Polish.](/support/static/hc-import-cms_wordpress_polish.png)

If you wish to optimise your site for mobile visitors, enabling **Mirage Image Optimization** will allow images to be optimised and delivered based on the end-users network connection and device type:

![Enable Mirage to optimize images for mobile visitors.](/support/static/hc-import-screen_shot_2016_09_30_at_15_29_04.png)

### Enable HTTP/2

**HTTP/2** allows for a multitude of performance features including multiplexing, header compression. In order to enable HTTP/2 on your WordPress site, ensure that your site is loaded over HTTPS.

After **enabling SSL** you must also ensure that users are redirected to the HTTPS version so that it can be loaded over HTTP/2. You can do this using an _Always use HTTPS_ **Page Rule**:

![Create a page rule to ensure your Wordpress website is correctly loaded over HTTP/2](/support/static/hc-import-screen_shot_2016_09_30_at_15_34_14.png)

Cloudflare's **WordPress plugin** allows you to push necessary assets to your users using HTTP/2 Server Push, dramatically reducing the amount of roundtrips required to load CSS and JavaScript. Refer to [How do I enable HTTP/2 Server Push in WordPress guide](https://support.cloudflare.com/hc/articles/115002816808) for a tutorial on setting it up.

### Minify Assets

Cloudflare is able to effectively minify JS, CSS and HTML without a change to your website. We recommend enabling minification in your Cloudflare dashboard instead of installing plugins on your site to do the same purpose. Alternatively if you're using Grunt or Gulp as part of a build process you can implement minification as part of this.

Due to HTTP/2 multiplexing requests, we advise against concatenating CSS or JavaScript files together or installing anything on your server which may do this.

### Advanced Performance Tools

-   Business and Enterprise customers can utilise Cloudflare's [Railgun Origin Network Optimizer](https://www.cloudflare.com/website-optimization/railgun/).
-   Enterprise users can utilise "Prefetching URLs From HTML Headers" and custom cache keys to enhance caching - contact your named Customer Success Engineer for help getting set-up or [reach out to our sales team](https://www.cloudflare.com/enterprise-free-trial/) if you aren't already an Enterprise customer.
