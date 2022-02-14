---
pcx-content-type: concept
order: 6
---

# Defining WAF exceptions

Define WAF exceptions to skip the execution of WAF Managed Rulesets or some of their rules. The WAF exception configuration includes an expression that defines the skip conditions, and the rules or rulesets to skip under those conditions.

You can [define WAF exceptions in the Cloudflare dashboard](/managed-rulesets/waf-exceptions/define-dashboard) or [using the Rulesets API](/managed-rulesets/waf-exceptions/define-api).

---

## Types of WAF exceptions

WAF exceptions can have one of the following behaviors (from highest to lowest priority):

* Skip all remaining rules (belonging to WAF Managed Rulesets).
* Skip one or more specific WAF Managed Rulesets.
* Skip one or more specific rules of WAF Managed Rulesets.

You define WAF exceptions in a given context — zone level or account level — and they apply only to that context. For example, if you define a WAF exception that skips all remaining rules at the account level, the WAF rules at the zone level will still be evaluated.

Define the exception expression using the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language). If there is a match for the expressions of several WAF exceptions, the WAF will consider the exception with the highest priority.

## Additional notes

WAF exceptions only apply to rules executing a Managed Ruleset listed after them. If you add a WAF exception at the end of the WAF rules list, nothing will be skipped.

WAF exceptions have priority over [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset).

If you define a WAF exception that skips all remaining rules, the expressions of those rules are not evaluated.

If you define a WAF exception that skips a rule of a Managed Ruleset, the expression of the rule that executes the Managed Ruleset is evaluated and the Managed Ruleset rules are executed except for that specific rule, which is bypassed.

Currently, WAF exceptions are not logged in Firewall Events.
