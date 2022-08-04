---
pcx_content_type: how-to
title: Kubernetes
weight: 41
---

# Kubernetes

You can deploy Cloudflare Tunnel to route traffic to Kubernetes clusters. Cloudflare no longer maintains an ingress controller, but we recommend two options for connecting Kubernetes clusters to Cloudflare without introducing downtime caused by application restarts or `cloudflared` updates.

Both options rely on Cloudflare's Load Balancer to send traffic for a single hostname to two or more instances of `cloudflared`, allowing you to update or modify `cloudflared` without downtime. Those instances of `cloudflared` should point to a service or ingress controller that runs in front of your Kubernetes cluster.

| Before you start                                                               |
| ------------------------------------------------------------------------------ |
| [Enable Cloudflare Load Balancers](/load-balancing/how-to/create-load-balancer/) |
| [Create a tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/)  |

## Deploy `cloudflared` to an upstream service

1.  Create at least two Tunnels; each with their own dedicated Tunnel ID and associated credentials file.

1.  Upload the credentials file for each Tunnel as k8s secrets.

1.  Create a service that represents your application. In doing so, updates to the application do not impact the Tunnel configuration. For example, an `httpbin` service can be used.

1.  Create two deployments with one replica each using `cloudflared`. Configure `cloudflared` to point to the service IP of the upstream service. Mount the secrets created in Step 1 and point `cloudflared` to the right path.

1.  In the Cloudflare dashboard, create a Load Balancer pool and [point the pool](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) to the two or more Cloudflare Tunnel connections.

Once configured, you can update `cloudflared` by updating one deployment and then proceeding to the next one once you've verified the newly updated cloudflared pod is running and connected.

## Deploy in front of an ingress controller

1.  Create at least two Tunnels; each with their own dedicated Tunnel ID and associated credentials file.

1.  Upload the credentials file for each Tunnel as k8s secrets.

1.  Create two deployments with one replica each using `cloudflared`. Configure `cloudflared` to point to an ingress controller. Mount the secrets created in Step 1 and point `cloudflared` to the right path.

1.  In the Cloudflare dashboard, create a Load Balancer pool and [point the pool](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) to the two or more Cloudflare Tunnel connections.
