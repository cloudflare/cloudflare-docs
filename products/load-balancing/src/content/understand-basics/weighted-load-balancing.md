---
order: 14
pcx-content-type: concept
---

# Weighted load balancing

Use weighted load balancing to send specific percentages of traffic to available origins within a [pool](../pools). If an origin becomes unhealthy, traffic will be rebalanced to available origins according to their respective weights.

---

## Traffic percentages

By default, all origins within a pool have a weight of **1**. Since the weight of each origin is equal, each pool will receive the same percentage of traffic.

If you want to customize the percentage of traffic sent to an origin, set the **Weight** to a number between 0 and 1 (expressed in increments of .01). Cloudflare will then send traffic to that pool based on the following formula:

`% of traffic to origin`  = `origin weight` ÷ `sum of all weights in the pool`

According to this formula, an origin with a weight of **0** should not receive any traffic sent to that pool(though the origin will still receive health checks).

You can also see this value in the **Percent** field when creating or editing a pool in the dashboard.

<Aside type="note" header="Note:">

If an origin is used in multiple pools and has multiple weights assigned, the total traffic sent to that pool will differ from the percentage specified in each individual pool.

</Aside>

---

## Limitations

When enabled, [session affinity](../session-affinity) can affect traffic distribution since established sessions are not reset when origin weights are modified.

When using [DNS-only load balancing](/understand-basics/proxy-modes#gray-clouded-dns-only-load-balancing), DNS resolves may cache resolved IPs for clients and affect traffic distribution.

---

## Origin weights example

Here’s an example applying weights to three origin servers:

- **Weights:** Origin Server A = 0.25; Origin Server B = 0.25; Origin Server C = 0.50
- **When all origins are healthy**, each origin will receive the following proportion of total traffic: A = 25%; B = 25%; C = 50%.
- **When one origin is unhealthy** (such as origin C), each healthy origin will receive the following proportion of total traffic: A = 50%; B=50%.

A significant amount of traffic is required for the distribution to converge on the expected values.

---

## Adjust weights

### Via the dashboard

Configure origin weights when you [create a load balancer](/create-load-balancer-ui) or from the **Load Balancing** dashboard in the **Traffic** app.

### Via the API

To configure the weight of an origin server with the Cloudflare API, include the `weight` property when using the [Update Pools command](https://api.cloudflare.com/#account-load-balancer-pools-update-pool).