---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
---

# Health Checks

Standalone Health Checks monitors an IP address or hostname for origin servers or applications and notifies you in near real-time if there happens to be a problem. 

A Health Check is a service that runs on Cloudflare’s edge network to monitor whether an origin server is online. This allows you to view the health of your origin servers even if there is only one origin or you do not yet need to balance traffic across your infrastructure.

Standalone Health Checks support various configurations to hone in on what you can check, including response codes, protocol types, and intervals. You can specify a particular path if an origin server serves multiple applications or check a larger subset of response codes for your staging environment. All of these options allow you to properly target your Health Check, providing a precise picture of what is wrong with an origin server.

{{<Aside type="note">}}

Standalone Health Checks are different from health monitors associated with load balancers. For more details about health monitors, refer to the [Load Balancing documentation](/load-balancing/understand-basics/monitors/).

{{</Aside>}}

---

## Features
 
{{<feature header="Health Checks Analytics" href="/health-checks/health-checks-analytics/">}}

You can use Health Checks Analytics to evaluate origin uptime, latency, failure reason, and specific event logs to debug possible origin issues. 

{{</feature>}}

--- 

## Related products
 
{{<related header="Load Balancing" href="/load-balancing/" product="load-balancing">}}

Cloudflare Load Balancing distributes traffic across your servers, which reduces server strain and latency and improves the experience for end users.

{{</related>}}

---

## Availability

{{<feature-table id="traffic.health_checks">}}