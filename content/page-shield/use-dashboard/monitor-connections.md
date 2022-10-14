---
title: Monitor connections
pcx_content_type: how-to
weight: 3
meta:
  title: Monitor connections made by scripts on your site
---

# Monitor connections made by scripts on your site

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

Page Shield's connection monitor helps you identify data exfiltration attacks such as MageCart, which rely on sending data from the browser to an unknown third-party endpoint.

Use the Active Connections dashboard to review the connections made by scripts on your domain during the last seven days. If you see unexpected connections on the dashboard, check them for signs of malicious activity.

The All Connections dashboard displays all the connections, including infrequent or inactive ones, reported in the last 30 days. After 30 days without any connection report, Page Shield will delete information about a previously reported connection, and the connection will no longer appear in any of the dashboards.

You can perform the following operations in the connection monitor:

- [View the details of each connection](#view-connection-details)
- [Review connections considered malicious](/page-shield/use-dashboard/review-malicious-scripts/#review-malicious-connections)

## Use the Active Connections dashboard

To review the active connections identified by the connection monitor:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2.  Go to **Security** > **Page Shield** > **Connection monitor**.
3.  Under **Active connections**, review the active connections for your domain.
4.  To filter connections, use the following options:

    - **Search scripts**: Search for a specific URL.
    - **Search host**: Look for connections appearing on specific hostnames.
    - **Search page**: Look for connections made in a specific page. Searches the page where the connection first occurred and the latest occurrences list.

To review all connections reported for your domain in the last 30 days, select **View all connections**.

If you recently activated Page Shield, you may see a delay in reporting.

## Review all reported connections

Use the All Reported Connections dashboard to review all connections reported for your domain in the last 30 days, including infrequent or inactive connections.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield** > **Connection monitor**.
3. Under **Active connections**, select **View all connections**.
4. Review the information displayed in the **All Reported Connections** dashboard.

The All Reported Connections dashboard allows you to filter the displayed connections using different criteria and to print a report with the displayed connections.

## View connection details

You can check the details of each connection displayed in the dashboard, including the following fields:

- **Last seen**: How long ago the connection was last detected (in the last 30 days).
- **First seen at**: The date and time when the connection was first detected.
- **Page URLs**: The most recent pages where the connection was detected (up to ten pages).
- **First page URL**: The page where the connection was first detected.

This information helps you track how and how many times a connection was made in your domain and the pages where the connection was made.
