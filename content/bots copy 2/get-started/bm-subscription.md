---
pcx_content_type: navigation
title: Enterprise Bot Management
external_link: /learning-paths/bot-management/
weight: 4
_build:
  publishResources: false
  render: never
---

# Get started with Bot Management for Enterprise

Bot Management for Enterprise is a paid add-on that provides sophisticated bot protection for your domain. Customers can identify automated traffic, take appropriate action, and view detailed analytics within the dashboard. Bot Management also supports custom solutions via Workers and Logs.

This Enterprise product provides the most flexibility to customers by:

- Generating a [bot score](/bots/concepts/bot-score/) of 1-99 for every request. Scores below 30 are commonly associated with bot traffic.
- Allowing customers to take action on this score with [custom rules](/waf/custom-rules/) or [`Workers`](/workers/runtime-apis/request/#incomingrequestcfproperties).
- Allowing customers to view this score in Bot Analytics or Logs.

---

## Enable Bot Management for Enterprise

To enable [Bot Management](https://dash.cloudflare.com/?to=/:account/:zone/security/bots) for Enterprise:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **Bots**.
3. Select **Enable**.

### Before you begin

- Review the following concepts:

  - [Bot score](/bots/concepts/bot-score/): Learn how Cloudflare scores bot requests.
  - [Challenge Solve Rate (CSR)](/bots/concepts/challenge-solve-rate/): Learn how to evaluate the effectiveness of your rules.
  - [Bot tags](/bots/concepts/cloudflare-bot-tags/): Learn more about _why_ Cloudflare classified a request a certain way.

### Step 1 — Configure Bot Management

Decide whether you want to enable [JavaScript detections](/bots/reference/javascript-detections/) to help identify bots.

To enable this feature, go to **Security** > **Bots**.

### Step 2 — Monitor domain traffic

Before deploying Bot Management on live traffic, use [Bot Analytics](/bots/bot-analytics/bm-subscription/) to determine your domain's sensitivity to bot traffic.

Go to **Security** > **Bots** and examine the following traffic segments:

- **Automated traffic**: Bot scores of 1
- **Likely automated traffic**: Bots scores of 2 through 29
- **Other traffic groups**: Any additional large spikes in bot scores

For **automated** traffic, sort through the IP addresses, ASNs, and other data points at the bottom of the page. Look for any traffic that _should not_ be blocked — commonly API or mobile app traffic. Do the same for **likely automated** traffic.

Use the slider tool to identify **other traffic groups**. For example, you may find that traffic from your mobile app is routinely scored at 12.

![Example of a bot score distribution](/images/bots/bot-score-distribution.png)

At the end of your analysis, you should:

- Have a range of scores you can confidently block or challenge
- Understand nuances in your traffic that may require special attention

{{<Aside type="note" header="Important">}}

If you were a Cloudflare customer before adding Bot Management, you can view past analytics. This means that you will be able to sort through traffic insights immediately.

New customers should give Bot Analytics a few days to gather data. You should only begin blocking or challenging traffic after checking for possible exemptions or special endpoints.

{{</Aside>}}

### Step 3 — Create a custom rule for automated traffic

Based on your analysis of **automated** traffic, create a [custom rule](/waf/custom-rules/) that **challenges** scores of 1 but still allows good, automated requests. Monitor that rule for a few days to make sure you are targeting the right traffic (user agents, IP addresses, API or mobile traffic).

{{<example>}}

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(cf.bot_management.score eq 1) and not (cf.bot_management.verified_bot)</code></td>
      <td><em>JS Challenge</em></td>
    </tr>
  </tbody>
</table>
{{</example>}}

### Step 4 — Create additional custom rules

Create custom rules that address **likely automated** traffic and **other traffic groups**. For suggested bot thresholds and other considerations, refer to the [WAF documentation](/waf/custom-rules/use-cases/challenge-bad-bots/) or [Bot Management variables](/bots/reference/bot-management-variables/).

Cloudflare recommends that most customers block or challenge bot scores **below 30**, but your domain might vary:

- If you want to minimize false positives and lost revenue — such as ecommerce domains — you might permit requests with lower bot scores to access your domain.
- If you want to increase protection and minimize bot traffic, you might challenge higher bot scores.
- If your custom rule has a [**Challenge Solve Rate (CSR)**](/bots/concepts/challenge-solve-rate/) higher than 3%, consider lowering your challenge threshold.

The best approach is to start small and slowly increase your threshold to prevent widespread issues.

### Step 5 — Continue monitoring domain traffic

You can adjust your custom rules at any point. Set aside time to review [Bot Analytics](/bots/bot-analytics/bm-subscription/) and [Security Events](/waf/security-events/) to see if your rules need additional tuning.

---

## Other considerations

### Static resources

{{<render file="_static-resources-bm.md">}}

For more details, refer to [Static resource protection](/bots/reference/static-resources/).

### Verified bots

Some automated traffic is good! To allow good bots like Google or Bing, use the **Verified Bot** field in your rules. If you see a verified bot that Cloudflare is not [currently tracking](https://radar.cloudflare.com/verified-bots), fill out an [online application](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link). The waiting time is up to several weeks for verified bot requests to be evaluated.

### Mobile traffic

To treat mobile traffic differently, use the `user agent` or `IP address` fields when creating your custom rules.

### `Skip` action

{{<render file="_flexible-sbfm.md">}}
