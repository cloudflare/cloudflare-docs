---
pcx_content_type: how-to
title: Local Domain Fallback
weight: 6
---

# Configure Local Domain Fallback

By default, Cloudflare Zero Trust excludes common top level domains used for local resolution from being sent to Gateway for processing. These domains are resolved by the local DNS resolver configured for the device on its primary interface. Since these DNS requests bypass the Gateway resolver, they are not subject to Gateway DNS policies or DNS logging.

You can add additional domains to the Local Domain Fallback list and specify a DNS server to use in place of the Gateway resolver. The WARP client proxies these requests directly to the configured fallback servers.

## View local domains

To view the domains subject to Local Domain Fallback:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to view or modify and select **Configure**.

3. Scroll down to **Local Domain Fallback** and select **Manage**.

On this page, you will see a list of domains excluded from Gateway. You can [add](#add-a-domain) or [remove](#delete-a-domain) domains from the list at any time.

{{<Aside type="warning">}}

Local Domain Fallback configuration only impacts where DNS requests get resolved, not the flow of traffic destined to those domains. If you want to prevent traffic from being sent to a specific domain or IP address, you must add those domains or IPs to your [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) configuration.

{{</Aside>}}

## Add a domain

1. Go to the [**Local Domain Fallback** page](#view-local-domains).

2. Enter the **Domain** you want to exclude from Gateway. All prefixes under the domain are subject to the local domain fallback rule (for example, all entries are interpreted as `\*.example.com`).

3. Enter the DNS server(s) that should resolve that domain name.

    - All servers are tried and the fastest response is used. If this response is `no records found`, then that response will be used and the other servers will not be queried.
    - It is best to always specify at least one DNS server for each domain. If a value is not specified, the WARP client will try to identify the DNS server (or servers) used on the device before it started, and use that server for each domain in the Local Domain Fallback list.

4. Enter an optional description and select **Save domain**.

5. If your DNS server requires queries to originate from inside of its network (in other words, outside of the WARP tunnel), add the DNS server to your [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) Exclude list.

[Learn more](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/#how-the-warp-client-handles-dns-requests) about how WARP handles DNS requests.

## Delete a domain

1. [Navigate](#view-local-domains) to the **Local Domain Fallback** page.

2. Find the domain in the list and select **Delete**.

The domain will no longer be excluded from Gateway DNS policies, effective immediately.
