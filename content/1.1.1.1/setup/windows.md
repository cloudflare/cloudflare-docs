---
weight: 11
title: Windows
pcx-content-type: how-to
---

# Set up 1.1.1.1 - Windows

## Windows 10

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Click the **Start menu** > **Settings**.
2. Select **Network and Internet** > **Change Adapter Options**.
3. Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
4. Select **Internet Protocol Version 4**.
5. Click **Properties** > **Use the following DNS server addresses**.
6. {{<render file="_all-ipv4.md">}}
7. Click **OK**.
8. Select **Internet Protocol Version 6**.
9. Select **Properties** > **Use the following DNS server addresses**.
10. {{<render file="_all-ipv6.md">}}
11. Click **OK**.

## Windows 11

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Click the **Start menu** > **Settings**.
2. Select **Network and Internet**.
3. Click the adapter you want to configure - like your Ethernet adapter or WiFi card.
4. Scroll to **DNS server assignment** and click **Edit**.
5. Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
6. Click the **IPv4** toggle to turn it on.
7. {{<render file="_all-ipv4.md">}}
8. Click the **IPv6** toggle.
9. {{<render file="_all-ipv4.md">}}
10. Click **Save**.

{{<render file="_captive-portals.md">}}

{{<render file="_encrypted.md">}}