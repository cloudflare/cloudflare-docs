---
title: Get started
order: 2
pcx-content-type: how-to
---

# Get started with Cloudflare Script Monitor

## Activate Script Monitor

To enable Script Monitor:
1. In your dashboard, go to **Firewall** > **Page Shield**.
1. For **Script Monitor**, select **On**.

For more guidance on using the Script Monitor dashboard, refer to [Monitor scripts](../use-dashboard).

## Configure alerts

Once you have activated Script Monitor, you can set up multiple alerts for your domain.

Your system sends alerts at regular intervals, so you might experience a delay between adding a new script and receiving an alert.

To set up alerts:
1. Go to **Firewall** > **Page Shield**.
1. Select **Configure an alert**.
1. Select an alert type:
    - **New Domain Alert**: Triggered hourly by JavaScript dependencies from new host domains
    - **New Scripts Alert**: Triggered daily by any new JavaScript dependencies
1. Fill in the required information and select **Create**.

To edit, delete, or disable an alert, go to your [account notifications](https://dash.cloudflare.com/?to=/:account/notifications).
