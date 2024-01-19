---
title: Monitor loaded resources
pcx_content_type: how-to
weight: 2
meta:
  title: Monitor loaded resources (scripts, connections, and cookies)
---

# Monitor loaded resources

Once you [activate Page Shield](/page-shield/get-started/), the **Monitors** dashboard will show which [active](/page-shield/reference/script-statuses/) scripts and connections are running on your domain, as well as the cookies recently detected in HTTP traffic.

If you notice unexpected scripts or connections on the dashboard, check them for signs of malicious activity. Enterprise customers with a paid add-on will have their [connections and scripts classified as potentially malicious](/page-shield/how-it-works/malicious-script-detection/) based on threat feeds. You should also check for any new or unexpected cookies.

{{<Aside type="note">}}
If you recently activated Page Shield, you may see a delay in reporting.
{{</Aside>}}

## Use the Monitors dashboard

To review the active resources detected by Page Shield:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2.  Go to **Security** > **Page Shield**.
3.  Under **Monitors**, review the list of active connections, scripts, and cookies for your domain. To apply a filter, select **Add filter** and use one or more of the available options:

    - **Script**: Filter scripts by their URL. Only available for active scripts.
    - **Connection**: Filter connections by their target URL. Depending on your [configuration](/page-shield/reference/settings/#connection-target-details), it may search only by target hostname. Only available for active connections.
    - **Host**: Look for scripts appearing on specific hostnames, or connections made in a specific hostname.
    - **Page** (requires a Business or Enterprise plan): Look for scripts appearing in a specific page, or for connections made in a specific page. Searches the first page where the script was loaded (or where the connection was made) and the latest occurrences list.

5. Depending on your plan, you may be able to [view the details of each resource](#view-resource-details).

## View all reported scripts, connections, and cookies

The All Reported Connections, All Reported Scripts, and All Reported Cookies dashboards show all the detected resources including infrequent or inactive ones, reported in the last 30 days. After 30 days without any report, Page Shield will delete information about a previously reported resource, and it will no longer appear in any of the dashboards.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield** > **Monitors**.
3. Select **View all connections**, **View all scripts**, or **View all cookies**.
4. Review the information displayed in the dashboard.

You can filter the data in these dashboards using different criteria, and print a report with the displayed records.

## View resource details

{{<Aside type="note">}}
Only available to customers on Business and Enterprise plans.
{{</Aside>}}

To view the details of a resource, select **Details** next to the script, connection, or cookie.

The details of each connection/script include:

- **Last seen**: How long ago the resource was last detected (in the last 30 days).
- **First seen at**: The date and time when the resource was first detected.
- **Page URLs**: The most recent pages where the resource was detected (up to ten pages).
- **First page URL**: The page where the resource was first detected.

The details of each cookie include:

- **Type**: A cookie can have the following types:
    - **First-party**: Cookies set by the origin server (through a `set-cookie` HTTP response header)
    - **Third-party**: Cookies known to be from a third-party, according to Page Shield data
    - **Unknown**: All other situations. Most third-party cookies will show as "unknown" to begin with.
- **Set by**: Which entity set the cookie, according to analysed traffic (_Server_, _Browser_, or _Both_).
- **Domain**: The value of the `Domain` cookie attribute. Only available for Enterprise customers with a paid add-on.
- **SameSite**: The value of the `SameSite` cookie attribute. Only available for Enterprise customers with a paid add-on.
- **Last seen**: How long ago the resource was last detected (in the last 30 days).
- **First seen at**: The date and time when the cookie was first detected.
- **Page URLs**: The most recent pages where the cookie was detected (up to ten pages).
- **First page URL**: The page where the cookie was first detected.

## Export resource data

### Scripts and connections

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

To export script or connection information in CSV format, select **Download CSV** in one of the cards in the **Monitors** tab (**Active connections** or **Active scripts**). Use this feature to extract data from Page Shield that you can review and annotate.

The data in the exported file will honor any filters you configure in the dashboard.

### Cookies

{{<Aside type="note">}}
Cookie export is available in Business plans and above.
{{</Aside>}}

To export the list of detected cookies in CSV format, select **Export** in the **Active cookies** dashboard in the **Monitors** tab. The data in the exported file will honor any filters you configure in the dashboard.
