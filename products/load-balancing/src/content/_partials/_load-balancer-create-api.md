For a full list of properties, refer to [Create Load Balancer](https://api.cloudflare.com/#load-balancers-create-load-balancer). If you need help with API authentication, refer to [Cloudflare API Quickstart](https://developers.cloudflare.com/api/).

<Aside type="note">

Since load balancers only exist on a zone — and not an account — you may need to get the zone `id` with the [List Zones](https://api.cloudflare.com/#zone-list-zones) command.

</Aside>

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
    "steering_policy": "dynamic_latency",
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "samesite": "Auto",
      "secure": "Auto",
      "drain_duration": 100
    },
    "session_affinity_ttl": 5000,
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
    "steering_policy": "dynamic_latency",
    "session_affinity": "cookie",
    "session_affinity_attributes": {
      "samesite": "Auto",
      "secure": "Auto",
      "drain_duration": 100
    },
    "session_affinity_ttl": 5000,
  }
}
```