---
order: 3
pcx-content-type: how-to
---

# SentinelOne

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | Minimum WARP version required | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---------- | ---- |
| macOS, Windows | WARP with Gateway | macOS: 1.4.27, Windows: 1.4.25.0 | All plans |

</div>
</details>

Cloudflare Zero Trust can check if [SentinelOne](https://www.sentinelone.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Configuring the Cloudflare integration

Before you start, make sure SentinelOne is installed on your machine.

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team > Devices > Device posture**.

2.  Select **+Add**.

    ![Device posture attributes](../../static/documentation/identity/devices/device-posture-partners.png)

3.  Select **SentinelOne**.

4.  You will be prompted for the following information:

    *   **Name:** A unique identifier for this SentinelOne device posture check
    *   **Operating system:** You’ll need to configure one posture check per operating system (macOS and Windows currently supported)
    *   **Application Path:** Enter the full path to the SentinelOne process to be checked (for example, `c:\program files\SentinelOne\SentinelOne.exe`)
    *   **Certificate thumbprint (optional):** The thumbprint of the publishing certificate used to sign the binary. This proves the binary came from SentinelOne and is the recommended way to validate the process
    *   **SHA256 checksum (optional):** Used to validate the SHA256 signature of the binary. This verifies the binary exactly matches the one you expect to be there. Note: do not fill out this field unless you strictly control updates to SentinelOne, as this will change between versions

5.  Once you have configured your SentinelOne instance, you can then add SentinelOne device posture checks to any application protected by Access.
