---
title: Configure static routes
pcx-content-type: how-to
weight: 2
---

# Configure static routes

Magic WAN uses a static configuration to route your traffic through [Generic Routing Encapsulation (GRE) tunnels](/magic-transit/about/tunnels-and-encapsulation/) from Cloudflare’s edge to your locations.

You must assign a route priority to each Anycast GRE or IPsec tunnel–subnet pair in your GRE configuration, as follows:

- Lower values have greater priority.
- When the priority values for prefix entries match — as illustrated by the 103.21.244.0/24 subnet in the example routing configuration (in bold) — Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic.

For more on how Cloudflare uses ECMP packet forwarding, see [Traffic steering](/magic-transit/about/traffic-steering/).

For an example edge routing configuration, refer to the example below.

<details>
  <summary>Edge routing configuration example</summary>
 
| Anycast GRE or IPsec tunnel | Subnet               |    Priority   |
| --------------------------- | -------------------- | ------------- |
| GRE_1_IAD                   | **103.21.244.0/24**  | 100           |
| GRE_2_IAD                   | **103.21.244.0/24**  | 100           |
| GRE_3_ATL                   | **103.21.244.0/24**  | 100           |
| GRE_4_ATL                   | **103.21.244.0/24**  | 100           |
| GRE_1_IAD                   | 103.21.245.0/24      | 200           |
| GRE_2_IAD                   | 103.21.245.0/24      | 200           |
| GRE_3_ATL                   | 103.21.245.0/24      | 100           |
| GRE_4_ATL                   | 103.21.245.0/24      | 100           |

</details>

## Create a static route

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic WAN**.
2. Next to **Manage Magic WAN configuration**, click **Configure**.

{{<render file="../../magic-transit/_partials/_static-routes.md">}}
