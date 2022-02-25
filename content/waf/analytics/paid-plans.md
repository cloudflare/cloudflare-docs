---
pcx-content-type: reference
title: Paid plans
weight: 3
meta:
  title: Firewall Analytics — Paid plans
---

# Firewall Analytics — Paid plans

## Adjusting displayed data

You can apply multiple filters and exclusions to narrow the scope of Firewall Analytics, as well as adjust the report duration. Modifying the duration, filters, or exclusions affects the analytics data displayed on the entire page including the **Activity Log** and all graphs, except for the **Denial-of-service attacks mitigated** graph.

![Add a new filter in Firewall Analytics](/waf/static/analytics-add-filter.png)

{{<render file="_analytics-filter-report-duration.md">}}

## Create Firewall Rule from current filters

{{<render file="_analytics-create-firewall-rule.md">}}

## Events summary

The **Events summary** section provides the number of Firewall events on traffic during the selected time period, grouped according to the selected dimension (for example, **Action**, **Host**, **Country**, or **ASN**).

![Filter Firewall Analytics by action](/waf/static/analytics-events-summary.png)

You can adjust the displayed data according to one of the values by clicking **Filter** or **Exclude** when hovering the legend.

## Events by service

The **Events by service** section lists the Firewall activity per Cloudflare security feature (for example, **WAF**, **Firewall Rules**, **API Shield**).

You can adjust the scope of Firewall Analytics to one of the displayed services by clicking **Filter** or **Exclude** when hovering the legend or by clicking the corresponding graph bar.

## Top events by source

In **Top events by source** you can find details of the traffic flagged or actioned by a Cloudflare security feature — for example, **IP Addresses**, **User Agents**, **Paths**, **Countries**, and **Firewall Rules**.

You can adjust the scope of Firewall Analytics to one of the listed source values by clicking **Filter** or **Exclude** when hovering the value.

{{<Aside type="note">}}

A deleted Firewall Rule or Rate Limiting rule will show as `Rule unavailable` under **Firewall Rules** or **Rate Limit Rules**. To check the changes made within your Cloudflare account, review your [Audit logs](https://support.cloudflare.com/hc/en-us/articles/115002833612-Understanding-Cloudflare-Audit-Logs).

{{</Aside>}}

## Activity log

{{<render file="_analytics-activity-log.md">}}

{{<render file="_analytics-export-data.md">}}

## Share Firewall Analytics filters

{{<render file="_analytics-share-url.md">}}

## Print or download PDF report

To print or download a snapshot report from your Firewall Events analytics dashboard, click **Print report** in **Firewall Events**. Your web browser's printing interface will present you with options for printing or downloading the PDF report.

The generated report will reflect all applied filters.

## Layer 4 denial-of-service attack mitigation

{{<Aside type="note">}}

Only available on Enterprise plans.

{{</Aside>}}

In **Denial-of-service attacks mitigated** you have visibility over mitigated Layer 4 denial-of-service SYN attacks towards your zones in the past seven days.

![Denial-of-service attacks mitigated](/waf/static/analytics-dos-attacks-mitigated.png)

You can also use the [`synAvgPps1mGroups` node in GraphQL](/analytics/graphql-api/features/data-sets) to get the total attack volume for a zone over a period of time.
