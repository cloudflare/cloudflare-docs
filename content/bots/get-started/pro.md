---
title: Pro
pcx_content_type: get-started
weight: 2
meta:
  title: Get started with Super Bot Fight Mode (Pro)
---

# Get started with Super Bot Fight Mode (Pro)

Super Bot Fight Mode is included in your Pro subscription. When enabled, the product:

- Identifies traffic matching patterns of known bots
- Can challenge or block bots
- Offers protection for static resources
- Provides limited analytics to help you understand bot traffic

## Enable Super Bot Fight Mode

{{<render file="_get-started-pro-biz-steps.md">}}

{{<render file="_flexible-sbfm.md">}}

## Disable Super Bot Fight Mode

{{<render file="_disable-sbfm.md">}}

{{<render file="_flexible-sbfm.md">}}

## Block AI bots

{{<render file="_ai-bots-definition.md" >}}

{{<render file="_block-ai-bots-enable.md" withParameters="Super Bot Fight Mode">}}

{{<Aside type="note">}}
You can view blocked AI bot traffic via [Security Analytics](/waf/analytics/security-analytics/).
{{</Aside>}}

## Analytics

### Bot Report

Use the **Bot Report** to monitor bot traffic for the past 24 hours.

To access the **Bot Report**, go to **Security** > **Bots**. If you see a double-digit percentage of automated traffic, you may want to upgrade to [Bot Management](/bots/plans/bm-subscription/) to save money on origin costs and protect your domain from large-scale attacks.

![Example traffic distribution as part of a bot report](/images/bots/bot-report-pro.png)

### Security events

You can see bot-related actions by going to **Security** > **Events**. Any requests challenged by this product will be labeled **Super Bot Fight Mode** in the **Service** field. This allows you to observe, analyze, and follow trends in your bot traffic over time.

## Ruleset Engine

{{<render file="_bfm-ruleset-engine.md">}}

{{<render file="_bfm-change-notice.md">}}