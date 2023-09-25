---
pcx_content_type: configuration
title: Custom resolver policies
layout: single
weight: 6
---

# Custom resolver policies

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

By default, Gateway sends DNS requests to [1.1.1.1](/1.1.1.1/), Cloudflare's public DNS resolver, for resolution. Enterprise users can instead create Gateway policies to route DNS requests to custom resolvers.

You may use custom resolver policies if you require access to non-publicly routed domains, need to use a protected DNS service, or want to simplify DNS management for multiple locations.

## Create a DNS policy with a custom DNS resolver

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies** > **DNS**.
2. Select **Add a policy**.
3. Create an Allow expression that resolves a hostname. For example:

    | Selector | Operator | Value                  | Action |
    | -------- | -------- | ---------------------- | ------ |
    | Host     | in       | `internal.example.com` | Allow  |

4. In **Select a DNS resolver**, choose _Custom DNS resolver_.
5. Enter the IP addresses of your custom DNS resolver. For example:

    | IPv4 addresses | IPv6 addresses       |
    | -------------- | -------------------- |
    | 1.1.1.1        | 2606:4700:4700::1111 |
    | 1.0.0.1        | 2606:4700:4700::1001 |

6. Select **Create policy**.

Your custom DNS resolver will resolve requests to the specified hostname. The custom DNS resolver will save to your account for future use.

For more information on creating a DNS policy, refer to [DNS policies](/cloudflare-one/policies/gateway/dns-policies/).
