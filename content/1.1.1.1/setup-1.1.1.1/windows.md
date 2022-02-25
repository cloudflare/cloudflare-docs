---
title: Windows
pcx-content-type: how-to
weight: 0
meta:
  title: Set up 1.1.1.1 - Windows
---

import CaptivePortals from "../\_partials/\_captive-portals.md"
import Encrypted from "../\_partials/\_encrypted.md"

# Set up 1.1.1.1 - Windows

## Windows 10

1.  Click the **Start menu** > **Settings**.
2.  Select **Network and Internet** > **Change Adapter Options**.
3.  Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
4.  Select **Internet Protocol Version 4**.
5.  Click **Properties** > **Use the following DNS server addresses**.
6.  Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
7.  Remove any DNS addresses that may be already listed.
8.  Add `1.1.1.1` to the **Preferred DNS server** field, and `1.0.0.1` to the **Alternate DNS server** field.
9.  Click **OK**.
10. Select **Internet Protocol Version 6**.
11. Select **Properties** > **Use the following DNS server addresses**.
12. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
13. Remove any DNS addresses that may be already listed.
14. Add `2606:4700:4700::1111` to the **Preferred DNS server** field, and `2606:4700:4700::1001` to the **Alternate DNS server** field.
15. Click **OK**.
16. Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

## Windows 11

1.  Click the **Start menu** > **Settings**.
2.  Select **Network and Internet**.
3.  Click the adapter you want to configure - like your Ethernet adapter or Wi-Fi card.
4.  Scroll to **DNS server assignment** and click **Edit**.
5.  Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
6.  Click the **IPv4** toggle to turn it on.
7.  Add `1.1.1.1` to the **Preferred DNS** field, and `1.0.0.1` to the **Alternate DNS** field.
8.  Click the **IPv6** toggle.
9.  Add `2606:4700:4700::1111` to the **Preferred DNS** field, and `2606:4700:4700::1001` to the **Alternate DNS** field.
10. Click **Save**.
11. Visit [1.1.1.1/help](https://1.1.1.1/help) to make sure your system is connected to 1.1.1.1.

<CaptivePortals/>

<Encrypted/>
