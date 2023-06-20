---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170026-Understanding-Cloudflare-Hotlink-Protection
title: Understanding Cloudflare Hotlink Protection
---

# Understanding Cloudflare Hotlink Protection

Hotlink Protection prevents your images from being used by other sites. This can reduce the bandwidth consumed by your origin server.

When Cloudflare receives an image request for your site, we check to ensure the request did not originate from visitors on another site. Visitors to your domain will still be able to download and view images.

Hotlink protection has no impact on crawling, but it will prevent the images from being displayed on sites such as Google images, Pinterest, etc.

Supported file extensions: gif, ico, jpg, jpeg, and png.

{{<Aside type="note">}}
Hotlink Protection will deny access to requests when the HTTP referer
does not include your website domain name (and is not blank).
**Example:**

> curl <http://example.com/logo.png> -H \'Referer:referesite.com\' -svo
> /dev/null\
> \< HTTP/1.1 403 Forbidden
{{</Aside>}}

## Enable Hotlink Protection

To enable Hotlink Protection on your website:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Scrape Shield**.
4.  For **Hotlink Protection**, switch the toggle to **On**.

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

___

## Can I allow hotlinking to specific images?

You can allow certain images to be hotlinked by placing them in a directory named hotlink-ok. The hotlink-ok directory can be placed anywhere on your website.

**Example:** To allow example.com to use logo.png from example.com, put logo.png in a new folder called hotlink-ok on example.com. Any images in the hotlink-ok folder will not be checked for hotlinking.

Some examples of URLs that will not be checked for hotlinking:

-   `http://example.com/hotlink-ok/pic.jpg`
-   `http://example.com/images/hotlink-ok/pic.jpg`
-   `http://example.com/hotlink-ok/images/pic.jpg`
-   `http://example.com/images/main-site/hotlink-ok/pic.jpg`

___

## Related resources

-   [Email Address Obfuscation](https://support.cloudflare.com/hc/articles/200170016)
-   [Server Side Excludes](https://support.cloudflare.com/hc/articles/200170036)
