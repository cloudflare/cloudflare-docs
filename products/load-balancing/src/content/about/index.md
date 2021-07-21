---
order: 1
pcx-content-type: concept
---

# About

Cloudflare Load Balancing allows you to distribute traffic across your servers, which reduces server strain and latency and improves the experience for end users.

## Benefits

Cloudflare Load Balancing provides three main benefits:

- **Load balancing and failover**: Distribute traffic evenly across your healthy servers, [automatically failing over](/understand-basics/load-balancers) when a server is unhealthy or unresponsive.
- **Active health checks**: [Monitor your servers](/understand-basics/monitors) at configurable intervals and across multiple data centers to look for specific status codes, response text, and timeouts.
- **Intelligent routing**: Choose whether to [distribute requests](/understand-basics/traffic-steering) based on server latency, a visitor's geographic region, or even a visitor's GPS coordinates.

<Aside type='note' header="Note">

If you are only interested in monitoring server health — and not in distributing traffic according to server health — check out our <a href="https://support.cloudflare.com/hc/articles/4404867308429">standalone Health Checks</a>.

</Aside>

## Availability

Cloudflare Load Balancing is available as an add-on feature for any type of account. The exact number of load balancers, origin servers, and monitors depend on your plan type.

## Load Balancing components

Cloudflare Load Balancing has three major components:

- The [**Load Balancer**](/understand-basics/load-balancers) is identified by a DNS hostname (`www.example.com`) for which you want to balance traffic. A load balancer defines which origin-server pools to use, the order in which they should be used, and how to geographically distribute traffic to different pools.
- [**Pools**](/understand-basics/pools) represent a group of origin servers (or endpoints), each identified by its IP address or hostname. You can configure multiple pools, as well as failover priority (Pool A-> Pool B-> Pool C). If you're familiar with DNS terminology, think of a pool as a “record set,” except we only return addresses of origins that are considered healthy. You can attach health checks to individual pools to tailor monitoring to collections of servers.
- [**Monitors**](/understand-basics/monitors) configure availability monitoring. When a monitor is attached to a pool, Cloudflare will run health checks on that pool’s origin servers from our data centers around the world. You can customize monitoring for specific URLs by using periodic HTTP/HTTPS requests, which allow you to set request intervals, timeouts, and status codes.

You can reuse monitors and pools across many load balancers. For example, your `.co.uk` domain might use a different ordering of pools (favoring your London servers, for instance) than your `.com.au` domain.

<Aside type='note' header="Tip">

For more information about load balancing as a concept, refer to <a href="https://www.cloudflare.com/learning/performance/what-is-load-balancing/">What is load balancing?</a>

</Aside>