---
pcx-content-type: how-to
title: Configure static routes
weight: 2
---

# Configure static routes

Magic Transit uses a static configuration to route your traffic through [Anycast tunnels](/magic-transit/about/tunnels-and-encapsulation/) from Cloudflare’s edge to your data centers.

You must assign a route priority to each Anycast tunnel–subnet pair in your GRE configuration using the following guidelines:

- Lower values have greater priority.
- When the priority values for prefix entries match, Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic. You can refer to an example of this scenario with the **103.21.244.0/24** subnet in the edge routing configuration example below.

You can also create and edit static routes using [Magic Transit Static Routes API](https://api.cloudflare.com/#magic-transit-static-routes-properties).

<details>
<summary>Edge routing configuration example</summary>

| Tunnel             | Subnet               |    Priority   |
| ------------------ | -------------------- | ------------- |
| TUNNEL_1_IAD       | **103.21.244.0/24**  | 100           |
| TUNNEL_2_IAD       | **103.21.244.0/24**  | 100           |
| TUNNEL_3_ATL       | **103.21.244.0/24**  | 100           |
| TUNNEL_4_ATL       | **103.21.244.0/24**  | 100           |
| TUNNEL_1_IAD       | 103.21.245.0/24      | 200           |
| TUNNEL_2_IAD       | 103.21.245.0/24      | 200           |
| TUNNEL_3_ATL       | 103.21.245.0/24      | 100           |
| TUNNEL_4_ATL       | 103.21.245.0/24      | 100           |
</details>

For more on how Cloudflare uses ECMP packet forwarding, refer to [Traffic steering](/magic-transit/about/traffic-steering/).

## Map route prefixes smaller than /24

You must provide your prefixes and the tunnels they should be mapped to in order for Cloudflare to route your traffic from the edge to your data centers via Anycast tunnels. Use the table below as reference.

| Prefix          | Tunnel        |
| --------------- | ------------- |
| 103.21.244.0/29 | TUNNEL_1_IAD  |
| 103.21.244.8/29 | TUNNEL_2_ATL  |

The minimum advertising prefix is /24, but because Cloudflare uses Anycast tunnels as an outer wrapper for your traffic, we can route prefixes within that /24 to different tunnel end points.

For example, you can send `x.x.x.0/29` to Datacenter 1 and `x.x.x.8/29` to Datacenter 2. This is helpful when you operate in an environment with constrained IP resources.

## Create a static route

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2.  Next to **Static routes configuration**, click **Configure**.

{{<render file="_static-routes.md">}}

{{<render file="_scoped-routes.md">}}
