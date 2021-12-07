---
order: 2
pcx-content-type: how-to
---

# Review scripts considered malicious

In the list of scripts displayed in the Script Monitor dashboard, the detected scripts that are considered malicious appear at the top of the list, so that you can quickly identify those scripts, review them, and take action.

<Aside type="note">

This feature is only available to Enterprise customers with a paid add-on.

</Aside>

To review the scripts considered malicious:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
1. Go to **Firewall** > **Page Shield**.
1. Under **Script Monitor**, click **Details** for each script considered malicious. The script details will contain:

    * **Malicious Code**: Whether Cloudflare's internal systems consider the script malicious or not, and what is the score of the current script version (1-99).
    * **Malicious URL**: Whether the script URL is known to be malicious according to threat intelligence feeds.
    * **Malicious Domain**: Whether the script's domain is known to be malicious according to threat intelligence feeds.

    For more information, refer to [Detecting malicious scripts](/about/malicious-script-detection).

1. Based on the displayed information, and with the help of the [last seen/first seen fields in the script details](/use-dashboard/monitor-scripts#view-script-details), review and update the pages where the malicious script was detected.

You can configure alerts for detected malicious scripts. Refer to [Alerts](/reference/alerts) for more information on the available alert types.
