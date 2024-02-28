---
title: Connect with the WARP client
pcx_content_type: learning-unit
weight: 6
layout: learning-unit
---

The Cloudflare WARP client (known as the Cloudflare One Agent in mobile app stores) allows you to protect corporate devices by securely and privately sending traffic from those devices to Cloudflare's global network, where Cloudflare Gateway can apply advanced web filtering.

Choose this option if:

- You want to create DNS policies based on user identity.
- You want to apply consistent policies for both remote and on-site users.
- You are interested in progressing from DNS-only security to the advanced protection offered by a Secure Web Gateway.

## Deploy WARP on a test device

Most admins test by downloading the client and authenticating in with a [one-time PIN](/cloudflare-one/identity/one-time-pin/).

1. If you previously [connected without an agent](/learning-paths/defense-in-depth/build-dns-policies/onboard-dns/), undo the DoH configuration in your browser or OS. Otherwise, your device will continue to send queries to the DoH endpoint instead of forwarding requests through WARP.
2. Turn on one-time PIN authentication:
    {{<render file="access/_one-time-pin.md" productFolder="cloudflare-one">}}
3. Turn on device enrollment:

    {{<render file="warp/_device-enrollment.md" productFolder="cloudflare-one">}}

4. Switch the agent to DNS-only mode:
    1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.
    2. In the **Device settings** card, select the **Default** profile.
    3. Select **Configure**.
    4. For **Service mode**, select **Gateway with DoH**.
    5. Select **Save profile**.

5. If you are running third-party firewall or TLS decryption software, verify that it does not inspect or block traffic to these IP addresses:
    - Client orchestration IPs:
        {{<render file="warp/_client-orchestration-ips.md" productFolder="cloudflare-one">}}
    - Gateway DoH IPs:
        {{<render file="warp/_doh-ips.md" productFolder="cloudflare-one">}}
For more information, refer to [WARP with firewall](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
6. Uninstall any existing third-party software that may manage DNS resolution. Sometimes products placed in a disconnected or turned off state will still interfere with the WARP client.
7. Manually install WARP on the device.

{{<details header="Window, macOS, and Linux">}}

{{<render file="warp/_enroll-desktop.md" productFolder="cloudflare-one">}}

{{</details>}}

{{<details header="iOS, Android, and ChromeOS">}}

{{<render file="warp/_enroll-ios-android.md" productFolder="cloudflare-one">}}

{{</details>}}

The WARP client should show as **Connected**. By default, all DNS queries from the device will be forwarded to Cloudflare Gateway for filtering.
