---
pcx-content-type: how-to
title: Firewall
weight: 17
meta:
  title: Firewall
---

# Firewall

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows    | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The Firewall device posture attribute ensures that a firewall is running on a device.

To enable the Firewall check:

1.  On the Zero Trust Dashboard, navigate to **My Team** > **Devices** > **Device posture**.
1.  Click **+Add**.
1.  Select **Firewall**.
1.  Enter a descriptive name for the check.
1.  Select your operating system.
1.  Toggle on the **Enable firewall check** switch.
1.  Click **Save**.

Your device posture attribute is now visible on the **Device posture** page.

## How Firewall running is determined

Operating systems determine Firewall configuration in various ways. The following information will allow you to understand how the client determines if the firewall is enabled.

### On macOS

1.  Open System Preferences and navigate to **Security & Privacy**
1.  Verify that **Firewall** is **On**.


### On Windows

1.  Open a Powershell window.
1.  Use the `Get-NetFirewallProfile -Name Public` to check the Firewall status of your public interface
1.  Look for the value of **Enabled** which must be set to **True**.

```txt
Get-NetFirewallProfile -Name Public
```

