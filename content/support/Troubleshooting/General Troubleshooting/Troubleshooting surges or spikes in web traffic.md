---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172906-Troubleshooting-surges-or-spikes-in-web-traffic
title: Troubleshooting surges or spikes in web traffic
---

# Troubleshooting surges or spikes in web traffic



## Overview

There are many ways to protect and prepare your domain to handle spikes in traffic. We recommend the following strategies detailed below:

-   use Cloudflare Page Rules to customize caching
-   contact your hosting provider to understand the limits of your hosting plan
-   use Cloudflare IP addresses to your advantage
-   ensure Cloudflare IPs are allowed

___

## Use Cloudflare Page Rules to customize caching

By default Cloudflare [caches static content](/cache/concepts/default-cache-behavior/) like images, CSS and JavaScript; however, you can extend Cloudflare caching to work with HTML by creating custom [Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-).

### Cache everything

1\. Log in to your Cloudflare account

2\. Go to **Rules >** **Page Rules**. 

3\. Select **Create Page Rule**.

4.  For the url, enter either your entire website or a section of your site.

5\. For **Settings**, select **Cache Level** and then **Cache Everything**. Cloudflare will now fully cache HTML at our Edge network, instead of making roundtrips to your origin web server.

6. To control how long Cloudflare caches resources, add another setting for **Edge Cache TTL** and select a time duration.

With the Cache Everything option enabled, Cloudflare will be serving your entire site, taking the load off of your server completely, making your site as fast as possible.

Cloudflare customers on the Business plan can use advanced caching techniques to cache static content on dynamic HTML sites to reduce load using the _Bypass Cache on Cookie_ Page Rule option.

### Cache anonymous page views

Before a visitor adds something to their shopping cart, logs in, or adds a comment, their page views are anonymous. By caching these types of page visits, you decrease server load, even if your site is dynamic. You can find out more information in the introductory blog post: [Caching Anonymous Page Views](https://blog.cloudflare.com/caching-anonymous-page-views/). 

There are multiple tutorials available on how you can do this:

-   [Caching Anonymous Page Views with WordPress or WooCommerce](https://support.cloudflare.com/hc/en-us/articles/236166048)
-   [Caching Anonymous Page Views with Magento 1 and Magento 2](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [Caching static HTML](https://support.cloudflare.com/hc/articles/202775670)

___

## Contact your hosting provider to understand the limits of your hosting plan

Cloudflare offsets most of the load to your website via caching and request filtering, but some traffic will still pass through to your host. Knowing the limits of your plan can help prevent a bottleneck from your host. 

Once you are aware of your plan limits, you can use a feature like [Rate Limiting](/waf/rate-limiting-rules/) to restrict how many times anyone user can make a request to your website.

___

## Use Cloudflare IP addresses to your advantage

Take action to prevent attacks to your site during peak season by configuring your firewall to only accept traffic from Cloudflare IP addresses during the holidays. If you only accept [Cloudflare IPs](https://www.cloudflare.com/ips), you can prevent attackers from getting to your original IP address and knocking your site offline.

Another option would be to [restore visitor IP addresses](https://support.cloudflare.com/hc/articles/200170786) and add _DenyAllButCloudFlare_ to your Apache configuration.

___

## Ensure Cloudflare IPs are allowed

Cloudflare operates as a reverse proxy to your site so all connections come from Cloudflare IPs, so restricting our IPs can cause issues for visitors trying to access your site. The list of Cloudflare IPs can be found here: [https://www.cloudflare.com/ips](https://www.cloudflare.com/ips).

___

## What information do I need when submitting a support ticket?

Before the high traffic event occurs, you must [open a Support ticket](https://support.cloudflare.com/hc/articles/200172476) and provide the information below.

**For WAF/CDN customers**

-   Traffic origin region
-   Traffic duration
-   Traffic window (UTC)
-   Traffic method
-   Bandwidth size or range
-   Target IPs/range/zones/hostnames/full URLs
-   Contact in case of emergency

[****](/ddos-protection/reference/simulate-ddos-attack/#for-magic-transit-and-spectrum-customers)**For Magic Transit and Spectrum customers**

-   Traffic origin region
-   Traffic duration
-   Traffic window (UTC)
-   Traffic method
-   Bandwidth size or range
-   Target IPs/range/zones
-   Target Ports
-   Protocol
-   Max packet/bit rate
-   Contact in case of emergency

___

## Related resources

-   [Understanding and Configuring Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)
-   [Caching static HTML](https://support.cloudflare.com/hc/articles/202775670)
-   [Rate limiting rules](/waf/rate-limiting-rules/)
