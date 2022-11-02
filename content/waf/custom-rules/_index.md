---
pcx_content_type: concept
title: Custom rules
weight: 3
---

# Custom rules

Custom rules allow you to control incoming traffic by filtering requests to a zone. You can perform actions like *Block* or *JS Challenge* on incoming requests according to rules you define.

To define sets of custom rules that apply to more than one zone, use [custom rulesets](/waf/custom-rulesets/).

{{<Aside type="note">}}

This feature is only available for select customers on an Enterprise plan. Contact your account team to get access.

{{</Aside>}}

Like other rules evaluated by Cloudflare's [Ruleset Engine](/ruleset-engine/), custom rules have an **expression** and an **action**:

* The **expression** specifies the criteria you are matching traffic on using the [Rules language](/ruleset-engine/rules-language/).
* The **action** specifies what to perform when there is a match for the rule.

---

## Next steps

To create custom rules using the Cloudflare dashboard, refer to [Create custom rules in the dashboard](/waf/custom-rules/create-dashboard/).

You can also create custom rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create custom rules via API](/waf/custom-rules/create-api/) for more information.
