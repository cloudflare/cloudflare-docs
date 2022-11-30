---
title: Enterprise Bot Management
pcx_content_type: get-started
weight: 4
meta:
  title: Get started with Bot Management for Enterprise
---

# Get started with Bot Management for Enterprise

Bot Management for Enterprise is a paid add-on that provides sophisticated bot protection for your domain. Customers can identify automated traffic, take appropriate action, and view detailed analytics within the dashboard. Bot Management also supports custom solutions via Workers and Logs.

This Enterprise product provides the most flexibility to customers by:

- Generating a [bot score](/bots/concepts/bot-score/) of 1-99 for every request. Scores below 30 are commonly associated with bot traffic.
- Allowing customers to take action on this score with firewall rules or [`Workers`](/workers/runtime-apis/request/#incomingrequestcfproperties).
- Allowing customers to view this score in Bot Analytics or Logs.

---

## Enable Bot Management for Enterprise

Our Solutions Engineering team will work with you to begin setting up the product. Most customers choose to write firewall rules, but others use Bot Analytics or perform custom actions using our Workers platform.

### Before you begin

- Make sure you have purchased Bot Management for Enterprise (should be visible at **Security** > **Bots**).
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

![Example of a bot score distribution](/bots/static/bot-score-distribution.png)

At the end of your analysis, you should:

- Have a range of scores you can confidently block or challenge
- Understand nuances in your traffic that may require special attention

{{<Aside type="note" header="Important">}}

If you were a Cloudflare customer before adding Bot Management, you can view past analytics. This means that you will be able to sort through traffic insights immediately.

New customers should give Bot Analytics a few days to gather data. You should only begin blocking or challenging traffic after checking for possible exemptions or special endpoints.

{{</Aside>}}

### Step 3 — Create a firewall rule for automated traffic

Based on your analysis of **automated** traffic, create a [firewall rule](/firewall/cf-firewall-rules/) that **challenges** scores of 1 but still allows good, automated requests. Monitor that rule for a few days to make sure you are targeting the right traffic (user agents, IP addresses, API or mobile traffic).

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

### Step 4 — Create additional firewall rules

Create firewall rules that address **likely automated** traffic and **other traffic groups**. For suggested bot thresholds and other considerations, see our [Firewall Rules documentation](/firewall/recipes/challenge-bad-bots/) or [Bot Management variables](/bots/reference/bot-management-variables/).

Cloudflare recommends that most customers block or challenge bot scores **below 30**, but your domain might vary:

- If you want to minimize false positives and lost revenue — such as ecommerce domains — you might permit requests with lower bot scores to access your domain.
- If you want to increase protection and minimize bot traffic, you might challenge higher bot scores.
- If your firewall rule has a [**Challenge Solve Rate (CSR)**](/bots/concepts/challenge-solve-rate/) higher than 3%, consider lowering your challenge threshold.

The best approach is to start small and slowly increase your threshold to prevent widespread issues.

### Step 5 — Continue monitoring domain traffic

You can adjust your firewall rules at any point. Set aside time to review [Bot Analytics](/bots/bot-analytics/bm-subscription/) and [Firewall Events](/waf/analytics/) to see if your rules need additional tuning.

---

## Other considerations

### Static resources

{{<render file="_static-resources-bm.md">}}

For more details, see [Static resource protection](/bots/reference/static-resources/).

### Verified bots

Some automated traffic is good! To allow good bots like Google or Bing, use the **Verified Bot** field in your rules. If you see a verified bot that Cloudflare is not [currently tracking](https://radar.cloudflare.com/verified-bots), fill out an [online application](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link). The waiting time is up to several weeks for verified bot requests to be evaluated.

### Mobile traffic

To treat mobile traffic differently, use the `user agent` or `IP address` fields when creating your firewall rules.
