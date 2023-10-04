---
pcx_content_type: concept
title: Tunnel availability and failover
layout: single
weight: 2
---

# Tunnel availability and failover

Our lightweight and open-source connector, [`cloudflared`](https://github.com/cloudflare/cloudflared), was built to be highly available without any additional configuration requirements. When you run a tunnel, `cloudflared` establishes four outbound-only connections between the origin server and the Cloudflare network. These four connections are made to four different servers spread across at least two distinct data centers. This model ensures high availability and mitigates the risk of individual connection failures. This means in event a single connection, server, or data center goes offline, your resources will remain available.

## `cloudflared` replicas

Cloudflare Tunnel also allows users to deploy additional instances of our connector, `cloudflared`, for availability and failover scenarios. We refer to these unique instances as replicas. Each replica establishes four new connections which serve as additional points of ingress to your origin, should you need them. Each of the replicas will point to the same tunnel. This ensures that your network remains up in the event a single host running `cloudflared` goes down.

By design, replicas do not offer any level of traffic steering (random, hash, or round-robin). Instead, when a request arrives to Cloudflare, it will be forwarded to the replica that is geographically closest. If that distance calculation is unsuccessful or the connection fails, we will retry others, but there is no guarantee about which connection is chosen.

### When to use `cloudflared` replicas

- To provide additional points of availability for a single tunnel.
- To allocate failover nodes within your network.
- To update the configuration of a tunnel without downtime.

### Deploy `cloudflared` replicas

To deploy multiple instances of `cloudflared`, you can create and configure one tunnel and run it on multiple hosts. If your tunnel runs as a service, only one `cloudflared` instance is allowed per host.

<details>
<summary>Via the dashboard</summary>
<div>

1. To create a remotely-managed tunnel, follow the [dashboard setup guide](/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/).
2. On the **Tunnels** page, select your newly created tunnel. The **Connectors** section shows all of the `cloudflared` instances for that tunnel.
3. Select **Configure**.
4. Select the operating system of the host where you want to deploy a replica.
5. Copy the installation command and run it on the host.

The new replica will appear on the **Connectors** list for the tunnel.

</div>
</details>

<details>
<summary>Via the command line</summary>
<div>

1. To create a locally-managed tunnel, complete Steps 1 through 5 in the [CLI setup guide](/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/).

2. Next, run your newly created tunnel.

    ```sh
    $ cloudflared tunnel run <NAME>
    ```

    This will start a `cloudflared` instance and generate a unique `connector_id`.

3. In a separate window or on another host, run the same command again:

    ```sh
    $ cloudflared tunnel run <NAME>
    ```

    This will initialize another `cloudflared` instance and generate another `connector_id`.

4. Next, run `tunnel info` to show each `cloudflared` instance running your tunnel:

   ```sh
    $ cloudflared tunnel info <NAME>
   ```

  This will output your tunnel UUID as well as two Connector IDs, one for each `cloudflared` process running your tunnel. With this command, you can also see that your tunnel is now being served by eight connections.

</div>
</details>

You can run the same tunnel across various `cloudflared` processes for up to 100 connections (25 replicas) per tunnel. Cloudflare Load Balancers and DNS records can still point to the tunnel and its UUID. Traffic will be sent to all `cloudflared` processes associated with the tunnel.

{{<Aside type="note" header="Deploy replicas with Kubernetes">}}
  
For information about running `cloudflared` instances in a Kubernetes deployment, refer to our guides for tunnels managed [remotely via the dashboard](/cloudflare-one/connections/connect-networks/deploy-tunnels/deployment-guides/kubernetes/) or [locally via the CLI](/cloudflare-one/tutorials/many-cfd-one-tunnel/).
  
{{</Aside>}}

## Cloudflare Load Balancers

[Cloudflare Load Balancing](/load-balancing/) allows users to proactively steer traffic away from unhealthy origins and intelligently distribute the traffic load based on a multitude of steering algorithms. This process ensures that errors are not served to end users and empowers businesses to tightly couple overall business objectives to their traffic behavior.

In this model, more than one tunnel is required with identical configurations. The DNS record (`UUID.cfargotunnel.com`) for each Cloudflare Tunnel can be used at the origin within the Load Balancer. You can then define traffic steering policies to determine how traffic should be routed to each tunnel.

### When to use load balancers

- To intelligently steer traffic based on latency, geolocation, or other signals.
- To implement failover logic if a tunnel reaches an inactive state.
- To get alerted when a tunnel reaches an inactive state.
- To distribute traffic more evenly across your Cloudflare Tunnel-accessible origins.

### Deploy a load balancer

Refer to the [Load Balancer page](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb/) for more information.
