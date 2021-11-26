---
pcx-content-type: how-to
---

# Edit a PagerDuty connected service

To edit which PagerDuty services are connected to your Cloudflare account, you first have to disconnect PagerDuty from Cloudflare, make any changes you need in PagerDuty, and then reconnect it. Be aware that disconnecting PagerDuty will disable notifications being sent to PagerDuty where currently configured. If other delivery destinations (like email) were selected, then those notifications will still be routed as configured. If PagerDuty was the only configured destination, disconnecting PagerDuty may result in a notification with no destination.

1. Sign in to your [Cloudflare dashboard](https://dash.cloudflare.com/login).
1. Go to **Notifications** and click **Destinations** on the left side of your dashboard.
1. In the **Connected notification services** card, click **View** on the PagerDuty service you want to disconnect.
1. Click **Disconnect** and select **Confirm**.
1. Go to your [PagerDuty account](https://www.pagerduty.com/) and make the required changes.
1. Reconnect [PagerDuty to Cloudflare](/notifications/create-notifications/create-pagerduty).
