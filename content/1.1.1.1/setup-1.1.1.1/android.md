---
title: Android
pcx-content-type: how-to
weight: 0
meta:
  title: Set up 1.1.1.1 - Android
---

# Set up 1.1.1.1 - Android

[1.1.1.1: Faster Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) is the preferred method of setting up 1.1.1.1 DNS resolver, as it allows you to automatically configure your phone to use 1.1.1.1 on any network you connect to.

The app also allows you to enable encryption for DNS queries or enable [WARP mode](/warp-client/), which keeps all your HTTP traffic private and secure, including your DNS queries to 1.1.1.1.

You can select between these two options in 1.1.1.1: Faster Internet's settings. By default, 1.1.1.1:Faster Internet is configured to WARP mode.

## Set up 1.1.1.1: Faster Internet

1.  Download [1.1.1.1: Faster Internet from Google Play](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone) for free.
2.  Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
3.  Toggle the **WARP** button to **Connected**.
4.  Install the VPN profile that allows your phone to connect securely to 1.1.1.1.
5.  Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

Your connection to the Internet and your DNS queries are now protected. Alternatively, you may want to only encrypt your DNS queries and leave the remaining traffic unencrypted. If this is the case:

1.  Open 1.1.1.1: Faster Internet.
2.  Toggle the WARP button and choose **Switch to DNS only mode**. If the WARP toggle is disconnected, tap the **menu button**.
3.  You will see two options: 1.1.1.1 and WARP. Select **1.1.1.1**.

You are now using encryption only for your DNS queries. Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure everything is working.

## Configure 1.1.1.1 manually

### Android 9 Pie or later

Android Pie and later supports DNS over TLS to secure your queries through encryption. In Android, this option is called Private DNS and it prevents your queries from being tracked, modified or surveilled by third-parties. Unlike previous versions of Android, this method also ensures 1.1.1.1 does not need to be configured for each new WiFi network your smartphone joins.

1.  Go to **Settings** > **Network & internet**.
2.  Select **Advanced** > **Private DNS**.
3.  Select the **Private DNS provider hostname** option.
4.  Enter `one.one.one.one` or `1dot1dot1dot1.cloudflare-dns.com` and press **Save**.
5.  Visit [1.1.1.1/help](https://1.1.1.1/help) to verify DNS over TLS is enabled.

### Previous Android versions

1.  Open **Settings** > **Wi-Fi**.

2.  Press down and hold on the name of the network you are currently connected to.

3.  Click **Modify Network**.

4.  Select the check box **Show Advanced Options**.

5.  Change the IP Settings to **Static**.

6.  Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.

7.  Remove any DNS addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

8.  Click **Save**. You may need to disconnect from the Wi-Fi and reconnect for the changes to take place.

9.  Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

{{<render file="_captive-portals.md">}}
