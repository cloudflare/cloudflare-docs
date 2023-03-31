---
pcx_content_type: how-to
title: Review resources considered malicious
weight: 3
meta:
  description: Learn how to review scripts and connections that Page Shield considered malicious.
---

# Review scripts and connections considered malicious

{{<Aside type="note">}}
Only available to Enterprise customers with a paid add-on.
{{</Aside>}}

Page Shield displays scripts and connections considered malicious at the top of the dashboard lists, so that you can quickly identify those resources, review them, and take action.

## Review malicious scripts

To review the scripts considered malicious:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **Page Shield** > **Monitors**.

3.  Under **Active Scripts**, select **Details** for each script considered malicious. The script details will contain:

    - **Malicious Code**: Whether Cloudflare's internal systems consider the script malicious or not, and what is the score of the current script version (1-99).
    - **Malicious URL**: Whether the script URL is known to be malicious according to threat intelligence feeds.
    - **Malicious domain**: Whether the script's domain is known to be malicious according to threat intelligence feeds.
    - **Malicious category**: The categorization of the script considered malicious according to threat intelligence feeds.

    For more information, refer to [Malicious script and connection detection](/page-shield/how-it-works/malicious-script-detection/).

4.  Based on the displayed information, and with the help of the [last seen/first seen fields in the script details](/page-shield/detection/monitor-connections-scripts/#view-script-or-connection-details), review and update the pages where the malicious script was detected.

You can configure alerts for detected malicious scripts. Refer to [Page Shield alerts](/page-shield/reference/alerts/) for more information on the available alert types.

## Review malicious connections

To review the connections considered malicious:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2.  Go to **Security** > **Page Shield** > **Monitors**.

3.  Under **Active Connections**, select **Details** for each connection considered malicious. The connection details will contain:

    - **URL match**: Whether the connection's target URL is known to be malicious according to threat intelligence feeds. This field requires that you configure Page Shield to analyze the [full URI](/page-shield/reference/settings/#connection-target-details) of outgoing connections.
    - **Domain match**: Whether the connection's target domain is known to be malicious according to threat intelligence feeds.
    - **Category**: The categorization of the connection considered malicious according to threat intelligence feeds.

    For more information, refer to [Malicious script and connection detection](/page-shield/how-it-works/malicious-script-detection/).

4.  Based on the displayed information, and with the help of the [last seen/first seen fields in the connection details](/page-shield/detection/monitor-connections-scripts/#view-script-or-connection-details), review and update the pages where the malicious connection was detected.
