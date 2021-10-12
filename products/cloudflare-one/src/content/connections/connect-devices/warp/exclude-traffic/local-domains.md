---
order: 5
pcx-content-type: how-to
---
 
# Local Domain Fallback

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| All systems | WARP with Gateway | All plans | 

</div>
</details>

By default, Cloudflare for Teams excludes common top level domains used for local resolution from being sent to the Cloudflare proxy. Excluded domains are listed on the Teams dashboard under **Settings** > **Network** > **Local Domain Fallback** . All domains in that list rely on the local DNS resolver configured for the device.
 
You can add or remove domains from the Local Domains list at any time.

1. On the Teams dashboard, navigate to **Settings** > **Network**.
 
1. Under **Local Domain Fallback**, click **Manage**.
 
1. On this page, you will find a list of domains Cloudflare for Teams excludes. You can customize this list to add or remove any items from it.

## Add a domain
 
On the Local Domains page, enter the domain and an optional description in the relevant fields. Then, click **Add domain**.
 
The domain will appear in the list of Local Domain entries.
 
## Delete a domain
 
To remove a domain from the list, locate the domain and then click **Delete**.
