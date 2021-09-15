---
order: 5
pcx-content-type: how-to
---
 
# Split Tunnels

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| All systems | WARP with Gateway | All plans | 

</div>
</details>

Split Tunnels mode can be configured to exclude or include IP addresses or domains from going through WARP. This feature is commonly used to run WARP alongside a VPN (in Exclude mode) or to provide access to a specific Tunnel (in Include mode).
 
You can add or remove items from the Split Tunnels list at any time, but note that changes made to your Split Tunnel configuration are immediately propagated to clients. Because this setting controls what Gateway has visibility on at the network level, please review and test all changes immediately after making every change.

Also, changing between Include and Exclude modes will immediately delete your existing Split Tunnel configuration. Please make a copy of any IP addresses or domains in your existing configuration, as they will be reverted to the default upon switchin modes. 
 
![Settings End](../../../../static/secure-web-gateway/split-tunnel/settings-end.png)

To set up Split Tunnels:

1. On the Teams Dashboard, navigate to **Settings** > **Network**.
 
1. Under **Split Tunnels**, select the mode you want to choose.

    * **(default) Exclude IPs and domains**. All traffic will be sent to Cloudflare Gateway ecept for the IPs and domains you specify.
    * **Include IPs and Domains**. Only traffic destined to the IP address or domains you specify will be sent to Cloudflare Gateway.

1. If you want to add or remove items from your Split Tunnels configuration, click **Manage**.

    On this page, you will find a list of the IPs and domains Cloudflare for Teams excludes or includes, depending on the mode you have selected. Add or remove any desired items and click **Save**.

### Add an IP address
 
On the Split Tunnels page, choose **IP Address** from the list of selectors and enter the IP address or CIDR you want to exclude or include. Next, add an optional description in the relevant field. Then, click **Save destination**.

The IP address will appear in the list of Split Tunnel entries.

### Add a domain
 
On the Split Tunnels page, choose **Domain** from the list of selectors and enter the domain you want to exclude or include. Next, add an optional description in the relevant field. Then, click **Save destination**.

The domain will appear in the list of Split Tunnel entries.

Valid domains include:
- `example.com`
- `example.example.com`
- `*.example.com`

<Aside header='Warning about using domains in Split Tunnels'>

Domain-based split tunneling works alongside DNS by dynamically excluding or including the route to the IP address(es) returned in the DNS lookup request. This has a few ramifications you should be aware of before deploying in your organization:
 
1. Routes excluded or included from WARP and Gateway visibility may change day to day, and may be different for each user depending on where they are.
2. You may inadvertently exclude or include additional hostnames that happen to share an IP address.
3. Most services are a collection of hostnames. Until Split Tunnels mode supports [App Types](/policies/filtering/http-policies/application-app-types), you will need to ensure you add all domains used by a particular app or service.
4. If a DNS result has been previously cached it will not be dynamically added in the Split Tunnel result until the next time the DNS lookup happens.

</Aside>

### Important platform differences

Domain-based Split Tunnels work differently on mobile clients than on desktop clients. If both mobile and desktop clients will connect to your organization, it is recommended to use Split Tunnels based on IP addresses or CIDR, which work the same across all platforms.

#### Windows, Linux and macOS behavior

Clients on these platforms work by dynamically inserting the IP address of the domain immediately after it is resolved into the routing table for split tunneling. This allows the desktop clients to support wildcard domain prefixes (for example, `*.example.com`), not just a singular domain (like `example.com` or `www.example.com`).

#### iOS, Android and ChromeOS behavior

Due to platform differences, mobile clients can only apply Split Tunnels rules when the tunnel is initially started. This means:

* Domain-based Split Tunnels rules are created when the tunnel is established based on the IP address for that domain at that time. The route is refreshed each time the tunnel is established.

* Wildcard domain prefixes (for example, `*.example.com`) are not supported. Because route information must be added when the tunnel starts, these platforms can’t support wildcards. Wildcard domain prefixes can still exist in your configuration, but they will be ignored on these platforms.

### Remove an item from Split Tunnels
 
On the Split Tunnels page, locate the IP address or hostname in the list and then click **Delete**.

<Aside>

If you need to revert to the default Split Tunnels entries, delete all entries from the list. Once the list is empty, the page will re-populate with the default values.

</Aside>
