---
title: Hostname preparation
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Before setting up anything related to your load balancer, make sure your test that production hostnames meet the following criteria:

- Based on the [priority order](/load-balancing/reference/dns-records/#priority-order) of DNS records, they will receive the intended amount of traffic.
- Each hostname is covered by an [SSL/TLS certificate](/load-balancing/reference/dns-records/#ssltls-coverage).

After confirming each of these conditions are met, you can proceed with setting up your load balancer.

## Routing strategy

Depending on your preferences and infrastructure, you might route traffic to your load balancer in different ways:

- For most customers, it's simpler to create the load balancer on the hostname directly (`www.example.com`).
- However, you could also create the load balancer on another hostname (`lb.example.com`) and then route traffic using a `CNAME` record on `test.example.com` that points to `lb.example.com`.