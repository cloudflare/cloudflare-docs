---
pcx-content: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Android

## Android 9 Pie or later

Android Pie and later supports DNS over TLS to secure your queries through encryption. In Android, this option is called Private DNS and it is the preferred method of setting up 1.1.1.1 resolver, as it prevents your queries from being tracked, modified or surveilled by third-parties. Unlike previous versions of Android, this method also ensures 1.1.1.1 does not need to be configured for each new WiFi network your smartphone joins.

Follow these steps to configure 1.1.1.1:

1. Go to **Settings** > **Network & internet**.

1. Select **Advanced** > **Private DNS**.

1. Select the **Private DNS** provider hostname option.

1. Enter `one.one.one.one` or `1dot1dot1dot1.cloudflare-dns.com` and press **Save**.

1. Visit [1.1.1.1/help](https://1.1.1.1/help) to verify DNS over TLS is enabled.

## Previous Android versions

1. Open **Settings** > **Wi-Fi**.

1. Press down and hold on the name of the network you are currently connected to.

1. Click **Modify Network**.

1. Select the check box **Show Advanced Options**.

1. Change the IP Settings to **Static**.

1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.

1.  Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Save**. You may need to disconnect from the Wi-Fi and reconnect for the changes to take place.

<CaptivePortals/>
