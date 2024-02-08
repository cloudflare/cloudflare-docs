---
pcx_content_type: how-to
title: Maintenance
weight: 5
---

# Maintenance

## Heartbeat

Magic WAN Connector communicates periodically with Cloudflare via HTTPS. This is also known as a heartbeat, and lets Cloudflare know that the Connector in question is connected to the Internet and reachable.

The heartbeat calls are made to `api.cloudflare.com`. Each Connector has a heartbeat frequency of 10 seconds, independently of the number of WAN interfaces you have running on your device.

There are three symbols for the heartbeat signal that allow you to quickly check the status of Magic WAN Connector:

- **Blue `i`**: Magic WAN Connector is contacting Cloudflare as expected.
- **Yellow triangle**: Magic WAN Connector has not yet connected to Cloudflare.
- **Red triangle**: There is a potential problem with Magic WAN Connector.

### Access Magic WAN Connector's heartbeat

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find your Connector. Move your mouse over the icons right after the **Status** column to check the timestamp with the last time Connector successfully contacted Cloudflare.

---

## Deactivate Magic WAN Connector

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to deactivate, select the three dots next to it > **Edit**.
4. In Status, select _Deactivated_ from the dropdown.
5. Select **Update**.

---

## Change the Interrupt service Window

The interrupt service window defines when Magic WAN Connector can update its systems. When Magic WAN Connector is updating, this may result in an interruption to existing connections. Set up a time window that minimizes disruption to your sites.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find the Connector you want to deactivate, select the three dots next to it > **Edit**.
4. In **Interrupt service window**, select the most appropriate time for the Connector to update its systems.