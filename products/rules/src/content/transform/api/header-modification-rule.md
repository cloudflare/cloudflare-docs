---
title: Create a Request Header Modification Rule
order: 2
---

# Create an HTTP Request Header Modification Rule via API

<Aside type="note">

This feature is available in Beta.

</Aside>

Use the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api) to create HTTP Request Header Modification Rules via API. Define the header modification configuration in the `action_parameters` field. See [Common use cases](/transform/use-cases#http-request-header-modification-examples) for example rule definitions.

When creating an HTTP Request Header Modification Rule via API, make sure you:

* Set the rule action to `rewrite`
* Define the [header modification parameters](#header-modification-parameters) in the `action_parameters` field according to the operation to perform (set or remove header)
* Deploy the rule to the `http_request_late_transform` phase at the zone level

## Create an HTTP Request Header Modification Rule

Follow this workflow to create an HTTP Request Header Modification Rule for a given zone via API:

1. Use the [List existing rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/view#list-existing-rulesets) method to check if there is already a ruleset for the `http_request_late_transform` phase at the zone level.

1. If the phase ruleset does not exist, create it using the [Create ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/create) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_request_late_transform`

1. Use the [Update ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/update) method to add an HTTP Request Header Modification Rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/create) request mentioned in the previous step.

### Examples

<details>
<summary>Example: Add an HTTP request header with a static value</summary>
<div>

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single HTTP Request Header Modification Rule — adding an HTTP request header with a static value — using the [Update ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/update) method:

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

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single HTTP Request Header Modification Rule — adding an HTTP request header with a dynamic value — using the [Update ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/update) method:

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
          "X-Path": {
            "operation": "set",
            "expression": "http.request.uri.path"
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
            "X-Path": {
              "operation": "set",
              "expression": "http.request.uri.path"
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

The following example sets the rules of an existing phase ruleset (`{ruleset-id}`) to a single HTTP Request Header Modification Rule — removing an HTTP request header — using the [Update ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/update) method:

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

---

## Header modification parameters

To set an HTTP request header, set the following parameters in the `action_parameters` field:

* **operation**: `set`
* Include one of the following parameters to define a static or dynamic value:
    * **value**: Specifies a static value for the HTTP request header.
    * **expression**: Specifies the expression that defines a value for the HTTP request header.

To remove an HTTP request header, set the following parameter in the `action_parameters` field:

* **operation**: `remove`

### Static header value parameters

The full syntax of the `action_parameters` field to define a static HTTP request header value is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": {
      "operation": "set",
      "value": "<URI_PATH_VALUE>"
    }
  }
}
```

### Dynamic header value parameters

The full syntax of the `action_parameters` field to define a dynamic HTTP request header value using an expression is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": { 
      "operation": "set",
      "expression": "<EXPRESSION>"
    }
  }
}
```

<Aside type='note'>

Check the [available fields and functions](/transform/create-header-modification-rule#available-fields-and-functions-for-setting-http-request-header-values) you can use in an expression during Beta.

</Aside>

### Header removal parameters

The full syntax of the `action_parameters` field to remove an HTTP request header is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": { 
      "operation": "remove"
    }
  }
}
```

### Different header modifications in the same rule

The same rule can modify different HTTP request headers using different operations (set or remove a header). For example, a single rule can set the value of a header and remove a different header. The syntax of such a rule could be the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME_1>": { 
      "operation": "set",
      "value": "<HEADER_VALUE_1>"
    }, 
    "<HEADER_NAME_2>": {
      "operation": "remove"
    }
  }
}
```
