---
_build:
  publishResources: false
  render: never
  list: never
---

## Scoped routes for Anycast GRE or IPsec tunnels

To reduce latency for your Anycast GRE or IPsec tunnel configurations, especially if you operate your own Anycast network, Cloudflare can steer your traffic by scoping it to specific Cloudflare data center regions.

Valid Cloudflare regions include AFR, APAC, EEUR, ENAM, ME, OC, SAM, WEUR, and WNAM.

To configure scoping for your traffic, you must provide Cloudflare with Anycast GRE or IPsec tunnel data for each Cloudflare region.

<details>
  <summary>Scoping configuration data example</summary>
  
| GRE tunnel      | Region code |
| --------------- | ----------- |
| GRE_1_IAD       | AFR         |
| GRE_2_IAD       | EEUR        |
| GRE_3_ATL       | ENAM        |
| GRE_4_ATL       | ME          |

</details>

Cloudflare has nine geographic regions across the world which are listed below.

<details>
  <summary>Region codes and associated regions</summary>

| Region Code     | Region                |
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
