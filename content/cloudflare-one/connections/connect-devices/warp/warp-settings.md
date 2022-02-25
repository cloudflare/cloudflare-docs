---
pcx-content-type: reference
title: WARP settings
weight: 7
---

# WARP settings

<Aside type="note">

If you are deploying [WARP in managed mode](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/), refer to this [list of parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) instead. Any settings you configure on the Zero Trust Dashboard will be overridden by the local policy deployed by your management software. To ensure Dashboard settings are applied as intended, remove the corresponding parameters from management configuration.

</Aside>

To manage WARP settings and device connectivity preferences, navigate to **Settings** > **Devices** on the Zero Trust dashboard.

## Admin override

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

<Aside type='note'>

This feature needs the <b>Lock WARP switch</b> feature to be set to <b>True</b>. You can enable the feature via MDM or under <b>Settings</b> > <b>Devices</b> on the Zero Trust Dashboard.

</Aside>

When this toggle is **enabled**, you can provide end users with an one-time password that will allow them to toggle off the WARP client in case they need to work around a temporary network issue (for example, an incompatible public Wi-Fi, or a firewall at a customer site blocking the connection).

When the toggle is **disabled**, one-time passwords will not be generated, and end users will not be able to toggle the client off when \**Switch Locked* is true.

You can also set a timeout to define how long the WARP client is allowed to be paused once the end user disables it. Once the time is up, the WARP client will automatically reconnect.

When you want to allow a user to disable the WARP client:

1.  Log in to the Zero Trust Dashboard and ensure the **Admin override** toggle is enabled.
2.  Retrieve the 7-digit override code for their device by navigating to **My Team** > **Devices** > **Connected devices**, clicking on **View** for the desired device, and scrolling down to **User details**.
3.  Copy the code and share it with the end user for them to enter on their device.

Users will then need to open the WARP client on their devices, navigate to **Preferences** > **Advanced** > **Enter code**, and enter the override code in the pop-up window. The WARP client will now show as `Disconnected` and will mention the time when it will automatically reconnect.

## Device enrollment permissions

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| All systems | Any mode | All plans |

</div>
</details>

Cloudflare Zero Trust allows you to establish which users in your organization can enroll new devices or revoke access to connected devices. To do that, you can create a device enrollment rule on the Zero Trust dashboard:

1.  Navigate to **Settings** > **Devices**.
2.  In the **Device enrollment permissions** card, click **Manage**.
3.  In the rule builder, configure one or more rules to define who can enroll or revoke devices.
4.  Click **Save**.

## Captive portal detection

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows | WARP with Gateway | All plans |

</div>
</details>

Captive Portal detection is the ability for the WARP client to detect a third-party onboarding flow before Internet access is obtained. This is most frequent in places such as airports, cafes, and hotels.

When the toggle is enabled, the WARP client will automatically turn off when it detects a captive portal, and it will automatically turn on after the amount of time you specify in the card.

## Mode switch

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | WARP with Gateway | All plans |

</div>
</details>

When the toggle is enabled, users have the option to turn off the [Gateway with WARP](/cloudflare-one/connections/connect-devices/warp/#gateway-with-warp-default) mode and switch to [Gateway with DoH mode](/cloudflare-one/connections/connect-devices/warp/#gateway-with-doh). When the toggle is disabled, end users will not be able to switch between WARP modes.

## Lock WARP switch

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

When the toggle is enabled, users are prevented from turning off the connected state of the application (main toggle switch).

## Allow device to leave organization

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

When the toggle is enabled, users who manually logged into their organization on WARP are prevented from leaving that organization. This disables the **Logout from Zero Trust** and **Reset All Settings** button in the WARP client interface. If the WARP client has been deployed with a management tool and a local policy exists, then this switch is bypassed and clients are always prevented from leaving.

## Allow updates

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

When the toggle is enabled, users will receive update notifications when a new version of the client is available. Only turn this on if your users are local administrators with the ability to add/remove software from their device.

## Auto Connect

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

When the toggle is enabled, the client will automatically reconnect if it has been disabled for the specified Timeout value. This setting is best used in conjunction with [Lock WARP Switch](/cloudflare-one/connections/connect-devices/warp/warp-settings/#lock-warp-switch) above.

## Allow device to leave organization

<details>
<summary>Support URL</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

When the toggle is enabled, the **Send Feedback** button in the WARP client appears and will launch the URL specified. Example **Support URL** values are:

*   `https://support.example.com` Use an https:// link to open your companies internal help site.
*   `mailto:yoursupport@example.com` Use a mailto: link to open your default mail client.

## Service Mode

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans |

</div>
</details>

Allows you to choose the operational mode of the client. See [WARP Modes](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) for a detailed description of each mode.

*   **Gateway with WARP** DNS and Device traffic is encrypted and processed by Gateway. This mode is required if you want to enable HTTP rules, Browser Isolation, Anti-Virus scanning and DLP.
*   **Gateway with DoH** Enforcement of DNS policies only through DoH. All other traffic is handled by default mechanisms on your devices.
*   **Proxy Only** Only traffic sent to the localhost proxy is encrypted by Gateway. This mode does not process DNS traffic.

***

## Integrated experiences

Cloudflare Zero Trust allows you to perform one-click actions to accelerate Office 365 traffic. Navigate to **Settings** > **Network** on the Zero Trust dash and either:

*   **Create a Do Not Inspect policy** that bypasses inspection for Office 365 traffic. This policy uses the [domains and IP address specified by Microsoft for Office 365](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service), and in addition to that, it uses our own Cloudflare’s intelligence to determine which traffic is part of this app type.
*   **Exclude Office 365 Traffic** by adding your application’s IP address as a split tunnel entry. This uses the [IP addresses specified by Microsoft for Office 365](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service).
