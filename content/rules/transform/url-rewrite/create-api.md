---
title: Create a rule via API
pcx_content_type: how-to
type: overview
weight: 3
layout: list
meta:
  title: Create a Rewrite URL Rule via API
---

# Create a Rewrite URL Rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create Rewrite URL Rules via API. Define the rewrite configuration in the `action_parameters` field. Refer to [URL rewrite examples](/rules/transform/url-rewrite/examples/) for examples of rule definitions.

When creating a Rewrite URL Rule via API, make sure you:

* Set the rule action to `rewrite`.
* Define the [URL rewrite parameters](/rules/transform/url-rewrite/reference/parameters/#api-information) in the `action_parameters` field according to the type of URL rewrite (static or dynamic).
* Deploy the rule to the `http_request_transform` phase at the zone level.

***

Follow this workflow to create a Rewrite URL Rule for a given zone via API:

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) method to check if there is already a ruleset for the `http_request_transform` phase at the zone level.

2. If the phase ruleset does not exist, create it using the [Create ruleset](/ruleset-engine/rulesets-api/create/) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_request_transform`

3. Use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add a Rewrite URL Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](/ruleset-engine/rulesets-api/create/) request mentioned in the previous step.

## Required API token permissions

The API token used in API requests to manage Rewrite URL Rules must have at least the following permissions:

* _Account_ > _Transform Rules_ > _Edit_
* _Account_ > _Account Rulesets_ > _Read_

## Examples

<details>
<summary>Example: Add a rule that performs a static URL rewrite</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Rewrite URL Rule — performing a static rewrite of the URI path — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

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
      "expression": "(http.request.uri.query contains \"eu\")",
      "description": "My first static Rewrite URL Rule",
      "action": "rewrite",
      "action_parameters": {
        "uri": {
          "path": {
            "value": "/emea.html"
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
    "name": "Zone-level Transform Ruleset",
    "description": "Zone-level ruleset that will execute Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "rewrite",
        "action_parameters": {
          "uri": {
            "path": {
              "value": "/emea.html"
            }
          }
        },
        "expression": "(http.request.uri.query contains \"eu\")",
        "description": "My first static Rewrite URL Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_request_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Add a rule that performs a dynamic URL rewrite</summary>
<div>

The following example sets the rules of an existing phase ruleset (`<RULESET_ID>`) to a single Rewrite URL Rule — performing a dynamic rewrite of the URI path — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) method:

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
      "expression": "starts_with(http.request.uri.path, \"/news/2012/\")",
      "description": "My first dynamic Rewrite URL Rule",
      "action": "rewrite",
      "action_parameters": {
        "uri": {
          "path": {
            "expression": "concat(\"/archive\", http.request.uri.path)"
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
    "name": "Zone-level Transform Ruleset",
    "description": "Zone-level ruleset that will execute Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "rewrite",
        "action_parameters": {
          "uri": {
            "path": {
              "expression": "concat(\"/archive\", http.request.uri.path)"
            }
          }
        },
        "expression": "starts_with(http.request.uri.path, \"/news/2012/\")",
        "description": "My first dynamic Rewrite URL Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "<RULE_REF>"
      }
    ],
    "last_updated": "2021-04-14T14:42:04.219025Z",
    "phase": "http_request_transform"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>
