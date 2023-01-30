---
title: API JSON objects
pcx_content_type: reference
weight: 7
meta:
  title: Bulk Redirects API JSON objects
---

# Bulk Redirects API JSON objects

## Bulk Redirect Rule

A fully populated Bulk Redirect Rule object has the following JSON structure:

```json
{
  "action": "redirect",
  "expression": "http.request.full_uri in $<LIST_NAME>",
  "action_parameters": {
    "from_list": {
      "name": "<LIST_NAME>",
      "key": "http.request.full_uri"
    }
  }
}
```

The JSON object properties must comply with the following:

- `action` must be `redirect`

- `action_parameters` must contain a `from_list` object with additional settings.

- `from_list` must contain the following properties:

  - `name`: The name of an existing Bulk Redirect List to associate with the current Bulk Redirect Rule.
  - `key`: An expression that defines the value that will be matched against the configured URL redirect’s source URL values, following the rules of the [URL matching algorithm](/rules/url-forwarding/bulk-redirects/how-it-works/#url-matching-algorithm). Refer to [Concepts](/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-rules) for more information.

- `expression` must reference the request field used in the `key` property. Refer to [Concepts](/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-rules) for more information.

## URL redirect list item

A fully populated URL redirect list item object has the following JSON structure:

```json
{
  "id": "7c5dae5552338874e5053f2534d2767a",
  "redirect": {
    "source_url": "https://example.com/blog",
    "target_url": "https://example.com/blog/latest",
    "status_code": 301,
    "include_subdomains": false,
    "subpath_matching": false,
    "preserve_query_string": false,
    "preserve_path_suffix": true
  },
  "created_on": "2021-10-11T12:39:02Z",
  "modified_on": "2021-10-11T12:39:02Z"
}
```

For details on the `redirect` object properties, refer to [URL redirect parameters](/rules/url-forwarding/bulk-redirects/reference/parameters/).
