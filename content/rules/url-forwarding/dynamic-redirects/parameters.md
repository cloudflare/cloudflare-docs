---
title: API parameter reference
pcx_content_type: reference
weight: 10
meta:
  title: Dynamic Redirects API parameter reference
---

# API parameter reference

Create a static or dynamic URL redirect based on the parameter name provided in the `action_parameters` field:

* Define the `"from_value"` > `"target_url"` > `"value"` parameter to specify a static URL redirect.
* Define the `"from_value"` > `"target_url"` > `"expression"` parameter to specify an expression that defines the dynamic URL redirect to perform.

## Static URL redirect parameters

The full syntax of the `"action_parameters"` field for a Dynamic Redirect Rule with a static value for the destination URL is the following:

```json
 "action_parameters": {
  "from_value": {
    "target_url": {
      "value":"<STATIC_URL_VALUE>"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The only required parameter is `"from_value"` > `"target_url"` > `"value"`. The URL entered in `<STATIC_URL_VALUE>` must be a literal string, which will be used in the `Location` HTTP header returned in the redirect response.

{{<render file="url-forwarding/_optional-parameters.md">}}

## Dynamic URL redirect parameters

The full syntax of the `"action_parameters"` field for a Dynamic Redirect Rule with a dynamic value for the destination URL is the following:

```json
"action_parameters": {
  "from_value": {
    "target_url": {
      "expression": "<DYNAMIC_URL_EXPRESSION>"
    },
    "status_code": <STATUS_CODE>,
    "preserve_query_string": <BOOLEAN_VALUE>
  }
}
```

The only required parameter is `"from_value"` > `"target_url"` > `"expression"`. Enter an expression in `<DYNAMIC_URL_EXPRESSION>` to define a dynamic URL redirect. The result of evaluating this expression will be used in the `Location` HTTP header returned in the redirect response.

{{<render file="url-forwarding/_optional-parameters.md">}}
