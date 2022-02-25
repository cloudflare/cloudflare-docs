---
pcx-content-type: how-to
title: OS Version
weight: 5
---

# OS Version

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| Windows, Mac | WARP with Gateway | All plans |

</div>
</details>

The OS Version device posture attribute checks whether the version of a device’s operating system matches, is greater than or lesser than a given **Semver** version. The version formation must be specified as a valid Semver (for example, `x.x.x` or `1.2.0`).

To enable the OS version check:

1.  On the Zero Trust Dashboard, navigate to **My Team** > **Devices** > **Device posture**.
2.  Click **+Add**.
3.  Select **OS version**.
4.  Enter a descriptive name for the check.
5.  Combine the **Operating system**, **Operator**, and **Value** fields to specify the OS version you want devices to match.
6.  Click **Save**.

## Determine the OS Version

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS Version posture check expects.

<Aside type='note'>

You must ensure the version is entered is a valid `x.x.x` Semver. If the command below only returns a value of `x.x`, you must append a `.0` so the complete version follows the `x.x.0` format.

  </Aside>

### On macOS

1.  Open a terminal window.
2.  Use the `defaults` command to check for the value of `SystemVersionStampAsString`.

```txt
defaults read loginwindow SystemVersionStampAsString
```

### On Windows

1.  Open a Powershell window.
2.  Use the `Get-CimInstance` command to get the version property of the `Win32_OperatingSystem` class.

```txt
(Get-CimInstance Win32_OperatingSystem).version
```
