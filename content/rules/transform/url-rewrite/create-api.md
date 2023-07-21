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

{{<render file="_rules-creation-workflow.md" withParameters="a rewrite URL rule;;http_request_transform">}}

## Required API token permissions

The API token used in API requests to manage Rewrite URL Rules must have at least the following permissions:

* _Account_ > _Transform Rules_ > _Edit_
* _Account_ > _Account Rulesets_ > _Read_

## Examples

<details>
<summary>Example: Add a rule that performs a static URL rewrite</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single Rewrite URL Rule — performing a static rewrite of the URI path — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation:

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

The following example sets the rules of an existing phase ruleset (`{ruleset_id}`) to a single Rewrite URL Rule — performing a dynamic rewrite of the URI path — using the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation:

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
