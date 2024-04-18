---
title: DDoS protection
pcx_content_type: concept
weight: 6
meta:
    title: Cloudflare DDoS protection
---

# Cloudflare DDoS protection

Cloudflare DDoS protection automatically detects and mitigates Distributed Denial of Service (DDoS) attacks using its Autonomous Edge. Magic Transit customers have access to additional features, such as:

- [Advanced TCP protection](/ddos-protection/tcp-protection/) (disabled by default)
- [Advanced DNS protection (beta)](/ddos-protection/dns-protection/)

Refer to [Cloudflare DDoS documentation](/ddos-protection/) for more information.

---

## Execution order

The execution order of the different mitigation systems for Magic Transit customers is the following:

1. [DDoS managed rulesets](/ddos-protection/managed-rulesets/)
2. [Advanced TCP Protection](/ddos-protection/tcp-protection/)
3. [Advanced DNS Protection](/ddos-protection/dns-protection/)
4. [Magic Firewall](/magic-firewall/)
