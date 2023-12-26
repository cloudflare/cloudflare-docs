---
title: Customize device profiles
pcx_content_type: overview
weight: 2
layout: learning-unit
---

{{<render file="warp/_device-profiles-intro.md" productFolder="cloudflare-one">}}

## Configure the default profile

Set your default device profile to be applicable to a majority of your userbase, or any user without known explicit considerations.

To customize the default profile:

1. Go to **Settings** > **WARP Client**.
2. Under **Device settings**, select the default profile and select **Configure**.
3. Many customers running Cloudflare Zero Trust as a VPN replacement have a default profile that resembles the following. Feel free to modify this configuration to the needs of your organization.

    | Setting | State | Notes |
    | ------- | ----- | ----- |
    | Captive portal detection | Enabled | |
    | Mode switch | Disabled | |
    | Lock WARP switch | Enabled | Ensures that DNS traffic is always inspected. Only disable if your users frequently travel to unmanaged locations where the firewall could block the [WARP IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).  |
    | Allow device to leave organization | Disabled | |
    | Allow updates | Disabled | Usually disabled on managed devices. |
    | Auto connect | Enabled | Timeout is usually set between 10min - 30min. |
    | Support URL | Enabled | |
    | Service mode | Gateway with WARP | |
    | Local Domain Fallback | | Refer to [Resolve Private DNS] |
    | Split Tunnels | Exclude IPs and domains | Refer to [Configure Split Tunnels] |
    | Directly route Office 365 traffic | Disabled | |

4. Save the profile.
5. Under **Global settings**,
    1. (Recommended) Enable **Admin override code** if you turned on **Lock WARP switch**.
    2. Enable **Install CA to system certificate store** if you want users to see a [custom block page](/cloudflare-one/policies/gateway/configuring-block-page/).

## (Optional) Create an office profile

You can configure a device settings profile to take effect when the device is connected to a trusted network such as an office. For example, you may wish to allow users in the office to access applications directly rather than route traffic through Cloudflare.

For setup instructions, refer to [Add a managed network](/cloudflare-one/connections/connect-devices/warp/configure-warp/managed-networks/).
