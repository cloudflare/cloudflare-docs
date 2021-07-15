---
order: 3
pcx-content: how-to
---

import CaptivePortals from "../../_partials/_captive-portals.md"

# Windows setup instructions

## Block malware

### IPv4

1. Open the **Start menu** and select **Control Panel**.
2. Click **Network and Internet** > **Change Adapter Settings**.
3. Right-click on the Wi-Fi network you are connected to.
4. Select **Properties** > **Internet Protocol Version 4**.
5. Click **Properties**.
6. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

7. Click **OK**.

### IPv6

1. Open the **Start menu** and select **Control Panel**.
2. Click **Network and Internet** > **Change Adapter Settings**.
3. Right-click on the Wi-Fi network you are connected to.
4. Click **Properties** > **Internet Protocol Version 6**.
5. Select **Properties** > **Use The Following DNS Server Addresses**.
6. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

7.  Click **OK**.

## Block malware and adult content

### IPv4

1. Open the **Start menu** and select **Control Panel**.
1. Click **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the Wi-Fi network you are connected to.
1. Click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties**.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Click **OK**.

### IPv6

1. Open the **Start menu** and select **Control Panel**.
1. Click **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the Wi-Fi network you are connected to.
1. Select **Properties** > **Internet Protocol Version 6**.
1. Click **Properties** > **Use The Following DNS Server Addresses**.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```
1.  Click **OK**.

<CaptivePortals/>