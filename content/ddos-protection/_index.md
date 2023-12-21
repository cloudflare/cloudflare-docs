---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare DDoS Protection
---

# Cloudflare DDoS Protection

{{<description>}}
Detect and mitigate distributed denial-of-service (DDoS) attacks automatically.
{{</description>}}

{{<plan type="all">}}

Cloudflare automatically detects and mitigates {{<glossary-tooltip term_id="distributed denial-of-service (DDoS) attack" link="https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/">}}distributed denial-of-service (DDoS) attacks{{</glossary-tooltip>}} via our autonomous DDoS systems.

These systems include multiple dynamic mitigation rules exposed as [DDoS attack protection managed rulesets](/ddos-protection/managed-rulesets/). You can customize the mitigation rules included in these rulesets to optimize and tailor the protection to your needs.

---

## Features

{{<feature header="Managed rulesets" href="/ddos-protection/managed-rulesets/">}}
Protect against a variety of DDoS attacks across layers 3/4 (network layer) and layer 7 (application layer) of the OSI model.
{{</feature>}}

{{<feature header="Adaptive DDoS protection" href="/ddos-protection/managed-rulesets/adaptive-protection/">}}
Get increased protection against sophisticated DDoS attacks on layer 7 and layers 3/4.
{{</feature>}}

{{<feature header="Advanced TCP protection" href="/ddos-protection/tcp-protection/">}}
Detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods, or SYN and SYN-ACK floods.
{{</feature>}}

{{<feature header="Advanced DNS protection (beta)" href="/ddos-protection/dns-protection/">}}
Protect against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as random prefix attacks.
{{</feature>}}

---

## Availability

<div style="font-size:87%">

{{<feature-table id="security.ddos">}}

</div>

---

## Related products

{{<related header="Spectrum" href="/spectrum/" product="spectrum">}}
Provides security and acceleration for any TCP or UDP based application.
{{</related>}}

{{<related header="Magic Transit" href="/magic-transit/" product="magic-transit">}}
A network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.
{{</related>}}

{{<related header="Web Application Firewall (WAF)" href="/waf/" product="waf">}}
Get automatic protection from vulnerabilities and the flexibility to create custom rules.
{{</related>}}