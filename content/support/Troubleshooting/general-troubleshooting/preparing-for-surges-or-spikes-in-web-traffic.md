---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172906-Troubleshooting-surges-or-spikes-in-web-traffic
title: Preparing for surges or spikes in web traffic
---

# Preparing for surges or spikes in web traffic

## Use Cloudflare Cache features to optimize caching

By default Cloudflare [caches static content](/cache/concepts/default-cache-behavior/) like images, CSS and JavaScript; however, you can extend Cloudflare caching to work with HTML by creating custom [Cache Rules](/cache/how-to/cache-rules/).

### Cache more requests

1\. Log in to your Cloudflare account

2\. Go to **Cache >** **Cache Rules**. 

3\. Select **Create Rule**.

4\.  For `When incoming requests match…`, enter either your entire website or a section of your site, based on the **Hostname** or **URI Path** for example.
See the [available fields here](/cache/how-to/cache-rules/settings/#fields)

5\. For `Cache eligibility`, define how these requests should be cached and for how long.
See the available [cache eligibility settings here](/cache/how-to/cache-rules/settings/#eligible-for-cache-settings)

6\. You can then monitor the effectiveness of your cache settings using the [Cache Analytics](/cache/performance-review/cache-analytics/).
Also see our [Cache Performance article here](/cache/performance-review/cache-performance/)


Customers with Business and Enterprise domains have additional Page Rules settings that can be combined to selectively cache HTML content based on whether the page contains dynamic information (such as credentialed information), see our [Cache HTML selectively article here](/cache/troubleshooting/customize-caching/#cache-html-selectively-business-and-enterprise-domains)


### Optimize caching further

Using [Custom Cache Keys](/cache/how-to/cache-keys/) allows you to precisely set the cacheability setting for any resource.

[Origin Cache Control](/cache/concepts/cache-control/) can be used to let the `Cache-Control` headers tell Cloudflare how to handle content from the origin. 


### Use Tiered Cache

[Tiered Cache](/cache/how-to/tiered-cache/) uses the size of Cloudflare’s network to reduce requests to customer origins by dramatically increasing cache hit ratios.

Tiered Cache works by dividing Cloudflare’s data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate.

See our [how to enable Tiered Cache article](/cache/how-to/tiered-cache/#enable-tiered-cache)


### Use Cache Reserve 

[Cache Reserve](/cache/advanced-configuration/cache-reserve/) is a large, persistent data store implemented on top of [R2](/r2/).
By pushing a single button in the dashboard, your website’s cacheable content will be written to Cache Reserve. In the same way that Tiered Cache builds a hierarchy of caches between your visitors and your origin, Cache Reserve serves as the ultimate [upper-tier cache](/cache/how-to/tiered-cache/) that will reserve storage space for your assets for as long as you want. 
This ensures that your content is served from cache longer, shielding your origin from unneeded egress fees.

You can find more details about [Cache Reserve here](/cache/advanced-configuration/cache-reserve/)


___

## Contact your hosting provider to understand the limits of your hosting plan

Cloudflare offsets most of the load to your website via caching and request filtering, but some traffic will still pass through to your host. Knowing the limits of your plan can help prevent a bottleneck from your host. 

Once you are aware of your plan limits, you can use a feature like [Rate Limiting](/waf/rate-limiting-rules/) to restrict how many times anyone user can make a request to your website.
To help you define the best rate limiting setting for your use case, you can follow the instruction from our [How Cloudflare determines the request rate article](/waf/rate-limiting-rules/request-rate/).

___

## Consider using Waiting Room

[Cloudflare Waiting Room](/waiting-room/) allows you to route excess users of your website to a customized waiting room, helping preserve customer experience and protect origin servers from being overwhelmed with requests.

___


## Use Cloudflare IP addresses to your advantage

Take action to prevent attacks to your site during peak season by configuring your firewall to only accept traffic from Cloudflare IP addresses. 
If you only accept [Cloudflare IPs](https://www.cloudflare.com/ips), you can prevent attackers from getting to your original IP address and knocking your site offline.

See our article [Cloudflare IP addresses -> Block other IP addresses](/fundamentals/concepts/cloudflare-ip-addresses/#block-other-ip-addresses-recommended)

___

## Monitor traffic in your Cloudflare Dashboard

You can use the Cloudflare Dashboard to closely monitor the traffic on your domain and fine-tune your cache and security settings accordingly.


### Zone and Account analytics

The [Cloudflare zone analytics](/analytics/account-and-zone-analytics/zone-analytics/) is a major component of the overall Cloudflare Analytics product line.  Specifically, this app gives you access to a wide range of metrics, collected at the website or domain level.

[Cloudflare account analytics](/analytics/account-and-zone-analytics/account-analytics/) lets you access a wide range of aggregated metrics from all the sites under a specific Cloudflare account.


### Security Analytics and Security Events

[Security Analytics](/waf/analytics/security-analytics/) displays information about all incoming HTTP requests for your domain, including requests not handled by Cloudflare security products.

You can also use the [Security Events](/waf/analytics/security-events/) to review mitigated requests and tailor your security configurations.


### Cache Analytics

You can use [Cache Analytics](/cache/performance-review/cache-analytics/) to improve site performance or reduce origin web server traffic. 
Cache Analytics helps determine if resources are missing from cache, expired, or ineligible for caching. 


___

## What information do I need when submitting a support ticket?

Before the high traffic event occurs, you must [open a Support ticket](/support/contacting-cloudflare-support/) and provide the information below.

**For WAF/CDN customers**

-   Traffic origin region
-   Traffic duration
-   Traffic window (UTC)
-   Traffic method
-   Traffic size in both requests per second (rps) and bandwidth (Gbps/Mbps/MBps)
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


