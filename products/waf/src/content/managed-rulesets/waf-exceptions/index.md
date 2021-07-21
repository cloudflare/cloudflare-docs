---
pcx-content-type: concept
order: 24
---

# Defining WAF exceptions

You can define WAF exceptions to skip the execution of WAF Managed Rulesets or some of their rules. The WAF exception configuration defines the skip conditions using an expression, and what should be skipped under those conditions.

WAF exceptions have priority over [overrides](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets/override-managed-ruleset).

You can [define WAF exceptions via API](/managed-rulesets/waf-exceptions/define-api).

---

## Types of WAF exceptions

WAF exceptions can have one of the following behaviors:

* Skip all remaining rules (belonging to WAF Managed Rulesets)
* Skip one or more specific WAF Managed Rulesets
* Skip one or more specific rules of WAF Managed Rulesets

You define WAF exceptions in a given context — zone level or account level — and they apply only to that context. For example, if you define a WAF exception that skips all remaining rules at the account level, the WAF rules at the zone level will still be evaluated.

## WAF exception expressions

Every WAF exception has an expression that defines the criteria for skipping one or more rules of WAF Managed Rulesets. Define the exception expression using the [Firewall Rules language](https://developers.cloudflare.com/firewall/cf-firewall-language).

If there is a match for the expressions of several WAF exceptions, then the following order applies (from highest to lowest priority):

* Exception that skips all remaining rules belonging to WAF Managed Rulesets
* Exception that skips one or more specific WAF Managed Rulesets
* Exception that skips one or more specific rules of WAF Managed Rulesets

All WAF exceptions in a given context (zone or account) must have different expressions.

## Additional notes

If you define a WAF exception that skips all remaining rules, the expressions of those rules are not evaluated.

If you define a WAF exception that skips a rule of a Managed Ruleset, the expression of the rule that executes the Managed Ruleset is evaluated and the Managed Ruleset rules are executed except for that specific rule, which is bypassed.

WAF exceptions are not logged in Firewall Events.
