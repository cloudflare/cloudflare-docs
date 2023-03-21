---
title: Adaptive DDoS Protection
pcx_content_type: concept
weight: 5
---

# Adaptive DDoS Protection

Adaptive DDoS Protection learns your unique traffic patterns and adapts to them to provide better protection against sophisticated DDoS attacks on layer 7 and layers 3/4, depending on your subscribed Cloudflare services.

Adaptive DDoS Protection provides the following types of protection:

* **Origin-aware DDoS Protection**: Detects and mitigates traffic that deviates from your site's origin errors profile.
* **User-agent-aware DDoS Protection**: Detects and mitigates traffic that deviates from the top User Agents seen by Cloudflare on the network. The User Agent profile is built from the entire Cloudflare network and not just from the customer's zone.
* **Location-aware DDoS Protection**: Detects and mitigates traffic that deviates from your site’s geo-distribution profile. The profile is calculated from the rate for every client country and region, using the rates from the past seven days.
* **Protocol-aware DDoS Protection**: Detects and mitigates traffic that deviates from your traffic’s IP protocol profile. The profile is calculated as a global rate for each of your prefixes.

## Availability

Cloudflare Adaptive DDoS Protection is available to Enterprise customers according to the following table:

{{<table-wrap>}}

Feature | Profiling dimension  | WAF/CDN<sup>1</sup> | Magic Transit /<br/>Spectrum BYOIP<sup>2</sup>
--------|----------------------|:--------------------:|:------------------------------------------:
**HTTP Adaptive DDoS Protection** |                           |     |
Origin-aware     | Origin errors                              | Yes | —
User-agent-aware | User Agent<br/>(entire Cloudflare network) | Yes | —
Location-aware   | Client IP country and region               | Yes | —
**L3/4 Adaptive DDoS Protection** |                           |     |
Protocol-aware   | IP protocol                                | —   | Yes

{{</table-wrap>}}

<sup>1</sup> _WAF/CDN customers on the Enterprise plan with the Advanced DDoS Protection subscription._<br/>
<sup>2</sup> _Magic Transit and Spectrum BYOIP customers on an Enterprise plan._

## How it works

Adaptive DDoS Protection creates a traffic profile by looking at the maximum rates of traffic every day, for the past seven days. These profiles are recalculated every day, keeping the seven-day time window. Adaptive DDoS Protection stores the maximal traffic rates seen for every predefined dimension value (the profiling dimension varies for each rule). Every profile uses one dimension, such as the source country of the request, the user agent, and the IP protocol. Incoming traffic that deviates from your profile may be malicious.

To eliminate outliers, rate calculations only consider the 95th percentile rates (discarding the top 5% of the highest rates). Additionally, Adaptive DDoS Protection rules also take into account Cloudflare’s [Machine Learning (ML) models](/bots/concepts/bot-score/#machine-learning) to identify traffic that is likely automated.

Cloudflare may change the logic of these protection rules from time to time to improve them. Any rule changes will appear in the [Managed rulesets changelog](/ddos-protection/change-log/) page.

---

## View flagged traffic

To view traffic flagged by HTTP Adaptive DDoS Protection rules:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Security** > **Events**.
3. Filter by `Service equals HTTP DDoS` and by the rule ID.

For L3/4 Adaptive DDoS Protection rules, currently you must use [Logpush](/logs/about/) or the [GraphQL API](/analytics/graphql-api/) to view the flagged traffic.

## Configure the rules

You can adjust the action and sensitivity of the Adaptive DDoS Protection rules. The default action is _Log_. Use this action to first observe what traffic is flagged before deciding on a mitigation action.

To configure a rule, refer to the instructions in the following pages:

* [Configure HTTP DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/http/configure-dashboard/) (for L7 rules)
* [Configure Network-layer DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/network/configure-dashboard/#override-one-or-more-rules) (for L3/4 rules)

For more information on the available configuration parameters, refer to the following pages:

* For the Origin-aware, User-agent-aware, and Location-aware (L7) DDoS Protection rules:
    * [HTTP DDoS Attack Protection parameters](/ddos-protection/managed-rulesets/http/override-parameters/)
* For the Protocol-aware DDoS Protection rule:
    * [Network-layer DDoS Attack Protection parameters](/ddos-protection/managed-rulesets/network/override-parameters/)
