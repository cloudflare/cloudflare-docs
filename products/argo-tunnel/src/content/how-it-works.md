---
order: 1
---

# How Argo Tunnel works

Cloudflare secures your origin servers by proxying requests to your DNS records through our anycast network, and to the external IP of your origin. However, if attackers discover those destinations, external IP addresses can still provide them with a path around Cloudflare security.

Argo Tunnel provides a secure way to connect your origin to Cloudflare without a publicly routable IP address.

With Tunnel, you don’t expose an external IP from your infrastructure to the Internet. Instead, a lightweight daemon runs in your infrastructure and creates outbound-only connections to Cloudflare’s edge. This allows you to quickly deploy infrastructure in a Zero Trust model by ensuring all requests to your resources pass through Cloudflare’s security filters.

Argo Tunnel connects your web server to the Cloudflare network over an encrypted Tunnel. An example request follows these steps:

- A visitor makes a request to `tunnel.yourdomain.com`.

- The DNS lookup resolves to a Cloudflare network address.

- The visitor connects to the closest Cloudflare edge PoP via Anycast.

- Cloudflare routes the visitor through a special PoP-to-PoP route called [Argo Smart Routing](https://www.cloudflare.com/en-gb/products/argo-smart-routing/) and connects them to a Cloudflare edge PoP that has an established persistent connection to the daemon (`cloudflared`) running on the visitor's web server.

- The request is routed to the `cloudflared` instance running on your server.

- The Tunnel client forwards the request to your web service.

## In more detail

When the `cloudflared` process starts, the `cloudflared` client will establish an outbound HTTP connection with the two closest Cloudflare data centers. Which data centers are closest is determined by iterating through the SRV DNS record and standard Anycast routing.

Administrators can create a DNS record or a Load Balancer entry to proxy traffic to the connection created by `cloudflared`.
The connection between `cloudflared` and the Cloudflare edge is a long-lived persistent HTTP2 connection encrypted with TLS. To keep the connection alive, `cloudflared` sends a heartbeat to the edge in the form of a ping frame over HTTP2. If the connection is dropped, the `cloudflared` client re-establishes the connection with Cloudflare. `cloudflared` connects to Cloudflare on port `7844`.

All packets between Cloudflare and the tunneled web server use stream multiplexing over HTTP2. In HTTP2, each request/response pair is called a Stream and given a unique Stream ID so that these streams can be “multiplexed” or sent asynchronously over the same connection.
