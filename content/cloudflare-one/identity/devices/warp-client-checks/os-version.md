---
pcx_content_type: how-to
title: OS version
weight: 8
---

# OS version

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All      | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The OS Version device posture attribute checks whether the version of a device’s operating system matches, is greater than or lesser than the configured value. The version must be specified as a valid Semver (for example, `1.2.0`).

## Enable the OS version check

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **WARP client checks** and select **Add new**.
3. Select **OS version**.
4. Configure the **Operating system**, **Operator**, and **Value** fields to specify the OS version you want devices to match.

{{<Aside type="note">}}

Ensure the version is entered as a valid `x.x.x` Semver. If your device is running OS version `x.x`, you must enter `x.x.0`.

{{</Aside>}}

5. Select **Save**.

Next, [verify](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) that the OS version check is returning the expected results.

## Determine the OS version

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS version posture check expects.

### On macOS

1. Open a terminal window.
1. Use the `defaults` command to check for the value of `SystemVersionStampAsString`.

    ```txt
    defaults read loginwindow SystemVersionStampAsString
    ```

### On Windows

1. Open a Powershell window.
1. Use the `Get-CimInstance` command to get the version property of the `Win32_OperatingSystem` class.

    ```txt
    (Get-CimInstance Win32_OperatingSystem).version
    ```

### On Linux

Linux currently relies on the system Kernel version instead of a specific distro version. For the OS version check to work, the kernel version must be converted to a valid SemVer.

1. Open a Terminal window.
1. Run the `uname -r` command to get the complete version.

    ```bash
    uname -r
    ```

1. The valid SemVer would be the first 3 whole numbers of the output you obtain in the previous step. For instance, if the command above returned `5.14.0-25.el9.x86_64`, the valid SemVer would be `5.14.0`.


### On ChromeOS

On Chromebooks, the WARP client runs as an Android application inside an Android VM. For the OS version check, WARP version 6.16 and below reports the Android VM version and not the ChromeOS version. Version 6.17 and above returns the actual ChromeOS version. 

To determine the ChromeOS version on your device, select the time and go to **Settings** > **About ChromeOS**.

