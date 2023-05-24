---
pcx_content_type: reference
title: Fleet status
weight: 1
---

# Fleet status

With DEX, you can monitor your users' devices and connection status.

## View metrics

To view an overview of all enrolled devices, go to **DEX** > **Monitoring**. The **Fleet Status** tab will show real-time and historical connectivity metrics for all devices in your organization.

To view analytics on a per-device level, go to **My Team** > **Devices**. The **Fleet Status** tab will show real-time and historical connectivity metrics for the selected device.

## Available metrics

- **Devices connected by colo**: Number of devices that are connected to a given [Cloudflare data center](https://www.cloudflarestatus.com/).
- **Connectivity status**: Percentage of devices in a given WARP client state.
{{<table-wrap>}}
| Status            | Description |
|-------------------|-------------|
| Connected    |  WARP has successfully established a connection to the Cloudflare global network.  |
| Disconnected | WARP has been intentionally or unintentionally disconnected from the Cloudflare global network.  |
| Paused       | A user or administrator has taken an explicit action to temporarily turn off WARP, for example by entering an [Admin Override](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#admin-override) code.  Paused clients will [auto-connect](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#auto-connect) after a timeout period. |
| Connecting   | WARP is pending connection, but is actively trying to establish a connection to the Cloudflare global network. |
{{</table-wrap>}}

- **Mode**: [WARP mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) deployed on the device.
- **Colo**: Percentage of devices connected to a given Cloudflare data center.
- **Platform**: Operating system of the device.
- **Major Version**: WARP client version installed on the device.
- **Device Status Over Time**: WARP client connection status over the selected time period.
- **Connection Methods Over Time**: WARP mode used by the device over the selected time period.

