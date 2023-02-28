---
pcx_content_type: reference
title: Page Shield API
weight: 5
---

# Page Shield API

You can change the Page Shield status and fetch information about the currently monitored scripts and connections using the [Page Shield API](https://developers.cloudflare.com/api/operations/page-shield-get-page-shield-settings).

For authentication instructions, refer to [Getting Started: Requests](/fundamentals/api/) in the Cloudflare API documentation.

{{<Aside type="note">}}
Refer to [API deprecations](/fundamentals/api/reference/deprecations/#page-shield) for details on Page Shield API changes.
{{</Aside>}}

## Endpoints

You can obtain the complete endpoint by appending the [Page Shield API](https://developers.cloudflare.com/api/operations/page-shield-get-page-shield-settings) endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `<ZONE_ID>` argument is the zone ID (a hexadecimal string). You can find this value in the Cloudflare dashboard or using the Cloudflare API's [`/zones` endpoint](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

The `<SCRIPT_ID>` argument is the script ID (a hexadecimal string). This value is included in the response of the [List Page Shield scripts](https://developers.cloudflare.com/api/operations/page-shield-list-page-shield-scripts) operation for every monitored script.

The `<CONNECTION_ID>` argument is the connection ID (a hexadecimal string). This value is included in the response of the List Page Shield connections API operation for every monitored connection.

The following table summarizes the available operations:

| Operation                         | Method + URL stub                                      | Notes                                                    |
| --------------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| [Get Page Shield status][1]       | `GET zones/<ZONE_ID>/page_shield`                      | Fetch the current Page Shield status (enabled/disabled). |
| [Update Page Shield status][2]    | `PUT zones/<ZONE_ID>/page_shield`                      | Update the Page Shield status (enabled/disabled).        |
| [List Page Shield scripts][3]     | `GET zones/<ZONE_ID>/page_shield/scripts`              | Fetch a list of currently monitored scripts.             |
| [Get a Page Shield script][4]     | `GET zones/<ZONE_ID>/page_shield/scripts/<SCRIPT_ID>`  | Fetch the details of a currently monitored script.       |
| List Page Shield connections      | `GET zones/<ZONE_ID>/page_shield/connections`          | Fetch a list of currently monitored connections.         |
| Get a Page Shield connection      | `GET zones/<ZONE_ID>/page_shield/connections/<CONNECTION_ID>` | Fetch the details of a connection.                |


[1]: https://developers.cloudflare.com/api/operations/page-shield-get-page-shield-status
[2]: https://developers.cloudflare.com/api/operations/page-shield-update-page-shield-status
[3]: https://developers.cloudflare.com/api/operations/page-shield-list-page-shield-scripts
[4]: https://developers.cloudflare.com/api/operations/page-shield-get-a-page-shield-script

## API notes

* The malicious script classification (`Malicious` or `Not malicious`) is not directly available in the API. To determine this classification, compare the script's `js_integrity_score` value with the classification threshold, which is currently set to 50 — scripts with a score value higher than the threshold are considered malicious.

* The API provides two separate properties for malicious script/connection categories: `malicious_domain_categories` and `malicious_url_categories`, related to the `domain_reported_malicious` and `url_reported_malicious` properties, respectively. The Cloudflare dashboard displays all the categories in a single **Malicious category** field. For more information, refer to [Malicious script categories](/page-shield/detection/malicious-script-detection/#malicious-script-categories).

## Common API calls

### Get Page Shield status

This example obtains the current status of Page Shield (enabled/disabled).

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/page_shield" \
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
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/page_shield" \
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
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/page_shield/scripts?hosts=example.net&page=1&per_page=15" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "8337233faec2357ff84465a919534e4d",
      "url": "https://malicious.example.com/badscript.js",
      "added_at": "2021-11-18T10:51:10.09615Z",
      "first_seen_at": "2021-11-18T10:51:08Z",
      "last_seen_at": "2021-11-22T09:57:54Z",
      "host": "example.net",
      "domain_reported_malicious": false,
      "url_reported_malicious": true,
      "malicious_url_categories": ["Malware"],
      "first_page_url": "http://malicious.example.com/page_one.html",
      "status": "active",
      "url_contains_cdn_cgi_path": false,
      "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "js_integrity_score": 10,
      "obfuscation_score": 10,
      "dataflow_score": 8,
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

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](https://developers.cloudflare.com/api/operations/page-shield-list-page-shield-scripts).

### Fetch list of infrequently reported scripts

This example fetches a list of infrequently reported scripts on hostname `example.net`, requesting the first page with 15 items per page. The URL query string includes filtering and paging parameters.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/page_shield/scripts?status=infrequent&hosts=example.net&page=1&per_page=15" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "83c8da2267394ce8465b74c299658fea",
      "url": "https://scripts.example.com/anotherbadscript.js",
      "added_at": "2021-11-17T13:16:03.419619Z",
      "first_seen_at": "2021-11-17T13:15:23Z",
      "last_seen_at": "2021-11-18T09:05:20Z",
      "host": "example.net",
      "domain_reported_malicious": false,
      "url_reported_malicious": false,
      "first_page_url": "http://malicious.example.com/page_one.html",
      "status": "infrequent",
      "url_contains_cdn_cgi_path": false,
      "hash": "9245aad577e846dd9b990b1b32425a3fae4aad8b8a28441a8b80084b6bb75a45",
      "js_integrity_score": 48,
      "obfuscation_score": 49,
      "dataflow_score": 45,
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

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](https://developers.cloudflare.com/api/operations/page-shield-list-page-shield-scripts).

### Get details of a monitored script

This example obtains the details of a script monitored by Page Shield with script ID `8337233faec2357ff84465a919534e4d`.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/page_shield/scripts/8337233faec2357ff84465a919534e4d" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "id": "8337233faec2357ff84465a919534e4d",
    "url": "https://malicious.example.com/badscript.js",
    "added_at": "2021-11-18T10:51:10.09615Z",
    "first_seen_at": "2021-11-18T10:51:08Z",
    "last_seen_at": "2021-11-22T09:57:54Z",
    "host": "example.net",
    "domain_reported_malicious": false,
    "url_reported_malicious": true,
    "malicious_url_categories": ["Malware"],
    "first_page_url": "http://malicious.example.com/page_one.html",
    "status": "active",
    "url_contains_cdn_cgi_path": false,
    "hash": "9245aad577e846dd9b990b1b32425a3fae4aad8b8a28441a8b80084b6bb75a45",
    "js_integrity_score": 48,
    "obfuscation_score": 49,
    "dataflow_score": 45,
    "fetched_at": "2021-11-21T16:58:07Z",
    "page_urls": [
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

### Fetch list of monitored connections

This example fetches a list of connections monitored by Page Shield, requesting the first page with 15 items per page.

By default, the response will only include connections with `active` status when you do not specify a `status` filter parameter in the URL query string.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/page_shield/connections?page=1&per_page=15" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "0a7bb628776f4e50a50d8594c4a01740",
      "url": "https://malicious.example.com",
      "added_at": "2022-09-18T10:51:10.09615Z",
      "first_seen_at": "2022-09-18T10:51:08Z",
      "last_seen_at": "2022-09-02T09:57:54Z",
      "host": "example.net",
      "domain_reported_malicious": true,
      "malicious_domain_categories": ["Malware", "Spyware"],
      "url_reported_malicious": false,
      "malicious_url_categories": [],
      "first_page_url": "https://example.net/one.html",
      "status": "active",
      "url_contains_cdn_cgi_path": false
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
    "total_count": 16,
    "total_pages": 2
  }
}
```

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](https://developers.cloudflare.com/api/operations/page-shield-list-page-shield-scripts).

### Get details of a monitored connection

This example obtains the details of a connection monitored by Page Shield with connection ID `0a7bb628776f4e50a50d8594c4a01740`.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/<ZONE_ID>/page_shield/connections/0a7bb628776f4e50a50d8594c4a01740" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "id": "0a7bb628776f4e50a50d8594c4a01740",
    "url": "https://malicious.example.com",
    "added_at": "2022-09-18T10:51:10.09615Z",
    "first_seen_at": "2022-09-18T10:51:08Z",
    "last_seen_at": "2022-09-02T09:57:54Z",
    "host": "example.net",
    "domain_reported_malicious": true,
    "malicious_domain_categories": ["Malware", "Spyware"],
    "url_reported_malicious": false,
    "malicious_url_categories": [],
    "first_page_url": "https://example.net/one.html",
    "status": "active",
    "url_contains_cdn_cgi_path": false
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
