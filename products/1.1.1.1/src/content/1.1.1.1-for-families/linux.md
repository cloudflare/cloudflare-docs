---
order:
title: Linux
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Set up 1.1.1.1 for Families - Linux

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

## Ubuntu

### Block malware


1. Click **Show Applications** > **Settings** > **Network**.
1. Select the adapter you want to configure - like your Ethernet adapter or Wi-Fi card - and click the **settings** button.
1. Click the **IPv4** tab.
1. In the **DNS** section, make sure the **Automatic** toggle is **disabled**.
1. Change the DNS servers to:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

1. Click the **IPv6** tab.
1. In the **DNS** section, make sure the **Automatic** toggle is **disabled**.
1. Change the DNS servers to:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

1. Click **Apply**.

### Block malware and adult content


1. Click **Show Applications** > **Settings** > **Network**.
1. Select the adapter you want to configure - like your Ethernet adapter or Wi-Fi card - and click the **settings** button.
1. Click the **IPv4** tab.
1. In the **DNS** section, make sure the **Automatic** toggle is **disabled**.
1. Change the DNS servers to:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Click the **IPv6** tab.
1. In the **DNS** section, make sure the **Automatic** toggle is **disabled**.
1. Change the DNS servers to:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

1. Click **Apply**.

<CaptivePortals/>