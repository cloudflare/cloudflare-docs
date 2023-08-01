---
pcx_content_type: reference
title: Page Shield API
weight: 5
---

# Page Shield API

You can enable and disable Page Shield, configure its settings, and fetch information about detected scripts and connections using the [Page Shield API](/api/operations/page-shield-get-page-shield-settings).

For authentication instructions, refer to [Getting Started: Requests](/fundamentals/api/) in the Cloudflare API documentation.

{{<Aside type="note">}}
Refer to [API deprecations](/fundamentals/api/reference/deprecations/#page-shield) for details on Page Shield API changes.
{{</Aside>}}

## Endpoints

You can obtain the complete endpoint by appending the [Page Shield API](/api/operations/page-shield-get-page-shield-settings) endpoints to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4
```

The `{zone_id}` argument is the zone ID (a hexadecimal string). You can find this value in the Cloudflare dashboard or using the Cloudflare API's [`/zones` endpoint](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

The `{script_id}` argument is the script ID (a hexadecimal string). This value is included in the response of the [List Page Shield scripts](/api/operations/page-shield-list-page-shield-scripts) operation for every detected script.

The `{connection_id}` argument is the connection ID (a hexadecimal string). This value is included in the response of the List Page Shield connections API operation for every detected connection.

The following table summarizes the available operations:

| Operation                         | Method + URL stub                                      | Notes                                                 |
| --------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| [Get Page Shield settings][1]     | `GET zones/{zone_id}/page_shield`                      | Fetch Page Shield settings (including the status).    |
| [Update Page Shield settings][2]  | `PUT zones/{zone_id}/page_shield`                      | Update Page Shield settings.                          |
| [List Page Shield scripts][3]     | `GET zones/{zone_id}/page_shield/scripts`              | Fetch a list of detected scripts.                     |
| [Get a Page Shield script][4]     | `GET zones/{zone_id}/page_shield/scripts/{script_id}`  | Fetch the details of a script.                        |
| [List Page Shield connections][5] | `GET zones/{zone_id}/page_shield/connections`          | Fetch a list of detected connections.                 |
| [Get a Page Shield connection][6] | `GET zones/{zone_id}/page_shield/connections/{connection_id}` | Fetch the details of a connection.             |
| [List Page Shield policies][7]    | `GET zones/{zone_id}/page_shield/policies`             | Fetch a list of all configured CSP policies.          |
| [Get a Page Shield policy][8]     | `GET zones/{zone_id}/page_shield/policies/{policy_id}` | Fetch the details of a CSP policy.                    |
| [Create a Page Shield policy][9]  | `POST zones/{zone_id}/page_shield/policies`            | Creates a CSP policy with the provided configuration. |
| [Update a Page Shield policy][10] | `PUT zones/{zone_id}/page_shield/policies/{policy_id}` | Updates an existing CSP policy.                       |
| [Delete a Page Shield policy][11] | `DELETE zones/{zone_id}/page_shield/policies/{policy_id}` | Deletes an existing CSP policy.                    |

[1]: /api/operations/page-shield-get-page-shield-settings
[2]: /api/operations/page-shield-update-page-shield-settings
[3]: /api/operations/page-shield-list-page-shield-scripts
[4]: /api/operations/page-shield-get-a-page-shield-script
[5]: /api/operations/page-shield-list-page-shield-connections
[6]: /api/operations/page-shield-get-a-page-shield-connection
[7]: /api/operations/page-shield-list-page-shield-policies
[8]: /api/operations/page-shield-get-a-page-shield-policy
[9]: /api/operations/page-shield-create-a-page-shield-policy
[10]: /api/operations/page-shield-update-a-page-shield-policy
[11]: /api/operations/page-shield-delete-a-page-shield-policy

## API notes

* The malicious script classification (`Malicious` or `Not malicious`) is not directly available in the API. To determine this classification, compare the script's `js_integrity_score` value with the classification threshold, which is currently set to 50 — scripts with a score value higher than the threshold are considered malicious.

* The API provides two separate properties for malicious script/connection categories: `malicious_domain_categories` and `malicious_url_categories`, related to the `domain_reported_malicious` and `url_reported_malicious` properties, respectively. The Cloudflare dashboard displays all the categories in a single **Malicious category** field. For more information, refer to [Malicious script and connection categories](/page-shield/how-it-works/malicious-script-detection/#malicious-script-and-connection-categories).

## Common API calls

### Get Page Shield settings

This example obtains the current settings of Page Shield, including the status (enabled/disabled).

```bash
---
header: Request
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/page_shield \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true,
    "updated_at": "2023-05-14T11:47:55.677555Z",
    "use_cloudflare_reporting_endpoint": true,
    "use_connection_url_path": false
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
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/page_shield \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{ "enabled": true }'
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true,
    "updated_at": "2023-05-14T11:50:41.756996Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Fetch list of detected scripts

This `GET` request fetches a list of scripts detected by Page Shield on hostname `example.net`, requesting the first page with 15 items per page. The URL query string includes filtering and paging parameters.

By default, the response will only include scripts with `active` status when you do not specify a `status` filter parameter in the URL query string.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/scripts?hosts=example.net&page=1&per_page=15" \
--header "Authorization: Bearer <API_TOKEN>"
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
      "added_at": "2023-05-18T10:51:10.09615Z",
      "first_seen_at": "2023-05-18T10:51:08Z",
      "last_seen_at": "2023-05-22T09:57:54Z",
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
      "fetched_at": "2023-05-21T16:58:07Z"
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

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](/api/operations/page-shield-list-page-shield-scripts).

### Fetch list of infrequently reported scripts

This `GET` request fetches a list of infrequently reported scripts on hostname `example.net`, requesting the first page with 15 items per page. The URL query string includes filtering and paging parameters.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/scripts?status=infrequent&hosts=example.net&page=1&per_page=15" \
--header "Authorization: Bearer <API_TOKEN>"
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
      "added_at": "2023-05-17T13:16:03.419619Z",
      "first_seen_at": "2023-05-17T13:15:23Z",
      "last_seen_at": "2023-05-18T09:05:20Z",
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
      "fetched_at": "2023-05-18T03:58:07Z"
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

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](/api/operations/page-shield-list-page-shield-scripts).

### Get details of a detected script

This `GET` request obtains the details of a script detected by Page Shield with script ID `8337233faec2357ff84465a919534e4d`.

```bash
---
header: Request
---
curl https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/scripts/8337233faec2357ff84465a919534e4d \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Response
---
{
  "result": {
    "id": "8337233faec2357ff84465a919534e4d",
    "url": "https://malicious.example.com/badscript.js",
    "added_at": "2023-05-18T10:51:10.09615Z",
    "first_seen_at": "2023-05-18T10:51:08Z",
    "last_seen_at": "2023-05-22T09:57:54Z",
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
    "fetched_at": "2023-05-21T16:58:07Z",
    "page_urls": [
      "http://malicious.example.com/page_two.html",
      "http://malicious.example.com/page_three.html",
      "http://malicious.example.com/page_four.html"
    ],
    "versions": [
      {
        "hash": "9245aad577e846dd9b990b1b32425a3fae4aad8b8a28441a8b80084b6bb75a45",
        "js_integrity_score": 50,
        "fetched_at": "2023-05-21T16:58:07Z"
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Some fields displayed in the example response may not be available, depending on your Cloudflare plan.

### Fetch list of detected connections

This `GET` request fetches a list of connections detected by Page Shield, requesting the first page with 15 items per page.

By default, the response will only include connections with `active` status when you do not specify a `status` filter parameter in the URL query string.

```bash
---
header: Request
---
curl "https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/connections?page=1&per_page=15" \
--header "Authorization: Bearer <API_TOKEN>"
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

For details on the available filtering, paging, and sorting parameters, refer to the [API reference](/api/operations/page-shield-list-page-shield-scripts).

### Get details of a detected connection

This `GET` request obtains the details of a connection detected by Page Shield with connection ID `0a7bb628776f4e50a50d8594c4a01740`.

```bash
---
header: Request
---
curl https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/connections/0a7bb628776f4e50a50d8594c4a01740 \
--header "Authorization: Bearer <API_TOKEN>"
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

### Create a policy

This `POST` request creates a Page Shield policy with _Log_ action, defining the following scripts as allowed based on where they are hosted:

* Scripts hosted in `myapp.example.com` (which does not include scripts in `example.com`).
* Scripts hosted in `cdnjs.cloudflare.com`.
* The Google Analytics script using its full URL.
* All scripts in the same origin (same HTTP or HTTPS scheme and hostname).

All other scripts would trigger a policy violation, but those scripts would not be blocked.

For more information on Content Security Policy directives and values, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).

{{<Aside type="warning">}}
Currently, you can only create Page Shield policies containing `script-src` directives. Additionally, the supported keywords in these directives are the following:
- `'self'`
- `'none'`
- `'unsafe-inline'`
- `'unsafe-eval'`
{{</Aside>}}

```bash
---
header: Request
---
curl https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/policies \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "description": "My first policy in log mode",
  "action": "log",
  "expression": "http.host eq myapp.example.com",
  "enabled": "true",
  "value": "script-src myapp.example.com cdnjs.cloudflare.com https://www.google-analytics.com/analytics.js '\''self'\''"
}'
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "<POLICY_ID>",
    "description": "My first policy in log mode",
    "action": "log",
    "expression": "http.host eq myapp.example.com",
    "enabled": "true",
    "value": "script-src myapp.example.com cdnjs.cloudflare.com https://www.google-analytics.com/analytics.js 'self'"
  }
}
```

To create a policy with an _Allow_ action instead of _Log_, use `"action": "allow"` in the request body. In the case of such policy, all scripts not allowed by the policy would be blocked.
