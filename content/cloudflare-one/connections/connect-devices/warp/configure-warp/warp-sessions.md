---
pcx_content_type: how-to
title: WARP sessions
weight: 12
---

# Enforce WARP session timeout

Cloudflare Zero Trust enforces WARP client reauthentication on a per-application basis, unlike legacy VPNs which treat it as a global setting. You can configure WARP session timeouts for your [Access applications](#configure-warp-sessions-in-access) or as part of your [Gateway policies](#configure-warp-sessions-in-gateway). 

When a user goes to a protected application or website, Cloudflare checks their WARP session duration against the configured session timeout. If the session has expired, the user will be prompted to re-authenticate with the identity provider (IdP) used to enroll in the WARP client. A user's WARP session duration resets to zero whenever they log in to the IdP, regardless of what triggered the authentication event.

## Prerequisites

Ensure that traffic can reach your IdP and `<your-team-name>.cloudflareaccess.com` through WARP.

## Configure WARP sessions in Gateway

You can enforce WARP session timeouts on any Gateway Network and HTTP policy that has an Allow action. If you do not specify a session timeout, the WARP session will be unlimited by default.

{{<Aside type="note">}}
Session timeouts have no impact on Gateway DNS policies. DNS policies remain active even when a user needs to re-authenticate.
{{</Aside>}}

To configure a session timeout for a Gateway policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to either **Gateway** > **Firewall Policies** > **Network** or **Gateway** > **Firewall Policies** > **HTTP**.
2. Add a policy and select the _Allow_ action. Alternatively, choose any existing _Allow_ policy.
3. Under **Step 4 - Configure policy settings**, select **Edit** next to **Enforce WARP client session duration**.
4. Enter a session expiration time in `1h30m0s` format and save.
5. Save the policy.

Session checks are now enabled for the application protected by this policy. Users can continue to reach applications outside of the policy definition.

{{<heading-pill style="beta" heading="h2">}}Configure WARP sessions in Access{{</heading-pill>}}

You can allow users to log in to Access applications using their WARP session. WARP authentication is only supported for Access applications protected by Allow or Block policies.

To configure WARP sessions for Access applications:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.
2. In **Device enrollment permissions**, select **Manage**.
3. Go to the **Authentication** tab and enable **WARP authentication identity**.
4. Under **Session duration**, choose a session timeout value. This timeout will apply to all Access applications that have WARP authentication enabled.

{{<Aside type="note">}}
This timeout value does not apply to [WARP session checks in Gateway policies](#configure-warp-sessions-in-gateway).
{{</Aside>}}

5. (Optional) To enable WARP authentication by default for all existing and new applications, select **Apply to all Access applications**. You can override this default setting on a per-application basis when you [create](/cloudflare-one/applications/configure-apps/) or modify an Access application.
6. Select **Save**.

Users can now authenticate once with WARP and have access to your Access applications for the configured period of time. The session timer resets when the user re-authenticates with the IdP used to enroll in WARP.

## Limitations

- **Only one user per device** — If a device is already registered with User A, User B will not be able to log in on that device through the re-authentication flow. You can revoke a device registration by going to **My Team** > **Devices**.
- **Active connections are not terminated** — Active sessions such as SSH and RDP will remain connected beyond the timeout limit.
- **Binding Cookie is not supported** - WARP authentication will not work for Access applications that have the [Binding Cookie](/cloudflare-one/identity/authorization-cookie/#binding-cookie) enabled.
