---
pcx_content_type: concept
title: Origin steering
weight: 2
---

# Origin steering

Use **origin steering** to customize how each [pool](/load-balancing/understand-basics/pools/) distributes traffic to its associated origins.

These distributions are the result of your origin steering [policy](#origin-steering-options) combined with the [weights](#weights) assigned to each origin.

{{<Aside type="note">}}

If an origin [becomes unhealthy](/load-balancing/understand-basics/health-details/), your pool will also re-balance traffic according to its steering policy.

{{</Aside>}}

## Origin steering options

When you [create a pool](/load-balancing/how-to/create-pool/), you have to choose an option for **Origin Steering**:

- **Random**: Sends requests to origins purely based on [origin weights](#weights). Distributes traffic more accurately, but may cause requests from the same IP to hit different origins.
- **Hash**: Cloudflare sends requests to origins based on a combination of [origin weights](#weights) and previous requests from that IP address. Ensures requests from the same IP address will hit the same origin, but actual traffic distribution may differ from origin weights.

## Weights

By default, all origins within a pool have a weight of **1**.

If you leave each origin with the default setting and choose a **Random** origin steering policy, each pool will receive the same percentage of traffic. If you were to use a **Hash** policy, that percentage will vary based on the IP distribution of your requests.

### Customize weights

To customize weights when you [create or edit a pool](/load-balancing/how-to/create-pool/), set the **Weight** to a number between 0 and 1 (expressed in increments of .01). Cloudflare will then send traffic to that pool based on a combination of your origin steering policy and the following formula.

```txt
% of traffic to origin = origin weight ÷ sum of all weights in the pool
```

<details>
<summary>Origin weight example</summary>
<div>

Here’s an example applying weights to three origin servers with a **Random** origin steering policy:

- **Weights:** Origin Server A = 0.25; Origin Server B = 0.25; Origin Server C = 0.50
- **When all origins are healthy**, each origin will receive the following proportion of total traffic: A = 25%; B = 25%; C = 50%.
- **When one origin is unhealthy** (such as origin C), each healthy origin will receive the following proportion of total traffic: A = 50%; B=50%.

A significant amount of traffic is required for the distribution to converge on the expected values.

</div>
</details>

An origin with a weight of **0** should not receive any traffic sent to that pool (though the origin will still receive health checks).

You can also see this value in the **Percent** field when creating or editing a pool in the dashboard.

{{<Aside type="note" header="Note:">}}

If an origin is used in multiple pools and has multiple weights assigned, the total traffic sent to that pool will differ from the percentage specified in each individual pool.

{{</Aside>}}

### Limitations

If you choose **Hash** for your **Origin Steering** or enable [session affinity](/load-balancing/understand-basics/session-affinity/), these options can affect traffic distribution.

Additionally, session affinity takes precedence over any selected weight or origin steering policy.

When using [DNS-only load balancing](/load-balancing/understand-basics/proxy-modes/#gray-clouded-dns-only-load-balancing), DNS resolves may cache resolved IPs for clients and affect traffic distribution.
