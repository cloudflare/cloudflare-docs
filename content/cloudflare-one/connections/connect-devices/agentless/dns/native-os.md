---
pcx-content-type: how-to
title: Native OS
weight: 4
---

# Native OS

{{<Aside type="warning" header="Warning">}}

Enrolling devices using static IP addresses may prevent users from connecting to some of the public Wi-Fi networks that use captive portals. If users are experiencing connectivity issues related to captive portals, they should:

1. Remove the static IP addresses from the device.
1. Connect to the Wi-Fi network.
1. Once the connection has been established, add the static IP addresses back.

Alternatively, you can look into using the [WARP client](/cloudflare-one/connections/connect-devices/) to connect your devices to Cloudflare Zero Trust.

{{</Aside>}}

## Linux

### Ubuntu

#### IPv4

1. Click **System** > **Preferences** > **Network Connections**.
1. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
1. Click **Edit**.
1. Click **IPv4**.\
   Remove any IP addresses that may already be listed.
1. Add the following IP addresses:
   - **172.64.36.1**
   - **172.64.36.2**
1. Click **Apply**.

#### IPv6

1. Click **System** > **Preferences** > **Network Connections**.
1. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
1. Click **IPv6**.
1. Add the IPv6 address from that we listed based on your location configuration
1. Click **Apply**.

### Debian

#### IPv4

1. In the command line, type: `sudo vim /etc/resolv.conf`
1. Press the **i** key on your keyboard to edit the document
1. Replace the nameserver lines with:
   - **172.64.36.1**
   - **172.64.36.2**
1. Press the **ESC** key on your keyboard to save and exit vim.
1. Type `:wq`.

#### IPv6

1. In the command line, type: `sudo vim /etc/resolv.conf`
1. Add the IPv6 address from that we listed based on your location configuration.
1. Press the **ESC** key on your keyboard to save and exit vim.
1. Type `:wq`.

## Mac

### IPv4

1. Go to **System Preferences** > **Network**.
1. Click **Advanced**.
1. Select the **DNS** tab, and remove any IP addresses that may be already listed.
1. Add the following IP addresses:
   - **172.64.36.1**
   - **172.64.36.2**
1. Click **OK**.
1. Click **Apply**.

### IPv6

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to the **Locations** tab.
1. Expand your location by clicking on it.
1. Note the **IPv6 address**.
1. On your computer, go to **System Preferences** > **Network**.
1. Click **Advanced**.
1. Select the **DNS** tab, and remove any IP addresses that may already be listed.
1. Add the **IPv6 address** you got from your location card.
1. Click **OK**.
1. Click **Apply**.

## Windows

### IPv4

1. Click on **Start** menu, then click on Control Panel.
1. Click on **Network and Internet**.
1. Click on **Change Adapter Settings**.
1. Right click on the Wi-Fi network you are connected to.
1. Click **Properties**.
1. Select **Internet Protocol Version 4**.
1. Click **Properties**.
1. Remove any IP addresses that may be already listed and add the following IP addresses in their place:
   - **172.64.36.1**
   - **172.64.36.2**
1. Click **OK**.

### IPv6

1. Click on **Start** > **Control Panel**.
1. Click on **Network and Internet**.
1. Click on **Change Adapter Settings**.
1. Right click on the Wi-Fi network you are connected to.
1. Click **Properties**.
1. Select **Internet Protocol Version 6**.
1. Click **Properties**.
1. Click **Use The Following DNS Server Addresses**.
1. Add the IPv6 address that we listed based on your location configuration
   1.Click **OK**.
