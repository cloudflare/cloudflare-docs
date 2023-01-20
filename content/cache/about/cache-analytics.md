---
title: Cache Analytics
pcx_content_type: concept
---

# Cache Analytics

Use Cache Analytics to improve site performance or reduce origin web server traffic. Cache Analytics helps determine if resources are missing from cache, expired, or ineligible for caching. Cache Analytics includes filter by hostname, list of top URLs that miss cache, and a query of up to three days of data.

First, determine whether to focus on Requests or Data Transfer. The default view is Requests, which helps with understanding performance because every cache miss degrades the speed of content delivery. Data Transfer helps with understanding cost because most hosting providers charge for every byte that leaves their network.

You can toggle between Requests and Data Transfer while keeping other analytics filters enabled.

For best practices related to Cache Analytics, refer to [Cache performance](/cache/best-practices/cache-performance/).

## Availability

{{<feature-table id="cache.cache_analytics">}}

## Add filters

Cache Analytics also allows for flexible filtering of data. Create filters to focus on the traffic to optimize. Example filters include **Cache status**, **Host**, **Path**, or **Content type**.

To add filters, under **Cache Performance**, select **Add filter**. Select **Apply** when you are done.

## Review cache status

The **Requests summary** graph depicts how your traffic changes over time, such as in response to a high-traffic event or a recent configuration change. Note that the Requests summary content is based on a 10% sample of requests.

**Served by Cloudflare** indicates content served by Cloudflare that did not require contacting your origin web server. **Served by Origin** indicates traffic served from the origin web server.

For **Data Transfer**, **Revalidated** requests are considered **Served by Cloudflare**. However, revalidated requests count as **Served by Origin** within the **Requests** view. This analytics behavior reflects that Cloudflare must check the origin web server for revalidated cache requests before returning a result from cache.

**Cache status** graphs help explain why traffic is served from Cloudflare versus the origin web server. The graph shows analytics by content-type to portray how different components of your website perform:

For a list of cache statuses and their descriptions, refer to [Cloudflare cache responses](/cache/about/default-cache-behavior/#cloudflare-cache-responses).

## Review requests by source

Cache Analytics shows top metrics (Top-N) for several request components. Apply filters before reviewing Top-N metrics. For example, filtering to only view traffic with an Expired or Revalidated Cache status lets you review which URLs were primarily responsible for those statuses.

### Empty content types

Finding an **empty** content type when reviewing your analytics is common. This content type occurs when 301/302 redirects do not contain an HTTP response body. Additionally, most HTTP error codes, such as 403, do not return text/html and are therefore also reported as empty.
