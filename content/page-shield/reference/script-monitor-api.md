---
pcx-content-type: reference
title: Script Monitor API
weight: 4
---

# Script Monitor API

You can change the Page Shield status and fetch information about the currently monitored scripts using the [Script Monitor API](https://api.cloudflare.com/#script-monitor-properties).

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

## Endpoints

You can obtain the complete endpoint by appending the [Script Monitor API](https://api.cloudflare.com/#script-monitor-properties) endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `<ZONE_ID>` argument is the zone ID (a hexadecimal string). You can find this value in the Cloudflare dashboard or using the Cloudflare API's [`/zones` endpoint](https://api.cloudflare.com/#getting-started-resource-ids).

The `<SCRIPT_ID>` argument is the script ID (a hexadecimal string). This value is included in the response of the [List Script Monitor scripts](https://api.cloudflare.com/#script-monitor-list-script-monitor-scripts) operation for every monitored script.

The following table summarizes the available operations:

| Operation                        | Method + URL stub                                        | Notes                                                    |
| -------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| [Get Page Shield settings][1]    | `GET zones/<ZONE_ID>/script_monitor`                     | Fetch the current Page Shield status (enabled/disabled). |
| [Update Page Shield settings][2] | `PUT zones/<ZONE_ID>/script_monitor`                     | Updates the Page Shield status (enabled/disabled).       |
| [List Page Shield scripts][3]    | `GET zones/<ZONE_ID>/script_monitor/scripts`             | Fetch a list of currently monitored scripts.             |
| [Get a script][4]                | `GET zones/<ZONE_ID>/script_monitor/scripts/<SCRIPT_ID>` | Fetch the details of a currently monitored script.       |

[1]: https://api.cloudflare.com/#script-monitor-get-script-monitor-settings
[2]: https://api.cloudflare.com/#script-monitor-update-script-monitor-settings
[3]: https://api.cloudflare.com/#script-monitor-list-script-monitor-scripts
[4]: https://api.cloudflare.com/#script-monitor-get-a-script

## API notes

The malicious script classification (`Malicious` or `Not malicious`) is not directly available in the API. To determine this classification, compare the script's `js_integrity_score` value with the classification threshold, which is currently set to 10 — scripts with a score value above the threshold are considered malicious.

## Common API calls

### Get Page Shield status

This example obtains the current status of Page Shield (enabled/disabled).

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/script_monitor" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true,
    "updated_at": "2021-11-14T11:47:55.677555Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Enable Page Shield

This example enables Page Shield in the specified zone.

```bash
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/script_monitor" \
-H "Authorization: Bearer <API_TOKEN>" \
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
    "updated_at": "2021-11-14T11:50:41.756996Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Fetch list of monitored scripts

This example fetches a list of scripts monitored by Page Shield on hostname `example.net`, requesting the first page with 15 items per page. The URL query string includes filtering and paging parameters.

By default, the response will only include scripts with `active` status when you do not specify a `status` filter parameter in the URL query string.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/script_monitor/scripts?hosts=example.net&page=1&per_page=15" \
-H "Authorization: Bearer <API_TOKEN>"
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
      "added_at": "2021-11-18T10:51:10.09615Z",
      "first_seen_at": "2021-11-18T10:51:08Z",
      "last_seen_at": "2021-11-22T09:57:54Z",
      "host": "example.net",
      "domain_reported_malicious": false,
      "url_reported_malicious": false,
      "seen_on_first": "http://malicious.example.com/page_one.html",
      "count": 10,
      "status": "active",
      "appears_in_cdn_cgi_path": false,
      "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "js_integrity_score": 10,
      "fetched_at": "2021-11-21T16:58:07Z"
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

Some fields displayed in the example response may not be available, depending on your Cloudflare plan.

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](https://api.cloudflare.com/#script-monitor-list-script-monitor-scripts).

### Fetch list of infrequently reported scripts

This example fetches a list of infrequently reported scripts on hostname `example.net`, requesting the first page with 15 items per page. The URL query string includes filtering and paging parameters.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/script_monitor/scripts?status=infrequent&hosts=example.net&page=1&per_page=15" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "script_id": "83c8da2267394ce8465b74c299658fea",
      "script_url": "https://scripts.example.com/anotherbadscript.js",
      "added_at": "2021-11-17T13:16:03.419619Z",
      "first_seen_at": "2021-11-17T13:15:23Z",
      "last_seen_at": "2021-11-18T09:05:20Z",
      "host": "example.net",
      "domain_reported_malicious": false,
      "url_reported_malicious": false,
      "seen_on_first": "http://malicious.example.com/page_one.html",
      "count": 2,
      "status": "infrequent",
      "appears_in_cdn_cgi_path": false,
      "hash": "9245aad577e846dd9b990b1b32425a3fae4aad8b8a28441a8b80084b6bb75a45",
      "js_integrity_score": 50,
      "fetched_at": "2021-11-18T03:58:07Z"
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
    "total_count": 17,
    "total_pages": 2
  }
}
```

Some fields displayed in the example response may not be available, depending on your Cloudflare plan.

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](https://api.cloudflare.com/#script-monitor-list-script-monitor-scripts).

### Get details of a monitored script

This example obtains the details of a script monitored by Page Shield with script ID `8337233faec2357ff84465a919534e4d`.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/script_monitor/scripts/8337233faec2357ff84465a919534e4d" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "script_id": "8337233faec2357ff84465a919534e4d",
    "script_url": "https://malicious.example.com/badscript.js",
    "added_at": "2021-11-18T10:51:10.09615Z",
    "first_seen_at": "2021-11-18T10:51:08Z",
    "last_seen_at": "2021-11-22T09:57:54Z",
    "host": "example.net",
    "domain_reported_malicious": false,
    "url_reported_malicious": false,
    "seen_on_first": "http://malicious.example.com/page_one.html",
    "count": 10,
    "status": "active",
    "appears_in_cdn_cgi_path": false,
    "hash": "9245aad577e846dd9b990b1b32425a3fae4aad8b8a28441a8b80084b6bb75a45",
    "js_integrity_score": 50,
    "fetched_at": "2021-11-21T16:58:07Z",
    "seen_on": [
      "http://malicious.example.com/page_two.html",
      "http://malicious.example.com/page_three.html",
      "http://malicious.example.com/page_four.html"
    ],
    "versions": [
      {
        "hash": "9245aad577e846dd9b990b1b32425a3fae4aad8b8a28441a8b80084b6bb75a45",
        "js_integrity_score": 50,
        "fetched_at": "2021-11-21T16:58:07Z"
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Some fields displayed in the example response may not be available, depending on your Cloudflare plan.
