---
updated: 2024-03-04
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Access a web application via its private hostname without WARP
---

# Access a web application via its private hostname without WARP

With Cloudflare Browser Isolation and Resolver Policies, users can connect to private web-based applications via their private hostnames without needing to install the WARP client. By the end of this tutorial, users who pass your Gateway DNS and Network policies will be able to access your private application at `https://<your-team-name>.cloudflareaccess.com/browser/https://internalrecord.com`.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/) enabled on your account
- [Resolver Policies](/cloudflare-one/policies/gateway/resolver-policies/) enabled on your account
- An HTTP or HTTPS application that users access through a browser

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a Cloudflare Tunnel">}}

First, install `cloudflared` on a server in your private network:

{{<render file="tunnel/_create-tunnel.md" productFolder="cloudflare-one">}}

{{</tutorial-step>}}

{{<tutorial-step title="Add private network routes">}}

1. In the **Private Networks** tab, add the following IP addresses:

  - Private IP/CIDR of your application server (for example, `10.128.0.175/32`)
  - Private IP/CIDR of your DNS server

2. Select **Save tunnel**.

The application and DNS server are now connected to Cloudflare.

{{</tutorial-step>}}

{{<tutorial-step title="Enable Clientless Web Isolation">}}

{{<render file="/_clientless-browser-isolation.md">}}
3. For **Permissions**, select **Manage**.
3. Select **Add a rule**.
4. Create an expression that defines who can open the Clientless Web Isolation browser. For example,
| Rule action | Rule type | Selector | Value |
| ----------- | --------- | -------- | ----- |
| Allow       | Include   | Emails ending in | `@example.com` |
4. Select **Save**.

To test, open a browser and go to `https://<team-name>.cloudflareaccess.com/browser/https://<private-IP-of-application>`.

{{</tutorial-step>}}

{{<tutorial-step title="Create a Gateway resolver policy">}}

1. Go to **Gateway** > **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression to match against the private [domain](/cloudflare-one/policies/gateway/resolver-policies/#domain) or [hostname](/cloudflare-one/policies/gateway/resolver-policies/#host) of the application:

    | Selector | Operator | Value                  |
    | -------- | -------- | ---------------------- |
    | Domain     | in       | `internalrecord.com` |

4. In **Select DNS resolver**, select _Configure custom DNS resolvers_.
5. Enter the private IP address of your DNS server.
6. In the dropdown menu, select _`<IP-address> - Private`_.
7. (Optional) Enter a custom port.
8. Select **Create policy**.

To test, open a browser and go to `https://<team-name>.cloudflareaccess.com/browser/https://internalrecord.com`.
{{</tutorial-step>}}

{{<tutorial-step title="Create a Gateway network policy (Recommended)">}}

1. Go to **Gateway** > **Firewall Policies** > **Network**.
2. Add a [network policy](/cloudflare-one/policies/gateway/network-policies/) that targets the private IP address of your application. You can optionally include any ports or protocols relevant for application access. For example,

| Selector | Operator | Value | Logic | Action |
| -------- | -------- | ----- | ----- | ------ |
| Destination IP | in | `10.128.0.175` | And | Allow |
| Destination Port | in | `80` | Or | |
| User Email | matches regex | `.*example.com` | |

For best practices on securing private applications, refer to [Build secure access policies](/learning-paths/replace-vpn/build-policies/).

{{</tutorial-step>}}

{{<tutorial-step title="Connect as a user">}}

Users can now access the application at the following URL:

`https://<team-name>.cloudflareaccess.com/browser/https://internalrecord.com`

The application will load in an isolated browser. You can optionally [configure remote browser controls](/cloudflare-one/policies/browser-isolation/isolation-policies/#policy-settings) such as disabling copy/paste, printing, or keyboard input.

{{</tutorial-step>}}

{{</tutorial>}}