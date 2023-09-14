---
title: Find appropriate rate limit
pcx_content_type: how-to
weight: 17
meta:
  title: Find an appropriate rate limit
---

# Find an appropriate rate limit

The **Rate limit analysis** tab in [Security Analytics](/waf/security-analytics/) displays data on the request rate for traffic matching the selected filters and time period. Use this tab to determine the most appropriate rate limit for incoming traffic matching the applied filters.

{{<Aside type="note">}}
The **Rate limit analysis** tab is only available to Enterprise customers.
{{</Aside>}}

## User interface overview

The **Rate limit analysis** tab is available in Account Home > **Security Center** > **Security Analytics**.

![Screenshot of the Rate limit analysis tab in Security Analytics](/images/waf/rate-limit-analytics.png)

The main chart displays the distribution of request rates for the top 50 unique clients observed during the selected time interval (for example, `1 minute`) in descending order. You can group the request rates by the following unique request properties:

* **IP address**
* [**JA3 fingerprint**](/bots/concepts/ja3-fingerprint/) (only available to customers with Bot Management)
* **IP address and JA3 fingerprint** (only available to customers with Bot Management)

{{<Aside type="note">}}
For more information on how Cloudflare calculates the request rate of incoming traffic, refer to [How Cloudflare determines the request rate](/waf/rate-limiting-rules/request-rate/).
{{</Aside>}}

---

## Determine an appropriate rate limit

### 1. Define the scope

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account.
2. Go to Account Home > **Security Center** > **Security Analytics**.

3. In the **HTTP requests** tab, select a specific time period:

    * To look at the normal rate distribution, specify a period with non-peak traffic.
    * To analyze the rate of offending visitors/bots, select a period corresponding to an attack.

4. Apply filters to analyze a particular situation in your application where you want to apply rate limiting (for example, fiter by `/login` URL path).

5. (Optional) To focus on non-automated/human traffic, use the bot score quick filter in the sidebar.

### 2. Find the rate

1. Choose the request properties (JA3, IP, or both) and the duration (1 min, 5 mins, or 1 hour) for your rate limit rule. The request properties you select will be used as [rate limiting rule characteristics](/waf/rate-limiting-rules/parameters/#characteristics).

2. Use the slider in the chart to move the horizontal line defining the rate limit. While you move the slider up and down, check the impact of defining a rate limiting rule with the selected limit on the displayed traffic.

{{<Aside type="note">}}
Answering the following questions during your adjustments can help you with your analysis:

* "How many clients would have been caught by the rule and rate limited?"
* "Can I visually identify abusers with above-average rate vs. the long tail of average users?"
{{</Aside>}}


### 3. Validate your rate

1. Repeat the rate selection process described in the previous section, but selecting a portion of traffic where you know there was an attack or traffic peak. The rate you have chosen should block the outlier traffic during the attack and allow traffic during normal times.

2. (Optional) Check the [sampled logs](/waf/security-analytics/#sampled-logs) to verify the fingerprints and filters you selected.

### 4. Create a rate limiting rule

1. Select **Create rate limit rule** to go to the [rate limiting creation page](/waf/rate-limiting-rules/create-zone-dashboard/) with your filters, characteristics, and selected rate limit pre-populated.

2. Select the rule action. Depending on your needs, you can set the rule to log, challenge, or block requests exceeding the selected threshold.

    It is recommended that you first deploy the rule with the _Log_ action to validate the threshold, and change the action later to block or challenge incoming requests when you are confident with the rule behavior.

3. To save and deploy your rate limiting rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.