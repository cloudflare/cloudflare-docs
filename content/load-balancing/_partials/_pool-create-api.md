---
_build:
  publishResources: false
  render: never
  list: never
---

For a full list of properties, refer to [Create Pool](/api/operations/account-load-balancer-pools-create-pool). If you need help with API authentication, refer to [Cloudflare API documentation](/fundamentals/api/).

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/:account_id/load-balancers/pools" \
-H "Content-Type: application/json" \
-d '{
    "description":"Primary data center - Provider XYZ",
    "name":"primary-dc-1",
    "enabled":false,
    "load_shedding": {
        "default_percent":0,
        "default_policy":"random",
        "session_percent":0,
        "session_policy":"hash"
    },
    "minimum_origins":2,
    "monitor":"f1aba936b94213e5b8dca0c0dbf1f9cc",
    "check_regions": [
        "WEU",
        "ENAM"
    ],
    "origins": [
      {
        "name":"app-server-1",
        "address":"0.0.0.0",
        "enabled":true,
        "weight":0.56,
        "header": {
        "Host": [
            "example.com"
          ]
        }
      }
    ],
    "origin_steering": {
      "policy": "random"
    },
    "notification_filter": {
        "origin": {
            "disable":false,
            "healthy":null
        },
        "pool": {
            "disable":false,
            "healthy":null
        }
    }
}'
```

The response contains the complete definition of the new pool.

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "17b5962d775c646f3f9725cbc7a53df4",
    "created_on": "2021-01-01T05:20:00.12345Z",
    "modified_on": "2021-01-01T05:20:00.12345Z",
    "description": "Primary data center - Provider XYZ",
    "name": "primary-dc-1",
    "enabled": false,
    "load_shedding": {
      "default_percent": 0,
      "default_policy": "random",
      "session_percent": 0,
      "session_policy": "hash"
    },
    "minimum_origins": 2,
    "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "check_regions": [
      "WEU",
      "ENAM"
    ],
    "origins": [
      {
        "name": "app-server-1",
        "address": "0.0.0.0",
        "enabled": true,
        "weight": 0.56,
        "header": {
          "Host": [
            "example.com"
          ]
        }
      }
    ],
    "origin_steering": {
      "policy": "random"
    },
    "notification_filter": {
      "origin": {
        "disable": false,
        "healthy": null
      },
      "pool": {
        "disable": false,
        "healthy": null
      }
    }
  }
}
```

After creating the pool, you would also want to [create a new notification](/api/operations/notification-policies-create-a-notification-policy) with the following parameters specified:

```json
"alert_type": "load_balancing_health_alert",
"filters": {
    "pool_id": <<ARRAY_OF_INCLUDED_POOL_IDS>>,
    "new_health": <<ARRAY_OF_STATUS_TRIGGERS>> ["Unhealthy", "Healthy"],
    "event_source": <<ARRAY_OF_OBJECTS_WATCHED>> ["pool", "origin"]
}
```
