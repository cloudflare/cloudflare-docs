---
order:
title: Windows 10
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Set up 1.1.1.1 for Families - Windows 10

Follow these steps to configure 1.1.1.1 for Families:

## Block malware

### IPv4

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

7. Click **OK**.

### IPv6

1. Click the **Start menu** > **Settings**.
1. Click **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the Wi-Fi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 6**.
1. Click **Properties** > **Use The Following DNS Server Addresses**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

7.  Click **OK**.

## Block malware and adult content

### IPv4

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Click **OK**.

### IPv6

1. Click the **Start menu** > **Settings**.
1. Click **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the Wi-Fi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 6**.
1. Click **Properties** > **Use The Following DNS Server Addresses**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```
1.  Click **OK**.

<CaptivePortals/>
