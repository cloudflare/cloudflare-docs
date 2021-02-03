---
order: 20
---

# How Argo Tunnel works

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Argo Tunnel connects your web server to the Cloudflare network over an encrypted Tunnel. An example request follows these steps:

* A visitor makes a request to tunnel.yourdomain.com.
* The DNS lookup resolves to a Cloudflare network address.
* The visitor connects to the closest Cloudflare edge PoP via Anycast.
* Cloudflare routes the visitor through a special PoP to PoP route called [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/) to reach a Cloudflare edge PoP that has an established persistent connection with the Argo Tunnel agent `cloudflared` running on your web server.
* The request is routed to the `cloudflared` instance running on your server.
* The Tunnel client forwards the request to your web service.

In more detail:

Argo Tunnel allows you to host any web-based application on the internet, even those that run in a NAT’ed environment.

When the `cloudflared` process starts, the `cloudflared` client will establish an outbound HTTP connection with the two closest Cloudflare data centers. Which data centers are closest is determined by iterating through the SRV DNS record and standard Anycast routing. Simultaneously, a DNS entry is created. Tunnels that use Cloudflare's Load Balancer will create a CNAME record; all other Tunnels will create a AAAA record for your specified hostname. Because the request is initiated from the client, Tunnel is able to expose applications to the internet that are behind a NAT or a firewall without any further port forwarding or configuration.

The connection between `cloudflared` and the Cloudflare edge is a long-lived persistent HTTP2 connection encrypted with TLS. To keep the connection alive, `cloudflared` sends a heartbeat to the edge in the form of a ping frame over HTTP2. If the connection is dropped, the `cloudflared` client re-establishes the connection with Cloudflare. `cloudflared` connects to Cloudflare on port 7844.

For TLS negotiation between Cloudflare and the `cloudflared` client, the `cloudflared` client downloads a certificate for the requested domain (\*.requested-domain.tld) from Cloudflare before starting. The initial login with your Cloudflare credentials through `cloudflared` generates this certificate. This certificate is a self-signed certificate from Cloudflare’s Origin CA service.

All packets between Cloudflare and the tunneled web server use stream multiplexing over HTTP2. In HTTP2, each request/response pair is called a Stream and given a unique Stream ID so that these streams can be “multiplexed” or sent asynchronously over the same connection.

When a visitor makes a request to a web server behind Tunnel, the visitor’s device first performs a DNS lookup to find the address of the server. The DNS answer returned are shared Anycast addresses from Cloudflare’s data centers. Then, Cloudflare routes the request using Argo Smart Routing (optimized data center to data center routing) to one of the two data centers connected to the origin web server. From there, the request is sent to the `cloudflared` client, which then forwards the request to the application.

## Argo Tunnel Runs on Argo

Argo Tunnel is available for free with the purchase of [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/). Argo Smart Routing is like Waze for internet traffic between Cloudflare data centers: it chooses the optimal route to get a packet across the internet, using Cloudflare data centers as a virtual backbone. For example, if a visitor in Frankfurt is visiting an application with a server in Virginia, Cloudflare may send the visitor’s request from the FRA data center, to the LHR data center, to the EWR data center, to the IAD data center, or whatever is the fastest and least congested path at that time. This means that requests to servers behind Tunnel are not only secure by default, they are fast.

Why is Argo Tunnel a part of Argo? When a visitor requests an application behind Tunnel, the visitor first hits the closest Cloudflare data center to them, and then needs to be routed to one of the data centers that has the virtual Tunnel connection back to the web server. This is what Argo specializes in - finding the most optimal way to route from one Cloudflare data center to another. It made sense to combine the two products so that we could provide better routes and faster service for the visitor.

## How does Argo Tunnel compare with a GRE tunnel?

The old way to ensure a web server was locked down to external traffic was by using a GRE tunnel, which is a slow and expensive technology. If you are a network admin currently using a GRE tunnel, we suggest moving to Argo Tunnel to lower your costs and increase your performance. It’s the same security without the hassle or latency.

Why is GRE tunneling inadequate? GRE is a tunneling protocol for sending data between two servers by simulating a physical link. Configuring a GRE tunnel requires coordination between network administrators from both sides of the connection. It is an expensive service that is usually only available for large corporations with dedicated budgets. The GRE protocol encapsulates packets inside other packets, which means that you will have to either lower the MTU of your origin servers, or have your router do packet fragmentation, leading to slower responses.
