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

With Cloudflare Zero Trust, you can use an on-premise Active Directory (or similar) server to validate a remote user's Windows login credentials. Before the user enters their Windows login information for the first time, the WARP client establishes a connection using a service token. This initial connection is not associated with a user identity. Once the user completes the Windows login, WARP switches to an identity-based session and applies the user registration to all future logins.

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

Devices enrolled via a service token are identified by the email address `non_identity@<team-name>.cloudflareaccess.com`. Using this email address, you can apply specific [device profile settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) and [Gateway network policies](/cloudflare-one/policies/gateway/network-policies/) during the pre-login state. For example, you could provide access to only those resources necessary to complete the Windows login and/or device management activities.

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

To enable the Windows pre-login feature, an MDM file in the following format must be [deployed](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#windows) on the device. In the following example, the `pre_login` key allows the device to connect using the service token, while `configs` contains your default Zero Trust configuration.

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
    <string>TOKEN-ID</string>
    <key>auth_client_secret</key>
    <string>TOKEN-SECRET</string>
  </dict>
  <key>configs</key>
  <array>
    <dict>
      <key>organization</key>
      <string>mycompany</string>
      <key>display_name</key>
      <string>Default</string>
    </dict>
  </array>
</dict>
```

WARP will only apply the pre-login configuration when no other WARP registration exists and the user has not yet logged into Windows. When the pre-login configuration is in effect, the device will appear on **My Team** > **Devices** with the email `non_identity@<team-name>.cloudflareaccess.com`.

After the user logs into Windows, WARP will automatically switch to the default MDM configuration and prompt the user to authenticate with the IdP. Once authenticated, WARP registers and connects with the user identity. The **My Team** > **Devices** page will now show a new device associated with the user's email. This user registration will then be used for any subsequent connections, including before the next Windows user login.

Deleting the user registration would cause WARP to switch back to the pre-login configuration as soon as the user logs out of Windows.
