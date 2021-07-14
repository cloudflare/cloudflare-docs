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

If you don't want to configure 1.1.1.1 manually, you can use Cloudflare's 1.1.1.1: Faster Internet free iOS app to setup 1.1.1.1 automatically. With 1.1.1.1: Faster Internet you can also use WARP to keep your connections private and secure through HTTPS encryption. Using WARP is the only way to connect do 1.1.1.1 DNS resolver through HTTPS encryption outside a secured network.

To set up 1.1.1.1: Faster Internet:

1. Download [1.1.1.1: Faster Internet from the app store](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627).
1. Launch 1.1.1.1: Faster Internet and accept its Terms of Service.
1. Install the VPN profile that allows your phone to connect securely to 1.1.1.1.
1. You are now using 1.1.1.1 for your Internet queries. If you want to add an extra layer of security with HTTPS encryption, toggle the WARP button.

<CaptivePortals/>
