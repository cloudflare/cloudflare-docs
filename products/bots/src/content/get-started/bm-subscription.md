---
title: Enterprise Bot Management
order: 3
---

import StaticResourcesBM from "../_partials/_static-resources-bm.md"

# Get started with Bot Management for Enterprise

Bot Management for Enterprise is a paid add-on that provides sophisticated bot protection for your domain. Customers can identify automated traffic, take appropriate action, and view detailed analytics within the dashboard. Bot Management also supports custom solutions via Workers and Logs.

This Enterprise product provides the most flexibility to customers by:

- Generating a bot score of 1-99 for every request. Scores below 30 are commonly associated with bot traffic.
- Allowing customers to take action on this score with Firewall Rules or Workers.
- Allowing customers to view this score in Bot Analytics or Logs.

The bot score is an indicator of certainty. For example, a score of 1 means Cloudflare is quite certain the request was automated, while a score of 99 means Cloudflare is quite certain the request came from a human.

---

## Enable Bot Management for Enterprise

Our Solutions Engineering team will work with you to begin setting up the product. Most customers choose to write Firewall Rules that will block or challenge traffic based on bot score. Others use Bot Analytics or perform custom actions using our Workers platform.

### 1. Contact your account team

To enable Bot Management, contact your account team. After you have purchased Bot Management, you can access it by going to **Firewall** > **Bots**.

### 2. Configure Bot Management

Decide whether you want to enable [JavaScript detections](../../about/javascript-detections) to help identify bots.

To enable this feature, go to **Firewall** > **Bots**.

### 3. Monitor domain traffic

Before deploying Bot Management on live traffic, use [Bot Analytics](../../bot-analytics/bm-subscription) to determine your domain's sensitivity to bot traffic.

Go to **Firewall** > **Bots** and examine the following traffic segments:
- **Automated traffic**: Bot scores of 1
- **Likely automated traffic**: Bots scores of 2 through 29
- **Other traffic groups**: Any additional large spikes in bot scores

For **automated** traffic, sort through the IP addresses, ASNs, and other data points at the bottom of the page. Look for any traffic that *should not* be blocked — commonly API or mobile app traffic. Do the same for **likely automated** traffic.

Use the slider tool to identify **other traffic groups**. For example, you may find that traffic from your mobile app is routinely scored at 12. 

![Bot score distribution](../images/bot-score-distribution.png)

At the end of your analysis, you should:
- Have a range of scores you can confidently block or challenge
- Understand nuances in your traffic that may require special attention

<Aside type='note' header='Important'>

If you were a Cloudflare customer before adding Bot Management, you can view past analytics. This means that you will be able to sort through traffic insights immediately.

New customers should give Bot Analytics a few days to gather data. You should only begin blocking or challenging traffic after checking for possible exemptions or special endpoints.

</Aside>

### 4. Create a Firewall Rule for automated traffic

Based on your analysis of **automated** traffic, create a [Firewall Rule](https://developers.cloudflare.com/firewall/cf-firewall-rules) that **challenges** scores of 1 but still allows good, automated requests. Monitor that rule for a few days to make sure you are targeting the right traffic (user agents, IP addresses, API or mobile traffic).

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

### 5. Create additional Firewall Rules

Create Firewall Rules that address **likely automated** traffic and **other traffic groups**. For suggested bot thresholds and other considerations, see our [Firewall Rules documentation](https://developers.cloudflare.com/firewall/recipes/challenge-bad-bots).

Cloudflare recommends that most customers block or challenge bot scores **below 30**, but your domain might vary:
- If you want to minimize false positives and lost revenue — such as ecommerce domains — you might permit requests with lower bot scores to access your domain.
- If you want to increase protection and minimize bot traffic, you might challenge higher bot scores.
- If your Firewall Rule has a **Challenge Solve Rate (CSR)** higher than 3%, consider lowering your challenge threshold.

The best approach is to start small and slowly increase your threshold to prevent widespread issues.

### 6. Continue monitoring domain traffic

You can adjust your Firewall Rules at any point. Set aside time to review [Bot Analytics](../../bot-analytics/bm-subscription) and [Firewall Events](https://support.cloudflare.com/hc/articles/360024520152) to see if your rules need additional tuning.

---

## Bot Management variables

Bot Management provides access to several [new variables](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#dynamic-fields) within the Firewall expression builder.

- **Bot Score**: An integer used to isolate bot requests which ranges from 1-99. Lower scores usually indicate automated traffic, while higher scores indicate human traffic. Most traffic scored below 30 comes from bots.
- **Verified Bot**: A boolean value that is true if the request comes from a good bot, like Google or Bing. Most customers choose to allow this traffic. For more details, see [Traffic from known bots](https://developers.cloudflare.com/firewall/known-issues-and-faq#how-does-firewall-rules-handle-traffic-from-known-bots).
- **Serves Static Resource**: An identifier that matches [file extensions](../../about/static-resources) for many types of static resources. Use this variable if you send emails that retrieve static images.

These variables are also available as part of the [request.cf](https://developers.cloudflare.com/workers/reference/apis/request/#the-cf-object) object via [Cloudflare Workers](https://developers.cloudflare.com/workers/):

- request.cf.botManagement.score
- request.cf.botManagement.verifiedBot
- request.cf.botManagement.staticResource

## Other considerations

### Comparison to Threat Score

Bot Score is different from Threat Score. Bot Score identifies bots and Threat Score measures IP reputation across our services. Most customers achieve the best results by blocking or challenging bot scores lower than 30 and avoiding IP reputation entirely.

### Static resources

<StaticResourcesBM/>

For more details, see [Static resource protection](/about/static-resources).

### Verified bots

Some automated traffic is good! To allow good bots like Google or Bing, use the **Verified Bot** field in your rules. If you see a verified bot that Cloudflare is not [currently tracking](https://developers.cloudflare.com/firewall/known-issues-and-faq#bots-currently-detected), fill out an [online application](https://docs.google.com/forms/d/e/1FAIpQLSdqYNuULEypMnp4i5pROSc-uP6x65Xub9svD27mb8JChA_-XA/viewform?usp=sf_link).

### Mobile traffic
To treat mobile traffic differently, use the `user agent` or `IP address` fields when creating your Firewall Rules.

## Analytics

For more on analytics, see [Bot Analytics](/bot-analytics/bm-subscription/).