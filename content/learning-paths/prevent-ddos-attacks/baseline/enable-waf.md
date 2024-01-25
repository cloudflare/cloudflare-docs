---
title: Enable WAF
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Once you [proxy your DNS records](/learning-paths/prevent-ddos-attacks/baseline/proxy-dns-records/), you should enable rulesets for Cloudflare's [Web Application Firewall (WAF)](/waf/).

The available rulesets depend on your zone's plan, but all customers have access at least to the Cloudflare Free Managed Ruleset, which provides mitigations against high and wide-impacting vulnerabilities.

For more details and potential customizations, refer to [Managed rulesets](/waf/managed-rules/).