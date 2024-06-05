---
title: Enterprise Bot Management
pcx_content_type: reference
weight: 4
meta:
  title: Bot Management for Enterprise Analytics
---

# Bot Management for Enterprise Analytics

Enterprise customers with Bot Management can use **Bot Analytics** to dynamically examine bot traffic.

## Access

To use Bot Analytics, open the Cloudflare dashboard and select **Security** > **Bots**.

![View Bot Analytics in the Cloudflare dashboard. For more details, keep reading.](/images/bots/bot-analytics-dashboard-ent.png)

## Features

{{<render file="_bm-analytics-features.md">}}

{{<render file="_analytics-features.md">}}

## Common uses

Bot Management customers can use Bot Analytics to:

- Understand traffic during [your onboarding phase](/bots/get-started/bm-subscription/).
- Tune WAF custom rules to be effective but not overly aggressive.
- Study recent attacks to find trends and detailed information.
- Learn more about Cloudflare’s detection engines with real data.

## API

Data from Bot Analytics is also available via the GraphQL API. You can access {{<glossary-tooltip term_id="bot score">}}bot scores{{</glossary-tooltip>}}, bot sources, {{<glossary-tooltip term_id="bot tags" link="/bots/concepts/cloudflare-bot-tags/">}}bot tags{{</glossary-tooltip>}}, and bot _decisions_ (_automated_, _likely automated_, etc.), and more.

Read the [GraphQL Analytics API documentation](/analytics/graphql-api/) for more information about GraphQL and basic querying.
