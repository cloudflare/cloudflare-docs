---
pcx_content_type: integration-guide
title: Google Cloud VPN
---

# Google Cloud VPN

This tutorial provides information and examples of how to configure IPsec VPN between Cloudflare Magic WAN with a GCP Cloud VPN.

## Prerequisites

You need to have a GCP VPN gateway created in your GCP account. This is needed to route traffic between your GCP virtual private cloud (VPC) and Cloudflare Magic WAN. Refer to the [GCP documentation](https://cloud.google.com/network-connectivity/docs/vpn/how-to/creating-static-vpns) to learn more about creating a Cloud VPN gateway.

A Classic VPN Gateway is required to support static routing. Route tables will also need to be manually configured to allow the routing between the VPN and Cloudflare Magic WAN to work. [GCP routing options](https://cloud.google.com/network-connectivity/docs/vpn/concepts/choosing-networks-routing#ts-tun-routing) to learn more about GCP VPC routing.

## Google Cloud Platform

### Create a GCP Cloud VPN Gateway

1. Go to **Network Connectivity** > **VPN**, then choose the **Cloud VPN Gateways** tab and select **Create VPN Gateway**.
2. Give your gateway a name
3. Choose the network you want to connect with this Cloud VPN Gateway (VPC)
4. Select a region where this Cloud VPN Gateway should be located
5. Choose **IPv4** as IP traffic type that will flow through this Gateway

{{<Aside type="note">}}Cloudflare Magic WAN doesn't yet support private routing via IPv6 
{{</Aside>}}

### Configure the VPN connection

1. Go to **Network Connectivity** > **VPN**, then choose the **Cloud VPN Tunnels** tab and select **Create VPN Tunnel**.
2. Select the VPN Gateway you created > **Continue**.
3. Choose a name for the tunnel
4. For the **Remote Peer IP Address** use one of the public Anycast Magic WAN IPs (Ask your account management contacts if you're unsure about them)
5. Choose IKEv2 for the **IKE version**
6. You can generate or put an IKE pre-shared key, if generated keep it somewhere safe since it will be needed in further steps
7. Choose **route-based** as routing option
8. Define in the **remote network IP range** the network you're going to expose to GCP via Cloudflare Magic WAN

{{<Aside type="note">}} You can add new IP ranges once the VPN object is created. They will need to be created as VPC routes using this VPN connection (see the **Static Routes** section)
{{</Aside>}}

9. Repeat the same process using your second Cloudflare Anycast IP 

### Static Routes

Static routing is necessary to route traffic between your VPN and Cloudflare Magic WAN, follow these steps to create them for your VPC. [VPN route documentation](https://cloud.google.com/vpc/docs/routes) to learn about VPN routing 

1. Go to **VPN Network** > **Routes**
2. Select the **Route Management** tab
3. Create a route
4. Choose the VPC network you want to use for that route
5. Choose **route type** as Static Routing
6. Choose **IP Version** as IPv4
7. Configuration the network you want to expose to your VPN in the **Destination IPv4 Range**
8. Choose a priority
9. 

## Magic WAN

After configuring the Cloud VPN gateway VPN and the tunnels as mentioned above, go to the Cloudflare dashboard and create the corresponding IPsec tunnels and static routes on the Magic WAN side.

### IPsec tunnels

1. Refer to [Add tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) to learn how to add an IPsec tunnel. When creating your IPsec tunnel, make sure you define the following settings:
    - **Tunnel name**: `tunnel01`
    - **Interface address**: The IPsec tunnel inner `/30`CIDR block. For example, `169.254.244.2`.
    - **Customer endpoint**: The IP address from GCP VPN tunnel outside IP address. For example, `35.xx.xx.xx`.
    - **Cloudflare endpoint**: Enter the first of your two Anycast IPs.
    - **Pre-shared key**: Choose **Use my own pre-shared key**, and enter the PSK you created for the GCP VPN tunnel.
    - **Replay protection**: Select **Enabled**.
2. Select **Save**.
3. Repeat the above steps for `tunnel02`. Chose the same prefix, but select the second IPsec tunnel for **Tunnel/Next hop**.

### Static routes

The static route in Magic WAN should point to the appropriate virtual machine (VM) subnet you created inside your GCP virtual private cloud. For example, if your VM has a subnet of  `192.168.192.0/26`, you should use it as the prefix for your static route.

To create a static route:

1. Refer to [Create a static route](/magic-wan/configuration/manually/how-to/configure-static-routes/#create-a-static-route) to learn how to create one.
2. In **Prefix**, enter the subnet for your VM. For example, `192.xx.xx.xx/24`.
3. For the **Tunnel/Next hop**, choose the IPsec tunnel you created in the previous step.
4. Repeat the steps above for the second IPsec tunnel you created.
