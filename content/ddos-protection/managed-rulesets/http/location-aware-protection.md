---
title: Location-Aware DDoS Protection
pcx-content-type: concept
weight: 4
---

# Location-Aware DDoS Protection

Location-Aware DDoS Protection can detect and mitigate traffic that deviates from your site's geo-distribution profile, which Cloudflare builds from legitimate traffic and keeps updating over time.

The geo-distribution profile is exposed as a rule in the HTTP DDoS Attack Protection Managed Ruleset that you can configure.

{{<Aside type="note">}}
This feature is only available to Enterprise customers subscribed to the Advanced DDoS Protection service.
{{</Aside>}}

## How it works

Cloudflare maps the source IP address of every request targeting your website to a client country and continent. With this information, Cloudflare updates internal counters for the number of legitimate (non-attack) requests to your zone per client country and client region. These counters are then used to calculate the 95th percentile (P95) requests-per-second rate for every client country and region using the rates from the past seven days.

Location-Aware DDoS Protection also takes into account Cloudflare’s [Machine Learning (ML) models](/bots/concepts/bot-score/#machine-learning) to identify traffic that is likely automated.

Using these sources of information, Cloudflare builds a geo-distribution profile for your website, which is updated every 24 hours. Incoming traffic that deviates from your profile may be malicious.

Cloudflare may change the rule logic from time to time to improve it. Any rule changes will appear in the [HTTP DDoS Protection Managed Ruleset changelog](/ddos-protection/change-log/http/).

---

## View flagged traffic

To view traffic flagged by the geo-profiling rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Navigate to **Security** > **Overview**.
3. Filter by `Service equals HTTP DDoS` and `Rule ID equals a8c6333711ff4b0a81371d1c444be2c3`.

## Configure the geo-profiling rule

You can adjust the action and sensitivity of the geo-profiling rule. The default action is _Log_. You can use this action to first observe what traffic is flagged before deciding on a mitigation action.

To configure the geo-profiling rule, refer to the instructions in [Configure one or more rules](/ddos-protection/managed-rulesets/http/configure-dashboard/#configure-one-or-more-rules), searching for the following rule:

* Rule ID: `a8c6333711ff4b0a81371d1c444be2c3`
* Description: `Location-Aware DDoS Protection (Available only to Enterprise zones with Advanced DDoS service).`

For more information on the available configuration parameters, refer to [HTTP DDoS Attack Protection parameters](/ddos-protection/managed-rulesets/http/override-parameters/).
