---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;anycastURL;;trafficSteering;;magicWANecmp
---

# Configure static routes

$1 uses a static configuration to route your traffic through {{<glossary-tooltip term_id="anycast" link="$2">}}anycast tunnels{{</glossary-tooltip>}} from Cloudflare’s global network to your locations.

You must assign a route priority to each tunnel–subnet pair in your configuration, as follows:

- Lower values have greater priority.
- When the priority values for prefix entries match, Cloudflare uses equal-cost multi-path (ECMP) packet forwarding to route traffic. $4 For more on how Cloudflare uses ECMP packet forwarding, refer to {{<glossary-tooltip term_id="traffic steering" link="$3">}}Traffic steering{{</glossary-tooltip>}}.

You can also create and edit static routes using the [Magic Static Routes API](/api/operations/magic-static-routes-list-routes).

## Edge routing configuration example


Prefix            | NextHop      | Priority
---               | ---          | ---
`10.10.10.100/24` | `TUNNEL_1_IAD` | `100`
`10.10.10.100/24` | `TUNNEL_2_IAD` | `100`
`10.10.10.100/24` | `TUNNEL_3_ATL` | `100`
`10.10.10.100/24` | `TUNNEL_4_ATL` | `100`
`10.10.10.100/24` | `TUNNEL_1_IAD` | `200`
`10.10.10.100/24` | `TUNNEL_2_IAD` | `200`
`10.10.10.100/24` | `TUNNEL_3_ATL` | `100`
`10.10.10.100/24` | `TUNNEL_4_ATL` | `100`

Optionally, weights can also be added to better distribute traffic amongst multiple tunnels. In the below example, `TUNNEL_2_IAD` is likely to receive twice as much traffic as `TUNNEL_1_IAD`.


Prefix            | NextHop      | Priority | Weight
---               | ---          | ---      | ---
`10.10.10.100/24` | `TUNNEL_1_IAD` | `100`    | `100`
`10.10.10.100/24` | `TUNNEL_2_IAD` | `100`    | `200`
`10.10.10.100/24` | `TUNNEL_3_ATL` | `100`    | `300`
`10.10.10.100/24` | `TUNNEL_4_ATL` | `100`    | `400`