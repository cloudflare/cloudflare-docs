---
title: Connect with the Cloudflare One Agent
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

The Cloudflare One Agent allows you to protect corporate devices by securely and privately sending traffic from those devices to Cloudflare’s global network, where Cloudflare Gateway can apply advanced web filtering.

Choose this option if:

- You want to create DNS policies based on user identity.
- You want to apply consistent policies for both remote and on-site users.
- You are interested in progressing from DNS-only security to the advanced protection offered by a Secure Web Gateway.

## Deploy the agent on a test device

Most admins test by downloading the client and authenticating in with a [one-time PIN](/cloudflare-one/identity/one-time-pin/).

1. Enable one-time PIN authentication:
    {{<render file="_one-time-pin.md" productFolder="cloudflare-one">}}
2. Enable device enrollment:

    {{<render file="_device-enrollment.md" productFolder="cloudflare-one">}}

3. Switch the agent to DNS-only mode:
    1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.
    2. In the **Device settings** card, select the **Default** profile.
    3. Select **Configure**.
    4. For **Service mode**, select **Gateway with DoH**.
    5. Select **Save profile**.

4. If you are running third-party firewall or TLS decryption software, verify that it does not inspect or block traffic to these IP addresses:
    - Client orchestration IPs:
        {{<render file="_client-orchestration-ips.md" productFolder="cloudflare-one">}}
    - Gateway DoH IPs:
        {{<render file="_doh-ips.md" productFolder="cloudflare-one">}}
For more information, refer to [WARP with firewall](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
5. [Download](/cloudflare-one/connections/connect-devices/warp/download-warp/) and install the agent on the device.
6. Once the agent is installed, manually authenticate into your Zero Trust organization:

<details>
<summary>Windows and macOS</summary>
<div>

{{<render file="_enroll-windows-mac.md" productFolder="cloudflare-one">}}
</div>
</details>

<details>
<summary>Linux</summary>
<div>

{{<render file="_enroll-linux.md" productFolder="cloudflare-one">}}
</div>
</details>

<details>
<summary>iOS, Android, and ChromeOS</summary>
<div>

{{<render file="_enroll-ios-android.md" productFolder="cloudflare-one">}}

</div>
</details>

The agent will now forward all DNS queries from the device to Cloudflare Gateway for filtering.
