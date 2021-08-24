---
order: 8
pcx-content: tutorial
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Windows

Follow this quick guide to start using 1.1.1.1 on your Windows computer.

## Windows 10

<StreamVideo id="92b27227d737a866adc8b0572cf0db89"/>

1. Click on the **Start menu** > **Control Panel**.
1. Click on **Network and Internet**.
1. Click on **Change Adapter Settings**.
1. Right click on the Wi-Fi network you are connected to.
1. Click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **OK**.
1. Go now to **Internet Protocol Version 6**.
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Close**.

<CaptivePortals/>