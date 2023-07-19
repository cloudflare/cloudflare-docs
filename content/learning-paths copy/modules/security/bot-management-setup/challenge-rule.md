---
title: Create a challenge rule
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

After reviewing the data from your *Log* rule, update your rule to more aggressively challenge automated traffic.

| Expression | Action |
| --- | --- |
| `(cf.bot_management.score eq 1) and not (cf.bot_management.verified_bot)` | *Managed Challenge* |

Though you can explicitly block automated traffic, Cloudflare recommends using our [*Managed Challenge* action](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge-recommended) instead. Managed Challenges not only reduce CAPTCHAs, but also provide you with the data to evaluate your rule's effectiveness.

## Challenge Solve Rate (CSR)

{{<render file="_challenge-solve-rate.md" productFolder="bots" >}}

{{<render file="_challenge-solve-recommendations.md" productFolder="bots" >}}

This CSR data - along with the other information visible in [Security Events](/waf/security-events/paid-plans/) and [Cloudflare Logs](/logs/about/) - can help you evaluate and expand the scores and endpoints covered by your challenge rule.