---
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Windows

## Windows 10

<StreamVideo id="92b27227d737a866adc8b0572cf0db89"/>

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **OK**.
1. Now, go to **Internet Protocol Version 6**.
1. Click **Properties** > **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Close**.

<CaptivePortals/>