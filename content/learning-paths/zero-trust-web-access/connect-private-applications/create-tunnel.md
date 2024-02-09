---
title: Create a Cloudflare Tunnel
pcx_content_type: overview
weight: 1
layout: learning-unit
---

To enable clientless access to your applications, you will need to create a Cloudflare Tunnel that contains public hostname routes. A public hostname route creates a public DNS record that routes to the specific address, protocol, and port associated with a private application. For example, you can define a public hostname (`mywebapp.example.com`) to provide access to a web server running on `https://localhost:8080`. When a user goes to `mywebapp.example.com` in their browser, their request will first route to a Cloudflare data center where it is inspected against your configured security policies. Cloudflare will forward validated requests down your tunnel to your web server.

![How an HTTP request reaches a private application connected with Cloudflare Tunnel](/images/cloudflare-one/connections/connect-apps/handshake.jpg)

## Create a tunnel

To create a Cloudflare Tunnel:

{{<render file="tunnel/_create-tunnel.md" productFolder="cloudflare-one">}}

## Connect an application

To add a public hostname route to the tunnel:

{{<render file="tunnel/_add-public-hostname.md" productFolder="cloudflare-one">}}

All users on the Internet can now connect to this application via its public hostname. Module 4 will discuss how to restrict access to authorized users.

{{<Aside type="note">}}
If the tunnel is disconnected:
- Ensure that your on-premise or cloud firewall allows egress traffic on the [required ports](/cloudflare-one/connections/connect-networks/deploy-tunnels/tunnel-with-firewall/#required-for-tunnel-operation).
- Ensure that the `cloudflared` host machine can connect to your internal applications and services. Verify that the host has the proper security group memberships and that no firewalls will block traffic between the host and the target services.

{{</Aside>}}

## Additional resources

- [Manage DNS records]
- [Set up load balancing]

For more control over the traffic routed through each tunnel connection, users can integrate with the Cloudflare load balancing service.