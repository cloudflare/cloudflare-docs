---
order: 5
pcx-content-type: how-to
---

# Local Domain Fallback

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| All systems | WARP with Gateway | All plans |

</div>
</details>

By default, Cloudflare Zero Trust excludes common top level domains used for local resolution from being sent to Gateway for processings. Excluded domains are listed on the Zero Trust dashboard under **Settings** > **Network** > **Local Domain Fallback** . All domains in that list rely on the local DNS resolver configured for the device on its primary interface or the DNS server specified when you add a new local domain. Domains added to this list are not subject to Gateway DNS policies or DNS logging. The WARP Client proxies these requests directly to the configured fallback servers.

<Aside type='warning'>

Traffic destined to domains entered in the Local Domain Fallback configuration is still subject to Split Tunnel rules. If you want to prevent traffic from being sent to a specific domain or IP address, you must also enter that in the Split Tunnel configuration.

 </Aside>

You can add or remove domains from the Local Domains list at any time.

1.  On the Zero Trust dashboard, navigate to **Settings** > **Network**.

2.  Under **Local Domain Fallback**, click **Manage**.

3.  On this page, you will find a list of domains Cloudflare Zero Trust excludes. You can customize this list to add or remove any items from it. All prefixes under the domain are subject to the local domain fallback rule (ex. all entries are interpreted as \*.example.com)

## Add a domain

On the Local Domains page, enter the domain, the DNS server(s) that should resolve that domain name and an optional description in the relevant fields. Then, click **Add domain**.

The domain will appear in the list of Local Domain entries.

## Specify a DNS server

It is best to always specify at least one DNS server that Local Domain Fallback should use for any domain you add. If a value is not specified, the client will try to identify the DNS server (or servers) used on the device before it started, and use that server for each domain in the Local Domain Fallback list.

## Delete a domain

To remove a domain from the list, locate the domain and then click **Delete**.
