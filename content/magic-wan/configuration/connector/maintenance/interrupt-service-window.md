---
pcx_content_type: how-to
title: Interrupt Service Window
---

# Interrupt Service Window

The Interrupt Service Window defines when Magic WAN Connector can update its systems. When Magic WAN Connector is updating, this may result in an interruption to existing connections. Set up a time window that minimizes disruption to your sites.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Select the Connector you want to deactivate > **Edit**.
4. In **Interrupt service window**, select the most appropriate time for the Connector to update its systems:
    - **Timezone**: Select the time zone for the Connector to update.
    - **Hour of day**: Choose an hour for the Connector to start updating. Cloudflare recommends you choose an hour when there is minimal activity in your network, to avoid potential disruptions.
    - **Duration**: Duration indicates the time window within which the Connector is scheduled to update. For example, if you configure your Connector to update at `01:00` and specify a **Duration** of `4 hours`, the Connector will attempt to update within the four-hour period following `01:00`."