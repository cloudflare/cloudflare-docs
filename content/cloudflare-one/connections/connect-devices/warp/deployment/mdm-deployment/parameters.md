---
pcx_content_type: reference
title: Parameters
weight: 2
---

# Parameters

Each client supports the following set of parameters as part of their deployment, regardless of the deployment mechanism.

{{<Aside type="note">}}

Most of the parameters listed below are also configurable in Zero Trust under **Settings** > **Devices**. In the event of conflicting settings, the WARP client will always give precedence to settings on the local device (for example, in your `mdm.xml` or `com.cloudflare.warp.plist` files).

{{</Aside>}}

## Required for full Cloudflare Zero Trust features

For the majority of Cloudflare Zero Trust features to work, you need to specify a team name. Examples of Cloudflare Zero Trust features which depend on the team name are [HTTP policies](/cloudflare-one/policies/gateway/http-policies/), [Browser Isolation](/cloudflare-one/policies/browser-isolation/), and [device posture](/cloudflare-one/identity/devices/).

### `organization`

Instructs the client to register the device with your organization. Registration requires authentication via an [IdP](/cloudflare-one/identity/idp-integration/) or [Service Auth](/cloudflare-one/identity/service-tokens/).

**Value Type:** `string`

**Value:** Your [team name](/cloudflare-one/glossary/#team-name).

## Required for DNS-only policy enforcement

This field is used to enforce DNS policies when deploying the client in DoH-only mode. 

### `gateway_unique_id`

Instructs the client to direct all DNS queries to a specific [Gateway DNS location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/). This value is only necessary if deploying without a [team name](#organization) or in an organization with multiple DNS locations.  If you do not supply a DoH subdomain, we will automatically use the default Gateway DNS location for your organization.

**Value Type:** `string`

**Value:** Your [DoH subdomain](/cloudflare-one/glossary/#doh-subdomain).

## Optional fields

### `service_mode`

Allows you to choose the operational mode of the client.

**Value Type:** `string`

**Value:**

- `1dot1` &mdash; Gateway enforcement of DNS policies only through [DoH](/cloudflare-one/glossary/#doh-subdomain). All other traffic is handled by your device's default mechanisms.
- `warp` &mdash; (default) All traffic sent through [Cloudflare Gateway](/cloudflare-one/glossary/#cloudflare-gateway) via our encrypted tunnel. This mode is required for features such as HTTP policies, Browser Isolation, identity-based rules, and device posture.

New service modes such as **Proxy only** are not supported as a value and must be configured in Zero Trust.

### `onboarding`

Controls the visibility of the onboarding screens that ask the user to review the privacy policy during an application's first launch.

**Value Type:** `boolean`

**Value:**

- `false` &mdash; Screens hidden.
- `true` &mdash; (default) Screens visible.

### `switch_locked`

Allows the user to turn off the WARP switch and disconnect the client.

**Value Type:** `boolean`

**Value:**

- `false` &mdash; (default) The user is able to turn the switch on/off at their discretion. When the switch is off, the user will not have the ability to reach sites protected by Access that leverage certain device posture checks.
- `true` &mdash; The user is prevented from turning off the switch. The WARP client will automatically start in the connected state.

On new deployments, you must also include the `auto_connect` parameter with at least a value of `0`. This will prevent clients from being deployed in the off state without a way for users to manually enable them.

{{<Aside type="note">}}

This parameter replaces the old `enabled` property, which can no longer be used in conjunction with the new `switch_locked` and `auto_connect`. If you want to use these parameters, you must remove `enabled`.

{{</Aside>}}

### `auto_connect`

If switch has been turned off by user, the client will automatically turn itself back on after the specified number of minutes. We recommend keeping this set to a very low value &mdash; usually just enough time for a user to log in to hotel or airport Wi-Fi. If any value is specified for `auto_connect` the default state of the WARP client will always be Connected (for example, after the initial install or a reboot).

**Value Type:** `integer`

**Value:**

- `0` &mdash; Allow the switch to stay in the off position indefinitely until the user turns it back on.
- `1` to `1440` &mdash; Turn switch back on automatically after the specified number of minutes.

{{<Aside>}}
This parameter replaces the old `enabled` property, which can no longer be used in conjunction with the new `switch_locked` and `auto_connect`. If you want to use these parameters, you must remove `enabled`.
{{</Aside>}}

### `support_url`

When the WARP client is deployed via MDM, the in-app **Send Feedback** button is disabled by default. This parameter allows you to re-enable the button and direct feedback towards your organization.

**Value Type:** `string`

**Value:**

- `https://<support.example.com>` &mdash; Use an `https://` link to open your company's internal help site.
- `mailto:<yoursupport@example.com>` &mdash; Use a `mailto:` link to open your default mail client.

### `override_api_endpoint`

Overrides the [IP address](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#client-orchestration-api) used by the WARP client to communicate with the client orchestration API. If you set this parameter, be sure to update your organization's firewall to ensure the new IP is allowed through.

This functionality is intended for use with a Cloudflare China local network partner or any other third-party network partner that can maintain the integrity of network traffic. Most IT admins should not set this setting as it will redirect all API traffic to a new IP.

**Value Type:** `string`

**Value:** `1.2.3.4` &mdash; Redirect all client orchestration API calls to `1.2.3.4`.

The string must be a valid IPv4 or IPv6 address, otherwise the WARP client will fail to parse the entire MDM file.

### `override_doh_endpoint`

Overrides the [IP address](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#doh-ip) used by the WARP client to resolve DNS queries via DNS over HTTPS (DoH). If you set this parameter, be sure to update your organization's firewall to ensure the new IP is allowed through.

This functionality is intended for use with a Cloudflare China local network partner or any other third-party network partner that can maintain the integrity of network traffic. Most IT admins should not set this setting as it will redirect all DoH traffic to a new IP.

**Value Type:** `string`

**Value:** `1.2.3.4` &mdash; Redirect all DNS over HTTPS lookups to `1.2.3.4`.

The string must be a valid IPv4 or IPv6 address, otherwise the WARP client will fail to parse the entire MDM file.

### `override_warp_endpoint`

Overrides the [IP address and UDP port](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#warp-ingress-ip) used by the WARP client to send traffic to Cloudflare's edge.  If you set this parameter, be sure to update your organization's firewall to ensure the new IP is allowed through.

This functionality is intended for use with a Cloudflare China local network partner or any other third-party network partner that can maintain the integrity of network traffic. Most IT admins should not set this setting as it will redirect all WARP traffic to a new IP.

**Value Type:** `string`

**Value:** `1.2.3.4:500` &mdash; Redirect all WARP traffic to `1.2.3.4` on port `500`.

The string must be a valid IPv4 or IPv6 socket address (containing the IP address and port number), otherwise the WARP client will fail to parse the entire MDM file.

### `unique_client_id`

Assigns a unique identifier to the device for the [device UUID posture check](/cloudflare-one/identity/devices/warp-client-checks/device-uuid).

**Value Type:** `string`

**Value:** UUID for the device (for example, `496c6124-db89-4735-bc4e-7f759109a6f1`).

### `auth_client_id`

Enrolls the device in your Zero Trust organization using a [service token](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/#check-for-service-token). Requires the `auth_client_secret` parameter.

**Value Type:** `string`

**Value:** `Client ID` of the service token.

### `auth_client_secret`

Enrolls the device in your Zero Trust organization using a [service token](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/#check-for-service-token). Requires the `auth_client_id` parameter.

**Value Type:** `string`

**Value:** `Client Secret` of the service token.
