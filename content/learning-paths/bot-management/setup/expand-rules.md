---
title: Create additional rules
pcx_content_type: learning-unit
weight: 6
layout: learning-unit
---

With your first rule in place, you can then create a broader set of rules to protect your application.

## Layer rules

If your application is a bit more complex - for example, receiving mobile application traffic and automated API traffic - you may need to layer your bot protection rules for the best results.

The following two rules might be useful for a site protecting against content scraping, or some other form of bots viewing resources intended for humans. Since the [order of the rules matters](/firewall/cf-firewall-rules/order-priority/#managing-rule-evaluation-by-list-order) for rule execution, you should always place your allow rules before block or challenge rules.

### Rule 1 - Allow mobile app request

{{<render file="_allow-mobile-app-rule.md" productFolder="bots">}}

### Rule 2 - Restrict automated traffic, but exclude /api path
| Expression | Action |
| --- | --- |
| `(cf.bot_management.score lt 30) and not (cf.bot_management.verified_bot) and not (http.request.uri.path contains "/api")` | *Managed Challenge* |

---

## Protect specific endpoints

If bots are [submitting data](/learning-paths/bot-management/planning/site-traffic/#bot-attacks) through your forms, your rules may be more focused on protecting specific, more vulnerable endpoints.

| Expression | Action |
| --- | --- |
| `(cf.bot_management.score lt 30) and (http.request.method eq "POST") and (http.request.uri.path in {"/api/login" "/api-mobile/login" }) and not (cf.bot_management.verified_bot) and (not cf.bot_management.static_resource)` | *Managed Challenge* |