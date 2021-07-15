---
order: 5
pcx-content-type: how-to
---
 
# Split Tunnels

Split Tunnels mode can be configured to exclude IP addresses or domains from the WARP Tunnel. This is commonly used for private routing, including those defined in [RFC 1918](https://tools.ietf.org/html/rfc1918). You can find a list of excluded IP addresses under **Settings** > **Network** > **Split Tunnels**.
 
You can add or remove items from the Split Tunnels list at any time.
 
![Settings End](../../../../static/secure-web-gateway/split-tunnel/settings-end.png)
 
1. On the Teams dashboard, navigate to **Settings** > **Network**.
 
1. Under **Split Tunnels**, click **Manage**.
 
    On this page, you will find a list of the networks Cloudflare for Teams excludes. You can customize this list to add or remove any items from it.
 
### Add an IP address
 
On the Split Tunnels page, use the Select and choose **IP Address** then enter the IP address or CIDR and an optional description in the relevant fields. Then, click **Save destination**.

The IP address will appear in the list of Split Tunnel entries.

### Add a domain
 
On the Split Tunnels page, use the Select and choose **Domain** then enter the domain and an optional description in the relevant fields. Then, click **Save destination**.

The domain will appear in the list of Split Tunnel entries.

Valid domains include:
- example.com
- example.example.com
- *.example.com

<Aside header='Warning about using domains to split tunnel traffic'>

Domain based split tunneling works alongside DNS by dynamically excluding the route to the IP address(es) returned in the DNS lookup request. This has a few ramifications you should be aware of before deploying in your organization:
 
1. Routes exclduded from WARP and Gateway visibility may change day to day, and may be different for each user depending on location.
2. You may inadvertently exclude additional hostnames that happen to share an IP address.
3. Most services are a collection of hostnames, until Split Tunnel supports App Grousp you will need to ensure you include all domains used by a particular app or service.
4. If a DNS result has been previously cached it will not be dynamically included in the split tunnel result until the next time the DNS lookup happens.

</Aside>
 
### Remove an item from Split Tunnel
 
On the Split Tunnels page, locate the IP address or hostname in the list and then click **Delete**.

<Aside>

If you need to revert to the default Split Tunnel entries, click delete on all entries until no more are left. Once the list is empty, the entries page will re-populate with the default values.

</Aside>
