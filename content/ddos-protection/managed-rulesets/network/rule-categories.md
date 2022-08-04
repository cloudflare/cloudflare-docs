---
title: Rule categories
pcx_content_type: reference
weight: 4
layout: list
---

# Rule categories

Rules in the Network-layer DDoS Attack Protection Managed Ruleset belong to the following categories (also known as tags):

{{<table-wrap>}}

Name | Description
-----|------------
`gre` | Rules for DDoS attacks over Generic Routing Encapsulation (GRE) that usually target GRE endpoints.
`esp` | Rules for DDoS attacks related to the Encapsulating Security Payload (ESP) protocol, which is part of the IPSec secure network protocol suite.
`generic` | Rules for detecting and mitigating floods of packets. These rules are useful for mitigating attacks that have no known signatures, but they may also trigger on unusually high volumes of legitimate traffic. To reduce the risk of false positives, their packet per second (pps) activation threshold is higher. These rules rate-limit traffic by default, but you can override them to block traffic if necessary.

{{</table-wrap>}}