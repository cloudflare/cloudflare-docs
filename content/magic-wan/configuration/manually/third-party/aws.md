---
pcx_content_type: integration-guide
title: Amazon AWS Transit Gateway
---

# Amazon AWS Transit Gateway

This tutorial provides information and examples of how to configure IPsec VPN between Cloudflare Magic WAN with an AWS Transit Gateway.

## Prerequisites

You need to have an AWS transit gateway created in your AWS account. This is needed to route traffic between your AWS virtual private cloud (VPC) and Cloudflare Magic WAN. Refer to the [AWS documentation](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-getting-started.html) to learn more about creating a transit gateway.

Additionally, you also need to configure the necessary route table entries for the virtual machine (VM) in your AWS virtual private cloud, as well the route table entries for the transit gateway. Otherwise, connectivity between your VM and another VM routed via Magic WAN will not work. Refer to the [AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html) to learn more about routing tables.

## AWS

### Create AWS transit gateway VPN attachment

1. Go to **Transit gateways** > **Transit gateway attachments**, and select **Create transit gateway attachment**.
2. Select the **Transit gateway ID** that you created previously from the dropdown.
3. For **Attachment type**, select _VPN_.
4. Under VPN attachment, select the following settings (you can leave settings not mentioned here with their default values):
    1. **Customer Gateway**: Select **New**.
    2. **IP Address**: Enter your Cloudflare Anycast IP address.
    3. **Routing options**: Select **Static**.
5. Select **Create transit gateway attachment**.

### Configure the VPN connection

1. Select the VPN connection you created > **Download configuration**.
2. This action downloads a text file. Search for the IP range that the AWS Transit Gateway assigned your tunnel. The first IP range should be the one used by the AWS Transit Gateway. Use the second IP range to configure your [Interface address](#ipsec-tunnels) in Magic WAN.
3. Select the VPN connection you created > **Actions** > **Modify VPN tunnel options**.
4. From the **VPN tunnel outside IP address** drop-down menu, choose one of tunnels.
5. Take note of the **IP address** you chose, as this corresponds to the customer endpoint IP that you will need to configure on the Cloudflare side of the IPsec tunnel.
6. The number of options for the VPN connection will expand. Take note of the **Pre-shared key**.  You will need it to create the IPsec tunnel on Cloudflare's side.
7. In **Inside IPv4 CIDR**, AWS enforces that only a `/30` block within the `169.254.0.0/16` range can be used. To accommodate this, Cloudflare supports a subset of this IP block. Namely, Cloudflare supports `169.254.240.0/20` to be assigned as the IPsec tunnel's (internal) interface IPs. For this example, we will use `169.254.244.0/30` as the CIDR block for the IPsec tunnel: `169.254.244.1` for the AWS side of the tunnel, and `169.254.244.2` for the Cloudflare side of the tunnel.

    {{<Aside type="warning">}}Make sure you input an IP address supported by Cloudflare. If you do not input a value here, AWS will randomly generate an IP address that might not be supported by Cloudflare.{{</Aside>}}

8. Configure the following settings for the IPsec tunnel. Note that the **Startup action** needs to be set to **Start**, which means the AWS side will initiate IPsec negotiation. Settings not mentioned here can be left at their default settings:
    - **Phase 1 encryption algorithms**: `AES256-GCM-16`
    - **Phase 2 encryption algorithms**: `AES256-GCM-16`
    - **Phase 1 integrity algorithms**: `SHA2-256`
    - **Phase 2 integrity algorithms**: `SHA2-256`
    - **Phase 1 DH group numbers**: `14`
    - **Phase 2 DH group numbers**: `14`
    - **IKE Version**: `ikev2`
    - **Startup action**: **Start**
    - **DPD timeout action**: `Restart`
9. Select **Save changes**.
10. Repeat the steps above to configure the second VPN connection. Use the second outside IP address, and make the appropriate changes to IP addresses as well when configuring Cloudflare's side of the tunnel.

{{<Aside type="note">}}ECMP over two VPN tunnels is not supported with a static routing configuration. You will need to configure dynamic routing for the VPN between the transit gateway and the customer gateway device. Refer to [AWS documentation](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html) for more information.
{{</Aside>}}

## Magic WAN

After configuring the AWS transit gateway VPN connection and the tunnel as mentioned above, go to the Cloudflare dashboard and create the corresponding IPsec tunnel and static routes on the Magic WAN side.

### IPsec tunnels

1. Refer to [Add tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) to learn how to add an IPsec tunnel. When creating your IPsec tunnel, make sure you define the following settings:
    - **Tunnel name**: `tunnel01`
    - **Interface address**: The `/30`CIDR block enforced by AWS (first usable IP is for the AWS side). For example, `169.254.244.2`.
    - **Customer endpoint**: The IP address from AWS's VPN tunnel outside IP address. For example, `35.xx.xx.xx`.
    - **Cloudflare endpoint**: Enter the first of your two Anycast IPs.
    - **Pre-shared key**: Choose **Use my own pre-shared key**, and enter the PSK you created for the AWS VPN tunnel.
    - **Health check type**: Choose **Request**
    - **Health check direction**: Choose **Bidirectional**
    - **Replay protection**: Select **Enabled**.
2. Select **Save**.
3. Repeat the above steps for `tunnel02`. Chose the same prefix, but select the second IPsec tunnel for **Tunnel/Next hop**.

### Static routes

The static route in Magic WAN should point to the appropriate virtual machine (VM) subnet you created inside your AWS virtual private cloud. For example, if your VM has a subnet of  `192.168.192.0/26`, you should use it as the prefix for your static route.

To create a static route:

1. Refer to [Create a static route](/magic-wan/configuration/manually/how-to/configure-static-routes/#create-a-static-route) to learn how to create one.
2. In **Prefix**, enter the subnet for your VM. For example, `192.xx.xx.xx/24`.
3. For the **Tunnel/Next hop**, choose the IPsec tunnel you created in the previous step.
4. Repeat the steps above for the second IPsec tunnel you created.
