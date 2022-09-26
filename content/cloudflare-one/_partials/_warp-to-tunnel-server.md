---
_build:
  publishResources: false
  render: never
  list: never
---

1. Create a Cloudflare Tunnel for your server by following our [dashboard setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/remote/). You can skip the connect an application step and go straight to connecting a network.

2. In the **Private Networks** tab for the tunnel, enter the private IP address of your server (or a range that includes the server IP). In GCP, the server IP is the  **Internal IP** of the VM instance.

3. (Optional) [Set up Zero Trust policies](/cloudflare-one/connections/connect-apps/private-net/connect-private-networks/#2-recommended-filter-network-traffic-with-gateway) to fine-tune access to your server.
