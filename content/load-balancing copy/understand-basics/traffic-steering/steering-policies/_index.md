---
pcx_content_type: navigation
title: Steering policies
weight: 1
meta:
  title: Traffic steering policies
---

# Traffic steering policies

{{<render file="_traffic-steering-definition.md">}}
<br/>

{{<directory-listing showDescriptions="true" >}}

## EDNS Client Subnet (ECS) support

EDNS Client Subnet (ECS) is a DNS extension that enables a recursive DNS resolver to include the subnet of the user’s IP. 

ECS support provides customers with more control over location-based steering during gray-clouded DNS resolutions and can be used for proximity or geo (country) steering.

Customers can configure their load balancer using the `location_strategy` parameter, which includes the properties `prefer_ecs` and `mode`.

`prefer_ecs` determines whether the ECS GeoIP should be preferred as the authoritative location.

| Type | Description |
| --- | --- |
| `"always"`| Always prefers ECS. |
| `"never"` | Never prefers ECS. |
| `"proximity"` | Prefers ECS only when `steering_policy="proximity"`. |
| `"geo"` | Prefers ECS only when `steering_policy="geo"` and only supports country-level steering. |

`mode` determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful. 

| Type | Description |
| --- | --- |
| `"pop"` | Uses the Cloudflare PoP location. |
| `"resolver_ip"` | Uses the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, it uses the Cloudflare PoP location. |

{{<Aside type="note">}}

ECS support applies to DNS-only load balancers.

{{</Aside>}}