---
title: Analytics
order: 45
pcx-content-type: how-to
---

# Load balancing analytics

Using load balancing analytics, you can:
- Evaluate traffic flow.
- Assess the health status of origin servers in your pools.
- Review changes in pools and pool health over time.

<Aside type="note">

Load balancing analytics are only available to customers on paid plans (Pro, Business, and Enterprise).

</Aside>

## Dashboard Analytics

### Overview metrics

To view **Overview** metrics for your load balancer, go to **Traffic** > **Load Balancing Analytics**.

These metrics show the number of requests routed to specific pools within a load balancer, helping you:
- Evaluate the effects of adding or removing a pool.
- Decide when to create new origin pools.
- Plan for peak traffic demands and future infrastructure needs.

Add additional filters for specific pools, times, regions, and origins.

### Latency and Logs

To view latency and log information for your load balancer, go to **Traffic** > **Load Balancing Analytics** > **Latency**.

**Latency** metrics show an interactive map, helping you identify regions with **Unhealthy** or **Slow** pools.

**Logs** provide a history of all origin server status changes and how they affect your load balancing pools.

## GraphQL Analytics

For more flexibility, get load balancing metrics directly from the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api).

Get started with a sample query:

<details>
<summary>Requests per pool</summary>
<div>

This query shows the number of requests each pool receives from each location in Cloudflare's global network.

```graphql
---
header: Query
---
{
  viewer {
    zones(filter: {zoneTag: "your Zone ID"}) {
         loadBalancingRequestsAdaptiveGroups( 
            limit: 100, 
            filter: {   
                datetime_geq: "2021-06-26T00:00:00Z", 
                datetime_leq: "2021-06-26T03:00:00Z",
                lbName:"lb.example.com"
            },
            orderBy: [datetimeFifteenMinutes_DESC] 
        ) {
          count
          dimensions {
            datetimeFifteenMinutes
            coloCode
            selectedPoolName
        }
      }
    }
  }
}
```

```json
---
header: Response (truncated)
---
{
    "data": {
        "viewer": {
            "zones": [
                {
                    "loadBalancingRequestsAdaptiveGroups": [
                        {
                            "count": 4,
                            "dimensions": {
                                "coloCode": "IAD",
                                "datetimeFifteenMinutes": "2021-06-26T00:45:00Z",
                                "selectedPoolName": "us-east"
                            }
                        },
                        ...
                    ]
                }
            ]
        }
    }
}
```

</div>

</details>

<details>
<summary>Requests per data center</summary>
<div>

This query shows the weighted, round-trip time measurement (`avgRttMs`) for individual requets from a specific data center (for example, Singapore or `SIN`) to each pool in a specific load balancer.

```graphql
---
header: Query
---
{
  viewer {
    zones(filter: {zoneTag: "your Zone ID"}) {
         loadBalancingRequestsAdapative( 
            limit: 100, 
            filter: { 
                datetime_geq: "2021-06-26T00:00:00Z", 
                datetime_leq: "2021-06-26T03:00:00Z",
                lbName:"lb.example.com",
                coloCode: "SIN"
            },
            orderBy: [datetime_DESC] 
        ) {
        selectedPoolName
        pools {
          poolName
          healthy
          healthCheckEnabled
          avgRttMs
        }
      }
    }
  }
}
```

```json
---
header: Response (truncated)
---
{
    "data": {
        "viewer": {
            "zones": [
                {
                    "loadBalancingRequestsAdaptive": [
                        {
                            "pools": [
                                {
                                    "avgRttMs": 67,
                                    "healthCheckEnabled": 1,
                                    "healthy": 1,
                                    "poolName": "asia-ne"
                                },
                                {
                                    "avgRttMs": 156,
                                    "healthCheckEnabled": 1,
                                    "healthy": 1,
                                    "poolName": "us-east_and_asia-ne"
                                },
                                {
                                    "avgRttMs": 237,
                                    "healthCheckEnabled": 1,
                                    "healthy": 1,
                                    "poolName": "us-east"
                                },
                            ],
                            "selectedPoolName": "asia-ne"
                        },
                    ...
                    ]
                }
            ]
        }
    }
}
```

</div>

</details>