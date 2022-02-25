---
title: Available fields and functions
order: 2
pcx-content-type: reference
---

import TransformPhaseFields from "../../../\_partials/transform/\_transform-phase-fields.md"

# Available fields and functions in URL Rewrite Rules

## Filter expressions

A URL Rewrite Rule filter expression (that is, the expression that defines which incoming requests match the rule) can include the following fields:

<TransformPhaseFields/>

For information on the available functions, refer to [Functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions).

## Rewrite expressions

A rewrite expression (that is, the expression that defines the dynamic URL rewrite to perform) can only include the following fields:

*   `http.request.uri.*`
*   `http.request.headers.*`
*   `http.request.accepted_languages`

Refer to [Fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields) for reference information on these fields.

The `concat()` and `regex_replace()` functions can appear only **once** in a rewrite expression. For more information on these functions, refer to [Transformation functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions#transformation-functions).
