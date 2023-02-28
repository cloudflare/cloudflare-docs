---
title: API parameter reference
pcx_content_type: reference
weight: 4
meta:
  title: Response header modification API parameter reference
---

# Response header modification API parameter reference

To set an HTTP response header, overwriting any headers with the same name, use the following parameters in the `action_parameters` field:

*   **operation**: `set`
*   Include one of the following parameters to define a static or dynamic value:

    *   **value**: Specifies a static value for the HTTP response header.
    *   **expression**: Specifies the expression that defines a value for the HTTP response header.

To add an HTTP response header, keeping any existing headers with the same name, use the following parameters in the `action_parameters` field:

* **operation**: `add`
* **value**: Specifies a static value for the HTTP response header.

To remove an HTTP response header, set the following parameter in the `action_parameters` field:

*   **operation**: `remove`

## Static header value parameters

The full syntax of the `action_parameters` field to define a static HTTP response header value is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": {
      "operation": "<set|add>",
      "value": "<URI_PATH_VALUE>"
    }
  }
}
```

## Dynamic header value parameters

The full syntax of the `action_parameters` field to define a dynamic HTTP response header value using an expression is the following:

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

{{<Aside type="note">}}

Check the [available fields and functions](/rules/transform/request-header-modification/reference/fields-functions/) you can use in an expression.

{{</Aside>}}

## Header removal parameters

The full syntax of the `action_parameters` field to remove an HTTP response header is the following:

```json
"action_parameters": {
  "headers": {
    "<HEADER_NAME>": {
      "operation": "remove"
    }
  }
}
```

## Different header modifications in the same rule

The same rule can modify different HTTP response headers using different operations. For example, a single rule can set the value of a header and remove a different header. The syntax of such a rule could be the following:

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
