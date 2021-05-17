---
order: 2
hidden: true
---

# Linux

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

## Ubuntu

### IPv4
1. Click **System** > **Preferences** > **Network Connections**.
2. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
3. Click **Edit**.
4. Click **IPv4**.  
Remove any IP addresses that may already be listed.
6. Add the following IP addresses:
    * **172.64.36.1**
    * **172.64.36.2**
7. Click **Apply**.

### IPv6
1. Click **System** > **Preferences** > **Network Connections**.
2. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
3. Click **IPv6**.
4. Add the IPv6 address from that we listed based on your location configuration
5. Click **Apply**.

## Debian

### IPv4
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
