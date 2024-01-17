---
title: Rule categories
pcx_content_type: reference
weight: 4
layout: wide
meta:
    title: Rule categories — Network-layer DDoS
---

# Rule categories

The main categories (or tags) of Network-layer DDoS Attack Protection managed rules are the following:

{{<table-wrap>}}

Name | Description
-----|------------
`gre` | Rules for DDoS attacks over Generic Routing Encapsulation (GRE) that usually target GRE endpoints.
`esp` | Rules for DDoS attacks related to the Encapsulating Security Payload (ESP) protocol, which is part of the IPsec secure network protocol suite.
`advanced` | Rules related to features available to Enterprise customers, such as [Adaptive DDoS Protection](/ddos-protection/managed-rulesets/adaptive-protection/).
`generic` | Rules for detecting and mitigating floods of packets. These rules are useful for mitigating attacks that have no known signatures, but they may also trigger on unusually high volumes of legitimate traffic. To reduce the risk of false positives, their packet per second (pps) activation threshold is higher. These rules rate-limit traffic by default, but you can override them to block traffic if necessary.
`read-only` | {{<render file="managed-rulesets/_read-only-rules-description.md">}}
`test` | {{<render file="managed-rulesets/_test-rules-description.md">}}

{{</table-wrap>}}

There are other rule categories based on the attack vector/protocol, such as `dns`, `quic`, and `sip`. The categories list is dynamic and may change over time.
