---
order:
title: Windows
pcx-content-type: how-to
---

import CaptivePortals from "../\_partials/\_captive-portals.md"

# Set up 1.1.1.1 for Families - Windows

## Windows 10

### Block malware

1.  Click the **Start menu** > **Settings**.
2.  Select **Network and Internet** > **Change Adapter Options**.
3.  Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
4.  Select **Internet Protocol Version 4**.
5.  Click **Properties** > **Use the following DNS server addresses**.
6.  Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
7.  Remove any DNS addresses that may be already listed.
8.  Add `1.1.1.2` to the **Preferred DNS server** field, and `1.0.0.2` to the **Alternate DNS server** field.
9.  Click **OK**.
10. Select **Internet Protocol Version 6**.
11. Select **Properties** > **Use the following DNS server addresses**.
12. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
13. Remove any DNS addresses that may be already listed.
14. Add `2606:4700:4700::1112` to the **Preferred DNS server** field, and `2606:4700:4700::1002` to the **Alternate DNS server** field.
15. Click **OK**.

### Block malware and adult content

1.  Click the **Start menu** > **Settings**.
2.  Select **Network and Internet** > **Change Adapter Options**.
3.  Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
4.  Select **Internet Protocol Version 4**.
5.  Click **Properties** > **Use the following DNS server addresses**.
6.  Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
7.  Remove any DNS addresses that may be already listed.
8.  Add `1.1.1.3` to the **Preferred DNS server** field, and `1.0.0.3` to the **Alternate DNS server** field.
9.  Click **OK**.
10. Select **Internet Protocol Version 6**.
11. Select **Properties** > **Use the following DNS server addresses**.
12. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
13. Remove any DNS addresses that may be already listed.
14. Add `2606:4700:4700::1113` to the **Preferred DNS server** field, and `2606:4700:4700::1003` to the **Alternate DNS server** field.
15. Click **OK**.

## Windows 11

### Block malware

1.  Click the **Start menu** > **Settings**.
2.  Select **Network and Internet**.
3.  Click the adapter you want to configure - like your Ethernet adapter or Wi-Fi card.
4.  Scroll to **DNS server assignment** and click **Edit**.
5.  Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
6.  Click the **IPv4** toggle to turn it on.
7.  Add `1.1.1.2` to the **Preferred DNS** field, and `1.0.0.2` to the **Alternate DNS** field.
8.  Click the **IPv6** toggle.
9.  Add `2606:4700:4700::1112` to the **Preferred DNS** field, and `2606:4700:4700::1002` to the **Alternate DNS** field.
10. Click **Save**.

### Block malware and adult content

1.  Click the **Start menu** > **Settings**.
2.  Select **Network and Internet**.
3.  Click the adapter you want to configure - like your Ethernet adapter or Wi-Fi card.
4.  Scroll to **DNS server assignment** and click **Edit**.
5.  Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
6.  Click the **IPv4** toggle to turn it on.
7.  Add `1.1.1.3` to the **Preferred DNS** field, and `1.0.0.3` to the **Alternate DNS** field.
8.  Click the **IPv6** toggle.
9.  Add `2606:4700:4700::1113` to the **Preferred DNS** field, and `2606:4700:4700::1003` to the **Alternate DNS** field.
10. Click **Save**.

<CaptivePortals/>
