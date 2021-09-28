---
title: Traffic steering
order: 12
pcx-content-type: concept
---

import RegionMapping from "../_partials/_region-mapping.md"

# Traffic steering

Load Balancing provides several traffic steering modes, which allow customers to optimize how load balancers route traffic.

Configure traffic steering from the Load Balancing dashboard — in either the **Create a Load Balancer** wizard or the **Edit Load Balancer** panel — or via the Cloudflare API.

<Aside type="note">

Without purchasing **Traffic Steering**, non-Enterprise customers only have access to **Off** and **Random** for their steering options.

</Aside>

---

## Off - standard failover

Standard failover directs traffic from unhealthy pools — determined by [health checks](/understand-basics/monitors) and the **Health Threshold** — to the next healthy pool in the configuration. Customers commonly use this option to set up [active - passive failover](/understand-basics/load-balancers#active---passive-failover).

Standard failover uses the pool order to determine failover priority (the failover order).

If all pools are marked unhealthy, Load Balancing will direct traffic to the fallback pool. The default fallback pool is the last pool listed in the Load Balancing configuration.

To specify a fallback pool via the API, use the Update Load Balancers command and set the `fallback_pool` parameter. See _[Load Balancers](/understand-basics/load-balancers/)_ for details.

If no monitors are attached to the load balancer, it will direct traffic to the primary pool exclusively.

---

## Dynamic steering

Dynamic Steering uses health check data to identify the fastest pool for a given Cloudflare Region or data center.

Dynamic Steering creates Round Trip Time (RTT) profiles based on an exponential weighted moving average (EWMA) of RTT to determine the fastest pool. If there is no current RTT data for your pool in a region or colocation center, Cloudflare directs traffic to the pools in failover order.

When enabling Dynamic Steering the first time for a server pool, allow 10 minutes for the change to take effect while Cloudflare builds an RTT profile for that pool.

For TCP health checks, calculated latency may not reflect the true latency to the origin if you are terminating TCP at a cloud provider edge location.

The diagram below shows how Cloudflare would route traffic to the pool with the lowest EWMA among three regions: Eastern North America, Europe, and Australia. In this case, the ENAM pool is selected, because it has the lowest RTT.

![Dynamic steering routes traffic to the fastest available pool](../static/images/traffic-steering-2.png)

---

## Geo steering

Geo Steering directs traffic to pools to a specific geographical region or — for Enterprise customers only — data center. This option is extremely useful when you want site visitors to access the origin server closest to them, which improves page-loading performance.

You can assign multiple pools to the same region and the load balancer will use them in failover order. If there is no configuration for a region or pool, the load balancer will use the default failover order.

Cloudflare has 13 geographic regions that span the world. The region of a client is determined by the region of the Cloudflare data center that answers the client’s DNS query. 

<RegionMapping/>

For more details on working with regions and region codes, refer to [Region Mapping API](/reference/region-mapping-api).

### Via the API

Use the `regions_pool` property of the [Update Load Balancers](https://api.cloudflare.com/#load-balancers-update-load-balancer) command to specify an array of regions. Specify each region using the appropriate region code followed by a list of origin servers to use for that region. In the example below, `WNAM` and `ENAM` represent the West and East Coasts of North America, respectively.

**Request example**

```json
---
header: Request
---
// PUT /zones/:zone_id/load_balancers
{
  "description": "Load Balancer for www.example.com",
  "name": "www.example.com",
  "ttl": 30,
  "proxied": true,
  "fallback_pool": "ff02c959d17f7bb2b1184a202e3c0af7",
  "default_pools": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"],
  "region_pools": {
    "WNAM": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"],
    "ENAM": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"],
    "EU": ["ff02c959d17f7bb2b1184a202e3c0af7", "17b5962d775c646f3f9725cbc7a53df4"]
  }
}
```

If you only define `WNAM`, then traffic from the East Coast will be routed to the `default_pools`. You can test this using a client in each of those locations.

## Proximity steering

Choose **Proximity Steering** to route visitors or internal services to the closest physical data center.

To use proximity steering on a load balancer, you first need to add GPS coordinates to each origin pool.

### When to add proximity steering

- For new pools, add GPS coordinates when you create a pool.
- For existing pools, add GPS coordinates when [managing pools](https://dash.cloudflare.com/?to=/:account/:zone/traffic/load-balancing/pools) or in the **Add Traffic Steering** step of creating a load balancer.

### How to add proximity steering

To add coordinates when creating or editing a pool:
1. Click the **Configure co-ordinates for Proximity Steering** dropdown.
1. Enter the latitude and longitude or drag a marker on the map.
1. Select **Save**.

<Aside type="warning" header="Warning:">
  For accurate proximity steering, add GPS coordinates to all pools within the same load balancer.
</Aside>

## Random steering

Choose **Random** to route traffic to a healthy pool at random. Customers can use this option to set up [active - active failover](/understand-basics/load-balancers#active---active-failover) (or round robin), where traffic is split equally between multiple pools.
