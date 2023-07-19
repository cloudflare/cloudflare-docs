---
weight: 3
pcx_content_type: how-to
title: Android
meta:
    title: Set up 1.1.1.1 on Android
---

# Set up 1.1.1.1 - Android

[1.1.1.1: Faster Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) is the preferred method of setting up 1.1.1.1 DNS resolver and 1.1.1.1 for Families. It allows you to automatically configure your phone to use 1.1.1.1 on any network you connect to.

The app also allows you to enable encryption for DNS queries or enable [WARP mode](/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between the options available in the app's settings. By default, 1.1.1.1: Faster Internet is configured to WARP mode.

## Set up 1.1.1.1: Faster Internet

1. Download [1.1.1.1: Faster Internet from Google Play](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) for free.
2. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
3. Toggle the **WARP** button to **Connected**.
4. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.

Your connection to the Internet and your DNS queries are now protected.

### Enable 1.1.1.1 for Families

1. Open 1.1.1.1: Faster Internet.
2. Tap the **menu button**.
3. Select **Advanced** > **Connection options**.
4. In **DNS settings** > **1.1.1.1 for Families**, select the option you want to use.

## Configure 1.1.1.1 manually

### Android 9 Pie or later

Android Pie and later supports DNS over TLS to secure your queries through encryption. In Android, this option is called Private DNS. It prevents your queries from being tracked, modified or surveilled by third-parties. Unlike previous versions of Android, this method also ensures 1.1.1.1 does not need to be configured for each new Wi-Fi network your smartphone joins.

1. Go to **Settings** > **Network & internet**.
2. Select **Advanced** > **Private DNS**.
3. Select the **Private DNS provider hostname** option.
4. Enter `one.one.one.one` and press **Save**.

### Previous Android versions

Before making changes, take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.

1. Open **Settings** > **WiFi**.
2. Press down and hold the name of the network you are currently connected to.
3. Select **Modify Network**.
4. Select the checkbox **Show Advanced Options**.
5. Change the IP Settings to **Static**.
6. {{<render file="_all-ipv4.md">}}
7. {{<render file="_all-ipv6.md">}}
8. Select **Save**. You may need to disconnect from the Wi-Fi and reconnect for the changes to take place.

{{<render file="_captive-portals.md">}}
