---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 3
layout: list
meta:
  title: Create an HTTP Request Header Modification Rule via API
---

# Create an HTTP Request Header Modification Rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create HTTP Request Header Modification Rules via API. Define the header modification configuration in the `action_parameters` field. Refer to [Request header modification examples](/rules/transform/request-header-modification/examples/) for examples of rule definitions.

When creating an HTTP Request Header Modification Rule via API, make sure you:

*   Set the rule action to `rewrite`.
*   Define the [header modification parameters](/rules/transform/request-header-modification/reference/parameters/) in the `action_parameters` field according to the operation to perform (set or remove header).
*   Deploy the rule to the `http_request_late_transform` phase at the zone level.

***

{{<render file="_rules-creation-workflow.md" withParameters="an HTTP Request Header Modification Rule;;http_request_late_transform">}}

## Required API token permissions

The API token used in API requests to manage HTTP Request Header Modification Rules must have at least the following permissions:

*   Transform Rules: Edit
*   Account Rulesets: Read

## Examples

<details>
<summary>Example: Add an HTTP request header with a static value</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single HTTP Request Header Modification Rule — adding an HTTP request header with a static value — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation:

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
      "description": "My first HTTP Request Header Modification Rule",
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
        "description": "My first HTTP Request Header Modification Rule",
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

<details>
<summary>Example: Add an HTTP request header with a dynamic value</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single HTTP Request Header Modification Rule — adding an HTTP request header with a dynamic value — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation:

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
      "description": "My first HTTP Request Header Modification Rule",
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
        "description": "My first HTTP Request Header Modification Rule",
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

<details>
<summary>Example: Remove an HTTP request header</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single HTTP Request Header Modification Rule — removing an HTTP request header — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation:

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
      "description": "My first HTTP Request Header Modification Rule",
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
        "description": "My first HTTP Request Header Modification Rule",
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
