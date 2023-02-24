---
pcx_content_type: reference
title: Providing specific URLs
weight: 3
meta:
    title: Providing specific URLs - Report abuse
    description: Learn how to provide specific asset URLs when submitting an abuse report.
---

# Providing specific URLs

If you are [submitting an abuse report](https://abuse.cloudflare.com) to Cloudflare because our IP address appears in the WHOIS and DNS records for a website, it is very likely that the website is one of millions of websites that use our pass-through security and content distribution network (CDN) services. Because assets on the same website may be hosted by different providers, it is important that you submit the URL for that specific asset to enable appropriate action. This guide will teach you how to identify URLs for specific video or images on a webpage.

## Get the URL for specific content

To get the URL for a specific piece of content on a webpage:

1. Open your web browser (Google Chrome, Safari, Firefox, Edge).
2. Go to the web page you want to report.
3. Right click on the content you wish to report (often a video or image).
4. Select **Inspect Element**.
5. In the **DevTools** panel, look for the **src** attribute in the selected the image, video, or iFrame.
    ![Look for the URL in the src attribute of the video or image](/fundamentals/static/images/get-started/identify-url.png)

6. Copy the URL.

This is typically the most specific and helpful URL that someone reporting abuse can provide to Cloudflare, so that Cloudflare can correctly identify any services Cloudflare may be providing with respect to that content. 

## Submitting the abuse report

Once you have identified the URL for the specific asset, you can [submit an abuse report](https://abuse.cloudflare.com) through Cloudflare’s online abuse reporting process. 

You can learn more about the process, and what you can expect from Cloudflare in response to such abuse reports, from [our abuse policy](https://www.cloudflare.com/trust-hub/reporting-abuse/).