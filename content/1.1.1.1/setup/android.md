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

You can select between the options available in the app settings. By default, 1.1.1.1: Faster Internet is configured to WARP mode.

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

### Android 11 or later

Android 11 or later versions support both DNS over TLS (DoT) and DNS over HTTPS (DoH).

1. Go to **Settings** > **Network & internet**.
2. Select **Advanced** > **Private DNS**.
3. Select the **Private DNS provider hostname** option.
4. Depending on what you want to configure, use one of the following DNS hostnames or [IP addresses](/1.1.1.1/ip-addresses/) and select **Save**.

    {{<details header="Use 1.1.1.1 resolver">}}
- `one.one.one.one`

Or the corresponding IP address if your device requires it:
- **IPv4**: `1.1.1.1` or `1.0.0.1`
- **IPv6**: `2606:4700:4700::1111` or `2606:4700:4700::1001`

    {{</details>}}

    {{<details header="Block malware with 1.1.1.1 for Families">}}
- `security.cloudflare-dns.com`

Or the corresponding IP address if your device requires it:
- **IPv4**: `1.1.1.2` or `1.0.0.2`
- **IPv6**: `2606:4700:4700::1112` or `2606:4700:4700::1002`
    {{</details>}}

    {{<details header="Block malware and adult content with 1.1.1.1 for Families">}}
- `family.cloudflare-dns.com`


Or the corresponding IP address if your device requires it:
- **IPv4**: `1.1.1.3` or `1.0.0.3`
- **IPv6**: `2606:4700:4700::1113` or `2606:4700:4700::1003`
    {{</details>}}

### Android 9 or 10

Android 9 and Android 10 support DNS over TLS to secure your queries through encryption. In Android, this option is called Private DNS. It prevents your queries from being tracked, modified or surveilled by third-parties. Unlike previous versions of Android, this method also ensures 1.1.1.1 does not need to be configured for each new Wi-Fi network your smartphone joins.

1. Go to **Settings** > **Network & internet**.
2. Select **Advanced** > **Private DNS**.
3. Select the **Private DNS provider hostname** option.
4. Enter `one.one.one.one` and select **Save**. Or consider the following options if you want to use 1.1.1.1 for Families.

    {{<details header="Block malware with 1.1.1.1 for Families">}}
- `security.cloudflare-dns.com` 

Or the corresponding IP address if your device requires it:
- **IPv4**: `1.1.1.2` or `1.0.0.2`
- **IPv6**: `2606:4700:4700::1112` or `2606:4700:4700::1002`
    {{</details>}}

    {{<details header="Block malware and adult content with 1.1.1.1 for Families">}}
- `family.cloudflare-dns.com`


Or the corresponding IP address if your device requires it:
- **IPv4**: `1.1.1.3` or `1.0.0.3`
- **IPv6**: `2606:4700:4700::1113` or `2606:4700:4700::1003`
    {{</details>}}

### Previous Android versions

Before making changes, take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.

1. Open **Settings** > **Wi-Fi**.
2. Press down and hold the name of the network you are currently connected to.
3. Select **Modify Network**.
4. Select the checkbox **Show Advanced Options**.
5. Change the IP Settings to **Static**.
6. {{<render file="_all-ipv4.md">}}
7. {{<render file="_all-ipv6.md">}}
8. Select **Save**. You may need to disconnect from the Wi-Fi and reconnect for the changes to take place.

{{<render file="_captive-portals.md">}}
