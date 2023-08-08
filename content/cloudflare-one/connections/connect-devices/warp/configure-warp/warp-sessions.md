---
pcx_content_type: how-to
title: WARP sessions
weight: 12
---

# Enforce WARP session timeout

Cloudflare Zero Trust enforces WARP client reauthentication on a per-application basis, unlike legacy VPNs which treat it as a global setting. WARP session timeouts are configured as part of your Gateway Network and HTTP policies. Once a session expires for an application, a user will be prompted to re-authenticate with the identity provider they used to enroll in the WARP client. If you do not enforce a session timeout, WARP sessions will be unlimited by default.

{{<Aside type="note">}}
Session timeouts have no impact on Gateway DNS policies. DNS policies remain active even when a user needs to re-authenticate.
{{</Aside>}}

## Prerequisites

Ensure that traffic can reach your IdP and `<your-team-name>.cloudflareaccess.com` through WARP.

## Configure session timeout

You can configure a WARP session for any Allow policy. To configure a session:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to either **Gateway** > **Firewall Policies** > **Network** or **Gateway** > **Firewall Policies** > **HTTP**.
2. Add a policy and select the _Allow_ action. Alternatively, choose any existing _Allow_ policy.
3. Under **Step 4 - Configure policy settings**, select **Edit** next to **Enforce WARP client session duration**.
4. Enter a session expiration time in `1h30m0s` format and save.
5. Save the policy.

Session checks are now enabled for the application protected by this policy. Users can continue to reach applications outside of the policy definition.

## Limitations

- **Only one user per device** — If a device is already registered with User A, User B will not be able to log in on that device through the re-authentication flow. You can revoke a device registration by going to **My Team** > **Devices**.
- **Active connections are not terminated** — Active sessions such as SSH and RDP will remain connected beyond the timeout limit.
