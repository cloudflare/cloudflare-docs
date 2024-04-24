---
title: Business
pcx_content_type: reference
weight: 3
meta:
  title: Super Bot Fight Mode (Business) Analytics
---

# Super Bot Fight Mode (Business) Analytics

Business and Enterprise customers without Bot Management can use **Bot Analytics** to dynamically examine bot traffic. These dashboards offer less functionality than Bot Management for Enterprise but still help you understand bot traffic on your domain.

## Access

To use Bot Analytics, open the Cloudflare dashboard and select **Security** > **Bots**.

![View Bot Analytics in the Cloudflare dashboard. For more details, keep reading.](/images/bots/bot-analytics-dashboard-biz.png)

## Features

For a full tour of Bot Analytics, see [our blog post](https://blog.cloudflare.com/introducing-bot-analytics/). At a high level, the tool includes:

- **Requests by traffic type**: View your total domain traffic segmented vertically by traffic type. Keep an eye on _automated_ and _likely automated_ traffic.
- **Requests by detection source**: Identify the most common detection engines used to score your traffic. Hover over a tooltip to learn more about each engine.
- **Top requests by attribute**: View more detailed information on specific IP addresses and other characteristics.

Bot Analytics shows up to 72 hours of data at a time and can display data up to 30 days old. Bot Analytics displays data in real time in most cases.

{{<render file="_analytics-features.md">}}

## Common uses

Business and Enterprise customers without Bot Management can use Bot Analytics to:

- Understand {{<glossary-tooltip term_id="bot">}}bot{{</glossary-tooltip>}} traffic
- Study recent attacks to find trends and detailed information
- Learn more about Cloudflare’s detection engines with real data

For more details and granular control over bot traffic, consider upgrading to [Bot Management for Enterprise](/bots/bot-analytics/bm-subscription/).
