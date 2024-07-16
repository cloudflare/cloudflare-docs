---
_build:
  publishResources: false
  render: never
  list: never
---

For a full list of monitor properties, refer to [Create Monitor](/api/operations/account-load-balancer-monitors-create-monitor). If you need help with API authentication, refer to [Cloudflare API documentation](/fundamentals/api/).

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/load_balancers/monitors" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "type": "https",
  "description": "Login page monitor",
  "method": "GET",
  "path": "/health",
  "header":  {
    "Host": ["example.com"],
    "X-App-ID": ["abc123"]
  },
  "port": 8080,
  "timeout": 3,
  "retries": 0,
  "interval": 90,
  "expected_body": "alive",
  "expected_codes": "2xx",
  "follow_redirects": true,
  "allow_insecure": true,
  "consecutive_up": 3,
  "consecutive_down": 2,
  "probe_zone": "example.com"
}'
```

The response contains the complete definition of the new monitor.

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": ":monitor-id",
    "created_on": "2021-01-01T05:20:00.12345Z",
    "modified_on": "2021-01-01T05:20:00.12345Z",
    "type": "https",
    "description": "Login page monitor",
    "method": "GET",
    "path": "/health",
    "header": {
      "Host": [
        "example.com"
      ],
      "X-App-ID": [
        "abc123"
      ]
    },
    "port": 8080,
    "timeout": 3,
    "retries": 0,
    "interval": 90,
    "expected_body": "alive",
    "expected_codes": "2xx",
    "follow_redirects": true,
    "allow_insecure": true,
    "consecutive_up": 3,
    "consecutive_down": 2,
    "probe_zone": "example.com"
  }
}
```
