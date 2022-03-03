---
title: macOS
weight: 4
meta:
  title: Installation on macOS
---

# Installation on macOS

## Install WARP client

Download and install the [WARP client for macOS](/warp-client/get-started/macos/).

## Install the Cloudflare Root CA

Advanced security features including Browser Isolation require users to install and trust the Cloudflare root certificate on their machine or device.

Follow this article to configure the Cloudflare root certificate on your device: /cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert

## Manually configure a Cloudflare for Teams device registration

1.  Click on the Cloudflare Logo in the Menu Bar.
2.  Select the gear icon.
3.  Navigate to **Preferences**.
4.  Select the **Account** tab.
5.  Click **Login with Cloudflare for Teams**.
6.  Enter your organization name (if your auth domain were `https://example.cloudflareaccess.com`, you would enter `example`).
7.  Complete the authentication steps required by your organization.

![Preferences UI in the Account tab with the Login to Teams button circled](/browser-isolation/static/macOS_TeamsButton.png)

## Start using Browser Isolation

You're now ready to start using an isolated browser. Get started [here](/browser-isolation/usage/).
