---
pcx_content_type: how-to
title: Configure hardware Connector
---

# Maintenance


## Deactivate Magic WAN Connector

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to deactivate, select the three dots next to it > **Edit**.
4. In Status, select _Deactivated_ from the dropdown.
5. Select **Update**.

## Change the Interrupt service Window

The interrupt service window defines when Magic WAN Connector can update its systems. When Magic WAN Connector is updating, this may result in an interruption to existing connections. Set up a time window that minimizes disruption to your sites.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to deactivate, select the three dots next to it > **Edit**.
4. In **Interrupt service window**, select the most appropriate time for the Connector to update its systems.