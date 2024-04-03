---
title: Rule categories
pcx_content_type: reference
weight: 5
layout: wide
meta:
  title: Rule categories — HTTP DDoS
---

# Rule categories

The main categories (or tags) of HTTP DDoS Attack Protection managed rules are the following:

{{<table-wrap>}}

Name | Description
-----|------------
`botnets` | Rules for requests from known botnets, with very high accuracy and low risk of false positives. It is recommended that you keep these rules enabled.
`unusual-requests` | Rules for requests with suspicious characteristics that are not usually seen in legitimate traffic.
`advanced` | Rules related to features available to Advanced DDoS Protection customers, such as [Adaptive DDoS Protection](/ddos-protection/managed-rulesets/adaptive-protection/).
`generic` | Rules for detecting and mitigating floods of requests. These rules are useful for mitigating attacks that have no known signatures, but they may also trigger on unusually high volumes of legitimate traffic. To reduce the risk of false positives, their request per second (rps) activation threshold is higher. These rules either rate-limit or challenge traffic by default, but you can override them to block traffic if necessary.
`read-only` | {{<render file="managed-rulesets/_read-only-rules-description.md">}}
`test` | {{<render file="managed-rulesets/_test-rules-description.md">}}

{{</table-wrap>}}