---
pcx_content_type: reference
title: Paid plans
weight: 3
meta:
  title: Firewall Analytics — Paid plans
---

# Firewall Analytics — Paid plans

Firewall Analytics is available at **Security** > **Overview**.

## Adjusting displayed data

You can apply multiple filters and exclusions to narrow the scope of Firewall Analytics, as well as adjust the report duration. Modifying the duration, filters, or exclusions affects the analytics data displayed on the entire page including the **Activity Log** and all graphs, except for the **Denial-of-service attacks mitigated** graph.

![Example of adding a new filter in Firewall Analytics for the Allow action](/waf/static/analytics-add-filter.png)

{{<render file="_analytics-filter-report-duration.md">}}

## Create firewall rule from current filters

{{<render file="_analytics-create-firewall-rule.md">}}

## Events summary

The **Events summary** section provides the number of firewall events on traffic during the selected time period, grouped according to the selected dimension (for example, **Action**, **Host**, **Country**, or **ASN**).

![Filter by action by selecting Filter when hovering the desired action in Events summary](/waf/static/analytics-events-summary.png)

You can adjust the displayed data according to one of the values by selecting **Filter** or **Exclude** when hovering the legend.

## Events by service

The **Events by service** section lists the firewall activity per Cloudflare security feature (for example, **Managed rules**, **Firewall rules**, **API Shield**).

You can adjust the scope of Firewall Analytics to one of the displayed services by selecting **Filter** or **Exclude** when hovering the legend or by selecting the corresponding graph bar.

## Top events by source

In **Top events by source** you can find details of the traffic flagged or actioned by a Cloudflare security feature — for example, **IP Addresses**, **User Agents**, **Paths**, **Countries**, and **Firewall rules**.

You can adjust the scope of Firewall Analytics to one of the listed source values by selecting **Filter** or **Exclude** when hovering the value.

{{<Aside type="note">}}

A deleted firewall rule or rate limiting rule will show as `Rule unavailable` under **Firewall rules** or **Rate limit rules**. To check the changes made within your Cloudflare account, review your [Audit logs](/fundamentals/account-and-billing/account-security/review-audit-logs/).

{{</Aside>}}

## Activity log

{{<render file="_analytics-activity-log.md">}}

{{<render file="_analytics-export-data.md">}}

## Share Firewall Analytics filters

{{<render file="_analytics-share-url.md">}}

## Print or download PDF report

To print or download a snapshot report from your firewall events analytics dashboard, select **Print report** in **Firewall Events**. Your web browser's printing interface will present you with options for printing or downloading the PDF report.

The generated report will reflect all applied filters.

## Layer 4 denial-of-service attack mitigation

{{<Aside type="note">}}

Only available on Enterprise plans.

{{</Aside>}}

In **Denial-of-service attacks mitigated** you have visibility over mitigated Layer 4 denial-of-service SYN attacks towards your zones in the past seven days.

![Example graph of mitigated denial-of-service attacks in the previous seven days, including the total number of TCP packets involved in the attacks](/waf/static/analytics-dos-attacks-mitigated.png)

You can also use the [`synAvgPps1mGroups` node in GraphQL](/analytics/graphql-api/features/data-sets/) to get the total attack volume for a zone over a period of time.
