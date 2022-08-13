---
pcx_content_type: concept
title: Tunnel availability and failover
layout: single
weight: 2
---

# Tunnel availability and failover

Our lightweight and open-source connector, [`cloudflared`](https://github.com/cloudflare/cloudflared), was built to be highly available without any additional configuration requirements. When you run a tunnel, `cloudflared` establishes four outbound-only connections between the origin server and the Cloudflare network. These four connections are made to four different servers spread across at least two distinct data centers. This model ensures high availability and mitigates the risk of individual connection failures. This means in event a single connection, server, or data center goes offline, your resources will remain available.

## About `cloudflared` replicas

Cloudflare Tunnel also allows users to deploy additional instances of our connector, `cloudflared`, for availability and failover scenarios. We refer to these unique instances as replicas. Each replica establishes four new connections which serve as additional points of ingress to your origin, should you need them. Each of the replicas will point to the same tunnel. This ensures that your network remains up in the event a single host running `cloudflared` goes down.

By design, replicas do not offer any level of traffic steering (random, hash, or round-robin). Instead, when a request arrives to Cloudflare, the network will pick any connection available to the origin. If a connection fails, we will retry others, but there is no guarantee about which connection is chosen.

## When to use `cloudflared` replicas

- To provide additional points of availability for a single tunnel
- To allocate failover nodes within your network
- To update the configuration of a tunnel without downtime

## About Cloudflare Load Balancers

[Cloudflare Load Balancing](/load-balancing/) allows users to proactively steer traffic away from unhealthy origins and intelligently distribute the traffic load based on a multitude of steering algorithms. This process ensures that errors are not served to end users and empowers businesses to tightly couple overall business objectives to their traffic behavior.

In this model, more than one tunnel is required with identical configurations. The DNS record (`UUID.cfargotunnel.com`) for each Cloudflare Tunnel can be used at the origin within the Load Balancer. You can then define traffic steering policies to determine how traffic should be routed to each tunnel.

## When to use Load Balancers

- To intelligently steer traffic based on latency, geolocation, or other signals
- To implement failover logic if a tunnel reaches an inactive state
- To get alerted when a tunnel reaches an inactive state
- To distribute traffic more evenly across your Cloudflare Tunnel-accessible origins

## Deploy `cloudflared` replicas

To deploy multiple instances of `cloudflared`, you can create and configure one tunnel and run it as multiple different processes.

1. To create and configure a tunnel, complete Steps 1 through 5 in the [CLI setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#set-up-a-tunnel-locally-cli-setup).

2. Next, run your newly created tunnel.

   ```bash
   $ cloudflared tunnel run <NAME>
   ```

   This will start a `cloudflared` instance and generate a unique `connector_id`.

3. In a separate window, run the same command again:

   ```bash
   $ cloudflared tunnel run <NAME>
   ```

   This will initialize another `cloudflared` instance and generate another `connector_id`.

4. Next, run `tunnel info` to show each `cloudflared` instance running your tunnel:

   ```bash
    $ cloudflared tunnel info <NAME>
   ```

This will output your tunnel UUID as well as two Connector IDs, one for each `cloudflared` process running your tunnel. With this command, you can also see that your tunnel is now being served by eight connections.

You can run the same tunnel across various `cloudflared` processes for up to 100 connections (25 replicas) per tunnel. Cloudflare Load Balancers and DNS records can still point to the tunnel and its UUID. Traffic will be sent to all `cloudflared` processes associated with the tunnel.

{{<Aside type="note" header="Deploy replicas with Kubernetes">}}

For information about running `cloudflared` instances in a Kubernetes deployment, refer to our [examples](https://github.com/cloudflare/argo-tunnel-examples/tree/master/named-tunnel-k8s) on GitHub.

{{</Aside>}}

## Deploy a Load Balancer

To deploy a Load Balancer for your tunnel, run the following command:

```bash
$ cloudflared tunnel route lb <tunnel name/uuid> <hostname> <load balancer pool>
```

This command creates an LB DNS record that points the specified hostname to the subdomain of your tunnel (`UUID.cfargotunnel.com`). Traffic will not be proxied unless the tunnel is running.

{{<Aside type="note">}}
In order to create DNS records using `cloudflared`, the [`cert.pem`](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#certpem) file must be installed on your system.
{{</Aside>}}

For more information, refer to our [Cloudflare Load Balancing](/load-balancing/) documentation.
