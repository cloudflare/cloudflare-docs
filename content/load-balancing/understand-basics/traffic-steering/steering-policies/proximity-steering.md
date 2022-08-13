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
