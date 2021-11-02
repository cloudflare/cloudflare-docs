---
title: Create a rule via API
pcx-content-type: how-to
type: overview
order: 2
---

# Create a URL Rewrite Rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) to create URL Rewrite Rules via API. Define the rewrite configuration in the `action_parameters` field. See [URL rewrite examples](/transform/url-rewrite/examples) for examples of rule definitions.

When creating a URL Rewrite Rule via API, make sure you:

* Set the rule action to `rewrite`
* Define the [URL rewrite parameters](/transform/url-rewrite/parameters) in the `action_parameters` field according to the type of URL rewrite (static or dynamic)
* Deploy the rule to the `http_request_transform` phase at the zone level

---

Follow this workflow to create a URL Rewrite Rule for a given zone via API:

1. Use the [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view#list-existing-rulesets) method to check if there is already a ruleset for the `http_request_transform` phase at the zone level.

1. If the phase ruleset does not exist, create it using the [Create ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_request_transform`

1. Use the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method to add a URL Rewrite Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) request mentioned in the previous step.

### Examples

<details>
<summary>Example: Add a rule that performs a static URL rewrite</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single URL Rewrite Rule — performing a static rewrite of the URI path — using the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method:

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}" \
-d '{
  "rules": [
    {
      "expression": "(http.request.uri.query contains \"eu\")",
      "description": "My first static URL Rewrite Rule",
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
    "id": "{ruleset-id}",
    "name": "Zone-level Transform Ruleset",
    "description": "Zone-level ruleset that will execute Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "{rule-id}",
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
        "description": "My first static URL Rewrite Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "{rule-ref}"
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

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single URL Rewrite Rule — performing a dynamic rewrite of the URI path — using the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method:

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}" \
-d '{
  "rules": [
    {
      "expression": "starts_with(http.request.uri.path, \"/news/2012/\")",
      "description": "My first dynamic URL Rewrite Rule",
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
    "id": "{ruleset-id}",
    "name": "Zone-level Transform Ruleset",
    "description": "Zone-level ruleset that will execute Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "{rule-id}",
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
        "description": "My first dynamic URL Rewrite Rule",
        "last_updated": "2021-04-14T14:42:04.219025Z",
        "ref": "{rule-ref}"
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
