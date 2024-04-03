---
pcx_content_type: reference
title: Verified Bot Categories
weight: 0
---

# Verified Bot Categories

You can segment your verified bot traffic by its type and purpose by adding the Verified Bot Categories field `cf.verified_bot_category` as a filter criteria in [WAF Custom rules](/waf/custom-rules/), [Advanced Rate Limiting](/waf/rate-limiting-rules/), and Late Transform rules.

{{<Aside type="note">}}
The Verified Bot Categories field is not compatible with legacy Firewall rules.
{{</Aside>}}

## Categories

- **Academic research**: Internet Archive, Library of Congress, TurnItInBot
- **Accessibility**
- **Advertising or marketing**: Google Adsbot
- **Aggregators**: Pinterest, Indeed Jobsbot
- **AI Crawler**: Google Bard, ChatGPT bot
- **Feed fetcher**: RSS or Podcast feed updaters
- **Monitoring or analytics**: Uptime Monitors
- **Page preview**: Facebook, Slack, Twitter, or Discord Link Preview tools
- **Search engine crawler**: Googlebot, Bingbot, Yandexbot, Baidubot
- **Search engine optimization**: Google Lighthouse, GT Metrix, Pingdom, AddThis
- **Security**: Vulnerability Scanners, SSL Domain Control Validation (DCV) Check Tools
- **Webhooks**: Payment processors, WordPress Integration tools
- **Other**

## Availability

Verified Bot Categories is available to all Bots customers.