---
order: 16
pcx-content-type: concept
---

# How origins and pools become unhealthy

When we talk about dynamic load balancing, that means your load balancer only directs requests to servers that can handle the traffic. 

But how does your load balancer *know* which servers can handle the traffic? We determine that through a system of monitors, health checks, and origin pools.

---

## Components

Dynamic load balancing happens through a combination of:

- [**Origin pools**](/understand-basics/pools): Which contain one or more origin servers.
- [**Monitors**](/understand-basics/monitors): Which are attached to individual origin servers and issue customizable **health checks** at regular intervals.
- **Health checks**: Are issued by a monitor at regular interval and — depending on the monitor settings — return a **pass** or **fail** value to help measure server health.

![Dynamic load balancing involves pools, origins, monitors, and health checks](../static/images/load-balancer-components.png)

---

## How an origin becomes unhealthy


---

## How a pool becomes unhealthy


---

## How a load balancer becomes unhealthy