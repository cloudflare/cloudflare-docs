---
pcx_content_type: how-to
title: SentinelOne
weight: 11
---

# SentinelOne

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Cloudflare Zero Trust can check if [SentinelOne](https://www.sentinelone.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Prerequisites

Before you start, make sure SentinelOne is installed on your machine.

## Configure the SentinelOne check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

2. Scroll down to **WARP client checks** and select **Add new**.

3. Select **SentinelOne**.

4. You will be prompted for the following information:

   1. **Name**: Enter a unique name for this device posture check.
   2. **Operating system**: Select your operating system. You will need to configure one posture check per operating system.
   3. **Application Path**: Enter the full path to the SentinelOne process to be checked (for example, `C:\Program Files\SentinelOne\Sentinel Agent 21.7.4.1043\SentinelAgent.exe`).
   {{<Aside type="note">}}
  
   The path of the SentinelOne process may change between updates. Make sure to edit **Application Path** to match the new path, or use `%PATH%` variables.
  
   {{</Aside>}}
   4. **Signing certificate thumbprint (recommended)**: Enter the thumbprint of the publishing certificate used to sign the binary. This proves the binary came from SentinelOne and is the recommended way to validate the process.
   5. **SHA-256 (optional)**: Enter a SHA-256 value. This is used to validate the SHA256 signature of the binary and ensures the integrity of the binary file on the device. Note: do not fill out this field unless you strictly control updates to SentinelOne, as this will change between versions.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the SentinelOne check is returning the expected results.
