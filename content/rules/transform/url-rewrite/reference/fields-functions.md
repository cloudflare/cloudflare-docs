---
title: Available fields and functions
pcx-content-type: reference
weight: 3
meta:
  title: Available fields and functions in URL Rewrite Rules
---

# Available fields and functions in URL Rewrite Rules

## Filter expressions

A URL Rewrite Rule filter expression (that is, the expression that defines which incoming requests match the rule) can include the following fields:

{{<render file="transform/_transform-phase-fields.md">}}

For information on the available functions, refer to [Functions](/ruleset-engine/rules-language/functions).

## Rewrite expressions

A rewrite expression (that is, the expression that defines the dynamic URL rewrite to perform) can only include the following fields:

*   `http.request.uri.*`
*   `http.request.headers.*`
*   `http.request.accepted_languages`

Refer to [Fields](/ruleset-engine/rules-language/fields) for reference information on these fields.

The `concat()` and `regex_replace()` functions can appear only **once** in a rewrite expression. For more information on these functions, refer to [Transformation functions](/ruleset-engine/rules-language/functions#transformation-functions).
