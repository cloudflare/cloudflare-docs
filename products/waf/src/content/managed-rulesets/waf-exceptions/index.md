---
pcx-content-type: concept
order: 24
---

# Defining WAF exceptions

You can define exceptions for WAF Managed Rulesets or some of their rules. An exception skips the execution of one or more rules or rulesets, according to the exception configuration.

WAF exceptions have priority over [overrides](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets/override-managed-ruleset).

## Types of WAF exceptions

WAF exceptions can have one of the following behaviors:

* Skip all remaining rules (belonging to WAF Managed Rulesets)
* Skip one or more specific WAF Managed Rulesets
* Skip one or more specific rules of WAF Managed Rulesets

Currently, you can only define these exceptions via [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api). For more information, refer to [Define WAF exceptions via API](/managed-rulesets/waf-exceptions/define-api).

## WAF exception expressions

Every WAF exception has an expression that defines the criteria for skipping one or more rules of WAF Managed Rulesets. Define the exception expression using the [Firewall Rules language](https://developers.cloudflare.com/firewall/cf-firewall-language).

If there is a match for the expressions of several WAF exceptions, then the following order applies (from highest to lowest priority):

* Exception that skips all remaining rules belonging to WAF Managed Rulesets
* Exception that skips one or more specific WAF Managed Rulesets
* Exception that skips one or more specific rules of WAF Managed Rulesets

All WAF exceptions in a given context (zone or account) must have different expressions.

## Additional notes

If you define a WAF exception that skips all remaining rules, the expressions of those rules are not evaluated.

If you define a WAF exception that skips a rule of a Managed Ruleset, the defined expression for executing the Managed Ruleset is evaluated and the rules Managed Ruleset are executed, but that specific rule is bypassed.

