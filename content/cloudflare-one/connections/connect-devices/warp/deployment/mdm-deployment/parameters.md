---
pcx_content_type: reference
title: Parameters
weight: 2
---

# Parameters

Each client supports the following set of parameters as part of their deployment, regardless of the deployment mechanism.

{{<Aside type="note">}}

Most of the parameters listed below are also configurable in the Zero Trust Dashboard under **Settings** > **Devices**. In the event of conflicting settings, the WARP client will always give precedence to settings on the local device (for example, in your `mdm.xml` or `com.cloudflare.warp.plist` files).

{{</Aside>}}

## Required for full Cloudflare Zero Trust features

For the majority of Cloudflare Zero Trust features to work, you need to specify a team name. Examples of Cloudflare Zero Trust features which depend on the team name are [HTTP policies](/cloudflare-one/policies/filtering/http-policies/), [Browser Isolation](/cloudflare-one/policies/browser-isolation/), and [device posture](/cloudflare-one/identity/devices/).

### `organization`

Instructs the client to register the device with your organization. Registration requires authentication via an [IdP](/cloudflare-one/identity/idp-integration/) or [Service Auth](/cloudflare-one/identity/service-tokens/).

**Value Type:** `string`

**Value:** Your [team name](/cloudflare-one/glossary/#team-name).

## Required for DNS-only policy enforcement

This field is only required to enforce DNS policies when deploying the client in DoH-only mode.

### `gateway_unique_id`

Instructs the client to direct all DNS queries to a specific policy location. This value is only necessary if deploying without a team name or in an organization with multiple policy locations.

**Value Type:** `string`

**Value:** Your [DoH subdomain](/cloudflare-one/glossary/#doh-subdomain).

## Optional fields

### `service_mode`

Allows you to choose the operational mode of the client.

**Value Type:** `string`

**Value:**

- `1dot1` &mdash; Gateway enforcement of DNS policies only through [DoH](/cloudflare-one/glossary/#doh). All other traffic is handled by your device's default mechanisms.
- `warp` &mdash; (default) All traffic sent through [Cloudflare Gateway](/cloudflare-one/glossary/#cloudflare-gateway) via our encrypted tunnel. This mode is required for features such as HTTP policies, Browser Isolation, identity-based rules, and device posture.

New service modes such as **Proxy only** are not supported as a value and must be configured in the Zero Trust dashboard.

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
- `true` &mdash; The user is prevented from turning off the switch.

On new deployments, you must also include the `auto_connect` parameter with at least a value of `0`. This will prevent clients from being deployed in the off state without a way for users to manually enable them.

{{<Aside type="note">}}

This parameter replaces the old `enabled` property, which can no longer be used in conjunction with the new `switch_locked` and `auto_connect`. If you want to use these parameters, you must remove `enabled`.

{{</Aside>}}

### `auto_connect`

If switch has been turned off by user, the client will automatically turn itself back on after the specified number of minutes. We recommend keeping this set to a very low value &mdash; usually just enough time for a user to log in to hotel or airport WiFi.

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

## Authentication with service tokens

{{<Aside>}}
Devices that connect to Cloudflare Zero Trust with Service Token authentication are not subject to identity-based rules.
{{</Aside>}}

Instead of requiring users to authenticate with their credentials, you can deploy the WARP client with a [service token](/cloudflare-one/identity/service-tokens/). Before you can authenticate clients using the service token, you must add a new rule to your [device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) that includes the token, with the **Rule action** set to `Service Auth`.

Both `auth_client_id` and `auth_client_secret` are required when using this authentication method.

### `auth_client_id`

The automatically generated ID when you created your [service token](/cloudflare-one/identity/service-tokens/).

**Value Type:** `string`

**Value:** `Client ID` from your service token.

### `auth_client_secret`

The automatically generated secret when you created your [service token](/cloudflare-one/identity/service-tokens/).

**Value Type:** `string`

**Value:** `Client Secret` from your service token.

## Frequently Asked Questions

- **What happens if I don't supply a Gateway DoH subdomain?**
  If you specify an `organization`, we will automatically use the default location specified in Gateway.

- **How do I obtain logs in the event of an issue with client?**
  The macOS and Windows clients installations each contain an application in their installed folders called `warp-diag` that can be used to obtain logs.
