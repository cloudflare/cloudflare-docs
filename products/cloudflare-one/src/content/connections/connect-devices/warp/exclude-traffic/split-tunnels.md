---
order: 5
pcx-content-type: how-to
---
 
# Split Tunnels

Split Tunnels mode can be configured to exclude IP addresses or domains from going through WARP. This is commonly used for private routing, including those defined in [RFC 1918](https://tools.ietf.org/html/rfc1918). You can find a list of excluded IP addresses under **Settings** > **Network** > **Split Tunnels**.
 
You can add or remove items from the Split Tunnels list at any time.
 
![Settings End](../../../../static/secure-web-gateway/split-tunnel/settings-end.png)
 
1. On the Teams Dashboard, navigate to **Settings** > **Network**.
 
1. Under **Split Tunnels**, click **Manage**.
 
    On this page, you will find a list of the networks Cloudflare for Teams excludes. You can customize this list to add or remove any items from it.
 
### Add an IP address
 
On the Split Tunnels page, choose **IP Address** from the list of selectors and enter the IP address or CIDR you want to exclude. Next, add an optional description in the relevant field. Then, click **Save destination**.

The IP address will appear in the list of Split Tunnel entries.

### Add a domain
 
On the Split Tunnels page, choose **Domain** from the list of selectors and enter the domain you want to exclude. Next, add an optional description in the relevant field. Then, click **Save destination**.

The domain will appear in the list of Split Tunnel entries.

Valid domains include:
- `example.com`
- `example.example.com`
- `*.example.com`

<Aside header='Warning about using domains in Split Tunnels'>

Domain-based split tunneling works alongside DNS by dynamically excluding the route to the IP address(es) returned in the DNS lookup request. This has a few ramifications you should be aware of before deploying in your organization:
 
1. Routes exclduded from WARP and Gateway visibility may change day to day, and may be different for each user depending on where they are.
2. You may inadvertently exclude additional hostnames that happen to share an IP address.
3. Most services are a collection of hostnames. Until Split Tunnels mode supports [App Types](/policies/filtering/http-policies/application-app-types), you will need to ensure you include all domains used by a particular app or service.
4. If a DNS result has been previously cached it will not be dynamically included in the Split Tunnel result until the next time the DNS lookup happens.

</Aside>

### Remove an item from Split Tunnels
 
On the Split Tunnels page, locate the IP address or hostname in the list and then click **Delete**.

<Aside>

If you need to revert to the default Split Tunnels entries, delete all entries from the list. Once the list is empty, the page will re-populate with the default values.

</Aside>
