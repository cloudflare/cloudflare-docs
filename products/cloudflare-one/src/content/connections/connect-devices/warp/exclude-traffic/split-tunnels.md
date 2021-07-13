---
order: 5
pcx-content-type: how-to
---
 
# Split Tunnels
 
<Aside>
 
In order for the WARP client to pick up any changes you make to Split Tunnels or Local Domain Fallback, you will need to restart it. To do that, you can either restart the computer or quit the application and relaunch it. This behavior will be improved in a future release.
 
</Aside>

Split Tunnels mode can be configured to exclude IP addresses commonly used for private routing, including those defined in [RFC 1918](https://tools.ietf.org/html/rfc1918). You can find a list of excluded IP addresses under **Gateway** > **Policies** > **Settings** > **Split Tunnels - WARP**.
 
You can add or remove IP addresses from the Split Tunnels list at any time.
 
![Settings End](../../../../static/secure-web-gateway/split-tunnel/settings-end.png)
 
1. On the Teams dashboard, navigate to **Settings** > **Network**.
 
1. Under **Split Tunnels**, click **Manage**.
 
    On this page, you will find a list of the IP addresses Cloudflare for Teams excludes. You can customize this list to add or remove any items from it.
 
### Add an IP address
 
On the Split Tunnels page, enter the IP address or CIDR and an optional description in the relevant fields. Then, click **Add destination**.

The IP address will appear in the list of Split Tunnel entries.
 
### Remove an IP address
 
On the Split Tunnels page, locate the IP address in the list and then click **Delete**.
