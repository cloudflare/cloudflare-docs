---
pcx_content_type: how-to
title: Manual deployment
weight: 2
---

# Manual deployment

If you plan to direct your users to manually download and configure the WARP client, users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

* [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/download-warp/) on user devices.

## Set device enrollment permissions

To specify which users in your organization can enroll new devices:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
2. In the **Device enrollment** card, select **Manage**.
3. In the **Rules** tab, configure one or more [Access policies](/cloudflare-one/policies/access/) to define who can enroll or revoke devices.
4. In the **Authentication** tab, select the [identity providers](/cloudflare-one/identity/idp-integration/) users can authenticate with.
5. Choose a global **Session duration** for enrolled devices. Users will need to re-authenticate their device after their session expires. To customize session durations for different users or applications, refer to [session duration policies](/cloudflare-one/policies/filtering/enforce-sessions/).
6. Select **Save**.

Your device enrollment rules are now active. To see which devices have been enrolled or revoked, go to **My Team** > **Devices**.

## Enroll a device

### Windows and macOS

1. Select the Cloudflare logo in the menu bar.
2. Select the gear icon.
3. Navigate to **Preferences** > **Account**.
4. Select **Login with Cloudflare Zero Trust**.
5. Enter your [team name](/cloudflare-one/glossary/#team-name).
6. Complete the authentication steps required by your organization.

The device is now protected by your organization's Zero Trust policies.

### Linux

1. Open a terminal window.
2. Run `warp-cli teams-enroll <your team name>` to enroll into Cloudflare Zero Trust using your organization's [team name](/cloudflare-one/glossary/#team-name).
3. Complete the authentication steps required by your organization in the browser window that opens.
4. Return to your terminal window and run `warp-cli enable-always-on` to toggle WARP to always stay connected.

The device is now protected by your organization's Zero Trust policies. For more information on all available Linux commands, run `warp-cli --help`.

### iOS, Android, and ChromeOS

1. Launch the 1.1.1.1 application.
2. Select the menu bar icon.
3. Select **Account**.
4. Select **Login with Cloudflare Zero Trust**.
5. Enter your [team name](/cloudflare-one/glossary/#team-name).
6. Complete the authentication steps required by your organization.

The device is now protected by your organization's Zero Trust policies.
