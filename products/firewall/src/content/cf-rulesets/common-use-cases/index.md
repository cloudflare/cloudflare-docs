---
title: Workflow Examples
alwaysopen: true
order: 770
---

# Workflow Examples

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

You cannot edit managed rulesets, but you can add overrides to managed rulesets deployed from the root ruleset. Overrides take precedence over the default behavior of the managed ruleset.

For more information on overriding managed rulesets, see [override a managed ruleset](/cf-rulesets/managed-rulesets/override-managed-ruleset/).

The examples in the topics below use overrides to customize the behavior of managed rulesets.

* [Use a category override to set WordPress rules to Block](/cf-rulesets/common-use-cases/deploy-cmr-wordpress-block/)
* [Use ruleset and category overrides to enable only Joomla rules](/cf-rulesets/common-use-cases/deploy-cmr-joomla-only/)
* [Use ruleset and rule overrides to enable only selected rules](/cf-rulesets/common-use-cases/enable-selected-rules/)
* [Deploy a managed ruleset with ruleset, category, and rule overrides](/cf-rulesets/common-use-cases/override-ruleset-category-rule/)

You can deploy custom rulesets and managed rulesets in a single API request. The example below deploys a custom ruleset and a managed ruleset while preserving an existing rule.

* [Deploy managed rulesets and a custom ruleset](/cf-rulesets/common-use-cases/deploy-custom-managed-use-case/)