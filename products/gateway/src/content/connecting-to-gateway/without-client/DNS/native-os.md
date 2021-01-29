---
order: 3
---

# Native OS

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

## Linux

### Ubuntu

#### IPv4
1. Click **System** > **Preferences** > **Network Connections**.
2. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
3. Click **Edit**.
4. Click **IPv4**.  
Remove any IP addresses that may already be listed.
6. Add the following IP addresses:
    * **172.64.36.1**
    * **172.64.36.2**
7. Click **Apply**.

#### IPv6
1. Click **System** > **Preferences** > **Network Connections**.
2. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
3. Click **IPv6**.
4. Add the IPv6 address from that we listed based on your location configuration
5. Click **Apply**.

### Debian

#### IPv4
1. In the command line, type: `sudo vim /etc/resolv.conf`
2. Press the **i** key on your keyboard to edit the document
3. Replace the nameserver lines with:
    * **172.64.36.1**
    * **172.64.36.2**
4. Press the **ESC** key on your keyboard to save and exit vim. 
5. Type `:wq`.

### IPv6
1. In the command line, type: `sudo vim /etc/resolv.conf`
2. Add the IPv6 address from that we listed based on your location configuration.
3. Press the **ESC** key on your keyboard to save and exit vim. 
4. Type `:wq`.

## Mac

### IPv4
1. Go to **System Preferences** > **Network**.
2. Click **Advanced**.
3. Select the **DNS** tab, and remove any IP addresses that may be already listed.
4. Add the following IP addresses:
    * **172.64.36.1**
    * **172.64.36.2**
5. Click **OK**.
6. Click **Apply**.

### IPv6

1. On the [Teams dashboard](https://dash.teams.cloudflare.com), navigate to the **Locations** tab.
2. Expand your location by clicking on it.
3. Note the **IPv6 address**.
4. On your computer, go to **System Preferences** > **Network**.
5. Click **Advanced**.
6. Select the **DNS** tab, and remove any IP addresses that may already be listed.
7. Add the **IPv6 address** you got from your location card.
8. Click **OK**.
9. Click **Apply**.

## Windows

### IPv4
1. Click on **Start** menu, then click on Control Panel.
2. Click on **Network and Internet**.
3. Click on **Change Adapter Settings**.
4. Right click on the Wi-Fi network you are connected to.
5. Click **Properties**.
6. Select **Internet Protocol Version 4**.
7. Click **Properties**.
8. Remove any IP addresses that may be already listed and add the following IP addresses in their place:
    * **172.64.36.1**
    * **172.64.36.2**
9. Click **OK**.

### IPv6
1. Click on **Start** > **Control Panel**.
2. Click on **Network and Internet**.
3. Click on **Change Adapter Settings**.
4. Right click on the Wi-Fi network you are connected to.
5. Click **Properties**.
6. Select **Internet Protocol Version 6**.
7. Click **Properties**.
8. Click **Use The Following DNS Server Addresses**.
9. Add the IPv6 address that we listed based on your location configuration
10. Click **OK**.