---
weight: 11
pcx_content_type: how-to
title: Windows
meta:
    title: Set up 1.1.1.1 on Windows
---

# Set up 1.1.1.1 - Windows

## Windows 10

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Select the **Start menu** > **Settings**.
2. On **Network and Internet**, select **Change Adapter Options**.
3. Right-click on the Ethernet or WiFi network you are connected to and select **Properties**.
4. Choose **Internet Protocol Version 4**.
5. Select **Properties** > **Use the following DNS server addresses**.
6. {{<render file="_all-ipv4.md">}}
7. Select **OK**.
8. Go to **Internet Protocol Version 6**.
9. Select **Properties** > **Use the following DNS server addresses**.
10. {{<render file="_all-ipv6.md">}}
11. Select **OK**.

## Windows 11

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Select the **Start menu** > **Settings**.
2. On **Network and Internet**, choose the adapter you want to configure - like your Ethernet adapter or WiFi card.
3. Scroll to **DNS server assignment** and select **Edit**.
4. Select the **Automatic (DHCP)** drop-down menu > **Manual**.
5. Select the **IPv4** toggle to turn it on.
6. {{<render file="_all-ipv4.md">}}
7. Select the **IPv6** toggle.
8. {{<render file="_all-ipv6.md">}}
9. Select **Save**.

{{<render file="_captive-portals.md">}}

{{<render file="_encrypted.md">}}
