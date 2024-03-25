---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/219178057-Configuring-Cloudflare-Mirage
title: Cloudflare Mirage
weight: 3
---

# Cloudflare Mirage

Cloudflare Mirage reduces bandwidth used by images in mobile browsers. It can accelerate loading of image-heavy websites on very slow mobile connections and HTTP/1.

It does this by:

- Replacing images with low-resolution thumbnails, which are bundled together into one file.
- Acting as a lazy loader, deferring loading of higher-resolution images until they become visible.

JavaScript must be enabled for Mirage to work.

---

## Comparison

* [Polish](/images/polish/) seamlessly optimizes images for all browsers, not only mobile, and keeps images at full resolution.
* [Image Resizing](/images/transform-images/) together with `loading="lazy"` and `srcset` HTML attributes can achieve similar results as Mirage, but requires markup changes to implement.

## Availability

{{<feature-table id="speed.mirage">}}

___

## Image formats compatible with Mirage

Mirage will work with the following image formats:

-   `.jpg`
-   `.jpeg`
-   `.png`
-   `.gif`
-   `.img`

___

## Enable Mirage

{{<Aside type="note">}}
If you send a {{<glossary-tooltip term_id="content security policy (CSP)">}}Content Security Policy (CSP){{</glossary-tooltip>}} header that restricts where scripts can be loaded, you will need to ensure `ajax.cloudflare.com` is enabled. For example, to allow scripts from your own domain and `ajax.cloudflare.com` enter the following:
`script-src 'self' ajax.cloudflare.com;`
{{</Aside>}}

To enable Mirage image optimization for your entire domain:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2.  Select your account and zone.
3.  Go to **Speed** > **Optimization** > **Image Optimization**.
4.  For **Mirage**, switch the toggle to **On**.

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

___

## Test Mirage

Mirage's features for Mobile Browser optimization are triggered based on high latency and poor network connections. You can test Mirage by making a request to your domain using a mobile [user-agent string](http://en.wikipedia.org/wiki/User_agent) and one of the following flags with your domain in your mobile browser:

`EXAMPLE.COM/?forcepreload`

To run the pre-loader only and serve degraded images on the page enter:

`EXAMPLE.COM/?forcepreloadonly`

Here is an example where Mirage 2 is triggered by a `?forcepreloadonly` flag. The notable image degradation is a sign that Mirage is working:

![Blog post regarding the launch of Mirage.
](/images/support/hc-import-219178057_forcepreloadonly.png)