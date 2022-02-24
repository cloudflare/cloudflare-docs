---
order:
title: Windows
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Set up 1.1.1.1 for Families - Windows

## Windows 10

### Block malware

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Options**.
1. Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties** > **Use the following DNS server addresses**.
1. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any DNS addresses that may be already listed.
1. Add `1.1.1.2` to the **Preferred DNS server** field, and `1.0.0.2` to the **Alternate DNS server** field.
1. Click **OK**.
1. Select **Internet Protocol Version 6**.
1. Select **Properties** > **Use the following DNS server addresses**.
1. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any DNS addresses that may be already listed.
1. Add `2606:4700:4700::1112` to the **Preferred DNS server** field, and `2606:4700:4700::1002` to the **Alternate DNS server** field.
1. Click **OK**.

### Block malware and adult content

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Options**.
1. Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties** > **Use the following DNS server addresses**.
1. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any DNS addresses that may be already listed.
1. Add `1.1.1.3` to the **Preferred DNS server** field, and `1.0.0.3` to the **Alternate DNS server** field.
1. Click **OK**.
1. Select **Internet Protocol Version 6**.
1. Select **Properties** > **Use the following DNS server addresses**.
1. Take note of any DNS addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any DNS addresses that may be already listed.
1. Add `2606:4700:4700::1113` to the **Preferred DNS server** field, and `2606:4700:4700::1003` to the **Alternate DNS server** field.
1. Click **OK**.

## Windows 11

### Block malware

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet**.
1. Click the adapter you want to configure - like your Ethernet adapter or Wi-Fi card.
1. Scroll to **DNS server assignment** and click **Edit**.
1. Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
1. Click the **IPv4** toggle to turn it on.
1. Add `1.1.1.2` to the **Preferred DNS** field, and `1.0.0.2` to the **Alternate DNS** field.
1. Click the **IPv6** toggle.
1. Add `2606:4700:4700::1112` to the **Preferred DNS** field, and `2606:4700:4700::1002` to the **Alternate DNS** field.
1. Click **Save**.

### Block malware and adult content

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet**.
1. Click the adapter you want to configure - like your Ethernet adapter or Wi-Fi card.
1. Scroll to **DNS server assignment** and click **Edit**.
1. Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
1. Click the **IPv4** toggle to turn it on.
1. Add `1.1.1.3` to the **Preferred DNS** field, and `1.0.0.3` to the **Alternate DNS** field.
1. Click the **IPv6** toggle.
1. Add `2606:4700:4700::1113` to the **Preferred DNS** field, and `2606:4700:4700::1003` to the **Alternate DNS** field.
1. Click **Save**.

<CaptivePortals/>