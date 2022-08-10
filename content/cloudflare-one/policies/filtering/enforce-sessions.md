---
pcx_content_type: how-to
title: WARP session duration
weight: 7
---

# Enforce WARP session duration

Cloudflare Zero Trust allows you to enforce session durations on Gateway Network and HTTP policies. Once a session expires, a user will be prompted to re-authenticate with the identity provider they used to enroll in the WARP client.

## Prerequisities

Ensure that traffic can reach your IdP and `<your-team-name>.cloudflareaccess.com` through WARP.

## Configure session duration

You can configure a WARP session for any Allow policy. To configure a session:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), navigate to either **Gateway** > **Policies** > **Network** or **Gateway** > **Policies** > **HTTP**.
2. Create a policy and select the _Allow_ action. Alternatively, choose any existing _Allow_ policy.
3. Under **Step 4 - Configure policy settings**, select **Edit** next to **Enforce WARP client session duration**.
4. Enter a session expiration time in `1h30m0s` format and save.
5. Save the policy.

Session checks are now enabled for the application protected by this policy.

{{<Aside type="warning">}}

For WARP sessions to function correctly with Gateway policies, end users must have the latest beta version of the WARP client installed on their devices. Gateway policies with WARP sessions configured will automatically block users who do not have the latest beta version of the client installed.

{{</Aside>}}

## Limitations

- **Only one user per device** — If a device is already registered with User A, User B will not be able to log in on that device through the re-authentication flow. You can revoke a device registration by going to **My Team** > **Devices**.
