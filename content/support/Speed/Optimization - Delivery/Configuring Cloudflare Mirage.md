---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/219178057-Configuring-Cloudflare-Mirage
title: Configuring Cloudflare Mirage
---

# Configuring Cloudflare Mirage



## Overview

Mirage image optimization is currently available for Pro, Business, and Enterprise level domains.

It accelerates image loading by:

-   Automatically resizing images using Javascript (by analyzing visitor connection and device type)
-   Virtualizing images, so visitors on poor connections get a smaller version at a lower resolution until they can access a higher bandwidth connection
-   Streamlining image requests, so visitors can see optimized images immediately
-   Acting as a lazy loader, turning all images into load on demand

Read our [blog post](https://blog.cloudflare.com/mirage2-solving-mobile-speed) for more information on Mirage.

___

## Image formats compatible with Mirage

Mirage will work with the following image formats:

-   \*.jpg
-   \*.jpeg
-   \*.png
-   \*.gif
-   \*.img

___

## Enable Mirage

To enable Mirage image optimization for your domain,

1.  Log in to your Cloudflare account.
2.  Navigate to the **Speed** tab. 
3.  Click the **Optimization** tab.
4.  Scroll down to the **Optimized Delivery** section.
5.  Toggle the Mirage switch to _On_.

Once enabled Mirage will be active on the entire website.

You can use Cloudflare **Page Rules** to apply Mirage to specific pages or URLs only on your site. To access and configure your page rules, go to the **Rules >** **Page Rules** in the Cloudflare dashboard. 

___

## Test Mirage

Mirage's features for Mobile Browser optimization are triggered based on high latency and poor network connections. You can test Mirage by making a request to your domain using a mobile [user-agent string](http://en.wikipedia.org/wiki/User_agent) and one of the following flags with your domain in your mobile browser:

`EXAMPLE.COM/?forcepreload`

To run the pre-loader only and serve degraded images on the page enter:

`EXAMPLE.COM/?forcepreloadonly`

Here is an example where Mirage 2 is triggered by a `?forcepreloadonly` flag. The notable image degradation is a sign that Mirage is working:

![Blog post regarding the launch of Mirage.
](/support/static/hc-import-219178057_forcepreloadonly.png)
