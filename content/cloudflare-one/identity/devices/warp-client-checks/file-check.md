---
pcx_content_type: how-to
title: File check
weight: 7
---

# File check

{{<render file="posture/_available-for-warp-with-gateway.md">}}

The File Check device posture attribute checks for the presence of a file on a device. You can create multiple file checks for each operating system you need to run it on, or if you need to check for multiple files.

## Configure a file check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

1. Scroll down to **WARP client checks** and select **Add new**.

1. Select **File Check**.

1. You will be prompted for the following information:

   1. **Name**: Enter a unique name for this device posture check.
   1. **Operating system**: Select your operating system.
   1. **File Path**: Enter a file path (for example, `c:\my folder\myfile.exe`).
   1. **Signing certificate thumbprint (recommended)**: Enter the [thumbprint](/cloudflare-one/identity/devices/warp-client-checks/application-check/#determine-the-signing-thumbprint) of the publishing certificate used to sign the file. Adding this information will enable the check to ensure that the file was signed by the expected software developer.
   1. **SHA-256 (optional)**: Enter the [SHA-256 value](/cloudflare-one/identity/devices/warp-client-checks/application-check/#determine-the-sha-256-value) of the file. This is used to ensure the integrity of the file on the device.

1. Select **Save**.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the file check is returning the expected results.
