---
pcx_content_type: how-to
title: Preparing for surges or spikes in web traffic
---

# Preparing for surges or spikes in web traffic

## Use Cloudflare Cache features to optimize caching

By default, Cloudflare [caches static content](/cache/concepts/default-cache-behavior/) such as images, CSS and JavaScript; however, you can extend Cloudflare caching to work with HTML by creating custom [Cache Rules](/cache/how-to/cache-rules/).

### Cache more requests

1. Log in to your Cloudflare dashboard.

2. Go to **Cache** > **Cache Rules** and select **Create Rule**.

3. For `When incoming requests match…`, enter either your entire website or a specific path on your application, based on the **Hostname** or **URI Path**. Refer to the [available fields here](/cache/how-to/cache-rules/settings/#fields)

4. For `Cache eligibility`, define how these requests should be cached and for how long. Refer to [available cache eligibility settings here](/cache/how-to/cache-rules/settings/#eligible-for-cache-settings)

5. You can then monitor the effectiveness of your cache settings using [Cache Analytics](/cache/performance-review/cache-analytics/) and update according to our [Cache performance guide](/cache/performance-review/cache-performance/).

Customers with Business and Enterprise domains have additional Page Rules settings that can be combined to selectively cache HTML content based on whether the page contains dynamic information (such as credentialed information), see our [Cache HTML selectively article here](/cache/troubleshooting/customize-caching/#cache-html-selectively-business-and-enterprise-domains)


### Advanced cache optimizations

- [Custom Cache Keys](/cache/how-to/cache-keys/) allows you to precisely set the cacheability setting for any resource.

- [Origin Cache Control](/cache/concepts/cache-control/) can be used to let the `Cache-Control` headers tell Cloudflare how to handle content from the origin. 


### Use Tiered Cache

[Tiered Cache](/cache/how-to/tiered-cache/) uses the size of Cloudflare’s network to reduce requests to customer origins by dramatically increasing cache hit ratios.

It works by dividing Cloudflare’s data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier requests an upper-tier for the content. If the upper-tier does not have the content, only the upper-tier will initiate a request to the origin. This practice improves bandwidth efficiency by limiting the number of Cloudflare data centers that can ask the origin for content.

Refer to [Enable Tiered Cache](/cache/how-to/tiered-cache/#enable-tiered-cache) to get started.


### Use Cache Reserve 

[Cache Reserve](/cache/advanced-configuration/cache-reserve/) is a large, persistent data store implemented on top of [R2](/r2/).

With a single click in the dashboard, your cacheable content will be written to Cache Reserve. In the same way that Tiered Cache builds a hierarchy of caches between your visitors and your origin, Cache Reserve serves as the ultimate [upper-tier cache](/cache/how-to/tiered-cache/) that will reserve storage space for your assets for as long as you want. 

This ensures that your content is served from cache longer, shielding your origin from unneeded egress fees.

## Understand the limits of your hosting plan

Cloudflare offsets most of the load to your website via caching and request filtering, but some traffic will still pass through to your origin. Knowing the limits of your hosting plan can help prevent a bottleneck from your host. 

Once you are aware of your plan limits, you can use [Rate Limiting](/waf/rate-limiting-rules/) to restrict how many times a requesting entity can make a request to your website.

To help you define the best rate limiting setting for your use case, refer to [How Cloudflare determines the request rate article](/waf/rate-limiting-rules/request-rate/).

## Cloudflare Waiting Room

[Cloudflare Waiting Room](/waiting-room/) allows you to route excess users of your website to a customized waiting room, helping preserve customer experience and protect origin servers from being overwhelmed with requests.

## Use Cloudflare IP addresses to your advantage

Take action to prevent attacks to your application during peak season by configuring your firewall to only accept traffic from Cloudflare IP addresses. By only allowing [Cloudflare IPs](https://www.cloudflare.com/ips), you can prevent attackers from bypassing Cloudflare and sending requests directly to your origin.

Refer to [Cloudflare IP addresses](/fundamentals/concepts/cloudflare-ip-addresses/) for more information.

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

## Best Practices working with Cloudflare Support

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
