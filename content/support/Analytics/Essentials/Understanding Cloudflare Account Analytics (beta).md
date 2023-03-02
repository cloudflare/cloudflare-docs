---
source: https://support.cloudflare.com/hc/en-us/articles/360037857831-Understanding-Cloudflare-Account-Analytics-beta-
title: Understanding Cloudflare Account Analytics (beta)
---

# Understanding Cloudflare Account Analytics (beta)

## Overview

The Cloudflare dashboard (Account) **Analytics** app is a major component of the overall Cloudflare analytics product line.  Specifically, you can access a wide range of aggregated metrics from all the sites under a specific Cloudflare account.

___

## View your account analytics

To view metrics for your site:

1\. Log in to the Cloudflare dashboard.

2\. Select the appropriate Cloudflare account.

3\. Under the **Home** tab, click **Analytics** to the right of the list of sites. 

![Selecting Analytics on the list of sites](/support/static/hc-dash-analytics-button-on-home-screen.png)

Alternatively under **Menu**, locate the **Products** section and select **Analytics**. 

![Under Menu, selecting Analytics in the Products section](/support/static/hc-dash-account-level-analytics_button.png)

Once it loads, the Account Analytics app displays a collection of categorized charts with aggregated metrics for your account.  To understand the various metrics available, refer to _Review your account metrics_ below.

___

## Review your account metrics

This section outlines the aggregated metrics under each category.  Before reviewing your metrics, let’s define a couple of concepts used in some panels:

-   _Rate_ -  Reflects the ratio between the amount for a specific data category and the total.
-   _Bandwidth_ - Refers to the number of bytes sent from the Cloudflare edge network to the requesting client.

Also, note that:

-   To filter metrics for a specific time period, use the dropdown in the top right.
-   Most metrics are grouped into panels representing different aspects of the underlying data.

### Summary of metrics

Below is a brief description of the major elements comprising the metrics available.

HTTP Traffic

These charts aggregate data for HTTP traffic, and include:

![Chart showing last week's data for HTTP traffic](/support/static/hc-dash-account-analytics-map.png)

-   Spark lines for _Requests_, _Bandwidth_, _Page views_, and _Visitors_ (_Unique IPs)_
-   An interactive map that breaks down the number of requests by country
-   A table combining numerical and spark line data, sorted by total number of requests per country

Security

![Panel displaying lines highlighting encryption metrics: requests, requests rate, bandwidth, and bandwidth rate](/support/static/hc-dash-account-analytics_security_panel.png)

This panel features spark lines highlighting various encryption metrics, including: _requests_, _requests rate_, _bandwidth_, and _bandwidth rate_.  These also include a comparative percentage change based on the previous period.

Cache

![Panel displaying lines for caching metrics: requests, requests rate, bandwidth, and bandwidth rate](/support/static/hc-dash-account-analytics_cache_card.png)

This panel features spark lines for various caching metrics, including: _requests_, _requests rate_, _bandwidth_, and _bandwidth rate_.  These also include a comparative percentage change based on the previous equivalent period.  For example, if you selected _Last week_ as your time period, the previous period refers to the _week_ before.

Errors

![Panel displaying lines for 4xx and 5xx error rates](/support/static/hc-account-analytics_errors_card.png)

This panel displays spark lines for 4xx and 5xx error rates, respectively.  Learn more about [HTTP Status Codes](https://support.cloudflare.com/hc/articles/115003014432-HTTP-Status-Codes). 

Network

![Statistics showing the percentage of requests that use a specific version of HTTP](/support/static/hc-dash-account-analytics_network_card.png)

Client HTTP Version Used

These statistics show the percentage of requests that use a specific version of HTTP.

Traffic Served Over SSL

These statistics show the percentage of traffic that is encrypted using a specific version of SSL or TLS.

Content Type Breakdown

These statistics show the number of requests based on the resource content type.

___

## Related resources

-   [Cloudflare Analytics: A quick overview](https://developers.cloudflare.com/analytics)
-   [The Cloudflare Analytics GraphQL API](https://developers.cloudflare.com/analytics/)
