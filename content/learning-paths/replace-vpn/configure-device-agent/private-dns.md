---
title: Resolve private DNS
pcx_content_type: overview
weight: 6
layout: learning-unit
---

By default, all DNS requests on the user device are resolved by Cloudflare's [public DNS resolver](/1.1.1.1/) except for common top level domains used for local resolution (such as `localhost`). To allow users to connect to internal server names or domains that do not resolve on the public Internet, you have two options:

- [Add internal domains to Local Domain Fallback](#local-domain-fallback)
- [Build custom resolver policies](#resolver-policies)

## Local Domain Fallback

Local Domain Fallback tells the WARP client to send specific DNS requests to your private DNS resolver instead of to Cloudflare’s public DNS resolver. This method was the primary delivery mechanism for private DNS for a long time, and is the simplest option, but it has two shortcomings: you cannot deterministically route private DNS queries to different resolvers based on specific attributes, and you cannot apply Gateway DNS policies to this traffic because Cloudflare is not resolving it.

To learn more about how Local Domain Fallback works, refer to [How the WARP client handles DNS requests](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/#how-the-warp-client-handles-dns-requests).

### Add a domain

To add a domain to the Local Domain Fallback list:

{{<render file="warp/_view-local-domains.md" productFolder="cloudflare-one">}}

4. In **Domain**, enter the apex domain (`example.com`) that you want to resolve using your private DNS server. All prefixes under the apex domain are subject to local domain fallback (in other words, `example.com` is interpreted as `*.example.com`).

5. {{<render file="warp/_add-local-domain-ip.md" productFolder="cloudflare-one">}}

6. Enter an optional description and select **Save domain**.

7. Ensure that the WARP client can proxy DNS traffic to your private DNS server:
    1. Go to **Networks** > **Routes** and verify that the DNS server is connected via Cloudflare Tunnel (either `cloudflared` or WARP Connector).
    2. In your [Split Tunnel configuration](/learning-paths/replace-vpn/configure-device-agent/split-tunnel-settings/), verify that the DNS server IP routes through the WARP tunnel.

## Resolver policies

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

[Custom resolver policies](/cloudflare-one/policies/gateway/resolver-policies/) provide similar functionality to Local Domain Fallback but occur in Cloudflare Gateway rather than on the local device. This option is recommended if you want more granular control over private DNS resolution. For example, you can ensure that all users in a specific geography use the private DNS server closest to them, ensure that specific conditions are met before resolving private DNS traffic, and apply [Gateway DNS policies](/cloudflare-one/policies/gateway/dns-policies/) to private DNS traffic.

### Create a resolver policy

{{<render file="gateway/_create-resolver-policy.md" productFolder="cloudflare-one">}}
