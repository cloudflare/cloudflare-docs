---
title: Use the API
pcx_content_type: how-to
weight: 3
---

# Work with custom rulesets using the API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to work with custom rulesets using an API.

To deploy a custom ruleset to your account, you must follow these general steps:

1. Create a custom ruleset, if it does not exist.
2. Deploy the custom ruleset to your account.

For more information, refer to [Work with custom rulesets](/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

{{<Aside type="warning">}}

You can only deploy custom rulesets that handle incoming traffic of zones on an Enterprise plan. You must include `AND zone.level eq "ENT"` in the expression of the rule deploying the ruleset or else the API operation will fail.

{{</Aside>}}
