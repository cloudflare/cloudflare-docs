---
title: Create allow rules
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Based on your [application's traffic](/learning-paths/bot-management/setup/review-analytics/), you should create [WAF custom rules](/waf/custom-rules/create-dashboard/) that explicitly skip remaining custom rules (or other security features) for expected automated or likely automated traffic.

{{<render file="_allow-rules-caveat.md" productFolder="bots">}}
<br/>

{{<render file="_allow-mobile-app-rule.md" productFolder="bots">}}

If you only use a specific characteristic for your skip rules (such as the user-agent), it could be discovered by malicious bots and expose your application to automated abuse.