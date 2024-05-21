---
title: Advanced DNS Protection (beta)
pcx_content_type: concept
weight: 7
---

{{<heading-pill style="beta">}} Cloudflare Advanced DNS Protection {{</heading-pill>}}

Cloudflare Advanced DNS Protection {{<inline-pill style="beta">}}, powered by [`flowtrackd`](https://blog.cloudflare.com/announcing-flowtrackd/), provides stateful protection against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as [random prefix attacks](/dns/dns-firewall/random-prefix-attacks/about/).

## How it works

Cloudflare's Advanced DNS Protection works by first learning your traffic patterns and forming a baseline of the type of DNS queries you normally receive. Later, the system will be able to distinguish between legitimate and malicious queries, protecting your DNS infrastructure without impacting legitimate traffic.

Currently, the protection system only analyzes DNS over UDP (it does not include DNS over TCP).

The [Network Analytics dashboard](/analytics/network-analytics/) will display system-specific analytics for Advanced DNS Protection in the **DNS protection** tab, including the queried domains and record types.

## Availability

Advanced DNS Protection is currently available in beta to [Magic Transit](/magic-transit/) customers.

Protection for simpler DNS-based DDoS attacks is also included as part of the [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/).

{{<Aside type="warning" header="Configuration will be available soon">}}
Currently, you cannot configure Advanced DNS Protection rules using the Cloudflare dashboard or the Cloudflare API.
{{</Aside>}}

## Initial setup

1. Contact your account team to enable Advanced DNS Protection and make the initial configuration. The initial thresholds are based on your network’s individual behavior.

2. [Add the prefixes](/ddos-protection/tcp-protection/how-to/add-prefix/) you wish to onboard using the Advanced TCP Protection user interface. Advanced DNS Protection will only be applied to the prefixes you onboard.

    If you already onboarded the desired prefixes when you configured Advanced TCP Protection, you do not need to take any other action.

    {{<Aside type="note">}}
Currently, the list of onboarded prefixes is shared with [Advanced TCP Protection](/ddos-protection/tcp-protection/). Any onboarded prefixes will be subject to both Advanced TCP Protection and Advanced DNS Protection, assuming that your account team has done the initial configuration of both systems. However, you can leave Advanced TCP Protection in monitoring mode.
    {{</Aside>}}

---

## Troubleshooting

### No data about Advanced DNS Protection in Network Analytics

If you cannot find any data related to Advanced DNS Protection in the **DNS Protection** tab of Network Analytics, it could be because one of these reasons:

* You did not [add your prefixes](/ddos-protection/tcp-protection/how-to/add-prefix/) to Advanced TCP Protection.
* Cloudflare did not enable the Advanced DNS Protection system yet.
* You do not have any DNS over UDP traffic.

---

## Data collection

Cloudflare collects DNS-related data such as query type (for example, `A` record) and the queried domains. For details, refer to [Data collection](/analytics/network-analytics/reference/data-collection/).

{{<Aside type="warning">}}
Currently, to disable this data collection you must remove your prefixes either in the Cloudflare dashboard or through the [Delete a prefix](/ddos-protection/tcp-protection/api/#prefix-operations) API operation. However, this procedure will remove the prefixes from both Advanced DNS Protection and [Advanced TCP Protection](/ddos-protection/tcp-protection/).
{{</Aside>}}

---

## Related products

Advanced DNS Protection can protect you against volumetric DNS DDoS attacks. To perform DNS caching, proxying, and configuration, use the [Cloudflare DNS Firewall](/dns/dns-firewall/).

Currently, Advanced DNS Protection is not available for DNS Firewall.
