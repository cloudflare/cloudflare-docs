---
pcx_content_type: reference
title: Paid plans
weight: 3
meta:
  title: Security Events — Paid plans
---

# Security Events — Paid plans

Security Events is available for your zone in **Security** > **Events**.

Additionally, Enterprise customers have access to the account-level dashboard in Account Home > **Security Center** > **Security Events**.

## Adjusting displayed data

You can apply multiple filters and exclusions to narrow the scope of Security Events and adjust the report duration. Modifying the duration, filters, or exclusions affects the analytics data displayed on the entire page including the **Activity Log** and all graphs.

![Example of adding a new filter in Security Events for the Allow action](/images/waf/events-add-filter.png)

{{<render file="_analytics-filter-report-duration.md">}}

## Create custom rule from current filters

{{<render file="_analytics-create-firewall-rule.md">}}

## Events summary

The **Events summary** section provides the number of security events on traffic during the selected time period, grouped according to the selected dimension (for example, **Action**, **Host**, **Country**, or **ASN**).

![Filter by action by selecting Filter when hovering the desired action in Events summary](/images/waf/events-summary.png)

You can adjust the displayed data according to one of the values by selecting **Filter** or **Exclude** when hovering the legend.

## Events by service

The **Events by service** section lists the activity per Cloudflare security feature (for example, **Managed rules** or **API Shield**).

You can adjust the scope of Security Events to one of the displayed services by selecting **Filter** or **Exclude** when hovering the legend or by selecting the corresponding graph bar.

## Top events by source

In **Top events by source** you can find details of the traffic flagged or actioned by a security feature — for example, **IP Addresses**, **User Agents**, **Paths**, and **Countries**.

You can adjust the scope of Security Events to one of the listed source values by selecting **Filter** or **Exclude** when hovering the value.

{{<Aside type="note">}}

A deleted custom/firewall rule or rate limiting rule will show as `Rule unavailable` under **Firewall rules** or **Rate limit rules**. To check the changes made within your Cloudflare account, review your [Audit logs](/fundamentals/setup/account/account-security/review-audit-logs/).

{{</Aside>}}

## Activity log

{{<render file="_analytics-activity-log.md">}}

{{<render file="_analytics-export-data.md">}}

## Share Security Events filters

{{<render file="_analytics-share-url.md">}}

## Print or download PDF report

To print or download a snapshot report from your security events dashboard, select **Print report** in **Security Events**. Your web browser's printing interface will present you with options for printing or downloading the PDF report.

The generated report will reflect all applied filters.
