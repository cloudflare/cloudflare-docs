---
order: 0
---

# Connect applications

You can connect applications, servers, and other resources to Cloudflare's network using [Argo Tunnel](/glossary#argo-tunnel). When connected, Cloudflare can apply [Zero Trust policies](/policies/zero-trust) to determine who can reach the resource.

![Tunnel Diagram](../../static/documentation/connections/connect-apps/tun-diagram.png)

Argo Tunnel runs a lightweight [daemon](/glossary#daemon) ([`cloudflared`](/glossary#cloudflared)) in your infrastructure that establishes outbound connections (Tunnels) between your service and the Cloudflare edge. When Cloudflare receives a request for your chosen hostname, it proxies the request through those connections to `cloudflared`. In turn, `cloudflared` proxies the request to your applications.

This forces any requests to access your applications to go through Cloudflare. This way, you can be sure attack traffic is stopped with Cloudflare’s WAF and Unmetered DDoS mitigation, and authenticated with Access if you’ve enabled those features for your account. 

Argo Tunnel can connect HTTP web servers, [SSH servers](/tutorials/ssh), [remote desktops](/tutorials/rdp), and other protocols. Additionally, a single connector, the `cloudflared` daemon, can connect multiple applications of different types.

In order to create and manage Tunnels, you'll first need to:

1. [Download and install `cloudflared`](/connections/connect-apps/install-and-setup/installation) on your machine
2. [Authenticate `cloudflared`](/connections/connect-apps/install-and-setup/setup)

Once `cloudflared` has been installed and authenticated, the process to get your first Tunnel up and running includes 3 high-level steps:

1. [Create a Tunnel](/connections/connect-apps/create-tunnel)
2. [Route traffic to your Tunnel](/connections/connect-apps/routing-to-tunnel)
3. [Run your Tunnel](/connections/connect-apps/run-tunnel)

Steps 1-2 are executed once per Tunnel, normally by an administrator, and Step 3 is executed whenever the Tunnel is to be started, normally by the owner of the Tunnel (whom may be different from the administrator).

Be sure to check out our [Tutorials](/tutorials), where you can also find
best practices for managing Tunnels as an administrator.

## Traffic encryption between Argo Tunnel and HTTPs origin servers

`cloudflared` performs its own SSL termination that is distinct from the origin.

The data in transit between the Cloudflare network and the instance of `cloudflared` is encrypted according to the stages below:

**`cloudflared` to Cloudflare**

* When `cloudflared` reaches out to the Cloudflare network, the daemon validates a TLS server name for `cftunnel.com`.
* The certificate is issued from a Cloudflare-managed root CA.

Details for this flow are available in the `cloudflared` [repository](https://github.com/cloudflare/cloudflared/blob/2020.2.0/tlsconfig/certreloader.go#L124).

**`cloudflared` to origin**

* `cloudflared` trusts the system's certificate pool. If you need to add an additional CA, you can do so by setting the `--origin-ca-pool` flag.
* On Windows systems, the system certificate pool is not supported by the Go standard library used by `cloudflared`. As a result, Windows users will always need to set the `--origin-ca-pool` flag.
* `cloudflared` uses the Go HTTP client to connect to the origin. The daemon connects to the URL specified with the `--url` flag, which determines the TLS server name.
* When the Cloudflare network proxies a request through `cloudflared` to the origin, `cloudflared` converts this stream to an HTTP/1.1 [request](https://github.com/cloudflare/cloudflared/blob/2020.2.0/origin/tunnel.go#L591).
* `cloudflared` then issues the request and [receives](https://github.com/cloudflare/cloudflared/blob/2020.2.0/origin/tunnel.go#L642) an HTTP/1.1 response from the origin, in plaintext, which is encrypted and sent back to the Cloudflare network.

Details for this flow are available in the `cloudflared` [repository](https://github.com/cloudflare/cloudflared/blob/2020.2.0/cmd/cloudflared/tunnel/configuration.go#L204).