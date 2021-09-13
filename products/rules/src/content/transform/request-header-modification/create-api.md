---
title: Create a rule via API
pcx-content-type: how-to
type: overview
order: 2
---

# Create an HTTP Request Header Modification Rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) to create HTTP Request Header Modification Rules via API. Define the header modification configuration in the `action_parameters` field. See [Request header modification examples](/transform/request-header-modification/examples) for examples of rule definitions.

When creating an HTTP Request Header Modification Rule via API, make sure you:

* Set the rule action to `rewrite`
* Define the [header modification parameters](/transform/request-header-modification/reference/parameters) in the `action_parameters` field according to the operation to perform (set or remove header)
* Deploy the rule to the `http_request_late_transform` phase at the zone level

---

Follow this workflow to create an HTTP Request Header Modification Rule for a given zone via API:

1. Use the [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view#list-existing-rulesets) method to check if there is already a ruleset for the `http_request_late_transform` phase at the zone level.

1. If the phase ruleset does not exist, create it using the [Create ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_request_late_transform`

1. Use the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method to add an HTTP Request Header Modification Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create) request mentioned in the previous step.

### Examples

<details>
<summary>Example: Add an HTTP request header with a static value</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single HTTP Request Header Modification Rule — adding an HTTP request header with a static value — using the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method:

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
    "id": "{ruleset-id}",
    "name": "Zone-level Late Transform Ruleset",
    "description": "Zone-level ruleset that will execute Late Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "{rule-id}",
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
        "ref": "{rule-ref}"
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

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single HTTP Request Header Modification Rule — adding an HTTP request header with a dynamic value — using the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method:

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
    "id": "{ruleset-id}",
    "name": "Zone-level Late Transform Ruleset",
    "description": "Zone-level ruleset that will execute Late Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "{rule-id}",
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
        "ref": "{rule-ref}"
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

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single HTTP Request Header Modification Rule — removing an HTTP request header — using the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method:

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
    "id": "{ruleset-id}",
    "name": "Zone-level Late Transform Ruleset",
    "description": "Zone-level ruleset that will execute Late Transform Rules.",
    "kind": "zone",
    "version": "2",
    "rules": [
      {
        "id": "{rule-id}",
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
        "ref": "{rule-ref}"
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
