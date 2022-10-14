---
pcx_content_type: how-to
title: Review malicious scripts and connections
weight: 5
---

# Review malicious scripts and connections

In the list of scripts and connections displayed in Page Shield's dashboards, scripts and connections considered malicious appear at the top of the list, so that you can quickly identify those items, review them, and take action.

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

## Review malicious scripts

To review the scripts considered malicious:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2.  Go to **Security** > **Page Shield** > **Script monitor**.

3.  Under **Active Scripts**, select **Details** for each script considered malicious. The script details will contain:

    - **Malicious Code**: Whether Cloudflare's internal systems consider the script malicious or not, and what is the score of the current script version (1-99).
    - **Malicious URL**: Whether the script URL is known to be malicious according to threat intelligence feeds.
    - **Malicious Domain**: Whether the script's domain is known to be malicious according to threat intelligence feeds.
    - **Malicious Category**: The categorization of the script considered malicious according to threat intelligence feeds.

    For more information, refer to [Detecting malicious scripts](/page-shield/about/malicious-script-detection/).

4.  Based on the displayed information, and with the help of the [last seen/first seen fields in the script details](/page-shield/use-dashboard/monitor-scripts/#view-script-details), review and update the pages where the malicious script was detected.

You can configure alerts for detected malicious scripts. Refer to [Alerts](/page-shield/reference/alerts/) for more information on the available alert types.

## Review malicious connections

To review the connections considered malicious:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2.  Go to **Security** > **Page Shield** > **Connection monitor**.

3.  Under **Active connections**, select **Details** for each connection considered malicious. The connection details will contain:

    - **URL match**: Whether the connection's target URL is known to be malicious according to threat intelligence feeds. This field requires that you configure Page Shield to analyze the [full URL](/page-shield/reference/settings/#connection-target-details) of outgoing connections.
    - **Domain match**: Whether the connection's target domain is known to be malicious according to threat intelligence feeds.
    - **Category**: The categorization of the connection considered malicious according to threat intelligence feeds.

    For more information, refer to [Detecting malicious scripts](/page-shield/about/malicious-script-detection/).

4.  Based on the displayed information, and with the help of the [last seen/first seen fields in the connection details](/page-shield/use-dashboard/monitor-connections/#view-connection-details), review and update the pages where the malicious connection was detected.
