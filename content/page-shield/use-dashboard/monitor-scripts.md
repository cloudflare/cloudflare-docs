---
title: Monitor scripts
pcx-content-type: how-to
weight: 2
meta:
  title: Monitor scripts on your site
---

# Monitor scripts on your site

Once you have [activated Page Shield](/page-shield/get-started/), review the Active Scripts dashboard to see which [active scripts](/page-shield/reference/script-statuses/) are running on your domain. 

If you see unexpected scripts on the dashboard, check them for signs of malicious activity.

The All Reported Scripts dashboard displays all the scripts, including infrequent or inactive scripts, reported in the last 30 days. After 30 days without any report, Page Shield will delete information about a previously reported script, and the script will no longer appear in any of the dashboards.

Depending on your Cloudflare plan, you may also be able to:

- [View the details of each script](#view-script-details)
- [Review scripts marked as malicious](/page-shield/use-dashboard/review-malicious-scripts/)
- [Review changed scripts](/page-shield/use-dashboard/review-changed-scripts/)

## Use the Active Scripts dashboard

To review the active scripts monitored by Page Shield:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2.  Go to **Security** > **Page Shield**.
3.  Under **Active Scripts**, review the active scripts for your domain.
4.  To filter scripts, use the following options:

    - **Search scripts URLs**: Search for a specific URL.
    - **Host contains**: Look for scripts appearing on specific hostnames.
    - **Seen on Pages** (requires a Business or Enterprise plan): Look for scripts appearing in a specific page. Searches the page where the first script occurred and the latest occurrences list.

To review all scripts reported in your domain in the last 30 days, click **All scripts**.

If you recently activated Page Shield, you may see a delay in reporting.

## Review all reported scripts

Use the All Reported Scripts dashboard to review all scripts reported in your domain in the last 30 days, including infrequent or inactive scripts.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Page Shield**.
3. Under **Active Scripts**, click **All scripts**.
4. Review the information displayed in the **All Reported Scripts** dashboard.

The All Reported Scripts dashboard allows you to filter the displayed scripts using different criteria and to print a report with the displayed scripts.

## View script details

{{<Aside type="note">}}

Only available to customers on Business and Enterprise plans.

{{</Aside>}}

You can check the details of each script displayed in the Active Scripts dashboard, including the following fields:

- **First seen at**: The date and time when the script was first detected.
- **First seen on page**: The page where the script was first detected.
- **Last seen**: How long ago the script was last detected (in the last 30 days).
- **Last seen on pages**: The most recent pages where the script was detected (up to ten pages).
- **Count**: The total number of reports received for the script, based on sampling. You should only use this value to compare the number of reports between different scripts.

The information above helps you track how and how many times a script appeared in your domain and which pages have recently loaded the script.
