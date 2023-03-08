---
title: Get started
pcx_content_type: get-started
weight: 2
layout: single
meta:
  title: Get started with Cloudflare Page Shield
  description: Learn how to set up Page Shield.
---

# Get started with Cloudflare Page Shield

## Activate Page Shield

To enable Page Shield:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield**.
3. Select **Enable Page Shield**.

## Review detected scripts

When you enable Page Shield, it may take a while to get the list of detected scripts in your domain.

Review the scripts displayed in the [**Monitors** dashboard](/page-shield/detection/monitor-connections-scripts/), checking them for signs of malicious activity.

Depending on your plan, you may be able to also review the connections made by scripts in your domain's pages and check them for malicious activity.

## Configure alerts

{{<Aside type="note">}}
Only available to customers on a Business or Enterprise plan.
{{</Aside>}}

{{<render file="_alerts-intro.md">}}

{{<render file="_alerts-configure.md">}}

## Define policies

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

Policies define allowed resources on your websites. [Create policies](/page-shield/policies/create-dashboard/) to implement a positive security model [^1].

[^1]: A positive security model is one that defines what is allowed and rejects everything else. In contrast, a negative security model defines what will be rejected and accepts the rest.

