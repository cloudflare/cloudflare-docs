---
title: Analytics
pcx_content_type: concept
type: overview
weight: 10
layout: list
meta:
  title: Firewall Analytics
---

# Firewall Analytics

Firewall Analytics allows you to manage and visualize threats and helps you tailor your security configurations.

Users on a Free plan can view summarized firewall events by date in the **Activity log**. Customers on paid plans have access to additional graphs and dashboards that summarize the most relevant information about the current behavior of Cloudflare's security features and any recent threats against your zone.

## Main features

*   **Events summary**: Provides the number of firewall events on traffic during the selected time period, grouped according to the selected dimension (for example, Action, Host, Country).
*   **Events by service**: Lists the Firewall activity per Cloudflare security feature (for example, WAF, Firewall Rules, API Shield).
*   **Top events by source**: Provides details of the traffic flagged or actioned by a Cloudflare security feature (for example, IP addresses, User Agents, Paths, Countries, Hosts, ASNs).
*   **Activity log**: Summarizes firewall events by date to show the action taken and the applied Cloudflare security product.
*   **Denial-of-service attacks mitigated**: Counts automatically mitigated Layer 4 attacks blocked by Cloudflare over the last seven days.

Firewall Analytics captures all traffic actioned or flagged by a Cloudflare security product, including features such as [Browser Integrity Check](https://support.cloudflare.com/hc/articles/200170086).

## Availability

The available features vary according to your Cloudflare plan:

{{<feature-table id="security.firewall_analytics">}}

## Known limitations

Firewall Analytics currently has these limitations:

*   Firewall Analytics may use sampled data to improve performance. If your search uses sampled data, Firewall Events might not display all events and filters might not return the expected results. To display more events, select a smaller time frame.

*   The UI may show an inaccurate number of events per page. Data queries are highly optimized, but this means that pagination may not always work because the source data may have been sampled. The GraphQL Analytics API does not have this pagination issue.

*   Triggered OWASP rules appear in the Firewall Analytics page under **Additional logs**, but they are not included in exported JSON files.
