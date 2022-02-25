---
title: Work with custom rulesets
pcx-content-type: navigation
alwaysopen: true
weight: 761
---

# Work with custom rulesets

{{<Aside type="warning" header="Important">}}

Custom rulesets are currently only supported by the Cloudflare WAF.

{{</Aside>}}

Use the following workflow to deploy a custom ruleset at the account level:

1.  [Create a custom ruleset](/ruleset-engine/custom-rulesets/create-custom-ruleset/).
2.  [Add rules to your custom ruleset](/ruleset-engine/custom-rulesets/add-rules-ruleset/).
3.  [Add a rule to an account-level phase entry point ruleset that executes the custom ruleset](/ruleset-engine/custom-rulesets/deploy-custom-ruleset/).

{{<Aside type="warning">}}

You must create a rule with `execute` action in an entry point ruleset to execute the custom ruleset (step 3 in the previous procedure). If you skip this step, the rules of the custom ruleset will not run.

{{</Aside>}}

To modify custom ruleset behavior, Cloudflare recommends [creating a new custom ruleset](/ruleset-engine/custom-rulesets/create-custom-ruleset/) or [editing the custom ruleset](/ruleset-engine/custom-rulesets/add-rules-ruleset/) instead of using overrides.
