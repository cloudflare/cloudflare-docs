---
pcx_content_type: concept
title: Proximity
weight: 5
meta:
  title: Proximity steering
---

# Proximity steering

**Proximity Steering** routes visitors or internal services to the closest physical data center.

To use proximity steering on a load balancer, you first need to add GPS coordinates to each origin pool.

## When to add proximity steering

- For new pools, add GPS coordinates when you create a pool.
- For existing pools, add GPS coordinates when [managing pools](/load-balancing/how-to/create-pool/#edit-a-pool) or in the **Add Traffic Steering** step of [creating a load balancer](/load-balancing/how-to/create-load-balancer/).

## How to add proximity steering

To add coordinates when creating or editing a pool:

1.  Click the _Configure co-ordinates for Proximity Steering_ dropdown.
2.  Enter the latitude and longitude or drag a marker on the map.
3.  Select **Save**.

{{<Aside type="warning" header="Warning:">}}

For accurate proximity steering, add GPS coordinates to all pools within the same load balancer.

{{</Aside>}}

## EDNS Client Subnet Support

EDNS Client Subnet (ECS) is a DNS extension that enables a recursive DNS resolver to include the subnet of the user’s IP. 

ECS support provides customers with more control over location-based steering during gray-clouded DNS resolutions and can be used for proximity or geo country-steering.

Customers can configure their load balancer using the `location_strategy` parameter, which includes the properties `prefer_ecs` and `mode`.

`prefer_ecs` determines whether the ECS GeoIP should be preferred as the authoritative location.

| Type | Description |
| --- | --- |
| `"always"`| Always prefers ECS. |
| `"never"` | Never prefers ECS. |
| `"proximity"` | Prefers ECS only when `steering_policy="proximity"` |
| `"geo"` | Prefers ECS only when `steering_policy="geo"` |

`mode` determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful. 

| Type | Description |
| --- | --- |
| `"pop"` | Uses the Cloudflare PoP location |
| `"resolver_ip"` | Uses the DNS resolver GeoIP location. If the GeoIP lookup is unsuccessful, it uses the Cloudflare PoP location. |
