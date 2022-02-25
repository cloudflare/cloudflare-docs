---
order:
title: Linux
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Set up 1.1.1.1 - Linux

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

## Ubuntu

1. Go to **Show Applications** > **Settings** > **Network**.
1. Select the adapter you want to configure - like your Ethernet adapter or Wi-Fi card - and click the **settings** button.
1. Click the **IPv4** tab.
1. In the **DNS** section, disable the **Automatic** toggle.
1. Change the DNS servers to:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click the **IPv6** tab.
1. In the **DNS** section, disable the **Automatic** toggle.
1. Change the DNS servers to:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Apply**.

1. Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

<CaptivePortals/>