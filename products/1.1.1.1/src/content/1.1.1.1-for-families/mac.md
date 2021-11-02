---
order:
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# macOS

Follow these steps to configure 1.1.1.1 for Families:

## Block malware

### IPv4

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click **Network** > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

1. Click **OK** > **Apply**.

### IPv6

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click **Network** > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

1. Click **OK** > **Apply**.

## Block malware and adult content

### IPv4

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click **Network** > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Click **OK** > **Apply**.

### IPv6

1. Go to **System Preferences**. You can find it by pressing <kbd>Command</kbd> + <kbd>Space</kbd> on your keyboard and typing `System Preferences`.
1. Click **Network** > **Advanced**.
1. Select the **DNS** tab. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the IPv6 addresses we listed below:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

1. Click **OK** > **Apply**.

<CaptivePortals/>
