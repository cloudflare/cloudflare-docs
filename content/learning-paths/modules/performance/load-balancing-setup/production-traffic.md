---
title: Route production traffic
pcx_content_type: learning-unit
weight: 7
layout: learning-unit
---

Now that you have set up your load balancer and verified everything is working correctly, you can put the load balancer on a live domain or subdomain:

1. If you update your pools and monitors, [review the pool health again](/learning-paths/modules/performance/load-balancing-setup/check-pool-health/?learning_path=load-balancing) to make sure everything is working as expected.
2. Confirm that your production hostname has the correct [priority order](/load-balancing/reference/dns-records/#priority-order) of DNS records and is covered by an [SSL/TLS certificate](/load-balancing/reference/dns-records/#ssltls-coverage).
3. Configure your load balancer to receive production traffic, which could involve either:
    - Editing the **Hostname** of your existing load balancer.
    - Updating the `CNAME` record sending traffic to your load balancer.

{{<Aside type="note">}}

If you have an Enterprise account, also evaluate your application for any excluded paths. For example, you might not want the load balancer to distribute requests directed at your `/admin` path. For any exceptions, set up an [Origin rule](/rules/origin-rules/features/#dns-record) or [Page rule](https://support.cloudflare.com/hc/articles/206190798).

{{</Aside>}}