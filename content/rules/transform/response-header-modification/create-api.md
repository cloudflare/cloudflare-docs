---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 3
layout: list
meta:
  title: Create an HTTP Response Header Modification Rule via API
---

# Create an HTTP Response Header Modification Rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create HTTP Response Header Modification Rules via API. Define the header modification configuration in the `action_parameters` field. Refer to [Response header modification examples](/rules/transform/response-header-modification/examples/) for examples of rule definitions.

When creating an HTTP Response Header Modification Rule via API, make sure you:

*   Set the rule action to `rewrite`.
*   Define the [header modification parameters](/rules/transform/request-header-modification/reference/parameters/) in the `action_parameters` field according to the operation to perform (set or remove header).
*   Deploy the rule to the `http_response_headers_transform` phase at the zone level.

***

Follow this workflow to create an HTTP Response Header Modification Rule for a given zone via API:

1.  Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) method to check if there is already a ruleset for the `http_response_headers_transform` phase at the zone level.

2.  If the phase ruleset does not exist, create it using the [Create ruleset](/ruleset-engine/rulesets-api/create/) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_response_headers_transform`

3.  Use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add an HTTP Response Header Modification Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](/ruleset-engine/rulesets-api/create/) request mentioned in the previous step.

## Required API token permissions

The API token used in API requests to manage HTTP Response Header Modification Rules must have at least the following permissions:

* Transform Rules: Edit
* Account Rulesets: Read

## Examples

<details>
<summary>Example: Add an HTTP response header with a static value</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single HTTP Response Header Modification Rule — adding an HTTP response header with a static value — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
      "description": "My first HTTP Response Header Modification Rule",
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
    "name": "Zone-level Response Headers Transform Ruleset",
    "description": "Zone-level ruleset that will execute Response Header Modification Rules.",
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
        "description": "My first HTTP Response Header Modification Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_response_headers_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Add an HTTP response header with a dynamic value</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single HTTP Response Header Modification Rule — adding an HTTP response header with a dynamic value — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
      "description": "My first HTTP Response Header Modification Rule",
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
    "name": "Zone-level Response Headers Transform Ruleset",
    "description": "Zone-level ruleset that will execute Response Header Modification Rules.",
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
        "description": "My first HTTP Response Header Modification Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_response_headers_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Remove an HTTP response header</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single HTTP Response Header Modification Rule — removing an HTTP response header — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "expression": "(starts_with(http.request.uri.path, \"/en/\"))",
      "description": "My first HTTP Response Header Modification Rule",
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
    "name": "Zone-level Response Headers Transform Ruleset",
    "description": "Zone-level ruleset that will execute Response Header Modification Rules.",
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
        "description": "My first HTTP Response Header Modification Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_response_headers_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>
