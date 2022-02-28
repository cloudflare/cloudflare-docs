---
weight: 11
title: Windows
pcx-content-type: how-to
---

# Set up 1.1.1.1 - Windows

## Windows 10

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Options**.
1. Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties** > **Use the following DNS server addresses**.
1. {{<render file="_all-ipv4.md">}}
1. Click **OK**.
1. Select **Internet Protocol Version 6**.
1. Select **Properties** > **Use the following DNS server addresses**.
1. {{<render file="_all-ipv6.md">}}
1. Click **OK**.

## Windows 11

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet**.
1. Click the adapter you want to configure - like your Ethernet adapter or WiFi card.
1. Scroll to **DNS server assignment** and click **Edit**.
1. Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
1. Click the **IPv4** toggle to turn it on.
1. {{<render file="_all-ipv4.md">}}
1. Click the **IPv6** toggle.
1. {{<render file="_all-ipv4.md">}}
1. Click **Save**.


{{<render file="_captive-portals.md">}}

{{<render file="_encrypted.md">}}