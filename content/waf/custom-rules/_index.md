---
pcx-content-type: concept
title: Custom Rules
weight: 4
---

# Custom Rules

Custom Rules allow you to protect your website and your APIs from malicious incoming traffic by filtering requests.

Custom Rules are built upon the [Ruleset Engine](/ruleset-engine/) which you can use to define rules and actions in several Cloudflare products.

{{<Aside type="warning">}}

Custom Rules are only available for select customers on an Enterprise plan. Contact your account team to get access.

{{</Aside>}}

***

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

* [Firewall Rules](/firewall/cf-firewall-rules/), available in **WAF** > **Firewall Rules**
* [Custom Rules](/waf/custom-rules/custom-firewall/), available in **WAF** > **Custom Rules**
* [Rate Limiting Rules](/waf/custom-rules/rate-limiting/), available in **WAF** > **Rate Limiting Rules**
* [Managed Rulesets](/waf/managed-rulesets/), available in **WAF** > **Managed Rules**
* [Rate Limiting Rules](https://support.cloudflare.com/hc/articles/115001635128) (previous version), available in **WAF** > **Rate Limiting Rules**
