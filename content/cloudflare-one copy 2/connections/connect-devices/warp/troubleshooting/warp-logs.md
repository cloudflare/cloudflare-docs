---
pcx_content_type: reference
title: Debug logs
weight: 7
---

# Debug logs

The WARP client provides diagnostic logs that you can use to troubleshoot connectivity issues on a device.

## macOS/Windows/Linux

### Retrieve logs

To view debug logs on desktop devices:

{{<tabs labels="macOS | Windows | Linux">}}
{{<tab label="macos" no-code="true">}}

1. Open a Terminal window.
2. Run the `warp-diag` tool:
    ```sh
    $ warp-diag
    ```
This will place a `warp-debugging-info-<date>-<time>.zip` on your Desktop.

{{</tab>}}
{{<tab label="windows" no-code="true">}}

1. Open a Command Prompt or PowerShell window.
2. Run the `warp-diag` tool:
    ```bash
    C:\Users\JohnDoe>warp-diag
    ```
This will place a `warp-debugging-info-<date>-<time>.zip` on your Desktop.

{{</tab>}}
{{<tab label="linux" no-code="true">}}

1. Open a Terminal window.
2. Run the `warp-diag` tool:
    ```sh
    $ warp-diag
    ```
This will place a `warp-debugging-info-<date>-<time>.zip` in the same folder you ran the command from.

{{</tab>}}
{{</tabs>}}

### `warp-diag` logs

The `warp-debugging-info-<date>-<time>.zip` archive contains the following files:

{{<table-wrap>}}
| File name          | Description |
| ------------------ | ----------- |
| `boringtun.log`    | Log for the WARP tunnel that serves traffic from the device to Cloudflare's global network. |
| `connectivity.txt` | DNS resolution and HTTP trace requests to [validate a successful connection](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#connectivity-check).
| `daemon.log`       | Detailed log of all actions performed by the WARP client, including all communication between the device and Cloudflare's global network.  **Note:** This is the most useful debug log. |
| `daemon_dns.log`   | Contains detailed DNS logs if **Log DNS queries** was enabled on WARP. |
| `date.txt`         | Date and time (UTC) when you ran the `warp-diag` command.|
| `dns-check.txt`    | Verifies that the WARP DNS servers are set as system default. For [operating modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) where DNS filtering is enabled, this file contains the IPs of the local WARP DNS proxy (`127.0.2.2:0`, `127.0.2.3:0`, `[fd01:db8:1111::2]:0`, and `[fd01:db8:1111::3]:0`).|
| `dns_stats.log`    | Statistics on the DNS queries received and resolved by WARP, generated every two minutes. |
| `etc-hosts.txt`    | Static DNS config of device. |
| `gui-launcher.log` | macOS console log showing application launch|
| `gui-log.log`      | Log file for the GUI app that users interact with. |
| `hostname.txt`     | Name of the device. |
| `ifconfig.txt` </br> `ipconfig.txt`    | IP configuration of each network interface. |
| `installer.log`    | MSI or PKG installation log |
| `local_policy_redacted.txt` | [Managed deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) on the device. |
| `netstat.txt` </br> `routetable.txt` | Routing table used by the device.  |
| `netstat-v6.txt`   | IPv6 routing table (Linux only). |
| `platform.txt`     | Operating system of the device. |
| `ps.txt` <br> `processes.txt` | List of all active processes on the device when `warp-diag` was run. |
| `resolv.conf`      |  The contents of the `/etc/resolv.conf` file on Mac/Linux, where system DNS servers are configured. |
| `route.txt`        | Output from the `route get` command used to verify that network traffic is going over the correct interface. |
| `scutil-dns.txt`   | DNS configuration on Mac/Linux (available in `ipconfig.txt` on Windows). |
| `scutil-proxy.txt` | Proxy configuration on Mac/Linux (available in `ipconfig.txt` on Windows). |
| `stats.log`        | Uptime and throughput stats for the WARP tunnel, generated every two minutes. |
| `sw-vers.txt`      | Operating system of the device. |
| `sysinfo.json`     | CPU and memory usage when `warp-diag` was run. This information is useful for determining whether slow speeds are due to heavy system load. |
| `systeminfo.txt` </br> `system-profile.txt` | System software overview.  |
| `timezone.txt`     | Local timezone of the device specified as a UTC offset. |
| `traceroute.txt`   | Traceroute to the [WARP ingress IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#warp-ingress-ip) showing the path from the device to Cloudflare's global network.|
| `uname.txt`        |  Linux-only system information including kernel version. |
| `v4interfaces.txt` </br> `v4subinterfaces.txt` </br> `v6interfaces.txt` </br> `v6subinterfaces.txt` | IPv4 and IPv6 network configuration on Windows. |
| `version.txt`      | [WARP client version](/cloudflare-one/connections/connect-devices/warp/download-warp/) installed on the device. |
| `warp-account.txt` | WARP client device enrollment information. |
| `warp-device-posture.txt` | [Device posture data](/cloudflare-one/identity/devices/warp-client-checks/) obtained by the WARP client. |
| `warp-dns-stats.txt`| Summary of recent DNS queries on the device since `dns-stats.log` was generated. |
| `warp-network.txt` | Network settings on the device detected by WARP. |
| `warp-settings.txt`| [WARP client settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/) applied to the device. |
| `warp-stats.txt`   | Uptime and throughput of the WARP tunnel since `stats.log` was generated. |
| `warp-status.txt`  | Status of WARP switch (`Connected` or `Disconnected`). |

{{</table-wrap>}}

#### Multiple versions of the same log

The `warp-debugging-info` folder may contain multiple versions of the same log, such as `daemon.log`, `daemon.1.log`, and `daemon.2.log`. Since logs can get very long, they are rotated either daily or when they exceed a certain size.

- `<logfile>.log` is the most current log. This is almost always the log you should be looking at, as it shows events that occurred on the day you ran the `warp-diag` command.
- `<logfile>.1.log` shows events from the previous day.
- `<logfile>.2.log` shows events from two days before.

{{<Aside type="note">}}
In timestamped logs such as `daemon.log`, the most recent events will appear at the end of the file.
{{</Aside>}}

## iOS/Android/ChromeOS

### Retrieve logs

To view debug logs on mobile devices:

1. Open the 1.1.1.1 app.
2. Go to **Settings** > **Advanced** > **Diagnostics**.
3. Scroll down to **Debug logs** and choose from the [available logs](#mobile-app-logs).

### Mobile app logs

Mobile app logs contain a subset of the information available for desktop clients. To learn more about these files, refer to their equivalent [warp-diag logs](#warp-diag-logs).

#### iOS

| Name          | Equivalent warp-diag log |
| ------------------ | ----------- |
| **DNS logs**       | `daemon_dns.log`|
| **Console logs** > **Extension logs** | `daemon.log`|
| **Console logs** > **Application logs** | `connectivity.txt` and `gui-log.log`|
| **Routing table**  | `netstat.txt`|

#### Android/ChromeOS

| Name          | Equivalent warp-diag log |
| ------------------ | ----------- |
| **DNS logs**       | `daemon_dns.log`|
| **Console logs** | `connectivity.txt`, `netstat.log`, and `gui-log.log` |
| **Native logs**  | `daemon.log` |
