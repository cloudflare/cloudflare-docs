---
pcx_content_type: concept
weight: 3
title: /cdn-cgi/ endpoint
---

# /cdn-cgi/ endpoint

When you [add a domain to Cloudflare](/fundamentals/get-started/setup/add-site/), Cloudflare adds a `/cdn-cgi/` endpoint (`www.example.com/cdn-cgi/`) to that domain.

This endpoint is managed and served by Cloudflare. It cannot be modified or customized. The endpoint is not used by every Cloudflare product, but you may find some products use the endpoint in its URL.

A few examples include (but are not limited to):

* [Identify the Cloudflare data center serving your request](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#identify-the-cloudflare-data-center-serving-your-request), which is helpful for troubleshooting (`https://<YOUR_DOMAIN>/cdn-cgi/trace`).
* [JavaScript detection](/bots/reference/javascript-detections/) used by Cloudflare bot products (`example.com/cdn-cgi/challenge-platform/`)
* [Web analytics](/analytics/web-analytics/getting-started/#sites-proxied-through-cloudflare) for a website proxied through Cloudflare (`example.com/cdn-cgi/rum`)
* [Image resizing](/images/image-resizing/url-format/) in the new URLs you would use for images (`example.com/cdn-cgi/image/`)
* [Email address obfuscation](https://support.cloudflare.com/hc/articles/200170016) used to hide email addresses from malicious bots (`example.com/cdn-cgi/l/email-protection`)

## Recommended exclusions

### Exclude from security scanners

Some scanners may display an error because certain `/cdn-cgi/` endpoints do not have an [HSTS setting](/ssl/edge-certificates/additional-options/http-strict-transport-security/) applied to it or for similar reasons. Because the endpoint is managed by Cloudflare, you can ignore the error and do not need to worry about it.

To prevent scanner errors, omit the `/cdn-cgi/` endpoint from your security scans.

### Disallow using robots.txt

`/cdn-cgi/` also can cause issues with various web crawlers. 

Search engine crawlers can encounter errors when crawling these endpoints and — though these errors do not impact site rankings — they may surface in your [webmaster dashboard](https://support.cloudflare.com/hc/articles/200169806).

SEO and other web crawlers may also mistakenly crawl these endpoints, thinking that they are part of your site's content.

As a best practice, update your `robots.txt` file to include `Disallow: /cdn-cgi/`.
