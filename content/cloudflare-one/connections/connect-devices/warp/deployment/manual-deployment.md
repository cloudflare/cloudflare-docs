---
pcx-content-type: how-to
title: Manual deployment
weight: 2
---

# Manual deployment

If you plan to direct your users to manually download and configure the WARP client, users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

* [Install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/) on user devices.
* [Install the WARP client](/warp-client/get-started/) on user devices.

## Log in from Windows and macOS

1. Click on the Cloudflare logo in the menu bar.
2. Click the gear icon.
3. Navigate to **Preferences** > **Account**.
4. Click **Login with Cloudflare for Teams**.
5. Enter your [team name](/cloudflare-one/glossary/#team-name).
6. Complete the authentication steps required by your organization.

The device is now protected by your organization's Zero Trust policies.

## Log in from Linux

1. Open a terminal window.
2. Run `warp-cli teams-enroll <your team name>` to enroll into Cloudflare Zero Trust using your organization's [team name](/cloudflare-one/glossary/#team-name).
3. Complete the authentication steps required by your organization in the browser window that opens.
4. Return to your terminal window and run `warp-cli enable-always-on` to toggle WARP to always stay connected.

The device is now protected by your organization's Zero Trust policies. For more information on all available Linux commands, run `warp-cli --help`.

## Log in from iOS, Android, and ChromeOS

1. Find the 1.1.1.1 application and tap to launch it.
2. Tap the menu bar icon.
3. Tap **Account**.
4. Tap **Login with Cloudflare for Teams**.
5. Enter your [team name](/cloudflare-one/glossary/#team-name).
6. Complete the authentication steps required by your organization.

The device is now protected by your organization's Zero Trust policies.
