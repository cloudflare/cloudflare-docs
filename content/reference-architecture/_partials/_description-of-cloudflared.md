`cloudflared` is a lightweight daemon installed in an organizations' infrastructure that creates a tunnel via an outbound connection to Cloudflare's global network. The connector can be installed in a variety of ways:

- In the OS installed on the bare metal server
- In the OS that is running in a virtualized environment
- In a [container](https://hub.docker.com/r/cloudflare/cloudflared) running in a Docker or Kubernetes environment

`cloudflared` runs on Windows, Linux, or macOS operating systems and creates an encrypted tunnel using QUIC, a modern protocol that uses UDP (instead of TCP) for fast tunnel performance and modern encryption standards. Generally speaking, there are two approaches for how users can deploy `cloudflared` in their environment:

1. **On the same server and operating system where the application or service is running**. This is typically in high-risk or compliance deployments where organizations require independent tunnels per application. `cloudflared` consumes a small amount of CPU and RAM, so impact to server performance is marginal.
2. **On a dedicated server(s) in the same network where the applications run**. This often takes the form of multiple containers in a Docker or Kubernetes environment.

`cloudflared` manages multiple outbound connections back to Cloudflare and usually requires no changes to network firewalls. Those connections are spread across servers in more than one Cloudflare data center for reliability and failover. Traffic destined for a tunnel is forwarded to the connection that is geographically closest to the request, and if a `cloudflared` connection isn't responding, the tunnel will automatically failover to the next available.

For more control over the traffic routed through each tunnel connection, users can integrate with the Cloudflare [load balancing](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb/) service. To ensure reliable local connectivity, organizations should deploy more than one instance of `cloudflared` across their application infrastructure. For example, with ten front-end web servers running in a Kubernetes cluster, you might deploy three kubernetes services [running `cloudflared` replicas](/cloudflare-one/tutorials/many-cfd-one-tunnel/).

![Using cloudflared, multiple outbound connections are created back to Cloudflare across multiple data centers to improve overall performance and reliability.](/images/reference-architecture/cloudflare-one-reference-architecture-images/cf1-ref-arch-7.svg)

Once tunnels have been established, there are two methods for how user traffic is forwarded to your application or service. Each method below is protected by policies managed by the ZTNA service that enforces authentication and access (which will be explored in further depth [later in this document](#secure-access-to-self-hosted-apps-and-services)).

##### Public hostname

Each public hostname is specific to an address, protocol, and port associated with a private application, allowing for narrow access to a specific service when there might be multiple applications running on the same host.

For example, organizations can define a public hostname (`mywebapp.domain.com`) to provide access to a web server running on `https://localhost:8080`, while ensuring no access to local Kubernetes services.

Key capabilities:

- A hostname is created in a public DNS zone and all requests to that hostname are first routed to the Cloudflare network, inspected against configured security and access policies, before being routed through the tunnel to the secured private resource
- Multiple hostnames can be defined per tunnel, with each hostname mapping to a single application (service address and port)
- Support for HTTP/HTTPS protocols
- Access to resources only requires a browser
- When Cloudflare's device client is deployed on an user device, policies can leverage additional contextual signals (e.g. determining whether the device is managed or running the latest OS) in policy enforcement
- For access to SSH/VNC services, Cloudflare renders an SSH/VNC terminal using webassembly in the browser

Applications exposed this way receive all of the benefits of Cloudflare's leading DNS, CDN, and DDoS services as well as our web application firewall (WAF), API, and bot services, all without exposing application servers directly to the Internet.

##### Private network

In some cases, users may want to leverage ZTNA policies to provide access to many applications on an entire private network. This allows for greater flexibility over the ways clients connect and how services are exposed. It also enables communication to resources over protocols other than HTTP. In this scenario, users specify the subnet for the private network they wish to be accessible via Cloudflare.

Key capabilities:

- `cloudflared`, combined with Cloudflare device agent, provides access to private networks, allowing for any arbitrary L4 TCP, UDP or ICMP connections
- One or many networks can be configured using CIDR notation (e.g. 172.21.0.16/28)
- Access to resources on the private network requires the Cloudflare device agent to be installed on clients, and at least one Cloudflare Tunnel server on the connecting network

For both methods, it is important to note that `cloudflared` only proxies inbound traffic to a private application or network. It does not become a gateway or "on-ramp" back to Cloudflare for the network that it proxies inbound connections to. This means that if the web server starts its own connection to another Internet-based API, that connection will not be routed via Cloudflare Tunnel and will instead be routed via the host server's default route and gateway.

This is the desirable outcome in most network topologies, but there are some instances in which network services need to communicate directly with a remotely-connected user, or with services on other segmented networks.

If users require connections that originate from the server or network to be routed through Cloudflare, there are multiple on-ramps through which to achieve this, which will be explained further in the "Connecting Networks" section.