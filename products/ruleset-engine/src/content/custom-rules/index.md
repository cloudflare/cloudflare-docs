---
pcx-content-type: concept
order: 790
---

# Custom Rules (Beta)

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

</Aside>

Custom Rules allow you to protect your website and your APIs from malicious or excessive incoming traffic.

Use Custom Rules in the **Firewall** app to define the following rule types:

* [**Rate Limiting rules**](/cf-rulesets/custom-rules/rate-limiting) — Check for excessive incoming traffic and apply mitigation actions.

* [**Custom Firewall rules**](/cf-rulesets/custom-rules/custom-firewall) — Control incoming traffic by filtering requests. Perform actions like _Block_ or _JS Challenge_ on incoming requests according to rules you define.

Custom Rules are built upon the [Ruleset Engine](/cf-rulesets) which you can use to define rules and actions in several Cloudflare products.

---

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

* [Firewall Rules](/cf-firewall-rules), available in the **Firewall Rules** tab
* [Custom Firewall rules](/cf-rulesets/custom-rules/custom-firewall), available in the **Custom Rules** tab
* [Rate Limiting rules](/cf-rulesets/custom-rules/rate-limiting), available in the **Custom Rules** tab
* [Managed Rulesets](https://developers.cloudflare.com/waf/managed-rulesets), available in the **WAF** tab
* [Legacy Rate Limiting Rules](https://support.cloudflare.com/hc/articles/115001635128), available in the **Tools** tab
