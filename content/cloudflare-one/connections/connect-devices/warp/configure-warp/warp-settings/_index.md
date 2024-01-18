---
pcx_content_type: reference
title: WARP settings
weight: 2
---

# WARP settings

WARP settings define the WARP client modes and permissions available to end users.

- [Global settings](#global-settings) apply to all devices enrolled in your Zero Trust organization.
- [Device settings](#device-settings) may vary across devices depending on which [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) is applied.

## Global settings

### Admin override

{{<render file="warp/_all-systems-modes-plans.md">}}

{{<Aside type="note">}}

In order to enable **Admin override**, [**Lock WARP switch**](#lock-warp-switch) must also be enabled.

{{</Aside>}}

When `Enabled`, end users can turn off the WARP client using a one-time code provided by an admin. This feature allows users to work around a temporary network issue (for example, an incompatible public Wi-Fi, or a firewall at a customer site blocking the connection).

You can also set a **Timeout** to define how long the user is allowed to toggle on or off the WARP switch.

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
4. Turn off the WARP switch.

The WARP client will now show **Disabled by Admin Override** and the time when the override code expires. The client will automatically reconnect after the [Auto connect period](#auto-connect), but the user can continue to turn off WARP until Admin override times out.

### Install CA to system certificate store

{{<details header="Feature availability">}}

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Windows, macOS, Linux | Gateway with WARP, Proxy mode                                                        | All plans                                                     |

{{</details>}}

When `Enabled`, the WARP client will [automatically install](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cert-with-warp/) your organization's root certificate on the device.

{{<heading-pill style="beta" heading="h3">}}Override local interface IP{{</heading-pill>}}

{{<details header="Feature availability">}}

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Windows, macOS, Linux | Gateway with WARP, Secure Web Gateway without DNS Filtering                                                        | All plans                                                     |

{{</details>}}

Overrides the default IP address of WARP's [virtual network interface](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#ip-traffic) such that each device has its own unique local interface IP.

**Value:**

- `Disabled`: (default) Sets the local interface IP to `172.16.0.2` on all devices.

- `Enabled`: Sets the local interface IP on each device to its {{<glossary-tooltip term_id="CGNAT IP">}}CGNAT IP{{</glossary-tooltip>}}.  The change takes effect within 24 hours.

This setting is primarily used to enable site-to-site connectivity with [WARP connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/). You can also use it when the default IP conflicts with other local services on your network.

## Device settings

### Captive portal detection

{{<render file="warp/_all-systems-modes-plans.md">}}

When `Enabled`, the WARP client will automatically turn off when it detects a {{<glossary-tooltip term_id="captive portal">}}captive portal{{</glossary-tooltip>}}, and it will automatically turn back on after the **Timeout** duration.

Since captive portal implementations vary, WARP may not detect all captive portals. For more information, refer to [Captive portal detection](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/captive-portals/).

### Mode switch

{{<details header="Feature availability">}}

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                        | All plans                                                     |

{{</details>}}

When `Enabled`, users have the option to switch between [Gateway with WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#gateway-with-warp-default) mode and [Gateway with DoH mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#gateway-with-doh). This feature does not support switching between any other modes.

### Lock WARP switch

{{<details header="Feature availability">}}

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Any mode                                                                                  | All plans                                                     |

{{</details>}}

Allows the user to turn off the WARP switch and disconnect the client.

**Value:**

- `Disabled`: (default) The user is able to turn the switch on or off at their discretion. When the switch is off, the user will not have the ability to reach sites protected by Access that leverage certain device posture checks.
- `Enabled`: The user is prevented from turning off the switch. The WARP client will always start in the connected state.

On MDM deployments, you must also include the `auto_connect` parameter with at least a value of `0`. This will prevent clients from being deployed in the off state without a way for users to manually enable them.

### Allow device to leave organization

{{<render file="warp/_all-systems-modes-plans.md">}}

**Value:**

- `Enabled`: (default) Users who manually enrolled their device are allowed to log out from your Zero Trust organization.
- `Disabled`: Users who manually enrolled their device are prevented from leaving your Zero Trust organization. This disables the **Logout from Zero Trust** and **Reset All Settings** button in the WARP client interface. If the WARP client has been deployed with a management tool and a local policy exists, then this switch is bypassed and clients are always prevented from leaving.

### Allow updates

{{<details header="Feature availability">}}

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux | Any mode                                                                                  | All plans                                                     |

{{</details>}}

When `Enabled`, users will receive update notifications when a new version of the client is available. Only turn this on if your users are local administrators with the ability to add or remove software from their device.

### Auto connect

{{<render file="warp/_all-systems-modes-plans.md">}}

When `Enabled`, the client will automatically reconnect if it has been disabled for the specified **Timeout** value. This setting is best used in conjunction with [Lock WARP Switch](#lock-warp-switch) above.

We recommend keeping this set to a very low value — usually just enough time for a user to log in to hotel or airport Wi-Fi. If any value is specified, the client defaults to the Connected state (for example, after a reboot or the initial install).

**Value:**

- `0`: Allow the switch to stay in the off position indefinitely until the user turns it back on.
- `1` to `1440`: Turn switch back on automatically after the specified number of minutes.

### Support URL

{{<render file="warp/_all-systems-modes-plans.md">}}

When `Enabled`, the **Send Feedback** button in the WARP client appears and will launch the URL specified. Example **Support URL** values are:

- `https://support.example.com`: Use an https:// link to open your companies internal help site.
- `mailto:yoursupport@example.com`: Use a `mailto:` link to open your default mail client.

### Service mode

{{<render file="warp/_all-systems-modes-plans.md">}}

Allows you to choose the operational mode of the client. Refer to [WARP Modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes) for a detailed description of each mode.

### Local Domain Fallback

{{<details header="Feature availability">}}

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems | Gateway with WARP, Gateway with DoH   | All plans                                                     |

{{</details>}}

Configures the WARP client to redirect DNS requests to a private DNS resolver. For more information, refer to our [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) documentation.

### Split Tunnels

{{<render file="warp/_all-systems-modes-plans.md">}}

Configures the WARP client to exclude or include traffic to specific IP addresses or domains. For more information, refer to our [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) documentation.

### Directly route Office 365 traffic

{{<render file="warp/_all-systems-modes-plans.md">}}

Creates [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) Exclude entries for all [Office 365 IP addresses specified by Microsoft](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service). To use this setting, **Split Tunnels** must be set to **Exclude IPs and domains**. Once enabled, all Office 365 network traffic will bypass WARP and Gateway.

{{<heading-pill style="beta" heading="h3">}} Allow users to enable local network exclusion {{</heading-pill>}}

{{<render file="warp/_all-systems-modes-plans.md">}}

This setting is intended as a workaround for users whose home network uses the same set of IP addresses as your corporate private network.

When `Enabled`, users have the option to access local network resources (such as printers and storage devices) while connected to WARP. When the user enables **Access local network** in the WARP GUI, WARP will detect the local IP range advertised by the user’s home network (for example, `10.0.0.0/24`) and temporarily exclude this range from the WARP tunnel. The user will need to re-request access after the **Timeout** expires.

{{<Aside type="warning" header="Warning">}}
Enabling this setting comes with two major consequences:
- **Device is exposed to security threats.** The user may be unaware that traffic to what used to be their company's private network is now actually being routed to their local network. This leaves the device vulnerable to [on-path attackers](https://www.cloudflare.com/learning/security/threats/on-path-attack/) and other security vulnerabilities. For example, imagine that a user's typical workflow involves logging into a remote desktop on the corporate network at `10.0.0.30`. A bad actor could set up a fake server on the local network at `10.0.0.30`. If the user goes to `10.0.0.30` while **Access local network** is enabled, the attacker can now steal their credentials.
- **User loses access to corporate resources.** — While accessing their local network, the user will be unable to connect to corporate resources that fall within the same IP/CIDR range.

{{</Aside>}}