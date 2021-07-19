---
order: 5
pcx-content: tutorial
---

import CaptivePortals from "../_partials/_captive-portals.md"

# iPhone

Follow this quick guide to start using 1.1.1.1 on your iPhone.

<StreamVideo id="ddf07732bc76fc854d4b1879eea2c517"/>

1. Go to **Settings**.
1. Click on **Wi-Fi**.
1. Click the information **'i'** icon next to the Wi-Fi name you are connected to.
1. Scroll down until you see the section called **Configure DNS**.
1. Change the configuration from **Automatic** to **Manual**.
1. Click **Add Server**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Save**.

## 1.1.1.1 iOS app

If you want to configure 1.1.1.1 automatically, you can [download Cloudflare's 1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) free iOS app.

1.1.1.1: Faster Internet automatically configures 1.1.1.1 on any network you connect to. It also allows you to encrypt your DNS queries to 1.1.1.1 DNS resolver or enable the [WARP mode](https://developers.cloudflare.com/warp-client/), which gives you all the protection from 1.1.1.1 while additionally keeping all your HTTP traffic private and secure. By default, 1.1.1.1: Faster Internet is setup with the WARP mode.

To set up 1.1.1.1: Faster Internet:

1. Download [1.1.1.1: Faster Internet from the app store](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627).
1. Launch 1.1.1.1: Faster Internet and accept the Terms of Service.
1. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.

You are now using 1.1.1.1 for your Internet queries. If you want to add an extra layer of security and encrypt all of your traffic with HTTPS, toggle the WARP button to *Connected*.

Alternatively, you may want to only encrypt your DNS queries and leave your traffic unencrypted. If this is the case: 

1. Open 1.1.1.1: Faster Internet.
1. Tap the hamburger menu on the top right corner of the app.
1. You will see two options: 1.1.1.1 and WARP. Select **1.1.1.1*** > **Done**.

You are now using encryption only for your DNS queries.


<CaptivePortals/>
