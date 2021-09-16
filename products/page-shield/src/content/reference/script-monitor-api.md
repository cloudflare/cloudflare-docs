---
order: 1
pcx-content-type: reference
---

# Script Monitor API

You can change the Script Monitor status and fetch a list of currently monitored scripts using the [Script Monitor API](https://api.cloudflare.com/#script-monitor-properties).

For authentication instructions, refer to [_Getting Started: Requests_](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

## Endpoints

You can obtain the complete endpoint by appending the [Script Monitor API](https://api.cloudflare.com/#script-monitor-properties) endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `{:zone_identifier}` argument is the zone ID (a hexadecimal string). You can find this value in the Cloudflare dashboard or using the Cloudflare API's [`/zones` endpoint](https://api.cloudflare.com/#getting-started-resource-ids).

The following table summarizes the available operations.

| Operation | Method + URL stub | Notes |
|-----------|-------------------|-------|
| [Get Script Monitor settings][1] | `GET zones/{:zone_identifier}/script_monitor` | Fetch the current Script Monitor status (enabled/disabled). |
| [Update Script Monitor settings][2] | `PUT zones/{:zone_identifier}/script_monitor` | Updates the Script Monitor status (enabled/disabled). |
| [List Script Monitor scripts][3] | `GET zones/{:zone_identifier}/script_monitor/scripts` | Fetch a list of currently monitored scripts. |

[1]: https://api.cloudflare.com/#script-monitor-get-script-monitor-settings
[2]: https://api.cloudflare.com/#script-monitor-update-script-monitor-settings
[3]: https://api.cloudflare.com/#script-monitor-list-script-monitor-scripts

## Common API calls

### Get Script Monitor status

This example obtains the current status of Script Monitor (enabled/disabled).

```bash
---
header: Request
---
curl -X GET "https://api.cloudflare.com/client/v4/zones/{:zone_identifier}/script_monitor" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  -H "Content-Type: application/json"
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true,
    "updated_at": "2021-09-14T11:47:55.677555Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Enable Script Monitor

This example enables Script Monitor in the specified zone.

```bash
---
header: Request
---
curl -X PUT "https://api.cloudflare.com/client/v4/zones/{:zone_identifier}/script_monitor" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  -H "Content-Type: application/json" \
  -d '{ "enabled": true }'
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true,
    "updated_at": "2021-09-14T11:50:41.756996Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Fetch list of monitored scripts

This example fetches a list of scripts monitored by Script Monitor on hostname `example.net`, requesting the first page with 15 items per page.

```bash
---
header: Request
---
curl -X GET "https://dash.cloudflare.com/api/v4/zones/{:zone_identifier}/script_monitor/scripts?hosts=example.net&page=1&per_page=15" \
  -H "X-Auth-Email: user@example.com" \
  -H "X-Auth-Key: REDACTED" \
  -H "Content-Type: application/json"
```

```json
---
header: Response
---
{
  "result": [
    {
      "script_id": "8337233faec2357ff84465a919534e4d",
      "script_url": "https://malicious.example.com/badscript.js",
      "added_at": "2021-08-18T10:51:10.09615Z",
      "first_seen_at": "2021-08-18T10:51:08Z",
      "last_seen_at": "2021-09-02T09:57:54Z",
      "host": "example.net"
    },
    {
      "script_id": "83c8da2267394ce8465b74c299658fea",
      "script_url": "https://scripts.example.com/anotherbadscript.js",
      "added_at": "2021-08-17T13:16:03.419619Z",
      "first_seen_at": "2021-08-17T13:15:23Z",
      "last_seen_at": "2021-08-18T09:05:20Z",
      "host": "example.net"
    },
    // (...)
  ],
  "success": true,
  "errors": [],
  "messages": [],
  "result_info": {
    "page": 1,
    "per_page": 15,
    "count": 15,
    "total_count": 24,
    "total_pages": 2
  }
}
```

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](https://api.cloudflare.com/#script-monitor-list-script-monitor-scripts).