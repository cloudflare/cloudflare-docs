---
pcx_content_type: how-to
title: OS version
weight: 8
---

# OS version

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems               | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The OS Version device posture attribute checks whether the version of a device’s operating system matches, is greater than or lesser than the configured value.

## Enable the OS version check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **WARP client checks** and select **Add new**.
3. Select **OS version**.
4. Configure the **Operating system**, **Operator**, and **Value** fields to specify the OS version you want devices to match.

{{<Aside type="note">}}
The OS version must be specified as a valid Semver. For example, if your device is running OS version `1.2`, you must enter `1.2.0`.
{{</Aside>}}
5. (Optional) Configure additional OS-specific fields:

{{<tabs labels="macOS | iOS | Linux">}}
{{<tab label="macos" no-code="true">}}

In **Version extra**, enter the macOS [Rapid Security Response (RSR)](https://support.apple.com/guide/deployment/rapid-security-responses-dep93ff7ea78/web) version you want devices to match. Be sure to include the parenthesis around the letter.

Example: `(a)`

{{</tab>}}
{{<tab label="ios" no-code="true">}}

In **Version extra**, enter the iOS [Rapid Security Response (RSR)](https://support.apple.com/guide/deployment/rapid-security-responses-dep93ff7ea78/web) version you want devices to match. Be sure to include the parenthesis around the letter.

Example: `(a)`

{{</tab>}}

{{<tab label="linux" no-code="true">}}

In **Distro name** and **Distro revision**, enter the Linux distribution you want devices to match. The distro version always matches with an equal-to operator (==), regardless of the **Operator** setting.

Example: `ubuntu 22.04`
 
{{</tab>}}
{{</tabs>}}

6. Select **Save**.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the OS version check is returning the expected results.

## Determine the OS version

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS version posture check expects.

### On macOS

1. Open a terminal window.
1. Use the `defaults` command to check for the value of `SystemVersionStampAsString`.

   ```sh
   $ defaults read loginwindow SystemVersionStampAsString
   ```

### On Windows

1. Open a PowerShell window.
1. Use the `Get-CimInstance` command to get the version property of the `Win32_OperatingSystem` class.

   ```bash
   (Get-CimInstance Win32_OperatingSystem).version
   ```

### On Linux

#### OS version

The Linux OS version check returns the system kernel version. For the OS version check to work, the kernel version must be converted to a valid SemVer.

1. Open a Terminal window.
2. Run the `uname -r` command to get the complete version.

   ```sh
   $ uname -r
   ```

3. The valid SemVer would be the first 3 whole numbers of the output you obtain in the previous step. For instance, if the command above returned `5.14.0-25.el9.x86_64`, the valid SemVer would be `5.14.0`.

#### Distro version

The WARP client reads **Distro name** and **Distro revision** from the `/etc/os-release` file. The name comes from the **ID** field, and the revision comes from the **VERSION_ID** field.

To determine the Linux distro version on your device:

1. Open a Terminal window.
2. Get the OS identification fields that contain `ID`:

   ```sh
   $ cat /etc/os-release | grep "ID"
   ```

3. If the output of the above command contained `ID=ubuntu` and `VERSION_ID=22.04`, **Distro name** would be `ubuntu` and **Distro revision** would be `22.04`. The WARP client will check these strings for an exact match.

### On ChromeOS

On Chromebooks, the WARP client runs as an Android application inside an Android VM. For the OS version check, WARP version 6.16 and below reports the Android VM version and not the ChromeOS version. Version 6.17 and above returns the actual ChromeOS version.

To determine the ChromeOS version on your device, select the time and go to **Settings** > **About ChromeOS**.
