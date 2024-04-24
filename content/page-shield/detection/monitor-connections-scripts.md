---
title: Monitor active resources
pcx_content_type: how-to
weight: 2
meta:
  title: Monitor active connections and scripts
---

# Monitor active connections and scripts on your site

Once you [activate Page Shield](/page-shield/get-started/), the **Monitors** dashboard will show which [active](/page-shield/reference/script-statuses/) scripts and connections are running on your domain.

If you see unexpected scripts or connections on the dashboard, check them for signs of malicious activity. Enterprise customers with a paid add-on will have their [connections and scripts classified as potentially malicious](/page-shield/how-it-works/malicious-script-detection/) based on threat feeds.

{{<Aside type="note">}}
If you recently activated Page Shield, you may see a delay in reporting.
{{</Aside>}}

## Use the Monitors dashboard

To review the active connections and scripts monitored by Page Shield:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2.  Go to **Security** > **Page Shield**.
3.  Under **Monitors**, review the list of active connections and scripts for your domain. To filter scripts or connections, select **Add filter** and use one or more of the available options:

    - **Script**: Filter scripts by their URL. Only available for active scripts.
    - **Connection**: Filter connections by their target URL. Depending on your [configuration](/page-shield/reference/settings/#connection-target-details), it may search only by target hostname. Only available for active connections.
    - **Host**: Look for scripts appearing on specific hostnames, or connections made in a specific hostname.
    - **Page** (requires a Business or Enterprise plan): Look for scripts appearing in a specific page, or for connections made in a specific page. Searches the first page where the script was loaded (or where the connection was made) and the latest occurrences list.

5. Depending on your plan, you may be able to [view the details of each script or connection](#view-script-or-connection-details).

## View all reported scripts or connections

The All Reported Connections and All Reported Scripts dashboards show all the scripts (or connections), including infrequent or inactive ones, reported in the last 30 days. After 30 days without any report, Page Shield will delete information about a previously reported script or connection, and it will no longer appear in any of the dashboards.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield** > **Monitors**.
3. Select **View all connections** or **View all scripts**.
4. Review the information displayed in the dashboard.

You can filter the data in the All Reported Connections and All Reported Scripts dashboards using different criteria, and print a report with the displayed records.

## View script or connection details

{{<Aside type="note">}}
Only available to customers on Business and Enterprise plans.
{{</Aside>}}

To view the details of a script or connection, select **Details** next to the script/connection.

The details of each connection/script include:

- **Last seen**: How long ago the connection/script was last detected (in the last 30 days).
- **First seen at**: The date and time when the connection/script was first detected.
- **Page URLs**: The most recent pages where the connection/script was detected (up to ten pages).
- **First page URL**: The page where the connection/script was first detected.

## Export script and connection data in CSV format

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

To export script or connection information in CSV format, select **Download CSV** in one of the cards in the **Monitors** tab (**Active connections** or **Active scripts**). Use this feature to extract data from Page Shield that you can review and annotate.

The data in the exported file will honor any filters you configure in the dashboard.
