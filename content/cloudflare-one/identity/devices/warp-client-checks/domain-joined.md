---
pcx_content_type: how-to
title: Domain Joined
weight: 15
meta:
  title: Domain Joined
---

# Domain Joined

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Windows           | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The Domain Joined device posture attribute ensures that a user is a member of a specific Windows Active Directory domain.

To enable the Domain Joined check:

1.  On the Zero Trust Dashboard, navigate to **Settings** > **WARP Client** > **Device posture**.
1.  Click **Add new**.
1.  Select **Domain Joined**.
1.  Enter a descriptive name for the check.
1.  Enter the domain you want Domain Joined to check for.
1.  Click **Save**.

Your device posture attribute is now visible on the **Device posture** page.

### Validate the domain value on your Windows device

1.  Open a Powershell window.
1.  Run the `(Get-WmiObject Win32_ComputerSystem).Domain` command to determine the value of your domain.

```txt
(Get-WmiObject Win32_ComputerSystem).Domain
```
