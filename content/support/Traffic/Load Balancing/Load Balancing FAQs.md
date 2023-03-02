---
source: https://support.cloudflare.com/hc/en-us/articles/4407016052493-Load-Balancing-FAQs
title: Load Balancing FAQs
---

# Load Balancing FAQs



## Overview

For more detailed information about Load Balancing — including how-to guides, tutorials, and other reference information — check out our [product documentation](https://developers.cloudflare.com/load-balancing/).

___

## Why is my origin receiving so many health checks?

This issue may be caused by a combination of two issues.

### Multiple health check regions

When you [attach a monitor to a pool](https://developers.cloudflare.com/load-balancing/how-to/create-monitor#attach-the-monitor-to-a-pool), you can specify the **Health Check Regions** that Cloudflare uses to monitor your origin health.

If you select multiple regions or choose **All Data Centers (Enterprise Only)**, you may [dramatically increase traffic](https://developers.cloudflare.com/load-balancing/understand-basics/health-details#how-an-origin-becomes-unhealthy) to that pool and its associated origins. Each region sends individual health checks from 3 data centers. Using **All Data Centers** sends individual health checks from all existing Cloudflare data centers.

To reduce traffic, reduce the number of selected regions or choose an option besides **All Data Centers**.

### Low intervals for health checks

If you have a low interval for your health checks, you may increase the traffic sent to your origin server.

___

## Why is my origin or pool considered unhealthy?

To learn more about how origins and pools become unhealthy, refer to [Origin and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details).

If you know that your origin server is healthy but load balancing is reporting it as unhealthy, check the following settings on the [origin's monitor](https://developers.cloudflare.com/load-balancing/understand-basics/monitors):

-   Perform a `curl` request against the configured endpoint. Make sure the response you are seeing matches your settings for the monitor.
-   Ensure your firewall or web server does not block or rate limit [our health checks](https://developers.cloudflare.com/load-balancing/understand-basics/monitors#important-notes) and accepts requests from [Cloudflare IP addresses](https://www.cloudflare.com/ips).
-   If you are looking for a specific value in the **Response Body**, make sure that value is relatively static and within the first 10 KB of the HTML page.
-   If your origin responds with a `301` or `302` status code, make sure **Follow Redirects** is selected.
-   Try increasing the **Timeout** value.
-   Review the **Host Header** for the health check.
-   If you are using Authenticated Origin Pulls, Argo Smart Routing, make sure that you entered a zone value for **Simulate Zone**.

___

## Why does my load balancer route traffic to a secondary pool when the primary pool is still healthy?

You occasionally might see traffic routed away from a pool if a health check fails from a specific data center (even if the origin is still healthy). That data center may direct a small number of requests to another pool that is considered healthy by that data center.

To learn more about how origins and pools become unhealthy, refer to [Origin and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details).

___

## What happens when a pool or origin becomes unhealthy?

To learn more about how origins and pools become unhealthy, refer to [Origin and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details).

___

## What is the difference between Load Balancing and Health Checks?

[Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/) helps monitor origin server health and — based on that and other information — route incoming requests accordingly. Individual origin servers have monitors attached, which issue health checks at regular intervals.

[Cloudflare Health Checks](https://support.cloudflare.com/hc/articles/4404867308429) are identical to monitors within a load balancer, but only meant for probing server health (and not distributing traffic).

___

## Why do I see different numbers of requests in Load Balancing Analytics?

You may see different numbers of requests when reviewing [Load Balancing Analytics](https://developers.cloudflare.com/load-balancing/load-balancing-analytics), especially when compared to other Cloudflare dashboards (Caching, etc.).

Load balancing **requests** are the number of uncached requests made by your load balancer. By default, Cloudflare caches resolved IP addresses for up to five seconds. This built-in caching is often the cause of an discrepancies.

___

## I'm seeing a specific error code for my load balancer or monitor.

For a list of specific error codes and next steps, refer to [Load Balancing Troubleshooting](https://developers.cloudflare.com/load-balancing/troubleshooting).

___

## Related resources

-   [Origin and pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details)
-   [Monitors](https://developers.cloudflare.com/load-balancing/understand-basics/monitors)
-   [Load Balancing Analytics](https://developers.cloudflare.com/load-balancing/load-balancing-analytics)
