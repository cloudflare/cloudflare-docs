---
pcx-content: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Windows 10

Follow these steps to configure 1.1.1.1:

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Settings**.
1. Right-click on the WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties** > **Use The Following DNS Server Addresses**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **OK**.
1. Now, go to **Internet Protocol Version 6**.
1. Select **Properties** > **Use The Following DNS Server Addresses**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add:

    ```txt
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Click **Close**.

<CaptivePortals/>

## Encrypt your DNS queries

 1.1.1.1 supports DNS over TLS (DoT) and DNS over HTTPS (DoH), two standards developed for encrypting plaintext DNS traffic. This prevents untrustworthy entities from interpreting and manipulating your queries. For more information on how to encrypt your DNS queries, please refer to the [Encrypted DNS documentation](/encrypted-dns).