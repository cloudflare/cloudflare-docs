---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/360050483011-Understanding-Cloudflare-gRPC-support
title: gRPC connnections
---

# gRPC connections

Cloudflare offers support for gRPC to protect your APIs on any [proxied gRPC endpoints](/dns/manage-dns-records/reference/proxied-dns-records/). The gRPC protocol helps build efficient APIs with smaller payloads for reduced bandwidth usage, decreased latency, and faster implementations.

## Availability

{{<feature-table id="network.grpc">}}

Charges may occur for gRPC traffic over add-on products such as [Argo Smart Routing](/argo-smart-routing/), [WAF](/waf/), and [Bot Management](/bots/).

## Limitations

Running gRPC traffic on Cloudflare is compatible with most Cloudflare products.

However, the following products have limited capabilities with gRPC requests:

- The [Cloudflare WAF](/waf/) will only run for header inspection during the connection phase. WAF Managed Rules will not run on the content of a gRPC stream.
- [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) currently does not support gRPC.
- [Cloudflare Access](/cloudflare-one/policies/access/) does not support gRPC traffic sent through Cloudflare’s reverse proxy. gRPC traffic will be ignored by Access if gRPC is enabled in Cloudflare. We recommend disabling gRPC for any sensitive origin servers protected by Access or enabling another means of authenticating gRPC traffic to your origin servers.

## Enable gRPC

### Requirements

-   Your gRPC endpoint must listen on port 443. 
-   Your gRPC endpoint must support TLS and HTTP/2.
-   HTTP/2 must be advertised over ALPN.
-   Use `application/grpc` or `application/grpc+<message type` (for example: `application/grpc+proto`) for the **Content-Type** header of gRPC requests.
-   Make sure that the hostname that hosts your gRPC endpoint:
        - Is set to [proxied](/dns/manage-dns-records/reference/proxied-dns-records/)
        - Uses at least the [Full SSL/TLS encryption mode](/ssl/origin-configuration/ssl-modes/full/).

### Procedure

To change the **gRPC** setting in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **Network**.
3.  For **gRPC**, switch the toggle to **On**.