---
title: API parameter reference
pcx-content-type: reference
order: 3
---

# Request header modification API parameter reference

To set an HTTP request header, set the following parameters in the `action_parameters` field:

* **operation**: `set`
* Include one of the following parameters to define a static or dynamic value:

    * **value**: Specifies a static value for the HTTP request header.
    * **expression**: Specifies the expression that defines a value for the HTTP request header.

To remove an HTTP request header, set the following parameter in the `action_parameters` field:

* **operation**: `remove`

## Static header value parameters

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

## Dynamic header value parameters

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

Check the [available fields and functions](/transform/request-header-modification/reference/fields-functions) you can use in an expression.

</Aside>

## Header removal parameters

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

## Different header modifications in the same rule

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
