---
title: Enterprise Bot Management
pcx-content-type: reference
weight: 4
meta:
  title: Bot Management for Enterprise Analytics
---

# Bot Management for Enterprise Analytics

Enterprise customers with Bot Management can use **Bot Analytics** to dynamically examine bot traffic.

## Access

To use Bot Analytics, open the Cloudflare dashboard and select **Security** > **Bots**.

![View Bot Analytics in the Cloudflare dashboard. For more details, keep reading.](/bots/static/bot-analytics-dashboard-ent.png)

## Features

For a full tour of Bot Analytics, see [our blog post](https://blog.cloudflare.com/introducing-bot-analytics/). At a high level, the tool includes:

- **Requests by bot score**: View your total domain traffic and segment it vertically by traffic type. Keep an eye on _automated_ and _likely automated_ traffic.
- **Bot score distribution**: View the number of requests assigned a bot score 1 through 99.
- **Bot score source**: Identify the most common detection engines used to score your traffic. Hover over a tooltip to learn more about each engine.
- **Top requests by attribute**: View more detailed information on specific IP addresses and other characteristics.

Bot Analytics shows up to one week of data at a time and can display data up to 30 days old. Bot Analytics displays data in real time in most cases.

{{<render file="_analytics-features.md">}}

## Common uses

Bot Management customers can use Bot Analytics to:

- Understand traffic during [your onboarding phase](/bots/get-started/bm-subscription/#enable-bot-management-for-enterprise)
- Tune firewall rules to be effective but not overly aggressive
- Study recent attacks to find trends and detailed information
- Learn more about Cloudflare’s detection engines with real data

## API

Data from Bot Analytics is also available via the GraphQL API. You can access bot scores, bot sources, [Bot Tags](/bots/concepts/cloudflare-bot-tags/), and bot _decisions_ (_automated_, _likely automated_, etc.).

Read the [GraphQL Analytics API documentation](/analytics/graphql-api/) for more information about GraphQL and basic querying.
