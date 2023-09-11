---
pcx_content_type: integration-guide
title: Amazon AWS
---

# Amazon AWS

This tutorial provides information and examples of how to configure IPsec VPN between Cloudflare Magic WAN with an AWS Transit Gateway.

## Prerequisites

You need to have an AWS transit gateway created in your AWS account. This is needed to route traffic between your AWS virtual private cloud (VPC) and Cloudflare Magic WAN. Refer to [AWS documentation](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-getting-started.html) to learn more about creating a transit gateway.

Additionally, you also need to create the necessary routes on AWS. Specifically, you need to create the virtual private cloud and transit gateway route tables to route traffic between your VPC, transit gateway VPN attachment to Magic WAN, and back. Refer to [AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html) to learn more about routing tables.

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

1. Select the VPN connection you created > **Actions** > **Modify VPN tunnel options**.
2. From the **VPN tunnel outside IP address** dropdown menu, choose one of tunnels.
3. Take note of the **IP address** you chose, as this corresponds to the customer endpoint IP that you will need to configure on the Cloudflare side of the IPsec tunnel.
4. The number of options for the VPN connection will expand. Take note of the **Pre-shared key**.  You will need it to create the IPsec tunnel on Cloudflare’s side.
5. In **Inside IPv4 CIDR**, there should be a size `/30` IP block. This IP address will be assigned as the internal IPsec tunnel interface. For this example, we will use `169.254.244.0/30` as the CIDR block for the IPsec tunnel: `169.254.244.1` for the AWS side of the tunnel, and `169.254.244.2` for the Cloudflare side side of the tunnel.
6. Configure the following settings for the IPsec tunnel. Note that the **Startup action** needs to be set to **Start**, which means the AWS side will initiate IPsec negotiation. Settings not mentioned here can be left at their default settings:
    1. **Phase 1 encryption algorithms**: `AES256-GCM-16`
    2. **Phase 2 encryption algorithms**: `AES256-GCM-16`
    3. **Phase 1 integrity algorithms**: `SHA2-256`
    4. **Phase 2 integrity algorithms**: `SHA2-256`
    5. **Phase 1 DH group numbers**: `14` 
    6. **Phase 2 DH group numbers**: `14` 
    7. **IKE Version**: `ikev2`
    8. **Startup action**: **Start**
7. Select **Save changes**.
8. Repeat the steps above to configure the second VPN connection. Use the second outside IP address, and make the appropriate changes to IP addresses as well when configuring Cloudflare's side of the tunnel.

## Magic WAN

After configuring the AWS transit gateway VPN connection and the tunnel as mentioned above, go to the Cloudflare dashboard and create the corresponding IPsec tunnel on the Magic WAN side.

### IPsec tunnels

1. Refer to [Add tunnels](/magic-wan/get-started/configure-tunnels/#add-tunnels) to learn how to add an IPsec tunnel. When creating your IPsec tunnel, make sure you define the following settings:
    1. **Tunnel name**: `tunnel01`
    2. **Interface address**: The `/30`CIDR block enforced by AWS. For example, `169.xx.xx.xx/30`.
    3. **Customer endpoint**: This is IP address from AWS’s VPN tunnel outside IP address. For example, `35.xx.xx.xx`.
    4. **Cloudflare endpoint**: Enter the first of your two Anycast IPs (typically begins with 162.x.x.x).
    5. **Pre-shared key**: Choose **Use my own pre-shared key**, and enter the PSK you created for the AWS VPN tunnel.
    6. **Replay protection**: Select **Enabled**.
    7. Select **Save**.
2. Repeat the above steps for `tunnel02`, and choose the settings from AWS relative to the second VPN tunnel.

### Static routes

The static route in Magic WAN should point to the appropriate virtual machine (VM) subnet you created inside your AWS virtual private cloud. For example, if your VM has a subnet of  `192.168.192.0/26`, you should use it as the prefix for your static route.

To create a static route:

1. Refer to [Create a static route](/magic-wan/get-started/configure-static-routes/#create-a-static-route) to learn how to create one.
2. In **Prefix**, enter the subnet for your VM. For example, `192.xx.xx.xx/24`.
3. For the **Tunnel/Next hop**, choose the IPsec tunnel you created in the previous step.
4. Repeat the steps above for the second IPsec tunnel you created.
