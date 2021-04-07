---
order: 790
---

# Custom Rules - Beta

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

</Aside>

Custom Rules allow you to protect your website and your APIs from malicious or excessive incoming traffic.

You can use Custom Rules in the **Firewall** app to define the following rule types:

* [**Rate Limiting Rules**](/cf-rulesets/custom-rules/rate-limiting) - Check for excessive incoming traffic and apply mitigation actions.

* **Custom Firewall rules** - Control incoming traffic by filtering requests. You can block or challenge incoming requests according to rules you define.

<Aside type='warning' header='Important'>

Currently, you can only create and manage Custom Firewall rules using the API. They are not displayed in the **Custom Rules** tab.

</Aside>

Custom Rules are built upon the ruleset engine which you can use to define rules and actions in several Cloudflare products. Custom Rules are deployed to the `http_request_firewall_custom` Phase ruleset.