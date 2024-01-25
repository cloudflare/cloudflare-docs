---
pcx_content_type: concept
title: Get started
weight: 1
meta:
  title: Get started
---

# Overview

In the simplest terms, there are providers and subscribers of our threat intelligence data.

A provider is an organization that has a set of data that they are interested in sharing with other Cloudflare organizations. Any organization can be a provider. Examples of current providers are Government Cyber Defense groups. 

Subscribers can be any Cloudflare customer that wants to secure their environment further by creating rules based on provider datasets. Subscribers must be authorized by a provider. Authorization is granted using the [Indicator Feeds permissions endpoint](/api/operations/custom-indicator-feeds-add-permission). 

If your organization has interest in becoming a provider or a subscriber, please reach out to your account team, who will help facilitate the required authorization.

## Get started

Managing a Custom Indicator Feed is only available using the [Indicator API endpoints](/api/operations/custom-indicator-feeds-get-indicator-feeds). 

1. The first thing a provider needs to do is create a feed. Feeds are lists of indicators and can be created using the [Create new indicator feed endpoint](/api/operations/custom-indicator-feeds-create-indicator-feeds).

2. After a feed is created, you can upload data to it. Uploading data to a feed is done through the [`Snapshots` API endpoint](/api/operations/custom-indicator-feeds-update-indicator-feed-data). They are called snapshots because if a provider needs to update their feed with new data, they must upload a file containing all previous and new indicators. 

{{<Aside type="note">}} 
Uploaded indicator data must be in a [`.stix2`](https://oasis-open.github.io/cti-documentation/stix/intro) formatted file.
{{</Aside>}}

3. Finally, in order to grant access to a subscriber, any administrator of the account that owns the feed must add the subscribers `account_tag` to the feeds allowed subscribers list. This can be done using the [`permissions` API endpoint](/api/operations/custom-indicator-feeds-add-permission). 

## Using a feed in Gateway

Once an account is granted access to a feed, it will be available as a selectable item in Gateway. 

1. Open your Zero Trust account.
2. Select **Gateway** > **Firewall Policies** and create a new DNS policy by selecting **Add a policy**.
3. Name your policy, add a **Traffic Condition** and select the **Indicator Feeds** from the selector dropdown.

If your accounty has been granted access to a Custom Indicator Feed, it will listed in the **Value** dropdown.

![Example of creating a gateway dns policy rule with custom indiciator feeds](/images/security-center/gateway-indicator-feed.png)

