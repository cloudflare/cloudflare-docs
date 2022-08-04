---
pcx_content_type: how-to
title: OS Version
weight: 5
---

# OS Version

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All      | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

The OS Version device posture attribute checks whether the version of a device’s operating system matches, is greater than or lesser than a given **Semver** version. The version formation must be specified as a valid Semver (for example, `x.x.x` or `1.2.0`).

To enable the OS version check:

1.  On the Zero Trust Dashboard, navigate to **My Team** > **Devices** > **Device posture**.
1.  Click **+Add**.
1.  Select **OS version**.
1.  Enter a descriptive name for the check.
1.  Combine the **Operating system**, **Operator**, and **Value** fields to specify the OS version you want devices to match.
1.  Click **Save**.

## Determine the OS Version

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS Version posture check expects.

{{<Aside type="note">}}

You must ensure the version is entered is a valid `x.x.x` Semver. If the command below only returns a value of `x.x`, you must append a `.0` so the complete version follows the `x.x.0` format.

{{</Aside>}}

### On macOS

1.  Open a terminal window.
1.  Use the `defaults` command to check for the value of `SystemVersionStampAsString`.

```txt
defaults read loginwindow SystemVersionStampAsString
```

### On Windows

1.  Open a Powershell window.
1.  Use the `Get-CimInstance` command to get the version property of the `Win32_OperatingSystem` class.

```txt
(Get-CimInstance Win32_OperatingSystem).version
```

### On Linux

Linux currently relies on the system Kernel version instead of a specific distro version. For the OS Version check to work, the kernel version must be converted to a valid SemVer.

1.  Open a Terminal window.
1.  Run the `uname -r` command to get the complete version.
1.  The valid SemVer would be the first 3 whole numbers of the output you obtain in the previous step. For instance, if the command above returned `5.14.0-25.el9.x86_64`, the valid SemVer would be `5.14.0`.
 
```txt
uname -r
```
