---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 4
meta:
  title: Create a cache rule via API
---

# Create a cache rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create a cache rule via API. To configure Cloudflare’s API refer to the [API documentation](/fundamentals/api/get-started/).

## Basic rule settings

When creating a cache rule via API, make sure you:

* Set the rule action to `set_cache_settings`.
* Define the parameters in the `action_parameters` field according to the [settings](/cache/how-to/cache-rules/settings/) you wish to override for matching requests.
* Deploy the rule to the `http_request_cache_settings` phase entry point ruleset.

## Procedure

1. Use the [List zone rulesets](/api/operations/listZoneRulesets) method to obtain the list of rules already present in the `http_request_cache_settings` phase entry point ruleset.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](/api/operations/createZoneRuleset) operation. In the new ruleset properties, set the following values:
    * kind: `zone`
    * phase: `http_request_cache_settings`
3. Use the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation to add a cache rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](/api/operations/createZoneRuleset) request mentioned in the previous step.
4. (Optional) To update an existing cache rule, use the [Update a zone ruleset rule](/api/operations/updateZoneRulesetRule) operation. For an example, refer to the section below.

## Example requests

These examples are setting all the Cache Rules of a zone to a single rule, since using these examples directly will cause any existing rules to be deleted.

{{<details header="Example: Cache everything for example.com">}}

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "expression": "(http.host eq \"example.com\")",
      "description": "cache everything for example.com",
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true
      }
    }
  ]
}'
```

{{</details>}}

{{<details header="Example: Extend read timeout for Android clients">}}

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "expression": "(http.user_agent contains \"Android\")",
      "description": "extend read timeout for android clients",
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true,
        "read_timeout": 300
      }
    }
  ]
}'
```

{{</details>}}

{{<details header="Example: Disable Cache Reserve for frequently updated assets">}}

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "expression": "(starts_with(http.request.uri, \"/feed/\"))",
      "description": "disable cache reserve for frequently updated assets",
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true,
        "cache_reserve": {
          "enabled": false
        }
      }
    }
  ]
}'
```

{{</details>}}

{{<details header="Example: Turn off default cache TTLs">}}

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "expression": "(http.host eq \"example.com\")",
      "description": "turn off default cache ttls",
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true,
        "edge_ttl": {
          "mode": "bypass_by_default"
        }
      }
    }
  ]
}'
```

{{</details>}}

{{<details header="Example: Update the position of an existing rule">}}

```bash
---
header: Request
---
curl --request PATCH \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
      "expression": "(http.host eq \"example.com\")",
      "description": "cache everything for example.com",
      "action": "set_cache_settings",
      "action_parameters": {
        "cache": true
      }
      "enabled": true,
      "position": {
        "before": "da5e8e506c8e7877fe06cdf4c41add54"
      }
}'
```

{{</details>}}

## Required API token permissions

The API token used in API requests to manage Cache Rules must have the following permissions:

* _Zone_ > _Cache Rules_ > _Edit_
* _Account Rulesets_ > _Edit_
* _Account Filter Lists_ > _Edit_