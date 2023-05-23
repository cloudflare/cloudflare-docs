---
pcx_content_type: faq
title: FAQs
---

# Frequently Asked Questions

## Overview

For more detailed information about Load Balancing — including how-to guides, tutorials, and other reference information — check out our [product documentation](/load-balancing/).

{{<Aside type="note">}}
Are you trying to turn on Load Balancing? [Enable Load
Balancing](https://dash.cloudflare.com/?to=/:account/:zone/traffic/load-balancing).
{{</Aside>}}

___

## Why is my origin receiving so many health monitor requests?

This issue may be caused by a combination of two issues.

### Multiple Health Monitor Regions

When you [attach a monitor to a pool](/load-balancing/how-to/create-monitor/#create-a-monitor), you can specify the **Health Monitor Regions** that Cloudflare uses to monitor your origin health.

If you select multiple regions or choose **All Data Centers (Enterprise Only)**, you may [dramatically increase traffic](/load-balancing/understand-basics/health-details#how-an-origin-becomes-unhealthy) to that pool and its associated origins. Each region sends individual health monitor requests from 3 data centers. Using **All Data Centers** sends individual health monitor requests from all existing Cloudflare data centers (and that number of data centers is growing all the time).

To reduce traffic, reduce the number of selected regions or choose an option besides **All Data Centers**.

### Low intervals for health monitor requests

If you have a low interval for your health monitor requests, you may increase the traffic sent to your origin server.

___

## Why is my origin or pool considered unhealthy?

To learn more about how origins and pools become unhealthy, refer to [Origin and pool health](/load-balancing/understand-basics/health-details).

If you know that your origin server is healthy but load balancing is reporting it as unhealthy, check the following settings on the [origin's monitor](/load-balancing/understand-basics/monitors):

-   Perform a `curl` request against the configured endpoint. Make sure the response you are seeing matches your settings for the monitor.
-   Ensure your firewall or web server does not block or rate limit [our health monitors](/fundamentals/get-started/reference/cloudflare-site-crawling/#specific-products) and accepts requests from [Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/).
-   If you are looking for a specific value in the **Response Body**, make sure that value is relatively static and within the first 10 KB of the HTML page.
-   If your origin responds with a `301` or `302` status code, make sure **Follow Redirects** is selected.
-   Try increasing the **Timeout** value.
-   Review the **Host Header** for the health monitor.
-   If you are using [Authenticated Origin Pulls](/ssl/origin-configuration/authenticated-origin-pull/), [Argo Smart Routing](/argo-smart-routing/), make sure that you entered a zone value for **Simulate Zone**.

___

## Why does my load balancer route traffic to a secondary pool when the primary pool is still healthy?

You occasionally might see traffic routed away from a pool if a health monitor request fails from a specific data center (even if the origin is still healthy). That data center may direct a small number of requests to another pool that is considered healthy by that data center.

To learn more about how origins and pools become unhealthy, refer to [Origin and pool health](/load-balancing/understand-basics/health-details).

___

## What happens when a pool or origin becomes unhealthy?

To learn more about how origins and pools become unhealthy, refer to [Origin and pool health](/load-balancing/understand-basics/health-details).

___

## What is the difference between Load Balancing and Health Checks?

[Cloudflare Load Balancing](/load-balancing/) helps monitor origin server health and — based on that and other information — route incoming requests accordingly. Individual origin servers have monitors attached, which issue monitor requests at regular intervals.

[Cloudflare Health Checks](/health-checks/) are identical to monitors within a load balancer, but only meant for probing server health (and not distributing traffic).

___

## Why do I see different numbers of requests in Load Balancing Analytics?

You may see different numbers of requests when reviewing [Load Balancing Analytics](/load-balancing/reference/load-balancing-analytics/), especially when compared to other Cloudflare dashboards (Caching, etc.).

Load balancing **requests** are the number of uncached requests made by your load balancer. By default, Cloudflare caches resolved IP addresses for up to five seconds. This built-in caching is often the cause of an discrepancies.

___

## I'm seeing a specific error code for my load balancer or monitor.

For a list of specific error codes and next steps, refer to [Load Balancing Troubleshooting](/load-balancing/troubleshooting).

___

## Related resources

-   [Origin and pool health](/load-balancing/understand-basics/health-details)
-   [Monitors](/load-balancing/understand-basics/monitors)
-   [Load Balancing Analytics](/load-balancing/reference/load-balancing-analytics/)
