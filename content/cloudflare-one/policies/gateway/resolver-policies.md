---
pcx_content_type: configuration
title: Resolver policies
layout: single
weight: 6
meta:
  title: Gateway resolver policies
---

# Resolver policies

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

By default, Gateway sends DNS requests to [1.1.1.1](/1.1.1.1/), Cloudflare's public DNS resolver, for resolution. Enterprise users can instead create Gateway policies to route DNS requests to custom resolvers.

You may use resolver policies if you require access to non-publicly routed domains, such as private network services or internal resources. You may also use resolver policies if you need to access a protected DNS service or want to simplify DNS management for multiple locations.

## Resolver connections

Resolver policies support TCP and UDP connections. Custom resolvers can point to the Internet via IPv4 or IPv6, or to a private network service, such as a [Magic tunnel](/magic-transit/how-to/configure-tunnels/). Policies default to port `53`. You can change which port your resolver uses by customizing it in your policy.

You can protect your authoritative nameservers from DDoS attacks by enabling [DNS Firewall](/dns/dns-firewall/).

## Create a resolver policy

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression for your desired traffic. For example, you can resolve a hostname for an internal service:

    | Selector | Operator | Value                  |
    | -------- | -------- | ---------------------- |
    | Host     | in       | `internal.example.com` |

4. In **Select DNS resolver**, choose _Configure custom DNS resolvers_.
5. Enter the IP addresses of your custom DNS resolver.
6. In **Network**, choose whether to route queries publicly (to the Internet) or privately (to a private network service).
7. (Optional) Enter a custom port for each IP address.
8. Select **Create policy**.

Gateway will send a query to all resolvers listed, returning the first response. Custom resolvers are saved to your account for future use.

For more information on creating a DNS policy, refer to [DNS policies](/cloudflare-one/policies/gateway/dns-policies/).
