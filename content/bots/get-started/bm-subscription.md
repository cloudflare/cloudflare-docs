---
pcx_content_type: get-started
title: Enterprise Bot Management
weight: 4
---

# Get started with Bot Management for Enterprise

Bot Management for Enterprise is a paid add-on that provides sophisticated bot protection for your domain. Customers can identify automated traffic, take appropriate action, and view detailed analytics within the dashboard.

This Enterprise product provides the most flexibility to customers by:

- Generating a [bot score](/bots/concepts/bot-score/) of 1-99 for every request. Scores below 30 are commonly associated with bot traffic.
- Allowing customers to take action on this score with [WAF custom rules](/waf/custom-rules/) or [`Workers`](/workers/runtime-apis/request/#incomingrequestcfproperties).
- Allowing customers to view this score in Bot Analytics or Logs.

## Enable Bot Management for Enterprise

Bot Management is automatically enabled for Enterprise zones entitled with the add-on. 

To enable a [Bot Management](https://dash.cloudflare.com/?to=/:account/:zone/security/bots) trial on Enterprise zones without the Bot Management add-on entitled:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **Bots**.
3. Select **Add Bot Management**.

{{<Aside type="note">}}
If you are not seeing Bot Management enabled on your zone or if you still see **Add Bot Management** on the Cloudflare dashboard, contact your account team for the proper entitlements.
{{</Aside>}}

## Block AI bots

{{<render file="_ai-bots-definition.md" >}}
<br>
{{<render file="_block-ai-bots-enable.md" withParameters="Bot Management">}}

{{<Aside type="note">}}
You can view blocked AI bot traffic via [Security Analytics](/waf/analytics/security-analytics/).
{{</Aside>}}

## Setup

For more guidance on setup, refer to your Customer Success Manager.