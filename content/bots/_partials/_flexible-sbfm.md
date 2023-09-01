---
_build:
  publishResources: false
  render: never
  list: never
---

In parts of your site where you want bot traffic, you can use the `Skip` action in WAF custom rules to specify where Super Bot Fight Mode should not run.

To enable the `Skip` action in custom rules, refer to the [WAF documentation](/waf/custom-rules/skip/). Skip rules are only available to customers who have [migrated from firewall rules to custom rules](/waf/reference/migration-guides/firewall-rules-to-custom-rules/).

You can use the [Rules language](/ruleset-engine/rules-language/) and its [operators](/ruleset-engine/rules-language/operators/) and [fields](/ruleset-engine/rules-language/fields/) in custom rules to configure a scoped rule for approved automated traffic in Super Bot Fight Mode.
