---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/219178057-Configuring-Cloudflare-Mirage
title: Cloudflare Mirage
weight: 3
---

# Cloudflare Mirage

Cloudflare Mirage accelerates image loading on your domain.

It does this by:

-   Automatically resizing images using JavaScript (by analyzing visitor connection and device type).
-   Virtualizing images, so visitors on poor connections get a smaller version at a lower resolution until they can access a higher bandwidth connection.
-   Streamlining image requests, so visitors can see optimized images immediately.
-   Acting as a lazy loader, turning all images into load on demand.

---

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
If you send a CSP (content security policy) header that restricts where scripts can be loaded, you will need to ensure `ajax.cloudflare.com` is enabled. For example, to allow scripts from your own domain and `ajax.cloudflare.com` enter the following:
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