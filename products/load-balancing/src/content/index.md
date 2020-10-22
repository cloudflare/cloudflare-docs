---
title: Welcome
order: 1
---

# Cloudflare Load Balancing docs

Overused or geographically distant servers add unnecessary latency and degrade the user experience. Unreliable or misconfigured servers can drop user requests completely, preventing access to websites, web apps, and APIs. Poor user experiences like these have a direct impact on revenue, reputation, and customer loyalty.

Cloudflare Load Balancing provides DNS-based load balancing and active health checks against origin servers and pools. It expands on Cloudflare's existing Anycast DNS network to provide resilience against distributed denial of service (DDoS) attacks by steering away from healthy origin servers. Users can also enable Geo Steering, which directs traffic to specific origin pools based on the client’s region.

Cloudflare Load Balancing delivers three key features:

- **Load balancing and failover**: Deliver traffic evenly across healthy servers, automatically failing over when a server is unhealthy or not responsive.
- **Active health checks**: Set up health checks to monitor your servers at configurable intervals and look for specific status codes, response text, and/or timeouts. Cloudflare monitors your servers from each of our data centers.
- **Geographic control**: Direct visitors in Europe to your European data center, US visitors to your North American data center, or dive deeper and configure traffic at a regional level.

Note that load balancing is enabled at the Cloudflare account level. A single account can create many load balancers.

You can set up a load balancer from the Cloudflare Traffic app or via the Cloudflare API.

## Load Balancing components

Cloudflare Load Balancing has three major components:

- A Cloudflare **Load Balancer** is identified by a DNS hostname (www.example.com, for example) for which you want to balance traffic. A load balancer defines which origin-server pools to use, the order in which they should be used, and how to geographically distribute traffic to different pools.
- **Pools** represent a group of origin servers (or endpoints), each identified by its IP address or hostname. You can configure multiple pools, as well as failover priority (Pool A-> Pool B-> Pool C). If you're familiar with DNS terminology, think of a pool as a “record set,” except we only return addresses of origins that are considered healthy. You can attach health checks to individual pools to tailor monitoring to collections of servers.
- **Monitors** configure availability monitoring. When a monitor is attached to a pool, Cloudflare will run health checks on that pool’s origin servers from our data centers around the world. You can customize monitoring for specific URLs by using periodic HTTP/HTTPS requests, which allow you to set request intervals, timeouts, and status codes.

You can reuse monitors and pools across many load balancers. For example, your `.co.uk` domain might use a different ordering of pools (favoring your London servers, for instance) than your `.com.au` domain.
