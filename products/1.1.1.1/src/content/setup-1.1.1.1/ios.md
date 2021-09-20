---
order:
pcx-content-type: tutorial
---

import CaptivePortals from "../_partials/_captive-portals.md"

# iOS

## 1.1.1.1: Faster Internet

[1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) is the preferred method of setting up 1.1.1.1 DNS resolver in iOS devices. It allows you to automatically configure your phone to use 1.1.1.1 on any network you connect to, and solves iOS inability of using an alternative DNS resolver in cellular connections. 

The app also allows you to enable encryption for DNS queries or enable [WARP mode](https://developers.cloudflare.com/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between these two options in 1.1.1.1: Faster Internet's settings. By default, 1.1.1.1:Faster Internet is configured to WARP mode. 

### Set up 1.1.1.1: Faster Internet

1. Download [1.1.1.1: Faster Internet from the App Store](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) for free.
1. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
1. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.
1. Toggle the **WARP** button to **Connected**.

Your connection to the Internet and your DNS queries are now protected. Alternatively, you may want to only encrypt your DNS queries and leave the remaining traffic unencrypted. If this is the case: 

1. Open 1.1.1.1: Faster Internet.
1. Toggle the WARP button and choose **Switch to DNS only mode**. If the WARP toggle is disconnected, tap the **menu button**.
1. You will see two options: 1.1.1.1 and WARP. Select **1.1.1.1** > **Done**.

You are now using encryption only for your DNS queries.

## Configure 1.1.1.1 manually

<Aside type="note">

If you configure 1.1.1.1 manually, you will have to do it for every WiFi network your device connects to. This method doesn't work for cellular connections.

</Aside>

1. Go to **Settings** > **Wi-Fi**.
1. Select the **'i'** icon next to the WiFi network you are connected to.
1. Scroll down until you see the section called **Configure DNS**.
1. Change the configuration from **Automatic** to **Manual**.
1. Select **Add Server**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Select **Save**.

<CaptivePortals/>