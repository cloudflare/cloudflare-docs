---
pcx_content_type: concept
title: Create exceptions
weight: 10
meta:
  title: Create WAF exceptions
---

# Create exceptions

Create an exception to skip the execution of a WAF managed ruleset or some of its rules. The exception configuration includes an expression that defines the skip conditions, and the rules or rulesets to skip under those conditions.

## Types of exceptions

An exception can have one of the following behaviors (from highest to lowest priority):

* Skip all remaining rules (belonging to WAF managed rulesets)
* Skip one or more WAF managed rulesets
* Skip one or more rules of WAF managed rulesets

For more information on exceptions, refer to [Create an exception](/ruleset-engine/managed-rulesets/create-exception/) in the Ruleset Engine documentation.

## Next steps

Add exceptions [in the Cloudflare dashboard](/waf/managed-rules/waf-exceptions/define-dashboard/) or [via API](/waf/managed-rules/waf-exceptions/define-api/).
