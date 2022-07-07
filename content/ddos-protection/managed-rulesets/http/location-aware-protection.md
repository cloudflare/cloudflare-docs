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

Cloudflare maps the source IP address of every request targeting your website to a client country and continent. With this information, Cloudflare updates internal counters for the number of legitimate (non-attack) requests to your zone per client country and client region. These counters are then used to calculate the 95th percentile (P95) requests-per-second rate for every client country and region using the rates from the past seven days. The result of these calculations is a geo-distribution profile for your website, which is updated every 24 hours. Incoming traffic that deviates from your profile may be malicious.

The default action of the managed rule exposing the geo-distribution profile is _Log_. You can use this mode to first observe what traffic is flagged before deciding on a mitigation action.

---

## View flagged traffic

To view traffic flagged by the geo-profiling rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Navigate to **Security** > **Overview**.
3. Filter by `Service equals HTTP DDoS` and `Rule ID equals a8c6333711ff4b0a81371d1c444be2c3`.

## Configure the geo-profiling rule

To configure the geo-profiling rule, refer to the instructions in [Configure one or more rules](/ddos-protection/managed-rulesets/http/configure-dashboard/#configure-one-or-more-rules), searching for the rule with ID `a8c6333711ff4b0a81371d1c444be2c3`.

You can configure the following parameters:

* **Sensitivity**: Adjust the sensitivity level to define how much tolerance you permit for traffic that deviates from your geo-distribution profile. The lower the sensitivity, the higher the tolerance. If you expect traffic from secondary countries and regions, consider changing the sensitivity level from the default level (_High_) to a lower level (_Medium_, _Low_, or _Essentially Off_).

* **Action**: Defines the action to apply to requests that deviate from the geo-distribution profile. The default action of the geo-profiling rule is _Log_, which does not apply any mitigation action. To start applying a mitigation action, update the rule action to _Block_, _Managed Challenge_, or _Legacy CAPTCHA_. Blocked requests will receive a `409` response status code.

For more information on these parameters, refer to [HTTP DDoS Attack Protection parameters](/ddos-protection/managed-rulesets/http/override-parameters/).
