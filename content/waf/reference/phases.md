---
title: Phases
pcx_content_type: reference
weight: 3
layout: list
---

# WAF phases

The Web Application Firewall provides the following [phases](/ruleset-engine/about/phases/) where you can create rulesets and rules:

- `http_request_firewall_custom`
- `http_ratelimit`
- `http_request_firewall_managed`

These phases exist both at the account level and at the zone level. Considering the available phases and the two different levels, rules will be evaluated in the following order:

{{<table-wrap>}}

WAF feature  | Scope | Phase | Ruleset kind | Location in the dashboard
-------------|-------|-------|--------------|--------------------------
[Custom rulesets](/waf/custom-rulesets/)<br> | Account | `http_request_firewall_custom` | `custom`&nbsp;(create)<br/>`root` (deploy) | Account Home > **WAF** > **Custom rulesets**
[Custom rules](/waf/custom-rules/) | Zone | `http_request_firewall_custom` | `zone` | Your zone > **Security** > **WAF** > **Custom rules**
[Rate limiting rules](/waf/rate-limiting-rules/) | Account | `http_ratelimit` | `root` | Account Home > **WAF** > **Rate limiting rulesets**
[Rate limiting rules](/waf/rate-limiting-rules/) | Zone | `http_ratelimit` | `zone` | Your zone > **Security** > **WAF** > **Rate limiting rules**
[WAF Managed Rules](/waf/managed-rules/) | Account | `http_request_firewall_managed` | `root` | Account Home > **WAF** > **Managed rulesets**
[WAF Managed Rules](/waf/managed-rules/) | Zone | `http_request_firewall_managed` | `zone` | Your zone > **Security** > **WAF** > **Managed rules**

{{</table-wrap>}}

To learn more about phases, refer to [Phases](/ruleset-engine/about/phases/) in the Ruleset Engine documentation.

