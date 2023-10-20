---
pcx_content_type: concept
title: Load Balancing components
weight: 3
---

# Load Balancing components

The Cloudflare Load Balancing solution is built upon three main components:

* [Load balancers](/load-balancing/load-balancers/)
* [Pools](/load-balancing/pools/)
* [Monitors](/load-balancing/monitors/)

## Load balancers

For a hostname (`blog.example.com`) to resolve, the Domain Name System (DNS) must return an IP address, where the website or application is hosted.

When you set up a load balancer, Cloudflare automatically creates an [LB DNS record](/load-balancing/reference/dns-records/) for the specified hostname. This means that, when a request is made, whichever logic you introduced using Load Balancing, as well as information on the health of your origin servers, will be processed in order to determine which origin the request will be routed to and, ultimately, which IP address to return.

{{<render file="_load-balancing-diagram.md">}}

## Pools

Within Cloudflare, pools represent your origin servers and how they are organized. As such, a pool can be a group of several origin servers, or you could also have only one origin server per pool, if this is what best represents your infrastructure.

## Monitors

Finally, monitors are the component you can use to guarantee only healthy pools are considered for traffic distribution. 

When you configure a monitor and attach it to origins, the monitor will issue health monitor requests to your origins at regular intervals, making it possible for your load balancer to [intelligently distribute traffic](/load-balancing/understand-basics/traffic-steering/), considering which origins are actually available.

{{<render file="_health-check-diagram.md">}}

{{<Aside type="note">}}

Health monitors associated with load balancers are different from [**Standalone health checks**](/health-checks/).

{{</Aside>}}
