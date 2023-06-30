---
pcx_content_type: concept
title: Custom rules
weight: 3
layout: single
---

# Custom rules

Custom rules allow you to control incoming traffic by filtering requests to a zone. You can perform actions like *Block* or *Managed Challenge* on incoming requests according to rules you define.

Like other rules evaluated by Cloudflare's [Ruleset Engine](/ruleset-engine/), custom rules have the following basic parameters:

* An [expression](/ruleset-engine/rules-language/expressions/) that specifies the criteria you are matching traffic on using the [Rules language](/ruleset-engine/rules-language/).
* An [action](/ruleset-engine/rules-language/actions/) that specifies what to perform when there is a match for the rule.

Custom rules are evaluated in order, and some actions like _Block_ will stop the evaluation of other rules. For more details on actions and their behavior, refer to the [actions reference](/ruleset-engine/rules-language/actions/).

{{<Aside type="note" header="Are you migrating from Cloudflare Firewall Rules?">}}
Refer to the [migration guide](/waf/reference/migration-guides/firewall-rules-to-custom-rules/#main-differences) to learn more about the differences between firewall rules and custom rules.
{{</Aside>}}

To define sets of custom rules that apply to more than one zone, use [custom rulesets](/waf/custom-rulesets/), which require an Enterprise plan with a paid add-on.

---

## Next steps

To create custom rules using the Cloudflare dashboard, refer to [Create custom rules in the dashboard](/waf/custom-rules/create-dashboard/).

You can also create custom rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create custom rules via API](/waf/custom-rules/create-api/) for more information.
