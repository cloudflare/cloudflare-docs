---
order: 1
---

# Parameters

Each client supports the following set of parameters as part of their deployment, regardless of the deployment mechanism.

## Required for full Cloudflare One features
For the vast majority of Cloudflare for Teams features to work, you need to specify a team name. Examples of Teams features depending on the team name are [HTTP policies](/policies/filtering/http-policies), [Browser Isolation](/connections/connect-browsers), and [device posture](/identity/devices).

### `organization`

| Field | Value Type |
| ----- | -------- |
| `organization` | string |

**Description.** Instructs the client to register device with your organization. Registration requires authentication via an [IDP](/identity/idp-integration) or [Service Auth](/identity/service-auth).

**Value:** Your [team name](/glossary#team-name). 

## Required field for DNS only policy enforcemet
This field is only required to enforce DNS policies when deploying the client in DoH-only mode.

### `gateway_unique_id`

| Field | Value Type |
| ----- | -------- |
| `gateway_unique_id` | string |

**Description.** Instructs the client to direct all DNS queries to a specific policy location. This value is only necessary if deploying without a team name *or* in an organization with multiple policy locations.

**Value:** Your [DoH subdomain](/glossary#doh-subdomain).

## Optional fields

### `service_mode`

| Field | Value Type |
| ----- | -------- |
| `service_mode` | string |

**Description.** 	Allows you to choose the opertional mode of the client.

**Value:**
- `1dot1` Gateway enforcement of DNS policies only through [DoH](/glossary#doh). All other traffic is handled by your devices default mechanisms
- `warp`  [default value] All traffic sent through [Cloudflare Gateway](/glossary#cloudflare-gateway) via our encrypted tunnel. This mode is required for features such as HTTP policies, Browser Isolation, identity-based rules, or device posture.

### `onboarding`

| Field | Value Type |
| ----- | -------- |
| `onboarding` | boolean |

**Description.** 	Controls the visibility of the onboarding screens that ask the user to review the privacy policy during an application's first launch.

**Value:**
- `false` Screens hidden.
- `true`  [default value] Screen visible.

### `switch_locked`

| Field | Value Type |
| ----- | -------- |
| `switch_locked` | boolean |

**Description.** 	Allows the user to control the connected state of the application (main toggle switch).

**Value:**
- `false` [default value] The user is able to turn switch on/off at their discretion. When the switch is off, the user will not have the ability to reach sites protected by Access that leverage certain device posture checks.
- `true`  The user is prevented from turning off the switch.

<Aside> 
  This parameter replaces the old enabled property which can no longer be used
</Aside>


### `auto_connect`

| Field | Value Type |
| ----- | -------- |
| `auto_connect` | integer |

**Description.** 	If switch has been turned off by user the client will automatically turn itself back on after the specified number of minutes. We recommend keeping this set to a very low value, usually just enough time for a user to login to hotel or airport wifi.

**Value:**
- `0` Allow the switch to stay in the off position indefinitly until the user turns it back on.
- `1-1440`  Turn switch back on automatically after the specified number of minutes.

<Aside> 
  This parameter replaces the old enabled property which can no longer be used
</Aside>

### `support_url`

| Field | Value Type |
| ----- | -------- |
| `support_url` | string |

**Description.** 	When the WARP client is deployed via MDM, the in-app Send Feedback button is disabled by default. This parameter allows you to re-enable the button and direct it towards your organization.

**Value:**
- `https://support.example.com` Use an https:// link to open your companies internal help site.
- `mailto://yoursupport@example.com`  Use a mailto:// link to open your default mail client.

## Frequently Asked Questions

* **What happens if I don't supply a Gateway DoH subdomain?**
If you specify an `organization` we will automatically use the default location specified in Gateway.

* **How do I obtain logs in the event of an issue with client?**
The macOS and Windows clients installations each contain an application in their installed folders called warp-diag that can be used to obtain logs.
