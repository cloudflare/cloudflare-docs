---
title: Work with custom rulesets
alwaysopen: true
order: 750
---

# Work with custom rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use the following workflow to deploy a custom ruleset.

* [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not have one.
* [Create a custom ruleset](/cf-rulesets/custom-rulesets/create-custom-ruleset/).
* [Add rules to your custom ruleset](/cf-rulesets/custom-rulesets/add-rules-ruleset/).
* [Add a rule to the root ruleset to deploy the custom ruleset](/cf-rulesets/custom-rulesets/deploy-custom-ruleset/).

<Aside type='info' header='Info'>

When you modify a ruleset using a PUT request to the `rulesets` API, you replace the entire contents of the rulesets with the request's payload. Include all  existing rules you want to keep in addition to any new rules. If you omit an existing rule from the payload of the PUT request, it will not appear in the new version of the ruleset.

</Aside>

You can modify the behavior of deployed managed rulesets by adding [overrides](/cf-rulesets/managed-rulesets/override-managed-ruleset/) to the rules in the root ruleset that deploys them.

To modify custom ruleset behavior, Cloudflare recommends [creating a new custom ruleset](/cf-rulesets/custom-rulesets/create-custom-ruleset/) or [editing](/cf-rulesets/custom-rulesets/add-rules-ruleset/) the current custom ruleset instead of using overrides.

Refer to [workflow examples](/cf-rulesets/common-use-cases) for examples of deploying custom and managed rules.