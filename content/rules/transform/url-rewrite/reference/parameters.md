---
title: URL rewrite parameters
pcx_content_type: reference
weight: 2
---

# URL rewrite parameters

Static and dynamic URL rewrites have different parameters:

* A static URL rewrite requires a static value for the target URL.
* A dynamic URL rewrite requires an expression that, when evaluated, will define the target URL.

The maximum length of all parameter values in a URL rewrite (combined) is 4,096 characters. For example, you could provide a static value (or an expression) for the URI path with 2,048 characters and a static value (or expression) for the query string with 2,048 characters.

## API information

### Static URL rewrites

The full syntax of the `action_parameters` field for a static rewrite URL rule that rewrites both the URI path and the query string is the following:

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

### Dynamic URL rewrites

The full syntax of the `action_parameters` field for a dynamic rewrite URL rule that rewrites both the URI path and the query string is the following:

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

### Different URL rewrite types in the same rule

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
