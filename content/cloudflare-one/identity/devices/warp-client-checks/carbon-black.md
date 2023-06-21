---
pcx_content_type: how-to
title: Carbon Black
weight: 2
---

# Carbon Black

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Cloudflare Zero Trust can check if [Carbon Black](https://www.carbonblack.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Prerequisites

Before you start, make sure Carbon Black installed on your machine.

## Configure the Carbon Black check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

1. Scroll down to **WARP client checks** and select **Add new**.

1. Select **Carbon Black**.

1. You will be prompted for the following information:

   1. **Name**: Enter a unique name for this device posture check.
   1. **Operating system**: Select your operating system. You will need to configure one posture check per operating system (macOS and Windows currently supported).
   1. **Application Path**: Enter the full path to the Carbon Black process to be checked (for example, `c:\program files\CarbonBlack\CarbonBlack.exe`).
   1. **Signing certificate thumbprint (recommended)**: Enter the thumbprint of the publishing certificate used to sign the binary. This proves the binary came from Carbon Black and is the recommended way to validate the process.
   1. **SHA-256 (optional)**: Enter a SHA-256 value. This is used to validate the SHA256 signature of the binary and ensures the integrity of the binary file on the device. Note: do not fill out this field unless you strictly control updates to Carbon Black, as this will change between versions.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the Carbon Black check is returning the expected results.
