---
pcx_content_type: reference
title: WARP settings
weight: 2
layout: single
---

# WARP settings

WARP settings define the WARP client modes and permissions available to end users.

- [Global settings](#global-settings) apply to all devices enrolled in your Zero Trust organization.
- [Device settings](#device-settings) may vary across devices depending on which [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) is applied.

## Global settings

### Admin override

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

{{<Aside type="note">}}

In order to enable **Admin override**, [**Lock WARP switch**](#lock-warp-switch) must also be enabled.

{{</Aside>}}

When `Enabled`, end users can turn off the WARP client using a one-time code provided by an admin. This feature allows users to work around a temporary network issue (for example, an incompatible public WiFi, or a firewall at a customer site blocking the connection).

You can also set a **Timeout** to define how long the WARP client is allowed to be paused once the end user disables it. Once the timeout expires, the WARP client will automatically reconnect.

#### Retrieve the override code

To retrieve the one-time code for a user:

1. Enable **Admin override**.
2. Go to **My Team** > **Devices**.
3. Select **View** for a connected device.
4. Scroll down to **User details** and copy the 7-digit **Override code**.
5. Share this code with the end user for them to enter on their device.

#### Enter the override code

To turn off the WARP client on a user device:

1. In the WARP client, go to **Settings** > **Preferences** > **Advanced**.
2. Select **Enter code**.
3. Enter the override code in the pop-up window.

The WARP client will now show as `Disconnected` and will mention the time when it will automatically reconnect.

## Device settings

### Captive portal detection

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems    | Any mode                                                                         | All plans                                                     |

</div>
</details>

Captive portal detection is the ability for the WARP client to detect a third-party onboarding flow before Internet access is obtained. Captive portals typically occur in places such as airports, cafes, and hotels.

When `Enabled`, the WARP client will automatically turn off when it detects a captive portal, and it will automatically turn back on after the **Timeout** duration.

### Mode switch

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                        | All plans                                                     |

</div>
</details>

When `Enabled`, end users have the option to switch between [Gateway with WARP](/cloudflare-one/connections/connect-devices/warp/#gateway-with-warp-default) mode and [Gateway with DoH mode](/cloudflare-one/connections/connect-devices/warp/#gateway-with-doh). This feature does not support switching between any other modes.

### Lock WARP switch

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

Allows the user to turn off the WARP switch and disconnect the client.

**Value:**

- `Disabled`: (default) The user is able to turn the switch on or off at their discretion. When the switch is off, the user will not have the ability to reach sites protected by Access that leverage certain device posture checks.
- `Enabled`: The user is prevented from turning off the switch. The WARP client will always start in the connected state.

On new deployments, you must also include the `auto_connect` parameter with at least a value of `0`. This will prevent clients from being deployed in the off state without a way for users to manually enable them.

### Allow device to leave organization

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

**Value:**
- `Enabled`: (default) Users who manually enrolled their device are allowed to log out from your Zero Trust organization.
- `Disabled`: Users who manually enrolled their device are prevented from leaving your Zero Trust organization. This disables the **Logout from Zero Trust** and **Reset All Settings** button in the WARP client interface. If the WARP client has been deployed with a management tool and a local policy exists, then this switch is bypassed and clients are always prevented from leaving.

### Allow updates

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux | Any mode                                                                                  | All plans                                                     |

</div>
</details>

When `Enabled`, users will receive update notifications when a new version of the client is available. Only turn this on if your users are local administrators with the ability to add or remove software from their device.

### Auto connect

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

When `Enabled`, the client will automatically reconnect if it has been disabled for the specified **Timeout** value. This setting is best used in conjunction with [Lock WARP Switch](#lock-warp-switch) above.

We recommend keeping this set to a very low value — usually just enough time for a user to log in to hotel or airport WiFi. If any value is specified, the client defaults to the Connected state (for example, after a reboot or the initial install).

**Value:**

- `0`: Allow the switch to stay in the off position indefinitely until the user turns it back on.
- `1` to `1440`: Turn switch back on automatically after the specified number of minutes.

### Support URL

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

When `Enabled`, the **Send Feedback** button in the WARP client appears and will launch the URL specified. Example **Support URL** values are:

- `https://support.example.com`: Use an https:// link to open your companies internal help site.
- `mailto:yoursupport@example.com`: Use a`mailto: link to open your default mail client.

### Service mode

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

Allows you to choose the operational mode of the client. Refer to [WARP Modes](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) for a detailed description of each mode.

- **Gateway with WARP** DNS and Device traffic is encrypted and processed by Gateway. This mode is required if you want to enable HTTP rules, Browser Isolation, Anti-Virus scanning and DLP.
- **Gateway with DoH** Enforcement of DNS policies only through DoH. All other traffic is handled by default mechanisms on your devices.
- **Proxy Only** Only traffic sent to the localhost proxy is encrypted by Gateway. This mode does not process DNS traffic.

### Split Tunnels

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

</div>
</details>

Configures the WARP client to exclude or include traffic to specific IP addresses or domains. For more information, refer to our [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/split-tunnels/) documentation.

### Local Domain Fallback

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Gateway with WARP, Gateway with DoH   | All plans                                                     |

</div>
</details>

Configures the WARP client to redirect DNS requests to a private DNS resolver. For more information, refer to our [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/local-domains/) documentation.
