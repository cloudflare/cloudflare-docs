---
pcx_content_type: how-to
title: Manual deployment
weight: 2
---

# Manual deployment

If you plan to direct your users to manually download and configure the WARP client, users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

- [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/download-warp/) on user devices.
- [Set device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/) to specify which users can connect.

## Enroll a device manually

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
