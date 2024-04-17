---
pcx_content_type: concept
title: Get started
weight: 1
meta:
  title: Get started
---

# Overview

{{<render file="_indicator-feeds-overview.md" withParameters="If your organization has interest in becoming a provider or a subscriber, contact your account team, who will help facilitate the required authorization.">}}

## Get started

Managing a Custom Indicator Feed is only available using the [Indicator API endpoints](/api/operations/custom-indicator-feeds-get-indicator-feeds).

1. The first thing a provider needs to do is create a feed. Feeds are lists of indicators and can be created using the [Create new indicator feed endpoint](/api/operations/custom-indicator-feeds-create-indicator-feeds).

2. After a feed is created, you can upload data to it. Uploading data to a feed is done through the [`Snapshots` API endpoint](/api/operations/custom-indicator-feeds-update-indicator-feed-data). They are called snapshots because if a provider needs to update their feed with new data, they must upload a file containing all previous and new indicators.

  {{<Aside type="note">}}
  Uploaded indicator data must be in a [`.stix2`](https://oasis-open.github.io/cti-documentation/stix/intro) formatted file.
  {{</Aside>}}

3. Finally, in order to grant access to a subscriber, any administrator of the account that owns the feed must add the subscribers `account_tag` to the feeds allowed subscribers list. This can be done using the [`permissions` API endpoint](/api/operations/custom-indicator-feeds-add-permission).

## Use a feed in Gateway

Once an account is granted access to a feed, it will be available as a selectable item in Gateway.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies**. Select **DNS**.
2. To create a new DNS policy, select **Add a policy**.
3. Name your policy, add a **Traffic Condition**, and select _Indicator Feeds_ from the **Selector** dropdown.

If your account has been granted access to a Custom Indicator Feed, Gateway will list the feed in the **Value** dropdown.

![Example of creating a Gateway DNS policy rule with Custom Indicator Feeds](/images/security-center/gateway-indicator-feed.png)
