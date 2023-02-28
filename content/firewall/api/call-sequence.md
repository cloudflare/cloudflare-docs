---
title: Call sequence
pcx_content_type: reference
weight: 4
---

# Call sequence

The API call examples in this site illustrate the **recommended sequence** of calling the two APIs (the [Cloudflare Filters API](/firewall/api/cf-filters/) and the [Firewall Rules API](/firewall/api/cf-firewall-rules/)).

The image below depicts this sequence, which can be applied for creating and editing rules. The reverse would apply for delete operations.

![Recommended flow for calling the Cloudflare Filters API and Firewall Rules API when creating or editing rules](/firewall/static/recommended-flow.png)

Cloudflare recommends this sequence because it facilitates filter reusability and allows working with either API independently. Thanks to the standalone nature of Cloudflare Filters, the same filter can be shared in multiple firewall rules and in other future Cloudflare products and features.

For example, a filter that matches all traffic for your API (that is, `http.request.uri.path matches "^/api/.*$"`) may disable caching, disable human CAPTCHAs, configure JSON custom errors, and appear in a firewall rule. With the recommended sequence above, you would just repeat steps 3-6 for every Cloudflare feature to configure against the same filter created in steps 1-2.

However, for a `POST` operation, the **simplified sequence** — shown below — allows you to create both a filter and rule in the same call. In this case, the filter and rule only refer to each other.

![Simple flow for invoking the Firewall Rules API to create both a filter and a rule in a single call](/firewall/static/simple-flow.png)

In this sequence, a single `POST` request to the `/firewall/rules` endpoint takes the filter object in the JSON to create the filter in the Filters API (also via a `POST` request). If successful, the firewall rule is created.

Below is an example call and response using this method:

```json
---
header: Request
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \
-d '[
  {
    "filter": {
      "expression": "http.request.uri.path contains \"/api/\" and ip.src eq 93.184.216.34"
    },
    "action": "block"
  }
]'
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "<RULE_ID>",
      "paused": false,
      "action": "block",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID>",
        "expression": "http.request.uri.path contains \"/api/\" and ip.src eq 93.184.216.34",
        "paused": false
      }
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

However, this approach has some disadvantages:

* The firewall rules client has to implement error and exception handling for every potential failure occurring in both the firewall rules and the filters APIs.
* To protect against accidentally modifying or deleting filters used by other Cloudflare features, the `PUT` or `DELETE` operations are not allowed.

By default, if either the filter or rule is invalid, neither will be created.

However, one exception applies. If you are about to exceed your rule quota, Cloudflare may create the filter but not the firewall rule. This happens because the rule is only created after the filter in the sequence diagram.

After you resolve the issue of exceeding your quota or requesting a feature that is unavailable to your zone, return to the recommended flow to create a rule that references the filter.

In summary, Cloudflare strongly recommends the sequence with the two API calls. Limit your rule and filter creation using the simplified sequence for emergency situations, and only via `curl` requests.
