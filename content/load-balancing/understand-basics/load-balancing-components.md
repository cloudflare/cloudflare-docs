---
pcx_content_type: concept
title: Load Balancing components
weight: 3
---

# Load Balancing components

This page provides a simplified overview of the three main components of the Cloudflare Load Balancing solution and how they relate to one another.

## Load balancers

For a hostname (`blog.example.com`) to resolve, the Domain Name System (DNS) must return an IP address, where the website or application is hosted (origin).

When you set up a load balancer, Cloudflare automatically creates an [LB DNS record](/load-balancing/reference/dns-records/) for the specified hostname. This means that, according to a [priority order](/load-balancing/reference/dns-records/#priority-order), instead of simply returning an origin IP address, the logic you introduced using the Cloudflare Load Balancing solution will be considered.

{{<render file="_load-balancing-diagram.md">}}

## Pools

Within Cloudflare, pools represent your origin servers and how they are organized. As such, a pool can be a group of several origin servers, or you could also have only one origin server per pool, if this is what best suits your use case.

For example, if you are only using Cloudflare to globally distribute traffic across regions ([traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/)), each pool could represent one region and, within each region, you could have one origin that represents the entry point to your data center.

{{<Aside type="note">}}

Cloudflare [local traffic management (LTM)](/load-balancing/local-traffic-management/) solution and [origin steering](/load-balancing/understand-basics/traffic-steering/origin-level-steering/) capabilities enable you to also load balance traffic between your origin servers within a data center. In this use case, each pool would represent a data center and contain several origin servers.

{{</Aside>}}

## Monitors

Finally, monitors are the component you can use to guarantee only [healthy pools](/load-balancing/understand-basics/health-details/) are considered for traffic distribution.

When you configure a monitor and attach it to origins, the monitor will issue health monitor requests to your origins at regular intervals. This process makes it possible for your load balancer to intelligently handle traffic, considering which origins are actually available.

{{<render file="_health-check-diagram.md">}}

{{<Aside type="note">}}

Health monitors associated with load balancers are different from [**Standalone health checks**](/health-checks/).

{{</Aside>}}
