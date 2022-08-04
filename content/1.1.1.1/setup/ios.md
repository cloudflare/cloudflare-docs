---
weight: 7
pcx_content_type: how-to
title: iOS
meta:
    title: Set up 1.1.1.1 on iOS
---

# Set up 1.1.1.1 - iOS

[1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) is the preferred method of setting up 1.1.1.1 DNS resolver and 1.1.1.1 for Families in iOS devices. It allows you to automatically configure your phone to use 1.1.1.1 on any network you connect to, and solves iOS inability of using an alternative DNS resolver in cellular connections.

The app also allows you to enable encryption for DNS queries or enable [WARP mode](/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between the options available in the app's settings. By default, 1.1.1.1: Faster Internet is configured to WARP mode.

## Set up 1.1.1.1: Faster Internet

1. Download [1.1.1.1: Faster Internet from the App Store](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) for free.
2. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
3. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.
4. Toggle the **WARP** button to **Connected**.

### Enable 1.1.1.1 for Families

1. Open 1.1.1.1: Faster Internet.
2. Tap the **menu button**.
3. Select **Advanced** > **Connection options**.
4. In **DNS settings** > **1.1.1.1 for Families**, select the option you want to use.

## Configure 1.1.1.1 manually

{{<Aside type="note">}}

If you configure 1.1.1.1 manually, you will have to do it for every WiFi network your device connects to. This method does not work for cellular connections.

{{</Aside>}}

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Go to **Settings** > **WiFi**.
2. Select the **'i'** icon next to the WiFi network you are connected to.
3. Scroll down and select **Configure DNS**.
4. Change the configuration from **Automatic** to **Manual**.
5. Select **Add Server**.
6. {{<render file="_all-ipv4.md">}}
7. {{<render file="_all-ipv6.md">}}
8. Select **Save**.

{{<render file="_captive-portals.md">}}