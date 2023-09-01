---
pcx_content_type: how-to
title: Edit PagerDuty
meta:
    title: Edit a PagerDuty connected service
weight: 1
---

# Edit a PagerDuty connected service

To edit which PagerDuty services are connected to your Cloudflare account, you first have to disconnect PagerDuty from Cloudflare, make any changes you need in PagerDuty, and then reconnect it. 

Disconnecting PagerDuty will disable notifications being sent to PagerDuty where currently configured. If PagerDuty was the only configured destination, disconnecting PagerDuty may result in a notification with no destination.

If other delivery destinations were selected, then those notifications will still be routed as configured. 

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications** > **Destinations**.
3. In the **Connected notification services** card, select **View** on the PagerDuty service you want to disconnect.
4. Select **Disconnect** > **Confirm**.
5. Go to your [PagerDuty account](https://www.pagerduty.com/) and make the required changes.
6. [Reconnect PagerDuty to Cloudflare](/notifications/create-notifications/create-pagerduty/).