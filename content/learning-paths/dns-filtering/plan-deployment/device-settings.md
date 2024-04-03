---
title: WARP client settings
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

[WARP settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/) define the client mode, user permissions, DNS traffic routing, and other WARP client behavior.

To configure these settings for your organization:

1. Go to **Settings** > **WARP Client**.
2. Under **Device settings**, select the default profile and select **Configure**.
3. We recommend the following [device settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/) as a starting point. Feel free to modify this configuration to the needs of your organization.

    | Setting | State | Notes |
    | ------- | ----- | ----- |
    | Captive portal detection | Enabled | |
    | Mode switch | Disabled | Gateway with WARP mode is unnecessary if you are only filtering DNS.|
    | Lock WARP switch | Enabled | Ensures that DNS traffic is always inspected. Only disable if your users frequently travel to unmanaged locations where the firewall could block the [WARP IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).  |
    | Allow device to leave organization | Disabled | |
    | Allow updates | Disabled | Usually disabled on managed devices. |
    | Auto connect | Enabled | Timeout is usually set between 10min - 30min. |
    | Support URL | Enabled | |
    | Service mode | Gateway with DoH | |
    | Local Domain Fallback | | Add internal domains that do not have a public DNS record. The WARP client is still responsible for proxying all DNS traffic but will query a private DNS server for domains on this list. To learn more, refer to [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/). |
    | Split Tunnels | | Unused for DNS filtering. |
    | Directly route Office 365 traffic | Disabled | Unused for DNS filtering.|

4. Save the profile.
5. Under **Global settings**,
    1. (Recommended) Enable **Admin override code** if you turned on **Lock WARP switch**.
    2. Enable **Install CA to system certificate store** if you want users to see a [custom block page](/cloudflare-one/policies/gateway/configuring-block-page/).
