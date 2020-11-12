---
order: 0
---

# DNS over HTTPS

## Browser

To ensure you are using Cloudflare DoH, head to the [1.1.1.1 help page](https://1.1.1.1/help) check that:
1. Your [system](https://1.1.1.1/dns/#setup-instructions) is configured correctly. 
2. Your [browser](https://1.1.1.1/help) is configured correctly.

### Firefox

<Aside>

<b>Before you start</b>. <a href="/getting-started/troubleshooting-policies/#find-a-location-doh-subdomain"> Obtain a location DoH subdomain (previously known as a unique id)</a>

</Aside>

With Firefox, you can send DNS queries using the DNS over HTTPS protocol.

1. Open **Preferences** and scroll to the bottom.

2. Click on **Network Settings**.

3. Click on **Settings**.

4. Check **Enable DNS over HTTPS**.

5. Choose **Custom** from the drop-down for **Use Provider**.

6. Enter `https://YOUR_UNIQUE_SUBDOMAIN.cloudflare-gateway.com/dns-query` in the **Custom** field. In place of `YOUR_UNIQUE_SUBDOMAIN`, include your **unique ID**.

7. Click **OK**.

8. Enter **about:config** in the address bar.

9. Click on **Accept the risk!** if you see a prompt from Firefox.

10. Set network.trr.bootstrapAddress to `162.159.36.5`.

11. Set network.trr.mode to **3**.

You should now be able to send queries through the DNS over HTTPS protocol.

### Google Chrome / Microsoft Edge / Brave

1. Open **Settings**.
2. In your address bar, type the following and hit Enter:
 `chrome://flags/#dns-over-https`. This will take you to Secure DNS lookups.
4. Click on the **Secure DNS lookups** radio button to enable DoH.

Read more about [enabling DNS over HTTPS](https://www.chromium.org/developers/dns-over-https) on Chrome.

### Safari

As of today, Safari does not support DNS over HTTPS.

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