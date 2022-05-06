---
pcx-content-type: concept
title: Geo
weight: 2
meta:
  title: Geo steering
---

# Geo steering

Geo Steering directs traffic to pools tied to specific countries, regions, or — for Enterprise customers only — data centers. This option is extremely useful when you want site visitors to access the origin server closest to them, which improves page-loading performance.

## Pool assignment

You can assign multiple pools to the same area and the load balancer will use them in failover order. Any options not explicitly defined — whether in data centers, countries, or regions — will fall back to using default pools and failover.

### Region steering

Cloudflare has [13 geographic regions](/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions) that span the world. The region of a client is determined by the region of the Cloudflare data center that answers the client’s DNS query.

{{<Aside type="note">}}If you define region pools for a load balancer, you cannot delete these pools until you remove them from the load balancer configuration.{{</Aside>}}

#### Via the dashboard

When [creating or editing a load balancer](/load-balancing/how-to/create-load-balancer/):

1. Go to the **Traffic Steering** step.
2. Click **Geo Steering**.
3. For **Region**, select a region and click **Add Region**.
4. Click **Edit**.
5. Select a pool and click **Add Pool**.
6. If adding multiple pools, re-order them into your preferred failback order.
7. (optional) Add more regions if needed.

#### Via the API

Use the `regions_pool` property of the [Update Load Balancers](https://api.cloudflare.com/#load-balancers-update-load-balancer) command to specify an array of regions. Specify each region using the [appropriate region code](/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions) followed by a list of origin servers to use for that region. 

In the example below, `WNAM` and `ENAM` represent the West and East Coasts of North America, respectively.

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
    "EEU": ["ff02c959d17f7bb2b1184a202e3c0af7", "17b5962d775c646f3f9725cbc7a53df4"]
  }
}
```

If you only define `WNAM`, then traffic from the East Coast will be routed to the `default_pools`. You can test this using a client in each of those locations.

### Country steering 

#### Via the dashboard

When [creating or editing a load balancer](/load-balancing/how-to/create-load-balancer/):

1. Follow the [create a load balancer procedure](/load-balancing/how-to/create-load-balancer/#via-the-dashboard) until you reach the **Traffic Steering** step.
2. Click **Geo Steering**.
3. For **Country**, select a country and click **Add Region**.
4. Click **Edit**.
5. Select a pool and click **Add Pool**.
6. If adding multiple pools, re-order them into your preferred failback order.
7. (optional) Add more countries if needed.

#### Via the API

When creating a load balancer [via the API](https://api.cloudflare.com/#load-balancers-create-load-balancer), include the `country_pools` object to map countries to a list of pool IDs (ordered by their failover priority).

To get a list of country codes, use the [Region API](/load-balancing/reference/region-mapping-api/).

Any country not explicitly defined will fall back to using the corresponding `region_pool` mapping (if it exists), then to the associated default pools.

### PoP steering

When creating a load balancer [via the API](https://api.cloudflare.com/#load-balancers-create-load-balancer), include the `pop_pools` object to map Cloudflare data centers to a list of pool IDs (ordered by their failover priority).

For help finding data center identifiers, refer to [this community thread](https://community.cloudflare.com/t/is-there-a-way-to-retrieve-cloudflare-pops-list-and-locations-programmatically/234643).

Any data center not explicitly defined will fall back to using the corresponding `country_pool`, then `region_pool` mapping (if it exists), and finally to associated default pools.

{{<Aside type="note">}}PoP steering is only available to Enterprise customers and only accessible via the API.{{</Aside>}}