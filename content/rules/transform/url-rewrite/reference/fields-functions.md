---
title: Available fields and functions
pcx_content_type: reference
weight: 3
meta:
  title: Available fields and functions in rewrite URL rules
---

# Available fields and functions in rewrite URL rules

## Filter expressions

A rewrite URL rule [filter expression](/ruleset-engine/rules-language/expressions/) (that is, the expression that defines which incoming requests match the rule) can include the following fields:

{{<render file="transform/_transform-phase-fields.md">}}

For information on the available functions, refer to [Functions](/ruleset-engine/rules-language/functions/).

## Rewrite expressions

A rewrite expression (that is, the expression that defines the dynamic URL rewrite to perform) can only include the following fields:

- `http.request.uri.*`
- `http.request.headers.*`
- `http.request.accepted_languages`

Refer to [Fields](/ruleset-engine/rules-language/fields/) for reference information on these fields.

The [`concat()`](/ruleset-engine/rules-language/functions/#function-concat) and [`regex_replace()`](/ruleset-engine/rules-language/functions/#function-regex_replace) functions can appear only **once** in a rewrite expression.
