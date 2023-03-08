---
title: Create allow rules
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Based on your [application's traffic](/learning-paths/modules/security/bot-management-setup/review-analytics/?learning_path=bot-management), you should create [Firewall rules](/firewall/cf-dashboard/create-edit-delete-rules/) that explicitly allow expected automated or likely automated traffic.

Cloudflare recommends being as specific as possible when creating these rules, usually including a combination of user-agent values, IP addreses or ASNs, and [JA3 fingerprints](/bots/concepts/ja3-fingerprint/).

{{<render file="_allow-mobile-app-rule.md" productFolder="bots">}}

If you only use a specific characteristic for your allow rules (such as the user-agent), it could be discovered by malicious bots and expose your application to automated abuse.