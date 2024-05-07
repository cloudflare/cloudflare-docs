---
title: Site Analytics
pcx_content_type: how-to
weight: 1
meta:
  title: Magic WAN Site Analytics
---

# Magic WAN Site Analytics

Magic WAN Site Analytics provides an overview of the connectivity status and traffic analytics of all Magic WAN sites. Magic WAN Site Analytics is a great place to start if you receive a Magic WAN alert, need to begin the Magic WAN troubleshooting process, or are performing routine monitoring.

Magic WAN Site Analytics has the following data types available:
- Geographic Map Summary
    - Aggregate Magic WAN Site Health
    - MWAN Site Geographic Location
- Magic WAN Site Data Table
    - Site Name
    - Site Health
    - Site Tunnel Names
    - Site Tunnel Statuses
    - Site Traffic Sent
    - Site Traffic Received
- Magic WAN Site Data
    - Traffic Sent by Tunnel
    - Traffic Received by Tunnel

To start using Magic WAN Site Analytics:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Magic WAN** > **Overview**.
3. You will have access to an overview map with all your active sites, and any alerts for sites that are unhealthy or have no status available to them.

## Configure Magic WAN Site Analytics

### Set geographic coordinates

When you create a site, you can set geographic coordinates in order for it to show on the Overview map. You can also add this information to sites you have already created. To add a Magic WAN site to the geographic map in the Overview page:

1. Go to **Magic WAN** > **Sites**.
2. Select a specific site > **Edit**.
3. Scroll to **Site Location**.
4. Set the **latitude** and **longitude** coordinates of the Magic WAN Site.
5. Scroll down and select **Save**.
6. The Magic WAN Site will now appear on the geographic map in the Overview page.

### Set thresholds for Magic WAN site health

You can set Magic Tunnel health alerts to receive alerts when the percentage of successful health checks for a Magic Tunnel drops below the selected service-level objective (SLO). Setting health alerts will also show unhealthy tunnels in the Overview map:

1. Configure [Magic Tunnel health alerts](/magic-wan/configuration/common-settings/configure-magic-tunnel-alerts/) across all of the Magic Tunnels associated with each Magic WAN Site.
2. After configuring Magic Tunnel health alerts, any Magic WAN Site with a Magic Tunnel that is outside of its SLO threshold will be labeled unhealthy in the Overview map.