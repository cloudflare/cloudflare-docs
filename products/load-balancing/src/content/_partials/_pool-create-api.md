For a full list of properties, refer to [Create Pool](https://api.cloudflare.com/#account-load-balancer-pools-create-pool). If you need help with API authentication, refer to [Cloudflare API Quickstart](https://developers.cloudflare.com/api/).

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
    "notification_email":"someone@example.com,sometwo@example.com",
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
    "notification_email": "someone@example.com,sometwo@example.com",
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