---
title: Analytics
order: 6
pcx-content-type: concept
type: overview
---

# Firewall Analytics

Firewall Analytics allows you to manage and visualize threats and helps you tailor your security configurations.

Users on a Free plan can view summarized Firewall events by date in the **Activity log**. Customers on paid plans have access to additional graphs and dashboards that summarize the most relevant information about the current behavior of Cloudflare's security features and any recent threats against your zone.

## Main features

*   **Events summary**: Provides the number of Firewall events on traffic during the selected time period, grouped according to the selected dimension (for example, Action, Host, Country).
*   **Events by service**: Lists the Firewall activity per Cloudflare security feature (for example, WAF, Firewall Rules, API Shield).
*   **Top events by source**: Provides details of the traffic flagged or actioned by a Cloudflare security feature (for example, IP addresses, User Agents, Paths, Countries, Hosts, ASNs).
*   **Activity log**: Summarizes Firewall events by date to show the action taken and the applied Cloudflare security product.
*   **Denial-of-service attacks mitigated**: Counts automatically mitigated Layer 4 attacks blocked by Cloudflare over the last seven days.

Firewall Analytics captures all traffic actioned or flagged by a Cloudflare security product, including features such as [Browser Integrity Check](https://support.cloudflare.com/hc/articles/200170086).

## Availability

Firewall Analytics is available at **Firewall** > **Overview**.

The available features vary according to your Cloudflare plan:

<TableWrap>

Feature                  | Free                | Pro                 | Business            | Enterprise
\-------------------------|---------------------|---------------------|---------------------|-------------------
Dashboard features       | Activity log only   | All except DoS      | All except DoS      | All
Time window              | Up to last 24 hours | Up to last 24 hours | Up to last 72 hours | Up to last 30 days
Print report             | –                   | Yes                 | Yes                 | Yes
Export records           | –                   | –                   | Up to 500 events    | Up to 500 events
L4 DoS attacks mitigated | –                   | –                   | –                   | Last 7 days

</TableWrap>

## Known limitations

Firewall Analytics currently has these limitations:

*   Firewall Analytics may use sampled data to improve performance.

*   The UI may show an inaccurate number of events per page. Data queries are highly optimized, but this means that pagination may not always work due to the fact that the source data may have been sampled. The GraphQL Analytics API does not have this limitation.

*   Triggered OWASP rules appear in the Firewall Analytics page under **Additional logs**, but they are not included in exported JSON files.
