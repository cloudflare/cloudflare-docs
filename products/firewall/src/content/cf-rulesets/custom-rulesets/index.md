---
title: Work with custom rulesets
alwaysopen: true
order: 750
---

# Work with custom rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

Also, custom rulesets are currently only supported by the Cloudflare WAF.

</Aside>

Use the following workflow to deploy a custom ruleset at the account level

1. [Create a custom ruleset](/cf-rulesets/custom-rulesets/create-custom-ruleset/).
1. [Add rules to your custom ruleset](/cf-rulesets/custom-rulesets/add-rules-ruleset/).
1. [Add a rule to an account-level Phase to deploy the custom ruleset](/cf-rulesets/custom-rulesets/deploy-custom-ruleset/).

<Aside type='info' header='Info'>

When you modify a ruleset using a PUT request to the `rulesets` API, you replace the entire contents of the rulesets with the request's payload. Include all  existing rules you want to keep in addition to any new rules. If you omit an existing rule from the payload of the PUT request, it will not appear in the new version of the ruleset.

</Aside>

To modify custom ruleset behavior, Cloudflare recommends [creating a new custom ruleset](/cf-rulesets/custom-rulesets/create-custom-ruleset/) or [edit the custom ruleset](/cf-rulesets/custom-rulesets/add-rules-ruleset/) instead of using overrides.

Refer to [Workflow examples](/cf-rulesets/common-use-cases) for examples of deploying custom and managed rules.
