---
pcx-content-type: concept
order: 2
---

# Custom Firewall rules

Custom Firewall rules allow you to control incoming traffic by filtering requests. You can perform actions like _Block_ or _JS Challenge_ on incoming requests according to rules you define.

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager if you want to get access.

</Aside>

Like other rules evaluated by Cloudflare's [Ruleset Engine](/cf-rulesets), Custom Firewall rules have an **expression** and an **action**:

* The **expression** specifies the criteria you are matching traffic on — the same as in [Firewall Rules](/cf-firewall-rules).
* The **action** specifies what to perform when there is a match for the rule.

---

## Getting started

To create Custom Firewall rules using the Cloudflare dashboard, see [Create Custom Firewall rules in the dashboard](/cf-rulesets/custom-rules/custom-firewall/create-dashboard).

You can also create Custom Firewall rules using the [Rulesets API](/cf-rulesets/rulesets-api). See [Create Custom Firewall rules via API](/cf-rulesets/custom-rules/custom-firewall/create-api) for more information.
