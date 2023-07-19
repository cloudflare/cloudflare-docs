---
title: Account-level load balancing
pcx_content_type: learning-unit
weight: 7
layout: learning-unit
---

If you want to set up load balancing for multiple hostnames or domains within your account, your approach would depend on the requirements for each hostname.

## Shared configurations

If you want to share a load balancing configuration across multiple hostnames, you can use the same load balancer through `CNAME` routing.

1. When you [set up](/learning-paths/modules/performance/load-balancing-setup/) the load balancer, create the load balancer on a new hostname (`lb.example.com`).
2. When you are ready to [route production traffic](/learning-paths/modules/performance/load-balancing-setup/production-traffic/), [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` record on a hostname that points to the load balancer created in step 1 (`lb.example.com`).
3. Repeat steps 1 and 2 with all other hostnames.

{{<Aside type="note">}}

You could also achieve the same goal or create more advanced routing decisions by setting up DNS Overrides within [Origin Rules](/rules/origin-rules/) on each hostname that override the hostname to `lb.example.com`.

{{</Aside>}}

## Unique configurations

If each zone needs unique load balancer configurations (failover order, routing), you should create separate load balancers. Since pools and monitors are configured at the account level, even different load balancers can share the same pools and monitors.

For simpler routing, create a load balancer on each hostname.

For more advanced routing, create multiple load balancers and then set up [Origin Rules](/rules/origin-rules/) to route traffic to each load balancer based on specific characteristics of the request.