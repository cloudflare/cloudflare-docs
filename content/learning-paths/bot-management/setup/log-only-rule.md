---
title: Create a log-only rule
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

After allowing expected traffic, then create a rule that **Logs** automated traffic.

The exact type of rule you implement might be determined by your site's [content](/learning-paths/bot-management/planning/site-content/) and [traffic patterns](/learning-paths/bot-management/planning/site-traffic/).

For example, if you wanted to stop content scraping on your marketing website, you might start off with the following [Firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/).

| Expression | Action |
| --- | --- |
| `(cf.bot_management.score eq 1) and not (cf.bot_management.verified_bot)` | *Log* |

By starting the rule out in *Log* mode, you can validate your rule (and avoid challenging or blocking legitimate traffic).

## View matches

When this Firewall rule is triggered, you can view the matching requests in:

- [Security Events](/waf/security-events/paid-plans/)
- [Cloudflare Logs](/logs/about/)

Use the matches to evaluate the effectiveness of your rule, determine whether you need to add additional allow rules, and identify other obstacles to your implementation.