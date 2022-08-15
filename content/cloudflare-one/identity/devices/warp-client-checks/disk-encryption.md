---
pcx_content_type: how-to
title: Disk Encryption
weight: 4
meta:
  title: Disk Encryption
---

# Disk Encryption

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The Disk Encryption device posture attribute ensures that disks are encrypted on a device.

To enable the Disk Encryption check:

1.  On the Zero Trust Dashboard, navigate to **Settings** > **WARP Client** > **Device posture**.
1.  Click **Add new**.
1.  Select **Disk Encryption**.
1.  Enter a descriptive name for the check.
1.  Select your operating system.
1.  Toggle on the **Enable Disk Encryption** switch.
1.  Click **Save**.

Your device posture attribute is now visible on the **Device posture** page.

## How the Zero Trust client determines encryption

Operating systems determine disk encryption in various ways. The following information will allow you to understand how the client determines disk encryption status on various systems.

### On macOS

1. Open a terminal window.
1. Run the `/usr/sbin/system_profiler SPStorageDataType` command to return a list of drivers on the system and note the value of **Mount Point**.
1. Run the `diskutil info` command for a specific **Mount Point** and look for the value returned for **FileVault**. It must show *Yes* for the disk to be considered encrypted.

```txt
% diskutil info /System/Volumes/Data | grep FileVault
   FileVault:                 Yes
```

All disks on the system must be encrypted for the posture check to pass.

### On Windows

1.  Open a Powershell window.
1.  Run the `Get-BitLockerVolume` command to list all volumes detected on the system.
1.  **Protection Status** must be set to *On*.

```txt
Get-BitLockerVolume
```
All disks on the system must be encrypted for the posture check to pass.
