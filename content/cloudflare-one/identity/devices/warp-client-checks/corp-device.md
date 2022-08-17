---
pcx_content_type: how-to
title: Device serial numbers
weight: 3
---

# Device serial numbers

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

Cloudflare Zero Trust allows you to build Zero Trust rules based on device serial numbers. You can create these rules so that access to applications is granted only to users connecting from company devices.

## Create a list of serial numbers

To create rules based on device serial numbers, you first need to create a [Gateway List](/cloudflare-one/policies/filtering/lists/) of numbers.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **My Team** > **Lists**.

1. Select **Create manual list** or **Upload CSV**. For larger teams, it is recommended to upload a CSV or use Cloudflare's [API endpoint](https://api.cloudflare.com/#zero-trust-lists-properties).

1. Give your list a descriptive name, as this name will appear when configuring your policies.

1. Set **List Type** to _Serial numbers_.

1. Enter the serial numbers of the devices your team manages, or upload your CSV file.

1. Select **Save**.

You can now create an [Access policy](/cloudflare-one/policies/access/) or a Gateway [network policy](/cloudflare-one/policies/filtering/network-policies/common-policies/#enforce-device-posture) that checks if the device presents a serial number on your list. In Access, the serial number check will appear as a _Device Posture - Serial Number List_ selector. In Gateway, your serial number list will appear in the **Value** dropdown when you choose the [Passed Device Posture Check](/cloudflare-one/policies/filtering/network-policies/#device-posture) selector.

## Determine the serial number

### On macOS

1. Open a terminal window.
1. Use the `system_profiler` command to check for the value of `SPHardwareDataTypeng` and retrieve the serial number.

    ```txt
    system_profiler SPHardwareDataType | grep 'Serial Number'
    ```

### On Windows

1. Open a Powershell window.
1. Use the `Get-CimInstance` command to get the SerialNumber property of the `Win32_BIOS` class.

    ```txt
    Get-CimInstance Win32_BIOS
    ```

### On Linux

1. Open a Terminal Window
1. Use the `dmidecode` command to get the version property `system-serial-number`.

    ```txt
    sudo dmidecode -s system-serial-number
    ```
