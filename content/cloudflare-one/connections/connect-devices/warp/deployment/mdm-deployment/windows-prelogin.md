---
pcx_content_type: how-to
title: Connect WARP before Windows login
weight: 3
---

# Connect WARP before Windows login

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| All modes | All plans  |

| System   | Availability | Minimum WARP version |
| ---------| -------------| ---------------------|
| Windows  | ✅           | 2024.6.415.0   |
| macOS    | ❌           |    |
| Linux    | ❌           |    |
| iOS      | ❌           |    |
| Android  | ❌           |    |
| ChromeOS | ❌           |    |

{{</details>}}

With Cloudflare Zero Trust, you can use an on-premise Active Directory (or similar) server to validate a remote user's Windows login credentials. Before the user enters their Windows login information, the WARP client establishes a connection using a service token. This initial connection is not associated with a user identity. Once the user completes the Windows login, WARP switches to an identity-based session.

## Prerequisites

- Active Directory resources are [connected to Cloudflare](/cloudflare-one/connections/connect-networks/private-net/).

## 1. Create a service token

{{<render file="access/_create-service-token.md">}}

## 2. Create a device enrollment policy

In your [device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/#set-device-enrollment-permissions), create the following policy:

  | Rule Action  | Rule type | Selector      | Value          |
  | ------------ | --------- | ------------- | -------------- |
  | Service Auth | Include   | Service Token | `<TOKEN-NAME>` |

## 2. (Optional) Restrict access during pre-login

Devices enrolled via a service token are identified by the email address `non_identity@<team-name>.cloudflareaccess.com`. Using this email address, you can apply specific [device profile settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) and [Gateway network policies](/cloudflare-one/policies/gateway/network-policies/) during the pre-login stage. For example, you could provide access to only those resources necessary to complete the Windows login and/or device management activities.

{{<details header="Example device profile rule" open="true">}}

| Selector           | Operator | Value            | Logic |
| ------------------ | -------- | ---------------- | ----- |
| User email         | in       | `non_identity@<team-name>.cloudflareaccess.com`  | And   |
| Operating system   | is       | Windows          |       |

{{</details>}}

{{<details header="Example Gateway network policy" open="true">}}

| Selector           | Operator | Value            | Logic |
| ------------------ | -------- | ---------------- | ----- |
| Destination IP     | in list  | `Active Directory servers` | And   |
| User email         | in       | `non_identity@<team-name>.cloudflareaccess.com`  | And |
| Passed Device Posture Checks	| in	| `Windows 10 or higher (OS version)`| |

| Action |
| ------ |
| Allow  |

{{</details>}}

## 3. Configure the MDM file

To enable the Windows pre-login feature, an MDM file in the following format must be [deployed](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#windows) on the device. In the example below, the `pre_login` key allows the device to connect using the service token while the remaining `configs` are supported by the [switch configurations](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/switch-organizations/) feature.

```xml
---
filename: C:\ProgramData\Cloudflare\mdm.xml
---

<dict>
  <key>pre_login</key>
  <dict>
    <key>organization</key>
    <string>mycompany</string>
    <key>auth_client_id</key>
    <string>your-token-id.access</string>
    <key>auth_client_secret</key>
    <string>your-token-secret</string>
  </dict>
  <key>configs</key>
  <array>
    <dict>
      <key>organization</key>
      <string>mycompany</string>
      <key>display_name</key>
      <string>Production environment</string>
    </dict>
    <dict>
      <key>organization</key>
      <string>mycompany</string>
      <key>override_api_endpoint</key>
      <string>203.0.113.0</string>
      <key>override_doh_endpoint</key>
      <string>203.0.113.0</string>
      <key>override_warp_endpoint</key>
      <string>203.0.113.0:2408</string>
      <key>display_name</key>
      <string>Cloudflare China network</string>
    </dict>
    <dict>
      <key>organization</key>
      <string>test-org</string>
      <key>display_name</key>
      <string>Test environment</string>
    </dict>
  </array>
</dict>
```

WARP will only apply the pre-login configuration when no other WARP registration exists and the user has not yet logged into Windows. To check for an existing WARP registration, you can open PowerShell and run `warp-cli registration show`. After the user logs into Windows, WARP will automatically switch to the default MDM configuration (`Production environment` in the above example) and establish a connection based on the user's identity. This user registration will then be used for any subsequent connections, including before the next Windows user login.

Deleting the user registration would cause WARP to switch back to the pre-login configuration.
