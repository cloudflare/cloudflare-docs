---
order:
title: macOS
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"
import Encrypted from "../_partials/_encrypted.md"

# Set up 1.1.1.1 - macOS

Follow these steps to configure 1.1.1.1:

## IPv4

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click on the **Network** icon > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **OK** > **Apply**.

## IPv6

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click on the **Network** icon > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **OK** > **Apply**.

<CaptivePortals/>

<Encrypted/>