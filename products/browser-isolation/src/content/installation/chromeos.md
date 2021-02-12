---
title: ChromeOS
order: 5
---

# ChromeOS

Browser Isolation may be enabled on ChromeOS / Chromebook devices by installing the Cloudflare Root CA and Android based WARP client.

## Install the Cloudflare Root CA

Download the Cloudflare Root CA from our [developer portal](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert).

Import the Cloudflare Root CA within Chrome:

1. In the Chrome Browser go to **Settings**. Use the Search bar to search for *certificate*.
2. Select **Manage certificates​**
3. Click the **Authorities** tab, then click **Import**
4. Import the Cloudflare Root CA.

## Install WARP client for Android
ChromeOS is compatible with the WARP client for [Android](https://developers.cloudflare.com/warp-client/warp-for-teams/teams/android-Teams).

1. Open the **Play Store** app.
2. Search for "*1.1.1.1*"
3. Download and install the WARP client ([1.1.1.1: Faster and Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone)).

### Manually configure a Cloudflare for Teams device registration
Follow these instructions to authorize your device with Cloudflare for Teams.

1. Fine the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right.
1. Tap **Account**.
1. Tap **Login with Cloudflare for Teams**.
1. Enter your organization name (if your auth domain were `https://example.cloudflareaccess.com`, you would enter `example`).
1. Complete authentication steps required by your organization.
1. Install the VPN profile