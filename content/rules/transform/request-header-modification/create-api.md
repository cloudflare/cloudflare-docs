---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 3
meta:
  title: Create an HTTP request header modification rule via API
---

# Create an HTTP request header modification rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create HTTP request header modification rules via API. Refer to [Request header modification examples](/rules/transform/request-header-modification/examples/) for common use cases.

## Basic rule settings

When creating an HTTP request header modification rule via API, make sure you:

* Set the rule action to `rewrite`.
* Define the [header modification parameters](/rules/transform/request-header-modification/reference/parameters/) in the `action_parameters` field according to the operation to perform (set or remove header).
* Deploy the rule to the `http_request_late_transform` phase at the zone level.

## Procedure

{{<render file="_rules-creation-workflow.md" withParameters="an HTTP request header modification rule;;http_request_late_transform">}}

Make sure your API token has the [required permissions](#required-api-token-permissions) to perform the API operations.

## Example requests

{{<details header="Example: Add an HTTP request header with a static value">}}

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single HTTP request header modification rule — adding an HTTP request header with a static value — using the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation:

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
      "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
      "description": "My first HTTP request header modification rule",
      "action": "rewrite",
      "action_parameters": {
        "headers": {
          "X-Source": {
            "operation": "set",
            "value": "Cloudflare"
          }
        }
      }
    }
  ]
}'
```

The response contains the complete definition of the ruleset you updated.

```json
---
header: Response
---
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level Late Transform Ruleset",
    "description": "Zone-level ruleset that will execute Late Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "rewrite",
        "action_parameters": {
          "headers": {
            "X-Source": {
              "operation": "set",
              "value": "Cloudflare"
            }
          }
        },
        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
        "description": "My first HTTP request header modification rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_request_late_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

{{<details header="Example: Add an HTTP request header with a dynamic value">}}

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single HTTP request header modification rule — adding an HTTP request header with a dynamic value — using the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation:

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
      "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
      "description": "My first HTTP request header modification rule",
      "action": "rewrite",
      "action_parameters": {
        "headers": {
          "X-Bot-Score": {
            "operation": "set",
            "expression": "to_string(cf.bot_management.score)"
          }
        }
      }
    }
  ]
}'
```

The response contains the complete definition of the ruleset you updated.

```json
---
header: Response
---
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level Late Transform Ruleset",
    "description": "Zone-level ruleset that will execute Late Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "rewrite",
        "action_parameters": {
          "headers": {
            "X-Bot-Score": {
              "operation": "set",
              "expression": "to_string(cf.bot_management.score)"
            }
          }
        },
        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
        "description": "My first HTTP request header modification rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_request_late_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

{{<details header="Example: Remove an HTTP request header">}}

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single HTTP request header modification rule — removing an HTTP request header — using the [Update a zone ruleset](/api/operations/updateZoneRuleset):

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
      "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
      "description": "My first HTTP request header modification rule",
      "action": "rewrite",
      "action_parameters": {
        "headers": {
          "cf-connecting-ip": {
            "operation": "remove"
          }
        }
      }
    }
  ]
}'
```

The response contains the complete definition of the ruleset you updated.

```json
---
header: Response
---
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level Late Transform Ruleset",
    "description": "Zone-level ruleset that will execute Late Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "rewrite",
        "action_parameters": {
          "headers": {
            "cf-connecting-ip": {
              "operation": "remove"
            }
          }
        },
        "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
        "description": "My first HTTP request header modification rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_request_late_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

---

## Required API token permissions

The API token used in API requests to manage HTTP request header modification rules must have at least the following permissions:

* _Transform Rules_ > _Edit_
* _Account Rulesets_ > _Read_
