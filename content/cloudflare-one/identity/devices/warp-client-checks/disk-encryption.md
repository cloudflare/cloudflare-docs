---
pcx_content_type: how-to
title: Disk encryption
weight: 4
meta:
  title: Disk encryption
---

# Disk encryption

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The Disk Encryption device posture attribute ensures that disks are encrypted on a device.

## Enable the disk encryption check

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
1. Scroll down to **WARP client checks** and select **Add new**.
1. Select **Disk Encryption**.
1. Enter a descriptive name for the check.
1. Select your operating system.
1. Turn on  **Enable Disk Encryption**.
1. Select **Save**.

Next, [verify](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) that the disk encryption check is returning the expected results.

## How WARP checks for encryption

Operating systems determine disk encryption in various ways. The following information will allow you to understand how the client determines disk encryption status on various systems.

### On macOS

1. Open a terminal window.
1. Run the `/usr/sbin/system_profiler SPStorageDataType` command to return a list of drivers on the system and note the value of **Mount Point**.

    ```sh
    $ /usr/sbin/system_profiler SPStorageDataType
    Storage:

        Data:

          Free: 428.52 GB (428,519,702,528 bytes)
          Capacity: 494.38 GB (494,384,795,648 bytes)
          Mount Point: /System/Volumes/Data
    ```

1. Run the `diskutil info` command for a specific **Mount Point** and look for the value returned for **FileVault**. It must show **Yes** for the disk to be considered encrypted.

    ```sh
    $ diskutil info /System/Volumes/Data | grep FileVault
      FileVault:                 Yes
    ```

All disks on the system must be encrypted for the posture check to pass.

### On Windows

1. Open a Powershell window.
1. Run the `Get-BitLockerVolume` command to list all volumes detected on the system.
1. **Protection Status** must be set to **On**.

All disks on the system must be encrypted for the posture check to pass.

### On Linux

Disk encryption checks are not currently supported on Linux.

### On iOS, Android and ChromeOS

These platforms are always encrypted and so no disk encryption check is supported.
