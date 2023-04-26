---
_build:
  publishResources: false
  render: never
  list: never
---

### Test

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

### Test
 
To create a load balancer in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.

2.  Click **Create Load Balancer**.

3.  On the **Hostname** page:
    *   Enter a **Hostname**, which is the DNS name at which the load balancer is available. For more details on record priority, refer to [DNS records for load balancing](/load-balancing/reference/dns-records/).
    *   Toggle the orange cloud icon to update the [proxy mode](/load-balancing/understand-basics/proxy-modes/), which affects how traffic is routed and which IP addresses are advertised.
    *   If you want [session-based load balancing](/load-balancing/understand-basics/session-affinity/), toggle the **Session Affinity** switch.

4.  Click **Next**.

5.  On the **Add an Origin Pool** page:
    *   Select one or more existing pools or [create a new pool](/load-balancing/how-to/create-pool/#create-a-pool).
    *   If you are going to set [traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/) to **Off**, re-order the pools in your load balancer to adjust the fallback order.
    *   If needed, update the [**Fallback Pool**](/load-balancing/understand-basics/health-details/#fallback-pools).
    *   If you choose to set traffic steering to **Random**, you can set [Weights](/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering) (via the API) to your pools to determine the percentage of traffic sent to each pool.

6.  Click **Next**.

7.  On the **Monitors** page:
    *   Review the monitors attached to your pools.
    *   If needed, you can attach an existing monitor or [create a new monitor](/load-balancing/how-to/create-monitor/#create-a-monitor).

8.  Click **Next**.

9.  On the **Traffic Steering** page, choose an option for [Traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/).

10. Click **Next**.

11. On the **Custom Rules** page, select an existing rule or [create a new rule](/load-balancing/additional-options/load-balancing-rules/).

12. Click **Next**.

13. On the **Review** page:
    *   Review your configuration and make any changes.
    *   Choose whether to **Save as Draft** or **Save and Deploy**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
For a full list of properties, refer to [Create Load Balancer](/api/operations/load-balancers-create-load-balancer). If you need help with API authentication, refer to [Cloudflare API documentation](/fundamentals/api/).

{{<Aside type="note">}}

Since load balancers only exist on a zone — and not an account — you may need to get the zone `id` with the [List Zones](/api/operations/zone-list-zones) command.

{{</Aside>}}

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/:zone_id/load-balancers" \
-H "Content-Type: application/json" \
-d '{
    "description": "Load Balancer for lb.example.com",
    "name": "lb.example.com",
    "enabled": true,
    "ttl": 30,
    "fallback_pool": "17b5962d775c646f3f9725cbc7a53df4",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "proxied": true,
    "steering_policy": "random_steering",
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "samesite": "Auto",
      "secure": "Auto",
      "drain_duration": 100,
      "zero_downtime_failover": "sticky"
    },
    "session_affinity_ttl": 5000,
    "adaptive_routing": {
      "failover_across_pools": true
    },
    "location_strategy": {
      "prefer_ecs": "always",
      "mode": "resolver_ip"
    },
    "random_steering": {
      "pool_weights": {
        "de90f38ced07c2e2f4df50b1f61d4194": 0.3,
        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5
      },
      "default_weight": 0.2
    }
}'
```

The response contains the complete definition of the new load balancer.

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "created_on": "2021-01-01T05:20:00.12345Z",
    "modified_on": "2021-01-01T05:20:00.12345Z",
    "description": "Load Balancer for lb.example.com",
    "name": "lb.example.com",
    "enabled": true,
    "ttl": 30,
    "fallback_pool": "17b5962d775c646f3f9725cbc7a53df4",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "proxied": true,
    "steering_policy": "random_steering",
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "samesite": "Auto",
      "secure": "Auto",
      "drain_duration": 100,
      "zero_downtime_failover": "sticky"
    },
    "session_affinity_ttl": 5000,
    "random_steering": {
      "pool_weights": {
        "de90f38ced07c2e2f4df50b1f61d4194": 0.3,
        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5
      },
      "default_weight": 0.2
  }
}
```
 
{{</tab>}}
{{</tabs>}}