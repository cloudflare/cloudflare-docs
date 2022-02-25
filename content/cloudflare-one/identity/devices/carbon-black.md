---
pcx-content-type: how-to
title: Carbon Black
weight: 4
---

# Carbon Black

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | Minimum WARP version required | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---------- | ---- |
| macOS, Windows | WARP with Gateway | macOS: 1.4.34, Windows: 1.4.33.0 | All plans |

</div>
</details>

Cloudflare Zero Trust can check if [Carbon Black](https://www.carbonblack.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Configuring the Cloudflare integration

Before you start, make sure Carbon Black installed on your machine.

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team > Devices > Device posture**.

2.  Select **+Add**.

    ![Device posture attributes](/cloudflare-one/static/documentation/identity/devices/device-posture-partners.png)

3.  Select **Carbon Black**.

4.  You will be prompted for the following information:
    *   **Name:** A unique identifier for this Carbon Black device posture check
    *   **Operating system:** You’ll need to configure one posture check per operating system (macOS and Windows currently supported)
    *   **Application Path:** Enter the full path to the Carbon Black process to be checked (for example, `c:\program files\CarbonBlack\CarbonBlack.exe`)
    *   **Certificate thumbprint (optional):** The thumbprint of the publishing certificate used to sign the binary. This proves the binary came from Carbon Black and is the recommended way to validate the process
    *   **SHA256 checksum (optional):** Used to validate the SHA256 signature of the binary. This verifies the binary exactly matches the one you expect to be there. Note: do not fill out this field unless you strictly control updates to Carbon Black, as this will change between versions

5.  Once you have configured your Carbon Black instance, you can then add Carbon Black device posture checks to any application protected by Access.
