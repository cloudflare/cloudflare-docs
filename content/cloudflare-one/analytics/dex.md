---
pcx_content_type: reference
title: Digital Experience Monitoring
weight: 1
---

# Digital Experience Monitoring

Digital Experience Monitoring provides visibility into device, network, and application performance across your Zero Trust organization.  This information enables you to understand the state of your WARP client deployment and quickly resolve issues impacting end-user productivity.

To view an overview of all enrolled devices, go to **DEX** > **Analytics**. You will see the following metrics:

- **Devices connected by colo**: Number of devices that are connected to a given [Cloudflare data center](https://www.cloudflarestatus.com/).
- **Connectivity status**: Percentage of devices in a given WARP client state.
{{<table-wrap>}}
| Status            | Description |
|-------------------|-------------|
| Connected    |  WARP has successfully established a connection to the Cloudflare global network.  |
| Disconnected | WARP has been intentionally or unintentionally disconnected from the Cloudflare global network.  |
| Paused       | A user or administrator has taken an explicit action to temporarily disconnect WARP, for example by entering an [Admin Override](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#admin-override) code.|
| Connecting   | WARP is pending connection, but is actively trying to establish a connection to the Cloudflare global network. |
{{</table-wrap>}}

- **Mode**: [WARP mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) deployed on the devices.
- **Colo**: Percentage of devices connected to a given Cloudflare data center.
- **Platform**: Operating system of the devices.
- **Major Version**: WARP client version installed on the devices.
- **Device Status Over Time**: Device connectivity over the selected time period.
- **Connection Methods Over Time**: WARP mode used by the devices over the selected time period.

You can view this data on a per-device level by going to **My Team** > **Devices**. The **DEX** tab will show real-time and historical connectivity metrics for the selected device.
