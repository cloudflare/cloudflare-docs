---
title: Attack coverage
pcx-content-type: reference
order: 3
type: overview
---

# DDoS attack coverage

The [DDoS Attack Protection Managed Rulesets](/managed-rulesets) provide protection against a variety of DDoS attacks across L3/4 (layers 3/4) and L7 of the OSI model. Cloudflare constantly updates these Managed Rulesets to improve the attack coverage, increase the mitigation consistency, cover new and emerging threats, and ensure cost-efficient mitigations.

As a general guideline, Cloudflare customers are protected up to the layer on which their service operates. For example, a WAF customer is protected against DDoS attacks on Layer 7 (HTTP/HTTPS) all the way down including L3/4 attacks.

The following table includes a sample of covered attack vectors:

<TableWrap>

OSI Layer | Ruleset | Example of covered DDoS attack vectors
---|---|---
L3/4 | [Network-layer DDoS Attack Protection](/managed-rulesets/network) | UDP flood attack<br/>SYN floods<br/>SYN-ACK reflection attack<br/>Fully randomized ACK floods<br/>Mirai and Mirai-variant L3/4 attacks<br/>ICMP flood attack<br/>SNMP flood attack<br/>QUIC flood attack<br/>DNS amplification attack<br/>Out of state TCP attacks<br/>Protocol violation attacks<br/>DNS amplification attack<br/>SIP attacks
L7 (HTTP/HTTPS) | [HTTP DDoS Attack Protection](/managed-rulesets/http) | HTTP flood attack<br/>WordPress pingback attack<br/>HULK attack<br/>LOIC attack<br/>Mirai and Mirai-variant HTTP attacks

</TableWrap>
