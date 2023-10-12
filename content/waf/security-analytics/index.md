---
title: Security Analytics
pcx_content_type: concept
weight: 10
layout: single
---

{{<heading-pill style="beta">}}Security Analytics{{</heading-pill>}}

The Security Analytics dashboard displays information about all incoming HTTP requests for your domain, including requests not handled by Cloudflare security products.

{{<Aside type="note">}}
Available to customers on Business and Enterprise plans.
{{</Aside>}}

Use the Security Analytics dashboard to:

* View the traffic distribution for your domain.
* Understand which traffic is being mitigated by Cloudflare security products, and where non-mitigated traffic is being served from (Cloudflare global network or origin server).
* Analyze suspicious traffic and create tailored WAF custom rules based on applied filters.
* Learn more about Cloudflare’s security scores ([attack score](/waf/about/waf-attack-score/), [bot score](/bots/concepts/bot-score/), [uploaded content scanning](/waf/about/content-scanning/) results) with real data.
* [Find an appropriate rate limit](/waf/rate-limiting-rules/find-rate-limit/) for incoming traffic.

If you need to modify existing security-related rules you already configured, consider also using the [Security Events](/waf/security-events/) dashboard. This dashboard displays information about requests affected by Cloudflare security products.

## Access

To use Security Analytics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to the account or zone dashboard:

    - For the zone dashboard, select your domain and go to **Security** > **Analytics**.
    - For the account dashboard, go to **Security Center** > **Security Analytics**.

![The Security Analytics dashboard displaying the HTTP requests chart for the past 24 hours.](/images/waf/security-analytics/security-analytics-dashboard.png)

## Adjusting displayed data

### Apply filters

Adjust the scope of analytics by manually entering filter conditions. You can also select **Filter** or **Exclude** to filter by a field value. These buttons appear when you hover the analytics data legend.

{{<Aside type="note">}}
Alternatively, apply several filters at once from the [**Insights** section](#insights), which shows statistics for commonly used filters when doing security analyses.
{{</Aside>}}

To manually add a filter:

1. Select **Add filter**.
2. Select a field, an operator, and a value. For example, to filter events by source IP address, select the _Source IP_ field, select the _equals_ operator, and enter the IP address.
3. Select **Apply**.

Take the following into account when entering filter values:
* Do not add quotes around values.
* Do not enter the `AS` prefix when entering ASN numbers. For example, enter `1423` instead of `AS1423`.
* Wildcards are not supported.

### Select time frame

Select the time frame you wish to analyze from the _Previous 24 hours_ drop-down list.

## Create custom rule from current filters

To create a [custom rule](/waf/custom-rules/) with an expression based on the filters you applied in Security Analytics, select **Create custom rule** above the main chart.

---

## Main dashboard areas

### Top statistics

This section presents top statistics about incoming requests highlighting relevant properties commonly used when performing a security analysis.

You can filter or exclude some of the top values by selecting **Filter** or **Exclude** next to each value.

To display additional top statistics, select **More top statistics**.

{{<Aside type="note">}}
Cloudflare calculates the top statistics from a sample of requests in the selected time frame. To know the applied sampling rate, hover the icon next to the name of a top statistic.
{{</Aside>}}

### Insights

The provided insights show statistics for commonly used filters when doing security analyses, without immediately applying these filters to the displayed data.

If you find a high value in one or more insights, this can mean that there is a set of suspicious requests that you should investigate. Additionally, these insights are a good starting point for applying a first set of filters to the dashboard.

To apply the filters for an insight to the data displayed in the Security Analytics dashboard, select **Filter** next to the insight.

### Score-based analyses

The **Attack analysis**, **Bot analysis**, and **Uploaded content** analysis sections display statistics related to WAF attack scores, bot scores, and WAF content scanning scores of incoming requests for the selected time frame.

You can examine different traffic segments according to the current metric (attack, bot, or content scanning). To apply score filters for different segments, select the buttons below the traffic chart. For example, select **Likely attack** under **Attack analysis** to filter requests that are likely an attack (requests with WAF attack score values between 21 and 50).

Additionally, you can use the slider tool below the chart to filter incoming requests according to the current metric. This allows you to filter traffic groups outside the predefined segments.

### Main chart

The main chart displays the following data for the selected time frame, according to the selected tab:

* **HTTP requests**: Traffic mitigated by the Cloudflare security platform, served by Cloudflare, and served by the origin server, according to the following classification:

    * **Mitigated by WAF**: Requests blocked or challenged by Cloudflare's application security products such as the WAF and HTTP DDoS protection. It does not include requests that had the following actions applied: _Log_, _Skip_, and _Allow_.
    * **Served by Cloudflare**: Requests served by the Cloudflare global network such as cached content and redirects.
    * **Served by origin**: Requests served by your origin server.

* **Attack analysis**: [WAF attack score](/waf/about/waf-attack-score/) analysis of incoming requests, classifying them as _Clean_, _Likely clean_, _Likely attack_, or _Attack_.
* **Bot analysis**: [Bot score](/bots/concepts/bot-score/) analysis of incoming requests, classifying them as _Automated_, _Likely automated_, or _Likely human_.
* **Rate limit analysis**: displays data on the request rate for traffic matching the selected filters and time period. Use this tab to [find an appropriate rate limit](/waf/rate-limiting-rules/find-rate-limit/) for incoming traffic matching the applied filters.

### Sampled logs

This section contains detailed log information for individual ([sampled](#final-remarks)) requests in the selected time frame.

![The Sampled logs section of Security Analytics showing an expanded log entry with additional details.](/images/waf/security-analytics/security-analytics-sampled-logs.png)

The displayed information includes:

* Mitigation action applied to the request
* Cache status
* Status code returned by the origin server to Cloudflare (in case of a cache miss)
* Status code returned by Cloudflare to the client
* Security scores for the request (attack, bot, uploaded content scanning)
* Request properties

## Final remarks

The Security Analytics dashboard uses [sampled data](/analytics/graphql-api/sampling/). Most information in the dashboard is obtained from `httpRequestsAdaptiveGroups` and `httpRequestsAdaptive` GraphQL nodes. For more information on working directly with GraphQL datasets, refer to [Datasets (tables)](/analytics/graphql-api/features/data-sets/).
