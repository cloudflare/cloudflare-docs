---
pcx_content_type: concept
title: Dynamic
weight: 4
meta:
  title: Dynamic steering
---

# Dynamic steering

**Dynamic Steering** uses health check data to identify the fastest pool for a given Cloudflare Region or data center.

Dynamic Steering creates Round Trip Time (RTT) profiles based on an exponential weighted moving average (EWMA) of RTT to determine the fastest pool. If there is no current RTT data for your pool in a region or colocation center, Cloudflare directs traffic to the pools in failover order.

When enabling Dynamic Steering the first time for a server pool, allow 10 minutes for the change to take effect while Cloudflare builds an RTT profile for that pool.

For TCP health checks, calculated latency may not reflect the true latency to the origin if you are terminating TCP at a cloud provider edge location.

The diagram below shows how Cloudflare would route traffic to the pool with the lowest EWMA among three regions: Eastern North America, Europe, and Australia. In this case, the ENAM pool is selected because it has the lowest RTT.

![Dynamic steering routes traffic to the fastest available pool](/load-balancing/static/images/traffic-steering-2.png)