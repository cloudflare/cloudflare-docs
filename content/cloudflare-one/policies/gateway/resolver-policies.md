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

You may use custom resolver policies if you require access to non-publicly routed domains, need to use a protected DNS service, or want to simplify DNS management for multiple locations.

## Resolver connections

Resolver policies support TCP and UDP connections. Endpoints can be behind IPv4, IPv6, or a [Magic tunnel](/magic-transit/how-to/configure-tunnels/).

Policies default to port `53`.

## Create a resolver policy

Your custom DNS resolver will resolve requests to the specified hostname.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Firewall Policies** > **DNS**.
2. Select **Add a policy**.
3. Create an Allow expression that resolves your desired hostname. For example:

    | Selector | Operator | Value                  | Action |
    | -------- | -------- | ---------------------- | ------ |
    | Host     | in       | `internal.example.com` | Allow  |

4. In **Select DNS resolver**, choose _Configure custom DNS resolvers_.
5. Enter the IP addresses of your custom DNS resolver.
6. (Optional) Enter a custom port for each IP address.
7. Select **Create policy**.

Gateway will send a query to all resolvers listed, returning the first response. Custom resolvers are saved to your account for future use.

For more information on creating a DNS policy, refer to [DNS policies](/cloudflare-one/policies/gateway/dns-policies/).
