---
order:
title: iOS
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Set up 1.1.1.1 for Families - iOS

[1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) is the preferred method of setting up 1.1.1.1 for Families in iOS devices. It allows you to automatically configure your phone to use 1.1.1.1 for Families on any network you connect to, and solves iOS inability of using an alternative DNS resolver in cellular connections. 

The app also allows you to enable encryption for DNS queries to the 1.1.1.1 DNS resolver or enable [WARP mode](https://developers.cloudflare.com/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between these two options in 1.1.1.1: Faster Internet's settings. By default, 1.1.1.1:Faster Internet is configured to WARP mode. 

## Set up 1.1.1.1: Faster Internet

1. Download [1.1.1.1: Faster Internet from the App Store](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) for free.
1. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
1. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.
1. Toggle the **WARP** button to **Connected**.
1. Tap the **menu button**.
1. Select **Advanced** > **Connection options**.
1. In **DNS settings** > **1.1.1.1 for Families**, select the option you want to use.

Your connection to the Internet and your DNS queries are now private and protected. Alternatively, you may want to only encrypt your DNS queries and leave the remaining traffic unencrypted. If this is the case: 

1. Open 1.1.1.1: Faster Internet.
1. Toggle the WARP button and choose **Switch to DNS only mode**. If the WARP toggle is disconnected, tap the **menu button**.
1. You will see two options: 1.1.1.1 and WARP. Select **1.1.1.1**.
1. Tap **Advanced** > **Connection options**.
1. In **DNS settings** > **1.1.1.1 for Families**, select the option you want to use.

You are now using encryption only for your DNS queries.

## Manually configure 1.1.1.1 for Families

<Aside type="note">

If you configure 1.1.1.1 for Families manually, you will have to do it for every WiFi network your device connects to. This method does not work for cellular connections.

</Aside>

### Block malware

1. Go to **Settings** > **Wi-Fi**.
1. Select the **'i'** icon next to the WiFi network you are connected to.
1. Scroll down until you see the section called **Configure DNS**.
1. Change the configuration from **Automatic** to **Manual**.
1. Select **Add Server**.
1. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any DNS addresses that may be already listed and in their place add:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

1. Select **Save**.

### Block malware and adult content

1. Go to **Settings** > **Wi-Fi**.
1. Select the **'i'** icon next to the WiFi network you are connected to.
1. Scroll down until you see the section called **Configure DNS**.
1. Change the configuration from **Automatic** to **Manual**.
1. Select **Add Server**.
1. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any DNS addresses that may be already listed and in their place add:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Select **Save**.

<CaptivePortals/>