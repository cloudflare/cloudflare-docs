---
title: Get started
order: 0
---

# Get started with Script Monitor

## Activate Script Monitor

To enable Script Monitor:
1. In your dashboard, go to **Firewall** > **Page Shield**.
1. For **Script Monitor**, select **On**.

## Monitor domain scripts

Once you have activated Script Monitor, review the **Script Monitor dashboard** to see which scripts are running on your domain. Scripts on the dashboard appear in close to real time, so use the dashboard when proactively looking for scripts.

If you see unexpected scripts on the dashboard, check them for signs of malicious activity.

<Aside type="note" header="Note:">
If you recently activated Script Monitor, you may see a delay in reporting.
</Aside>

## Configure alerts

Once you have activated Script Monitor, you can set up multiple alerts for your domain.

Your system sends alerts at regular intervals, so you might experience a delay between adding a new script and receiving an alert.

To set up alerts:
1. Go to **Firewall** > **Page Shield**.
1. Select **Configure an alert**.
1. Select an alert type:
    - **New Domain Alert**: Triggered hourly by JavaScript dependencies from new host domains
    - **New Scripts Alert**: Triggered daily by any new JavasScript dependencies
1. Fill in the required information and select **Create**.

To edit, delete, or disable an alert, go to your [account notifications](https://dash.cloudflare.com/?to=/:account/notifications).