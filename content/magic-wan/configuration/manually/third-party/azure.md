---
pcx_content_type: integration-guide
title: Microsoft Azure
---

# Microsoft Azure

This tutorial provides information on how to connect Cloudflare Magic WAN to your Azure Virtual Network, using the Azure Virtual Network Gateway.

## Prerequisites

You will need to have an existing Resource group, Virtual Network and Virtual Machine created in your Azure account. Refer to [Microsoft's documentation](https://learn.microsoft.com/en-us/azure/virtual-network/) to learn more on how to create these.

## Configure Azure

### 1. Create a Gateway Subnet

You should already have a virtual network created with a subnet assigned to it. The next step is to create a Gateway subnet that Azure will use for addressing services related to Azure's Virtual Network Gateway.

1. Go to your **Virtual Network** > **Subnets**.
2. Select **Gateway subnet**.
3. Configure the subnet address range. The gateway subnet must be contained by the address space of the virtual network, and have a subnet mask of `/27` or greater.
4. Make sure all other settings are set to **None**.

### 2. Create a Virtual Network Gateway

The VNG gateway is used to form the tunnel to the devices on your premises.

1. Create a Virtual Network Gateway (VNG).
2. Create a new public IP address or use an existing IP. Take note of the public IP address assigned to the VNG as this will be the **Customer endpoint** for Magic WAN's IPsec tunnels configuration.
3. Select the resource group and VNET you have already created.
4. In **Configuration**, disable **Active-active mode** and **Gateway Private IPs**.
5. Select **Create**.

### 3. Create a Local Network Gateway

The local network gateway typically refers to your on-premises location. In this case, the local gateway will represent the Cloudflare side of the connection.

1. Create a new local network gateway.
2. In **Endpoint**, select **IP address** and enter the Cloudflare endpoint address.
3. In **Address space**, specify the address range of any subnets you wish to access remotely via the Magic WAN connection. For example, if you want to reach a network with an IP range of `192.168.1.0/24`, and this network is connected to your Magic WAN tenet, you would add `192.168.1.0/24` to the local network gateway address space.
4. Go to the **Advanced** tab > **BGP settings**, and make sure you select **No**.

### 4. Create an IPsec VPN connection

Choose the following settings when creating your VPN connection:

1. **Virtual network gateway**: Select the VNG you have created in step 2.
2. **Local network gateway**: Select the Local network gateway created in step 3.
3. **Use Azure Private IP Address**: **Disabled**
4. **BGP**: **Disabled**
5. **IPsec / IKE policy**: **Custom**
    1. **IKE Phase 1**
        1. **Encryption**: *GCMAES256*
        2. **Integrity/PRF**: *SHA256*
        3. **DH Group**: *DHGroup14*
    2. **IKE Phase 2(IPsec)**
        1. **IPsec Encryption**: *GCMAES256*
        2. **IPsec Integrity**: *GCMAES2565*
        3. **PFS Group**: *PFS2048*
    3. **IPsec SA lifetime in KiloBytes**: `0`
    4. **IPsec SA lifetime in seconds**: `2700`
    5. **Use policy based traffic selector**: **Disable**
    6. **DPD timeout in seconds**: `45`
    7. **Connection mode**: **Default**
    8. **Use custom traffic selectors**: **Disabled**
6. After the connection is created, select **Settings** > **Authentication**, and input your PSK (this will need to match PSK used by the Magic WAN configuration).

### 5. Configure Route table

The route table for your virtual network needs to be updated with routes for the destination subnets that are reachable via Magic wan.

1. Navigate to the route table associated with the subnet bound to your virtual network.
2. Add routes for the destination prefix’s of the networks behind Magic WAN. For example, `192.168.1.0/24`. 3. Set **Next hop** to **Virtual Network gateway**.
4. If you want all traffic to be sent to Magic WAN via VNG, you can replace step 2 with a **Default route** instead `0.0.0.0/0`.

### 6. (Optional) Route Internet traffic to Magic WAN

Magic WAN customers with the Gateway upgrade enabled can choose to route outbound Internet traffic to Cloudflare Gateway instead of using the Azure Internet gateway. The below steps are required (setting a default route alone is not enough) and will need to be configured via Azure CLI/PowerShell.

1. Configure the variables. `LocalGateway` corresponds to the local network name. `VirtualGateway` is the Virtual Network Gateway. You will have to do this for both your sites:

```powershell
PS C:\home\user_name> $LocalGateway = Get-AzLocalNetworkGateway -Name "Your_local_NW_gateway" -ResourceGroupName "YOUR_VM_RESOURCE_GROUP"

PS C:\homeuser_name> $VirtualGateway = Get-AzVirtualNetworkGateway -Name "Your_VNG" -ResourceGroupName "azure-vm-nour_group"
```

2. Run the command to [set the default site](https://learn.microsoft.com/en-us/azure/vpn-gateway/site-to-site-tunneling#configure-forced-tunneling---default-site) for the virtual network gateway. You will have to do this step for both sites, so that both VMs can reach the Internet if needed:

```powershell
PS C:\home\user_name> Set-AzVirtualNetworkGatewayDefaultSite -GatewayDefaultSite $LocalGateway -VirtualNetworkGateway $VirtualGateway
```
## Configure Magic WAN

1. Create an [IPsec tunnel](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) in the Cloudflare dashboard.
2. For each tunnel, make sure that you have the following settings:
    1. **Interface address**: A 31-bit (recommended) or 30-bit subnet (/31 or /30 in CIDR notation) supporting two hosts, one for each side of the tunnel. Refer to [Tunnel endpoints](/magic-wan/configuration/manually/how-to/configure-tunnels) for more details.
    2. **Customer endpoint**: The Public IP associated with your azure VNG. For example, `40.xxx.xxx.xxx`.
    3. **Health check direction**: Leave default option.
    4. **Cloudflare endpoint**: Use the Cloudflare Anycast address you have received from your account team. This will also be the IP address corresponding to the Local Network Gateway in Azure. For example, `162.xxx.xxx.xxx`.
    5. **Add pre-shared key later**: Select this option to create a PSK that will be used later in Azure.
    6. **Replay protection**: **Enable**.
3. Create static routes for your Azure Virtual Network subnets, specifying the newly created tunnel as the next hop.