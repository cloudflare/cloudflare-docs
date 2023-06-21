---
pcx_content_type: concept
title: How origins and pools become unhealthy
weight: 5
---

# How origins and pools become unhealthy

When we talk about dynamic load balancing, that means your load balancer only directs requests to servers that can handle the traffic.

But how does your load balancer _know_ which servers can handle the traffic? We determine that through a system of monitors, health monitors, and origin pools.

---

## Components

Dynamic load balancing happens through a combination of [origin pools](/load-balancing/understand-basics/pools/)[^1], [monitors](/load-balancing/understand-basics/monitors/)[^2], and health monitors[^3]. 

{{<render file="_health-check-diagram.md">}}

---

## How an origin becomes unhealthy

{{<render file="_health-check-definition.md">}}

{{<render file="_health-check-regions.md">}}

{{<Aside type="note">}}

If **Health Monitor Regions** for a pool is set to **All Data Centers (Enterprise)**, pool health is determined by a majority of data centers.

{{</Aside>}}

Load balancing analytics and logs will only show global health changes.

For greater accuracy and consistency when changing origin health status, you can also set the `consecutive_up` and `consecutive_down` parameters via the [Create Monitor API endpoint](/api/operations/account-load-balancer-monitors-create-monitor). To change from healthy to unhealthy, an origin will have to be marked healthy a consecutive number of times (specified by `consecutive_down`). The same applies — from unhealthy to healthy — for `consecutive_up`.

---

## How a pool becomes unhealthy

When an [individual origin becomes unhealthy](#how-an-origin-becomes-unhealthy), that may affect the health status of any associated origin pools (visible in the dashboard):

- **Healthy**: All origins are healthy.
- **Degraded**: At least one origin is unhealthy, but the pool is still considered healthy and could be receiving traffic.
- **Critical**: The pool has fallen below the number of available origins specified in its **Health Threshold** and will not receive traffic from your load balancer (unless other pools are also unhealthy and this pool is marked as the [**Fallback Pool**](#fallback-pools)).
- **Health unknown**: There are either no monitors attached to pool origins or the monitors have not yet determined origin health.
- **No health**: Reserved for your load balancer's [**Fallback Pool**](#fallback-pools).

### Traffic distribution

{{<render file="_unhealthy-pool-traffic-distribution.md">}}

### Fallback pools

{{<render file="_fallback-pools.md">}}

---

## How a load balancer becomes unhealthy

When one or more pools become unhealthy, your load balancer might also show a different status in the dashboard:

- **Healthy**: All pools are healthy.
- **Degraded**: At least one pool is unhealthy, but traffic is not yet going to the [Fallback Pool](#fallback-pools).
- **Critical**: All pools are unhealthy and traffic is going to the [Fallback Pool](#fallback-pools).

If a load balancer reaches **Critical** health and the pool serving as your fallback pool is also disabled:

- If Cloudflare proxies your hostname, you will see a 530 HTTP/1016 Origin DNS failure.
- If Cloudflare does not proxy your hostname, you will see the SOA record.


[^1]: Groups that contain one or more origin servers.
[^2]: Are attached to individual origin servers and issue health monitor requests at regular intervals.
[^3]: Which are issued by a monitor at regular interval and — depending on the monitor settings — return a **pass** or **fail** value to make sure an origin is still able to receive traffic.