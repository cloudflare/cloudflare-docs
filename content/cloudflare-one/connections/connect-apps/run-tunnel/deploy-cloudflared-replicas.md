---
pcx-content-type: how-to
title: Tunnel availability and failover
weight: 11
---

Our lightweight, open-source connector, [cloudflared]([url](https://github.com/cloudflare/cloudflared)), was built to be highly available without any additional configuration requirements. When you run a tunnel, cloudflared establishes four outbound-only connections between the origin server and the Cloudflare network. These four connections are made to four different servers spread across at least two distinct data centers. This model ensures high availability and mitigates the risk of individual connection failures. This means in event a single connection, server, or data center goes offline, your resources will remain available.

# About `cloudflared` replicas

Cloudflare Tunnel also allows users to deploy additional instances of our connector, `cloudflared`, for availability and failover scenarios. We refer to these unique instances as [replicas]([url](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#connector)). Each replica establishes four new connections which serve as additional points of ingress to your origin, should you need them. Each of the replicas will point to the same tunnel. This ensures that your network remains up in the event a single host running `cloudflared` goes down. 

By design, replicas do not offer any level of traffic steering (random, hash, or round-robin). Instead, when a request arrives to Cloudflare, the network will pick any connection available to the origin. If a connection fails, we will retry others, but there is no guarantee about which connection is chosen. 

# When to use `cloudflared` replicas
- When you have a need to provide additional points of availability for a single tunnel
- When you have a need to allocate failover nodes within your network
- When you have a need to update the configuration of a tunnel without downtime

# About Cloudflare Load Balancers

Cloudflare Load Balancer allows users to proactively steer traffic away from unhealthy origins and intelligently distribute the traffic load based on a multitude of steering algorithms. This process ensures that errors are not served to end users and empowers businesses to tightly couple overall business objectives to their traffic behavior.

In this model, more than one Tunnel is required with identical configurations. The DNS record (UUID.cfargotunnel.com) for each Tunnel can then be used at the Origin within the Load Balancer. Then, you can define traffic steering policies to determine when traffic should be routed to each unique origin (i.e. Cloudflare Tunnel). 

# When to use Load Balancers
- When you have a need to intelligently steer traffic based on latency, geolocation, or other signals
- When you have a need to implement failover logic if a Tunnel reaches an inactive state
- When you have a need to be alerted when a Tunnel reaches an inactive state
- When you have a need to distribute traffic more evenly across your Tunnel-accessible Origins

# Deploy `cloudflared` replicas

To deploy multiple instances of cloudflared, you can create and configure one instance of cloudflared and run it as multiple different processes. This is as simple as running the same tunnel on the same or unique origins. 

Cloudflare Load Balancers and DNS records can still point to the tunnel and its unique ID while that tunnel sends traffic to the multiple instances of cloudflared that run through it.

To deploy multiple `cloudflared` replicas:

1. Run the following command:

    ```bash
    cloudflared tunnel create <NAME>
    ```

2. Next, run your newly created tunnel.

    ```bash
    cloudflared tunnel run <NAME>
    ```

    This will generate a unique `connector_id` for `cloudflared`.

3. In a separate window, run the same command to initialize another `cloudflared` instance:

    ```bash
    cloudflared tunnel run <NAME>
    ```

    This will also generate a unique `connector_id` for `cloudflared`.

4. Next, run `tunnel info` to show each `cloudflared` running your tunnel:

   ```bash
    cloudflared tunnel info <NAME>
   ```

This will output your tunnel UUID as well as your two newly generated connector IDs for each instance of `cloudflared` running through your tunnel. With this command, you can also see that your tunnel is now being served by eight connections, and your setup is complete. Now you can run the same tunnel across various `cloudflared` processes for up to 100 connections (25 replicas) per tunnel.

{{<Aside>}}
  
💡 Looking for information on how to deploy replicas in a k8s deployment? Check out our [examples]([url](https://github.com/cloudflare/argo-tunnel-examples/tree/master/named-tunnel-k8s)) on GitHub as well!
  
{{<Aside>}}

# Deploy a Load Balancer

You can create DNS records from cloudflared, which will provision a CNAME record that points to the subdomain of a specific tunnel. The result is the same as creation from the dashboard above.
To do so, run the following command:

  ```bash
    cloudflared tunnel route lb <tunnel name/uuid> <hostname> <load balancer pool>
  ```

The command will create a LB record that points to the tunnel subdomain (UUID.cfargotunnel.com), but will not proxy traffic if the tunnel is not currently running.

_Note: this command requires the cert.pem file._
  
To find more information, check out our documentation on [Cloudflare Load Balancer]([url](https://developers.cloudflare.com/load-balancing/)). 
