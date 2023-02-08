---
_build:
  publishResources: false
  render: never
  list: never
---

## Scoped routes for Anycast GRE or IPsec tunnels

To reduce latency for your Anycast GRE or IPsec tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions. Equal cost routes maintain an equal cost on a global scale so long as the routes are not scoped to specific regions. For example, if you use region-scoped routes, traffic from end users in New York will always land at their Ashburn network unless that tunnel is unhealthy.

When you scope static routes to specific regions, the routes will only exist in the specified regions, and traffic that lands outside the specified regions will not have anywhere to go.

To configure scoping for your traffic, you must provide Cloudflare with Anycast GRE or IPsec tunnel data for each Cloudflare region.

{{<Aside type="note" header="Note:">}}

Regions and regional objects are automatically updated. If you route traffic through specific data centers, you will need to manually update your rules when Cloudflare adds or removes data centers.

{{</Aside>}}

<details>
  <summary>Scoping configuration data example</summary>
  
| Tunnel      | Region code |
| --------------- | ----------- |
| TUNNEL_1_IAD       | AFR         |
| TUNNEL_2_IAD       | EEUR        |
| TUNNEL_3_ATL       | ENAM        |
| TUNNEL_4_ATL       | ME          |

</details>

Cloudflare has nine geographic regions across the world which are listed below.

<details>
  <summary>Region codes and associated regions</summary>

| Region code     | Region                |
| --------------- | --------------------- |
| AFR             | Africa                |
| APAC            | Asia Pacific          |
| EEUR            | Eastern Europe        |
| ENAM            | Eastern North America |
| ME              | Middle East           |
| OC              | Oceania               |
| SAM             | South America         |
| WEUR            | Western Europe        |
| WNAM            | Western North America |

</details>

Configure scoping for your traffic in the **Region code** section when adding or editing a static route. Refer to [Create a static route](#create-a-static-route) or [Edit a static route](#edit-a-static-route) for more information on this.