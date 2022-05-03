---
pcx-content-type: how-to
title: Local Domain Fallback
weight: 6
---

# Configure Local Domain Fallback

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems       | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

By default, Cloudflare Zero Trust excludes common top level domains used for local resolution from being sent to Gateway for processings. Excluded domains are listed on the Zero Trust dashboard under **Settings** > **Network** > **Local Domain Fallback** . All domains in that list rely on the local DNS resolver configured for the device on its primary interface or the DNS server specified when you add a new local domain. Domains added to this list are not subject to Gateway DNS policies or DNS logging. The WARP Client proxies these requests directly to the configured fallback servers.

{{<Aside type="warning">}}

Traffic destined to domains entered in the Local Domain Fallback configuration is still subject to Split Tunnel rules. If you want to prevent traffic from being sent to a specific domain or IP address, you must also enter that in the Split Tunnel configuration.

{{</Aside>}}

You can add or remove domains from the Local Domains list at any time.

## Add a domain

1. On the Zero Trust dashboard, navigate to **Settings** > **Network**.

2. Under **Local Domain Fallback**, click **Manage**.

3. Enter the **Domain** you want to exclude from Gateway. All prefixes under the domain are subject to the local domain fallback rule (for example, all entries are interpreted as `\*.example.com`).

4. Enter the DNS server(s) that should resolve that domain name. It is best to always specify at least one DNS server that Local Domain Fallback should use for any domain you add. If a value is not specified, the WARP client will try to identify the DNS server (or servers) used on the device before it started, and use that server for each domain in the Local Domain Fallback list.

5. Enter an optional description and click **Save domain**.

The domain will appear in the list of Local Domain entries.

## Delete a domain

1. On the Zero Trust dashboard, navigate to **Settings** > **Network**.

2. Under **Local Domain Fallback**, click **Manage**. On this page, you will find a list of domains Cloudflare Zero Trust excludes.

3. To remove a domain from the list, locate the domain and then click **Delete**.

The domain will no longer be excluded from Gateway DNS policies, effective immediately.
