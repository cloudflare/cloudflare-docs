---
pcx_content_type: how-to
title: Disk encryption
weight: 4
meta:
  title: Disk encryption
---

# Disk encryption

The Disk Encryption device posture attribute ensures that disks are encrypted on a device.

## Prerequisites

- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[WARP client checks](/cloudflare-one/identity/devices/warp-client-checks/)">}}

## Enable the disk encryption check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
1. Scroll down to **WARP client checks** and select **Add new**.
1. Select **Disk Encryption**.
1. Enter a descriptive name for the check.
1. Select your operating system.
1. Either enable disk encryption for all volumes, or input the specific volume(s) you want to check for encryption (for example, `C`).
1. Select **Save**.

Next, go to **Logs** > **Posture** and verify that the disk encryption check is returning the expected results.

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

### On Windows

1. Open a PowerShell window.
1. Run the `Get-BitLockerVolume` command to list all volumes detected on the system.
1. **Protection Status** must be set to **On** for the disk to be considered encrypted.

### On Linux

List all hard drives on the system:

```sh
$ lsblk
NAME                        MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
nvme0n1                     259:0    0 476.9G  0 disk  
├─nvme0n1p1                 259:1    0   512M  0 part  /boot/efi
├─nvme0n1p2                 259:2    0   488M  0 part  /boot
└─nvme0n1p3                 259:3    0   476G  0 part  
  └─nvme0n1p3_crypt         253:0    0 475.9G  0 crypt 
    ├─my--vg-root   253:1            0 474.9G  0 lvm   /
    └─my--vg-swap_1 253:2            0   976M  0 lvm   [SWAP]
```

On Linux, encryption is reported per mounted partition, not physical drive. In the example above, the root and swap partitions are considered encrypted because they are located within a `crypt` container. The `/boot` and `/boot/efi` partitions remain unencrypted.

### On iOS, Android and ChromeOS

These platforms are always encrypted and so no disk encryption check is supported.
