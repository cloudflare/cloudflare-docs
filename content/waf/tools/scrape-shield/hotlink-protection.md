---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200170026-Understanding-Cloudflare-Hotlink-Protection
title: Hotlink Protection
weight: 3
---

# Hotlink Protection

Hotlink Protection prevents your images from being used by other sites, which can reduce the bandwidth consumed by your origin server.

{{<Aside type="note">}}

The supported file extensions are `gif`, `ico`, `jpg`, `jpeg`, and `png`.

{{</Aside>}}

## Background

When Cloudflare receives an image request for your site, we check to ensure the request did not originate from visitors on another site. Visitors to your domain will still be able to download and view images.

Technically, this means that Hotlink Protection denies access to requests when the HTTP referer
does not include your website domain name (and is not blank).

Hotlink protection has no impact on crawling, but it will prevent the images from being displayed on sites such as Google images, Pinterest, and Facebook.

## Enable Hotlink Protection

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Hotlink Protection** in the dashboard:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Scrape Shield**.
4.  For **Hotlink Protection**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable **Hotlink Protection** with the API, send a [`PATCH`](/api/operations/zone-settings-change-hotlink-protection-setting) request with the `value` parameter set to `"on"`.

{{</tab>}}
{{</tabs>}}

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

___

## Allow hotlinking to specific images

You may want certain images to be hotlinked to, whether by external websites (like Google) or certain situations like when using an RSS feed.

### Configuration rules

To disable Hotlink Protection selectively, create a [Configuration Rule](/rules/configuration-rules/) covering the path of an image folder.

### hotlink-ok directory

You can allow certain images to be hotlinked by placing them in a directory named `hotlink-ok`. The `hotlink-ok` directory can be placed anywhere on your website.

To allow another website to use `logo.png` from `example.com`, put `logo.png` in a new folder called `hotlink-ok`.

Some examples of URLs that will not be checked for hotlinking:

-   `http://example.com/hotlink-ok/pic.jpg`
-   `http://example.com/images/hotlink-ok/pic.jpg`
-   `http://example.com/hotlink-ok/images/pic.jpg`
-   `http://example.com/images/main-site/hotlink-ok/pic.jpg`