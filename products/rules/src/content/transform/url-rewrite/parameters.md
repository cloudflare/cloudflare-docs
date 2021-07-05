---
title: API parameter reference
pcx-content-type: reference
order: 4
---

# URL rewrite API parameter reference

Create a [static or dynamic URL rewrite](/transform/url-rewrite) based on the parameter name provided in the `action_parameters` field:

* Define the `value` parameter to specify a static URL rewrite.
* Define the `expression` parameter to specify the expression that defines the dynamic URL rewrite to perform.

## Static URL rewrite parameters

The full syntax of the `action_parameters` field for a static URL Rewrite Rule that rewrites both the URI path and the query string is the following:

```json
"action_parameters": {
  "uri": {
    "path": { 
      "value": "<URI_PATH_VALUE>"
    }, 
    "query": {
      "value": "<QUERY_STRING_VALUE>"
    }
  }
}
```

If you are only rewriting the URI path or the query string, omit the `query` or `path` parameter, respectively.

## Dynamic URL rewrite parameters

The full syntax of the `action_parameters` field for a dynamic URL Rewrite Rule that rewrites both the URI path and the query string is the following:

```json
"action_parameters": {
  "uri": {
    "path": { 
      "expression": "<URI_PATH_EXPRESSION>"
    }, 
    "query": {
      "expression": "<QUERY_STRING_EXPRESSION>"
    }
  }
}
```

If you are only rewriting the URI path or the query string, omit the `query` or `path` parameter, respectively.

## Different URL rewrite types in the same rule

The same rule can have different types of URL rewrites for the URI path and the query string. For example, a single rule can perform a **dynamic** URL rewrite of the URI path and a **static** URL rewrite of the query string. The syntax of such a rule would be the following:

```json
"action_parameters": {
  "uri": {
    "path": { 
      "expression": "<URI_PATH_EXPRESSION>"
    }, 
    "query": {
      "value": "<QUERY_STRING_VALUE>"
    }
  }
}
```
