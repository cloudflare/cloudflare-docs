---
pcx_content_type: integration-guide
title: Google Cloud VPN
---

# Google Cloud VPN

This tutorial provides information and examples of how to configure IPsec VPN between Cloudflare Magic WAN with a GCP Cloud VPN.

## Prerequisites

You need to have a GCP VPN gateway created in your GCP account. This is needed to route traffic between your GCP virtual private cloud (VPC) and Cloudflare Magic WAN. Refer to the [GCP documentation](https://cloud.google.com/network-connectivity/docs/vpn/how-to/creating-static-vpns) to learn more about creating a Cloud VPN gateway.

A Classic VPN Gateway is required to support static routing. Route tables will also need to be manually configured to allow the routing between the VPN and Cloudflare Magic WAN to work. Refer to [GCP routing options](https://cloud.google.com/network-connectivity/docs/vpn/concepts/choosing-networks-routing#ts-tun-routing) to learn more about GCP VPC routing.

## Google Cloud Platform

### Create a GCP Cloud VPN Gateway

1. Go to **Network Connectivity** > **VPN**.
2. Select the **Cloud VPN Gateways** tab > **Create VPN Gateway**.
3. Give your gateway a descriptive name.
4. Choose the network you want to connect to with this Cloud VPN Gateway (VPC).
5. Select a region where this Cloud VPN Gateway should be located.
6. Choose **IPv4** as the IP traffic type that will flow through this Gateway.

{{<Aside type="note">}}Cloudflare Magic WAN does not yet support private routing via IPv6.{{</Aside>}}

### Configure the VPN connection

1. Go to **Network Connectivity** > **VPN**.
2. Select the **Cloud VPN Tunnels** tab > **Create VPN Tunnel**.
3. Select the VPN Gateway you have created > **Continue**.
4. Give your tunnel a descriptive name.
5. For **Remote Peer IP Address**, use one of the public Anycast Magic WAN IPs given to you by your account team.
6. In **IKE version**, select **IKEv2**.
7. You can generate an IKE pre-shared key, or add one you already own. If you generate one during this set up, keep it somewhere safe since you will need it in other steps to finish setting up Magic WAN and GCP.
8. Choose **Route-based** as routing option.
9. In **Remote network IP range** define the network you are going to expose to GCP via Cloudflare Magic WAN.

{{<Aside type="note">}}You can add new IP ranges once the VPN object is created. They will need to be created as VPC routes using this VPN connection (refer to the **Static Routes** section).{{</Aside>}}

10. Repeat the same process using your second Cloudflare Anycast IP.

### Static Routes

Static routing is necessary to route traffic between your VPN and Cloudflare Magic WAN. Follow these steps to create them for your VPC. Refer to [VPN route documentation](https://cloud.google.com/vpc/docs/routes) to learn more about VPN routing.

1. Go to **VPN Network** > **Routes**.
2. Select **Route Management**.
3. Create a route.
4. Choose the VPC network you want to use for that route.
5. In **Route type** select **Static Routing**.
6. In **IP Version** select **IPv4**.
7. Configure the network you want to expose to your VPN in the **Destination IPv4 Range**.
8. Choose a priority.

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
