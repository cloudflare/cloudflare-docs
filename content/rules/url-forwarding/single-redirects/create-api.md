---
pcx_content_type: how-to
title: Create rule via API
weight: 3
meta:
  title: Create a redirect rule via API
---

# Create a redirect rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a redirect rule via API.

Add redirect rules to the entry point ruleset of the `http_request_dynamic_redirect` phase at the zone level. Refer to the [Rulesets API](/ruleset-engine/rulesets-api/) documentation for more information on [creating a ruleset](/ruleset-engine/rulesets-api/create/) and supplying a list of rules for the ruleset.

{{<render file="url-forwarding/_requires-proxied-site.md" withParameters="Single Redirects">}}

## Basic rule settings

A redirect rule must have:

* `action` set to `redirect`
* An `action_parameters` object with additional configuration settings — refer to [Available settings](/rules/url-forwarding/single-redirects/settings/) for details.

## Example requests

The following request of the [Create a zone ruleset](/api/operations/createZoneRuleset) operation creates a phase entry point ruleset for the `http_request_dynamic_redirect` phase at the zone level, and defines a single redirect rule with a dynamic URL redirect. Use this operation if you have not created a phase entry point ruleset for the `http_request_dynamic_redirect` phase yet.

```bash
---
header: Request
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Redirect rules ruleset",
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

{{<details header="Response">}}

```json
{
  "result": {
    "id": "528f4f03bf0da53a29907199625867be",
    "name": "Redirect rules ruleset",
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

{{</details>}}

If there is already a phase entry point ruleset for the `http_request_dynamic_redirect` phase, use the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation instead, like in the following example:

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Redirect rules ruleset",
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

{{<details header="Response">}}

```json
{
  "result": {
    "id": "528f4f03bf0da53a29907199625867be",
    "name": "Redirect rules ruleset",
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

{{</details>}}

---

## Required API token permissions

The API token used in API requests to manage redirect rules must have at least the following permission:

* _Zone_ > _Dynamic Redirect_ > _Edit_
