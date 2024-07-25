---
title: Use the API
pcx_content_type: how-to
weight: 3
meta:
  title: Work with custom rulesets using the API
---

# Work with custom rulesets using the API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to work with custom rulesets using an API.

{{<Aside type="note">}}
Account-level WAF configuration requires an Enterprise plan with a paid add-on.
{{</Aside>}}

To deploy a custom ruleset in your account, follow these general steps:

1. Create a custom ruleset, if it does not exist.
2. Deploy the custom ruleset to your account.

For more information, refer to [Work with custom rulesets](/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

{{<Aside type="warning" header="Important">}}

* Deployed custom rulesets will only apply to incoming traffic of Enterprise domains. Regarding the expression of the rule deploying the custom ruleset, you must use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` or else the API operation will fail.

* Currently, you can only deploy custom rulesets to a phase at the account level.

{{</Aside>}}
