---
title: HTTP DDoS Attack Protection
pcx_content_type: concept
weight: 3
meta:
  title: HTTP DDoS Attack Protection Managed Ruleset
layout: single
---

# HTTP DDoS Attack Protection Managed Ruleset

The Cloudflare HTTP DDoS Attack Protection Managed Ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](/ddos-protection/about/attack-coverage/) at layer 7 (application layer) on the edge. Cloudflare updates the list of rules in the Managed Ruleset on a regular basis.

The HTTP DDoS Attack Protection Managed Ruleset is always enabled — you can only customize its behavior.

The HTTP DDoS Attack Protection Managed Ruleset provides users with increased observability into L7 DDoS attacks mitigated by Cloudflare, informing users of ongoing or past attacks. The [Security Events dashboard](/waf/security-events/), available at **Security** > **Events**, will display additional information on the types of L7 DDoS attacks detected for a specific zone, including the top HTTP DDoS Managed Rules.

## Ruleset configuration

You can adjust the behavior of the rules in the Managed Ruleset by modifying the following parameters:

* The performed **action** when an attack is detected.
* The **sensitivity level** of attack detection mechanisms.

{{<Aside type="note" header="Notes">}}
* Certain actions or sensitivity levels may not be available to all Cloudflare plans.
* Configuration changes to rules with the `gatebot` tag can take up to five minutes.
* Currently, you can only define account-level configurations (or overrides) via API.
{{</Aside>}}

To adjust rule behavior, do one of the following:

* [Configure HTTP DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/http/configure-dashboard/).
* [Configure HTTP DDoS Attack Protection via API](/ddos-protection/managed-rulesets/http/configure-api/).

For more information on the available configuration parameters, refer to [Managed Ruleset parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

## Availability

The HTTP DDoS Attack Protection Managed Ruleset protects Cloudflare customers on all plans. All customers can customize the ruleset both at the zone level and at the account level.

Customers on Enterprise plans with the Advanced DDoS Protection subscription can create more than one rule with different expressions, to customize the DDoS protection for different incoming requests.

Customers on other plans can create only one rule and they cannot customize the rule expression. In this case, the single rule, containing one or more configurations or overrides, will always apply to all incoming traffic.

## Related Cloudflare products

To block additional L7 attacks you can use other Cloudflare products like the [Cloudflare WAF](/waf/).
