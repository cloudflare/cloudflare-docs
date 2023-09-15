---
pcx_content_type: how-to
title: Firewall
weight: 8
meta:
  title: Firewall
---

# Firewall

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows    | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The Firewall device posture attribute ensures that a firewall is running on a device.

## Enable the firewall check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
1. Scroll down to **WARP client checks** and select **Add new**.
1. Select **Firewall**.
1. Enter a descriptive name for the check.
1. Select your operating system.
1. Turn on **Enable firewall check**.
1. Select **Save**.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the firewall check is returning the expected results.

## How WARP checks the firewall status

Operating systems determine Firewall configuration in various ways. Follow the steps below to understand how the WARP client determines if the firewall is enabled.

### On macOS

macOS has two firewalls: an application-based firewall and a port-based firewall. The WARP client will report a firewall is enabled if either firewall is running.

#### Application-based firewall

1. Open **System Preferences** and go to **Security & Privacy**.
1. Verify that **Firewall** is set to **On**.

#### Port-based firewall

1. Run `sudo /sbin/pfctl -s info`.
1. Look for the value of **Status** which must be **Enabled**.

### On Windows

1. Open a PowerShell window.
1. Run the `Get-NetFirewallProfile -Name Public` command to check the Firewall status of your public interface.
1. Look for the value of **Enabled** which must be set to **True**.
