---
pcx_content_type: how-to
title: Create via API
weight: 3
meta:
  title: Create a dynamic redirect via API
---

# Create a dynamic redirect via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a dynamic redirect rule via API.

## Required permissions

The API token used in API requests to manage dynamic redirect rules must have at least the following permission:

* _Zone_ > _Dynamic Redirect_ > _Edit_

## Create a dynamic redirect rule

Add dynamic redirect rules to the entry point ruleset of the `http_request_dynamic_redirect` phase at the zone level. Refer to the [Rulesets API](/ruleset-engine/rulesets-api/) documentation for more information on [creating a ruleset](/ruleset-engine/rulesets-api/create/) and supplying a list of rules for the ruleset.

A dynamic redirect rule must have:

* `action` set to `redirect`
* An `action_parameters` object with additional configuration settings — refer to [API parameter reference](/rules/url-forwarding/dynamic-redirects/parameters/) for details.

The following request of the [Create zone ruleset](https://api.cloudflare.com/#zone-rulesets-create-zone-ruleset) operation creates a phase entry point ruleset for the `http_request_dynamic_redirect` phase at the zone level, and defines a single dynamic redirect rule. Use this operation if you have not created a phase entry point ruleset for the `http_request_dynamic_redirect` phase yet.

```json
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Dynamic redirects ruleset",
  "kind": "zone",
  "phase": "http_request_dynamic_redirect",
  "rules": [
    {
      "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and http.request.uri.path eq \"/\"",
      "description": "Redirect GB and FR users in home page to localized site.",
      "action": "redirect",
      "action_parameters": {
        "from_value": {
          "target_url": {
            "expression": "lower(concat(\"https://\", ip.geoip.country, \".example.com\"))"
          },
          "status_code": 307,
          "preserve_query_string": true
        }
      }
    }
  ]
}'
```

<details>
<summary>Example response</summary>
<div>

```json
{
  "result": {
    "id": "528f4f03bf0da53a29907199625867be",
    "name": "Dynamic redirects ruleset",
    "kind": "zone",
    "version": "1",
    "rules": [
      {
        "id": "235e557b92fd4e5e8753ee665a9ddd75",
        "version": "1",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and http.request.uri.path eq \"/\"",
        "description": "Redirect GB and FR users in home page to localized site.",
        "action": "redirect",
        "action_parameters": {
          "from_value": {
            "target_url": {
              "expression": "lower(concat(\"https://\", ip.geoip.country, \".example.com\"))"
            },
            "status_code": 307,
            "preserve_query_string": true
          }
        },
        "last_updated": "2022-09-28T09:20:42Z",
      }
    ],
    "last_updated": "2022-09-28T09:20:42Z",
    "phase": "http_request_dynamic_redirect"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

If there is already a phase entry point ruleset for the `http_request_dynamic_redirect` phase, use the [Update zone ruleset](https://api.cloudflare.com/#zone-rulesets-update-zone-ruleset) operation instead, like in the following example:

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Dynamic redirects ruleset",
  "kind": "zone",
  "phase": "http_request_dynamic_redirect",
  "rules": [
    {
      "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and http.request.uri.path eq \"/\"",
      "description": "Redirect GB and FR users in home page to localized site.",
      "action": "redirect",
      "action_parameters": {
        "from_value": {
          "target_url": {
            "expression": "lower(concat(\"https://\", ip.geoip.country, \".example.com\"))"
          },
          "status_code": 307,
          "preserve_query_string": true
        }
      }
    },
    {
      "expression": "http.request.uri.path eq \"/contacts.html\"",
      "description": "Redirect to new contacts page.",
      "action": "redirect",
      "action_parameters": {
        "from_value": {
          "target_url": {
            "value": "https://example.com/contact-us/"
          },
          "status_code": 308
        }
      }
    }
  ]
}'
```

<details>
<summary>Example response</summary>
<div>

```json
{
  "result": {
    "id": "528f4f03bf0da53a29907199625867be",
    "name": "Dynamic redirects ruleset",
    "description": "",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "235e557b92fd4e5e8753ee665a9ddd75",
        "version": "1",
        "action": "redirect",
        "action_parameters": {
          "from_value": {
            "target_url": {
              "expression": "lower(concat(\"https://\", ip.geoip.country, \".example.com\"))"
            },
            "status_code": 307,
            "preserve_query_string": true
          }
        },
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and http.request.uri.path eq \"/\"",
        "description": "Redirect GB and FR users in home page to localized site.",
        "last_updated": "2022-10-03T15:38:51.658387Z",
        "ref": "235e557b92fd4e5e8753ee665a9ddd75",
        "enabled": true
      },
      {
        "id": "cfad5efbfcd1440fb5b30cf30f95ece3",
        "version": "1",
        "action": "redirect",
        "action_parameters": {
          "from_value": {
            "target_url": {
              "value": "https://example.com/contact-us/"
            },
            "status_code": 308
          }
        },
        "expression": "http.request.uri.path eq \"/contacts.html\"",
        "description": "Redirect to new contacts page.",
        "last_updated": "2022-10-03T15:38:51.658387Z",
        "ref": "cfad5efbfcd1440fb5b30cf30f95ece3",
        "enabled": true
      }
    ],
    "last_updated": "2022-10-03T15:38:51.658387Z",
    "phase": "http_request_dynamic_redirect"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>
