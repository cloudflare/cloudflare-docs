---
title: Customize device profiles
pcx_content_type: overview
weight: 2
layout: learning-unit
---

{{<render file="warp/_device-profiles-intro.md" productFolder="cloudflare-one">}}

## Configure the default profile

Set your default device profile to be applicable to a majority of your userbase, or any user without known explicit considerations.

To customize the default settings:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Go to **Settings** > **WARP Client**.
2. Under **Device settings**, select the default profile and select **Configure**.
3. Many customers running Cloudflare Zero Trust as a VPN replacement have a default profile that resembles the following. Refer to [WARP client settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/) for a description of each setting.
{{<table-wrap style="font-size: 92%">}}
| Setting                              | State                   | Notes                                                                                                                                                                                                                                                                                          |
| ------------------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Captive portal detection             | Enabled                 |                                                                                                                                                                                                                                                                                                |
| Mode switch                          | Disabled                | Usually disabled for a VPN replacement use case. If enabled, users have the option to switch to a DNS-only security mode and lose access to your private network.                                                                                                                              |
| Lock WARP switch                     | Enabled                 | Should be enabled unless users have an explicit reason to disable WARP, such as a conflicting VPN client on the device or other extenuating circumstances. If disabled for concerns about user experience, **Auto Connect** should be enabled and set on a short interval, like 10-15 minutes. |
| Allow device to leave organization   | Disabled                |                                                                                                                                                                                                                                                                                                |
| Allow updates                        | Disabled                | Usually disabled on managed devices. If enabled, users who are local administrators on their device can update the WARP client on their own — this can introduce version consistency control issues if WARP versions are centrally managed by IT.                                              |
| Auto connect                         | Enabled                 | Timeout is usually set between 10min - 30min.                                                                                                                                                                                                                                                  |
| Support URL                          | Enabled                 |                                                                                                                                                                                                                                                                                                |
| Service mode                         | Gateway with WARP       | Proxies device traffic to Cloudflare according to your Split Tunnel rules.                                                                                                                                                                                                                     |
| Local Domain Fallback                |                         | Refer to [Resolve Private DNS](/learning-paths/replace-vpn/configure-device-agent/private-dns/).                                                                                                                                                                                               |
| Split Tunnels                        | Exclude IPs and domains | Refer to [Define Split Tunnels settings](/learning-paths/replace-vpn/configure-device-agent/split-tunnel-settings/).                                                                                                                                                                           |
| Directly route Microsoft 365 traffic | Disabled                | Usually disabled to allow inspection of Microsoft 365 traffic.                                                                                                                                                                                                                                 |
{{</table-wrap>}}

4. Save the profile.
5. Under **Global settings**,
    1. (Recommended) Enable **Admin override code** if you turned on **Lock WARP switch**.
    2. Enable **Install CA to system certificate store** if you want users to see a [custom block page](/cloudflare-one/policies/gateway/configuring-block-page/).

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. Update the default device settings profile:

```bash
curl --request PATCH \
https://api.cloudflare.com/client/v4/accounts/{account_id}/devices/policy \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "allow_mode_switch": false,
  "allow_updates": false,
  "allowed_to_leave": false,
  "auto_connect": 900,
  "captive_portal": 180,
  "disable_auto_fallback": true,
  "exclude_office_ips": false,
  "service_mode_v2": {
    "mode": "warp"},
  "support_url": "https://it.company.com/help",
  "switch_locked": true
}'
```

2. Update global settings:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/devices/settings \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "disable_for_time": 3600,
  "root_certificate_installation_enabled": true
}'
```

{{</tab>}}
{{</tabs>}}

## (Optional) Create an office profile

You can configure a device settings profile to take effect when the device is connected to a trusted network such as an office. For example, you may wish to allow users in the office to access applications directly rather than route traffic through Cloudflare.

For setup instructions, refer to [Add a managed network](/cloudflare-one/connections/connect-devices/warp/configure-warp/managed-networks/).
