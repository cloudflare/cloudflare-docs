---
updated: 2024-03-11
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Access and secure a MySQL database using Cloudflare Tunnel and network policies
---

# Access and secure a MySQL database using Cloudflare Tunnel and network policies

Using Cloudflare Tunnel's private networks, users can connect to arbitrary non-browser based TCP/UDP applications, like databases. You can set up network policies that implement zero trust controls to define who and what can access those applications using the WARP client.

By the end of this tutorial, users that pass network policies will be able to access a remote MySQL database available through a Cloudflare Tunnel on TCP port 3306.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- A MySQL database listening for remote connections and configured with users that can connect remotely
- (Optional)[Resolver policies](/cloudflare-one/policies/gateway/resolver-policies/) enabled on your account 

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a Cloudflare Tunnel">}}

Install `cloudflared` on a server in your private network. This server should have connectivity to the MySQL database.

{{<render file="tunnel/_create-tunnel.md" productFolder="cloudflare-one">}}

{{</tutorial-step>}}

{{<tutorial-step title="Add private network routes">}}

1. In the **Private Networks** tab, add the following IP addresses:

  - Private IP/CIDR of your MySQL server (for example, `10.128.0.175/32`)
  - (Optional) Private IP/CIDR of your internal DNS server

2. Select **Save tunnel**.

The application and (optional) DNS server are now connected to Cloudflare.

{{</tutorial-step>}}

{{<tutorial-step title="Create a Gateway network policy">}}

1. Go to **Gateway** > **Firewall Policies** > **Network**.
2. Add a [network policy](/cloudflare-one/policies/gateway/network-policies/) that targets the private IP address and the port of the MySQL database (port 3306 by default). The following example allows access to the database to the users that enrolled into WARP using an `@example.com` email address. The network policies can also take into consideration [device posture checks](/cloudflare-one/identity/devices/).

| Selector | Operator | Value | Logic | Action |
| -------- | -------- | ----- | ----- | ------ |
| Destination IP | in | `10.128.0.175` | And | Allow |
| Destination Port | in | `3306` | And | |
| User Email | matches regex | `.*example.com` | |

In addition to the Allow rule above, Cloudflare recommends adding a [catch-all block policy](/learning-paths/replace-vpn/build-policies/) to the bottom of your network policy list to enforce a default-deny model.

Allowed WARP users can now connect to the MySQL server at `10.128.0.175` using the MySQL client of their choice.

{{</tutorial-step>}}

{{<tutorial-step title="(Optional) Create a Gateway resolver policy">}}

To allow users to access the MySQL database using an internal hostname instead of the private IP address, configure a Gateway resolver policy.

1. Go to **Gateway** > **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression to match against the private [domain](/cloudflare-one/policies/gateway/resolver-policies/#domain) or [hostname](/cloudflare-one/policies/gateway/resolver-policies/#host) of the application, like in the following example:

    | Selector | Operator | Value                  |
    | -------- | -------- | ---------------------- |
    | Domain     | in       | `internalrecord.com` |

4. In **Select DNS resolver**, select _Configure custom DNS resolvers_.
5. Enter the private IP address of your DNS server.
6. In the dropdown menu, select _`<IP-address> - Private`_.
7. (Optional) Enter a custom port.
8. Select **Create policy**.

If your internal DNS server has an `A` record for the MySQL database, users can connect to the server using this record. For example, assuming a BIND server that includes the entry:

`mysql IN  A  10.128.0.175`

Allowed WARP users can connect to the MySQL database at `mysql.internalrecord.com` using the MySQL client of their choice.

{{</tutorial-step>}}

{{</tutorial>}}
