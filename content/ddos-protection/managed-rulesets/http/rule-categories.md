---
title: Rule categories
pcx_content_type: reference
weight: 5
layout: list
---

# Rule categories

Rules in the HTTP DDoS Attack Protection Managed Ruleset belong to the following categories (also known as tags):

{{<table-wrap>}}

Name | Description
-----|------------
`botnets` | Rules for requests from known botnets, with very high accuracy and low risk of false positives. It is recommended that you keep these rules enabled.
`unusual-requests` | Rules for requests with suspicious characteristics that are not usually seen in legitimate traffic.
`advanced` | Rules related to features available to Advanced DDoS customers, such as [Adaptive DDoS Protection](/ddos-protection/managed-rulesets/adaptive-protection/).
`generic` | Rules for detecting and mitigating floods of requests. These rules are useful for mitigating attacks that have no known signatures, but they may also trigger on unusually high volumes of legitimate traffic. To reduce the risk of false positives, their request per second (rps) activation threshold is higher. These rules either rate-limit or challenge traffic by default, but you can override them to block traffic if necessary.

{{</table-wrap>}}