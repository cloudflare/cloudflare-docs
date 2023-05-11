---
title: Load balancing for multiple domains
pcx_content_type: learning-unit
weight: 7
layout: learning-unit
---

If you want to set up load balancing for multiple domains, your approach would depend on the requirements for each domain:

## Shared configurations

If you want to share a load balancing configuration across multiple domains, you can use the same load balancer for multiple domains through `CNAME` routing.

1. When you [set up](/learning-paths/modules/performance/load-balancing-setup/) the load balancer, create the load balancer on a new hostname (`lb.example.com`).
2. When you are ready to [route production traffic](/learning-paths/modules/performance/load-balancing-setup/production-traffic/), [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` record on your first domain that points to the load balancer (`lb.example.com`).
3. Repeat step 2 with other domains.

## Unique configurations

If each domain needs unique load balancer configurations (failover order, routing), you should [create a load balancer](/learning-paths/modules/performance/load-balancing-setup/test-load-balancer/) for each domain.

Since pools and monitors are configured at the account level, each load balancer can share the same pools and monitors (which simplifies your setup).
