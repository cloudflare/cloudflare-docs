---
pcx-content-type: concept
title: Custom Rules
weight: 4
---

# Custom Rules

Custom Rules allow you to protect your website and your APIs from malicious or excessive incoming traffic.

Use Custom Rules in the **Firewall** app to define the following rule types:

*   [**Custom Firewall rules**](/waf/custom-rules/custom-firewall/) — Control incoming traffic by filtering requests. Perform actions like *Block* or *JS Challenge* on incoming requests according to rules you define.

*   [**Rate Limiting rules**](/waf/custom-rules/rate-limiting/) — Check for excessive incoming traffic and apply mitigation actions.

Custom Rules are built upon the [Ruleset Engine](/ruleset-engine/) which you can use to define rules and actions in several Cloudflare products.

{{<Aside type="warning">}}

Custom Rules are only available for selected customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

{{</Aside>}}

***

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

*   [Firewall Rules](/firewall/cf-firewall-rules), available in the **Firewall Rules** tab
*   [Custom Firewall rules](/waf/custom-rules/custom-firewall/), available in the **Custom Rules** tab
*   [Rate Limiting rules](/waf/custom-rules/rate-limiting/), available in the **Custom Rules** tab
*   [Managed Rulesets](/waf/managed-rulesets/), available in the **WAF** tab
*   [Rate Limiting Rules](https://support.cloudflare.com/hc/articles/115001635128) (previous version), available in the **Tools** tab
