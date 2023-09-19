---
title: Alibaba Cloud
pcx_content_type: integration-guide
---

# Alibaba Cloud

This tutorial provides information on how to connect Alibaba Cloud infrastructure to Magic WAN through IPsec tunnels. For more information regarding Alibaba Cloud technology, refer to [Alibaba’s documentation](https://www.alibabacloud.com/help/en/vpc/product-overview/what-is-a-vpc).

## Alibaba Cloud

### 1. Create a VPC

1. Log in to your Alibaba Cloud account.
2. Go to **VPC** > **VPN Gateways**, and select **Create VPC** to create a new virtual private cloud.
3. Give your VPC a descriptive name. For example, `Cloudflare-Magic-WAN`.
4. Choose the **Region** that aligns with where your servers are located.
5. In **IPv4 CIDR block**, choose from one of the recommended IP blocks. For example, `192.168.20.0/24`. Take note of the IP block  you choose, as you will need it to create a static route in Magic WAN.

### 2. Create a VPN gateway

1. Still in your Alibaba Cloud account, go to **VPC** > **VPN Gateway**, and select Create **VPN Gateway**.
2. Give your VPN Gateway a descriptive name. For example, `VPN-Gateway-Magic-WAN`.
3. In **Region**, choose the server that is best for your geographic region. For example, **US (Silicon Valley)**.
4. For **Gateway Type**, choose **Standard**.
5. In **Network Type**, choose **Public**.
6. For **Tunnels**, select **Single-tunnel**.
7. In the **VPC** dropdown menu, choose the name of the VPC you created before for Magic WAN. For example, `Cloudflare-Magic-WAN`.
8. In the **VSwitch** dropdown menu, choose the VSwith you created previously. For example, `VSwitch-CF`.
9. For options such as **Maximum Bandwidth**, **Traffic**, and **Duration**, select the options that best suit your use case.
10. In **IPsec-VPN**, select **Enable**.
11. For **SSL-VPN**, select **Disable**.
12. When you are finished configuring your VPN gateway, return to the main VPN Gateway window.
13. Select the VPN gateway you have just created > **Destination-based Routing**.
14. Select **Add Route Entry**, and enter whatever subnets are needed to reach required destinations. You can, for example, just add a default route to send all traffic through your Magic WAN tunnel.
15. When you are finished, return to the main window.
16. Select **Publish** > **OK** to publish the route.

### 3. Create IPsec connections

1. Go to **VPC** > **Customer Gateways** > **Create Customer Gateway**.
2. Create a customer gateway with the Cloudflare Anycast IP address given to you by your account team. Typically starts with `162.xx.xx.xx`.
3. Now, go to **VPC** > **IPsec Connections** > **Create IPsec Connection**.
4. Create an IPsec connection with the following settings:
    1. **Name**: give it a descriptive name, like `CF-Magic-WAN-IPsec`.
    2. **Associate Resource**: **VPN Gateway**.
    3. **VPN Gateway**: From the dropdown menu, choose the VPN gateway you created previously. In our example, `VPN-Gateway-Magic-WAN`.
    4. **Customer Gateway**: Select the customer gateway you created above for Magic WAN.
    5. **Routing Mode**: **Destination Routing Mode**.
    6. **Effective Immediately**: **Yes**.
    7. **Pre-Shared Key**: This is the pre-shared key (PSK) you will have to use in the Magic WAN IPsec tunnel. If you do not specify one here, the Alibaba system will generate a random PSK for you.
5. Go to **Advanced Settings**, and expand the **Encryption Configuration** settings.
6. In **IKE Configurations**, select the following settings to configure the IPsec connection. These settings have to match the supported configuration parameters for [Magic WAN IPsec tunnels](/magic-wan/reference/tunnels/#supported-configuration-parameters):
    1. **Version**: _ikev2_
    2. **Negotiation Mode**: _main_
    3. **Encryption Algorithm**: _aes256_
    4. **Authentication Algorithm**: _sha256_
    5. **DH Group**: _group5_
    6. **Localid**: This is the customer endpoint. These are generally IP addresses provided by your ISP. For example, `47.xxx.xxx.xxx`.


## Magic WAN

### 1. IPsec tunnels

1. Follow the [Add tunnels](/magic-wan/get-started/configure-tunnels/#add-tunnels) instructions to create the required IPsec tunnels with the following options:
    1. **Tunnel name**: Give your tunnel a descriptive name, like `Alibaba`.
    2. **Interface address**: Choose from the subnet in your Alibaba Cloud configuration. For example, if your Alibaba default configuration is `169.xx.xx.1/30`, you might want to choose `169.xx.xx.2/30` for your Magic WAN side of the IPsec tunnel.
    3. **Customer endpoint**: This is the IP address you entered for **Locali** in Alibaba's IPsec connection. For example, `47.xxx.xxx.xxx`.
    4. **Cloudflare endpoint**: Enter the same Anycast IP address provided by Cloudflare you have entered for Alibaba's Customer Gateway. Typically starts with `162.xx.xx.xx`.
    5. **Pre-shared key**: Select **Use my own pre-shared key**, and enter the PSK key from your Alibaba Cloud IPsec tunnel.
    6. **Replay protection**: **Enabled**.
2. Select **Add tunnels** when you are done.

### 2. Static route

1. Follow the [Configure static routes](/magic-wan/get-started/configure-static-routes/#create-a-static-route) instructions to create a static route.
2. In **Prefix**, enter the IP CIDR you used to create your virtual private cloud in the Alibaba Cloud interface. In our example we used `192.168.20.0/24`.