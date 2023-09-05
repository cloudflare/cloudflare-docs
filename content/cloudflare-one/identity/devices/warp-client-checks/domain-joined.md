---
pcx_content_type: how-to
title: Domain joined
weight: 6
meta:
  title: Domain joined
---

# Domain joined

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Windows           | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The Domain Joined device posture attribute ensures that a user is a member of a specific Windows Active Directory domain.

## Enable the Domain Joined check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
1. Scroll down to **WARP client checks** and select **Add new**.
1. Select **Domain Joined**.
1. Enter a descriptive name for the check.
1. Select your operating system.
1. Enter the domain you want to check for, such as `example.com`.
1. Select **Save**.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the Domain Joined check is returning the expected results.

### Validate the domain value on your Windows device

1. Open a PowerShell window.
1. Run the `(Get-WmiObject Win32_ComputerSystem).Domain` command to determine the value of your domain.

   ```txt
   (Get-WmiObject Win32_ComputerSystem).Domain
   ```
