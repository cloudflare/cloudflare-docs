---
order: 1
---

# Rate Limiting Rules

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager if you want to get access.

</Aside>

Rate Limiting Rules allow you to define rate limits for incoming requests matching an expression, as well as actions to take when those rate limits are reached.

## Rule parameters 

Like other rules evaluated by Cloudflare's ruleset engine, Rate Limiting Rules have an associated **expression** and an **action**. 

The **expression** specifies the criteria you are matching traffic on — the same as in [Firewall Rules](/cf-firewall-rules). The **action** specifies what to perform when there is a match for the rule and any additional conditions are met. In the case of Rate Limiting Rules, the action occurs when the request rate reaches the specified limit.

Besides these two parameters, Rate Limiting Rules require the following additional parameters:

* **Characteristics** - The set of parameters that define how Cloudflare tracks the request rate for this rule.
* **Period** - The period of time to consider (in seconds) when evaluating the request rate.
* **Requests per period** - The number of requests over the period of time that will trigger the Rate Limiting Rule.
* **Mitigation timeout** - Once the request rate is reached, the Rate Limiting Rule blocks further requests for the period of time defined in this field.

Check [Rate limiting parameters](/cf-rulesets/custom-rules/rate-limiting/parameters) for more details on these parameters.

See [Determining the request rate](/cf-rulesets/custom-rules/rate-limiting/request-rate) to learn how Cloudflare uses the parameters above when determining the rate of incoming requests.

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

* [Firewall Rules](/cf-firewall-rules), available in the **Firewall Rules** tab
* Rate Limiting Rules (described in this section), available in the **Custom Rules** tab
* Managed Rulesets, available in the **Managed Rules** tab
* Legacy Rate Limiting Rules, available in the **Tools** tab

## Getting started

To configure Rate Limiting Rules using the Cloudflare dashboard, use the **Custom Rules** tab in the **Firewall** app. For more information, see [Manage Rate Limiting Rules in the dashboard](/cf-rulesets/custom-rules/rate-limiting/manage-dashboard).

You can also configure Rate Limiting Rules using the [Rulesets API](/cf-rulesets/rulesets-api). See [Manage Rate Limiting Rules via API](/cf-rulesets/custom-rules/rate-limiting/manage-api) for more information.