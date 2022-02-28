---
weight: 10
title: Windows
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"
import Encrypted from "../_partials/_encrypted.md"
import Ipv4 from "../_partials/_all-ipv4.md"
import Ipv6 from "../_partials/_all-ipv6.md"

# Set up 1.1.1.1 - Windows

## Windows 10

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet** > **Change Adapter Options**.
1. Right-click on the Ethernet or WiFi network you are connected to and click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties** > **Use the following DNS server addresses**.
1. <Ipv4 />
1. Click **OK**.
1. Select **Internet Protocol Version 6**.
1. Select **Properties** > **Use the following DNS server addresses**.
1. <Ipv6 />
1. Click **OK**.

## Windows 11

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

1. Click the **Start menu** > **Settings**.
1. Select **Network and Internet**.
1. Click the adapter you want to configure - like your Ethernet adapter or WiFi card.
1. Scroll to **DNS server assignment** and click **Edit**.
1. Click the **Automatic (DHCP)** drop-down menu and select **Manual**.
1. Click the **IPv4** toggle to turn it on.
1. <Ipv4 />
1. Click the **IPv6** toggle.
1. <Ipv6 />
1. Click **Save**.


<CaptivePortals/>

<Encrypted/>