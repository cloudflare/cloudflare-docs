---
title: HTTP DDoS Attack Protection
pcx_content_type: concept
weight: 3
meta:
  title: HTTP DDoS Attack Protection managed ruleset
---

# HTTP DDoS Attack Protection managed ruleset

The Cloudflare HTTP DDoS Attack Protection managed ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](/ddos-protection/about/attack-coverage/) at layer 7 (application layer) on the Cloudflare global network. The rules match known attack patterns and tools, suspicious patterns, protocol violations, requests causing large amounts of origin errors, excessive traffic hitting the origin/cache, and additional attack vectors at the application layer.

Cloudflare updates the list of rules in the managed ruleset on a regular basis. Refer to the [changelog](/ddos-protection/change-log/http/) for more information on recent and upcoming changes.

The HTTP DDoS Attack Protection managed ruleset is always enabled — you can only customize its behavior.

The HTTP DDoS Attack Protection managed ruleset provides users with increased observability into L7 DDoS attacks mitigated by Cloudflare, informing users of ongoing or past attacks. The [Security Events dashboard](/waf/analytics/security-events/), available at **Security** > **Events**, will display information about the top HTTP DDoS managed rules.

## Ruleset configuration

If you are expecting large spikes of legitimate traffic, consider customizing your DDoS protection settings to avoid [false positives](/ddos-protection/managed-rulesets/adjust-rules/false-positive/), where legitimate traffic is falsely identified as attack traffic and blocked/challenged.

You can adjust the behavior of the rules in the managed ruleset by modifying the following parameters:

* The performed **action** when an attack is detected.
* The **sensitivity level** of attack detection mechanisms.

{{<Aside type="note" header="Notes">}}
* Certain actions or sensitivity levels may not be available to all Cloudflare plans.
* Currently, you can only define account-level configurations (or overrides) for the HTTP DDoS Attack Protection managed ruleset via API.
{{</Aside>}}

To adjust rule behavior, do one of the following:

* [Configure the managed ruleset in the Cloudflare dashboard](/ddos-protection/managed-rulesets/http/configure-dashboard/).
* [Configure the managed ruleset via API](/ddos-protection/managed-rulesets/http/configure-api/).
* [Configure the managed ruleset using Terraform](/terraform/additional-configurations/ddos-managed-rulesets/#example-http).

For more information on the available configuration parameters, refer to [Managed ruleset parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

## Availability

The HTTP DDoS Attack Protection managed ruleset protects Cloudflare customers on all plans for zones [onboarded to Cloudflare](/dns/zone-setups/full-setup/). All customers can customize the ruleset both at the zone level and at the account level.

Customers on Enterprise plans with the Advanced DDoS Protection subscription can create up to 10 overrides (or up to 10 rules, for API users) with custom [expressions](/ddos-protection/managed-rulesets/http/override-expressions/), to customize the DDoS protection for different incoming requests.

Other customers can only create one override (or rule) and they cannot customize the rule expression. In this case, the single override, containing one or more configurations, will always apply to all incoming traffic.

## Related Cloudflare products

To block additional L7 attacks you can use other Cloudflare products like the [Cloudflare WAF](/waf/).
