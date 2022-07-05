---
title: Location-aware protection
pcx-content-type: concept
weight: 4
meta:
  title: Location-Aware DDoS Protection
---

# Location-Aware DDoS Protection

Location-Aware DDoS Protection can detect and mitigate traffic that deviates from your site's geo-distribution profile, which Cloudflare builds from legitimate traffic and updates over time.

The geo-distribution profile is exposed as a rule in the [HTTP DDoS Attack Protection Managed Ruleset](/ddos-protection/managed-rulesets/http/) that you can configure.

{{<Aside type="note">}}
This feature is only available to Enterprise customers subscribed to the Advanced DDoS Protection service.
{{</Aside>}}

## How it works

Cloudflare maps the source IP address of every request targeting your website to a client country and continent. With this information, Cloudflare updates internal counters for the number of legitimate (non-attack) requests to your zone per client country and client region. These counters are then used to calculate the 95th percentile (P95) requests-per-second rate for every client country and region using the rates from the past seven days. The result of these calculations is a geo-distribution profile for your website, which is updated every 24 hours. Incoming traffic that deviates from your profile may be malicious.

The default action of the rule exposing the geo-distribution profile is _Log_. This means that Cloudflare will not mitigate any traffic unless the traffic rates are high and present a risk to the Cloudflare network. You can use this mode to first observe what traffic is flagged before deciding on an action.

To view traffic flagged by the geo-profiling rule, navigate to **Security** > **Overview** in the Cloudflare dashboard and filter by _Service = HTTP DDoS_ and _Rule ID = XXXXXX_.

## Available parameters

You can configure the following parameters of the geo-profiling rule:

* **Sensitivity Level**: Adjust the sensitivity level to define how much tolerance you permit for traffic that deviates from your geo-distribution profile. The lower the sensitivity, the higher the tolerance. If you expect traffic from secondary countries and regions, consider changing the sensitivity level from the default (_High_) to a lower level (_Medium_, _Low_, or _Essentially Off_).

* **Action**: Defines the action to apply to requests that deviate from the geo-distribution profile. The default action of the geo-profiling rule is _Log_, which does not apply any mitigation action. To start applying a mitigation action, update the rule action to _Block_, _Managed Challenge_, or _Legacy CAPTCHA_. Blocked requests will receive a `409` response status code.

For more information on these parameters, refer to [HTTP DDoS Attack Protection parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

## Configuring the geo-profiling rule

To configure the geo-profiling rule, refer to the instructions in [Configure one or more rules](/ddos-protection/managed-rulesets/http/configure-dashboard/#configure-one-or-more-rules), searching for the **XXXXX** rule.

To enable a mitigation action, select one of the following actions: _Block_, _Managed Challenge_, or _Legacy CAPTCHA_.