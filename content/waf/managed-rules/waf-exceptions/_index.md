---
pcx_content_type: concept
title: Create exceptions
weight: 10
meta:
  title: Create managed rules exceptions
---

# Create exceptions

Create a managed rules exception to skip the execution of a WAF managed ruleset or some of its rules. The exception configuration includes an expression that defines the skip conditions, and the rules or rulesets to skip under those conditions.

You can [add exceptions in the Cloudflare dashboard](/waf/managed-rules/waf-exceptions/define-dashboard/) or [via API](/waf/managed-rules/waf-exceptions/define-api/).

***

## Types of exceptions

An exception can have one of the following behaviors (from highest to lowest priority):

*   Skip all remaining rules (belonging to WAF managed rulesets).
*   Skip one or more WAF managed rulesets.
*   Skip one or more rules of WAF managed rulesets.

You define exceptions in a given context — zone level or account level — and they apply only to that context. For example, if you define an exception that skips all remaining rules at the account level, the WAF rules at the zone level will still be evaluated.

Define the exception expression using the [Rules language](/ruleset-engine/rules-language/). If there is a match for the expressions of several exceptions, the WAF will consider the exception with the highest priority.

## Additional notes

Exceptions only apply to rules executing a managed ruleset listed after them. If you add an exception at the end of the WAF rules list, nothing will be skipped.

Exceptions have priority over [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/).

If you define an exception that skips all remaining rules, the expressions of those rules are not evaluated.

If you define an exception that skips a rule of a managed ruleset, the expression of the rule that executes the managed ruleset is evaluated and the managed ruleset rules are executed except for that specific rule, which is bypassed.
