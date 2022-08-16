---
pcx_content_type: how-to
title: Carbon Black
weight: 2
---

# Carbon Black

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | Minimum WARP version required    | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux    | WARP with Gateway                                                                         | macOS: 1.4.34, Windows: 1.4.33.0 | All plans                                                     |

</div>
</details>

Cloudflare Zero Trust can check if [Carbon Black](https://www.carbonblack.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Prerequisites

Before you start, make sure Carbon Black installed on your machine.

## Configure the Carbon Black check

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.

1. Scroll down to **WARP client checks** and select **Add new**.

1. Select **Carbon Black**.

1. You will be prompted for the following information:

    1. **Name**: Enter a unique name for this device posture check.
    1. **Operating system**: Select your operating system. You will need to configure one posture check per operating system (macOS and Windows currently supported).
    1. **Application Path**: Enter the full path to the Carbon Black process to be checked (for example, `c:\program files\CarbonBlack\CarbonBlack.exe`).
    1. **Signing certificate thumbprint (recommended)**: Enter the thumbprint of the publishing certificate used to sign the binary. This proves the binary came from Carbon Black and is the recommended way to validate the process.
    1. **SHA-256 (optional)**: Enter a SHA-256 value. This is used to validate the SHA256 signature of the binary and ensures the integrity of the binary file on the device. Note: do not fill out this field unless you strictly control updates to Carbon Black, as this will change between versions.

Next, [verify](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) that the Carbon Black check is returning the expected results.
