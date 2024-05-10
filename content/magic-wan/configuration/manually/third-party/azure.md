---
pcx_content_type: integration-guide
title: Microsoft Azure
---

# Microsoft Azure

This tutorial provides information on how to connect Cloudflare Magic WAN to your Azure Virtual Network, using the Azure Virtual Network Gateway.

## Prerequisites

You will need to have an existing Resource group, Virtual Network, and Virtual Machine created in your Azure account. Refer to [Microsoft's documentation](https://learn.microsoft.com/en-us/azure/virtual-network/) to learn more on how to create these.

## Configure Azure

### 1. Create a Gateway subnet

You should already have a virtual network created with a subnet assigned to it. The next step is to create a Gateway subnet that Azure will use for addressing services related to Azure's Virtual Network Gateway.

1. Go to your **Virtual Network** > **Subnets**.
2. Select **Gateway subnet**.
3. Configure the subnet address range. The gateway subnet must be contained by the address space of the virtual network, and have a subnet mask of `/27` or greater.
4. Make sure all other settings are set to **None**.

### 2. Create a Virtual Network Gateway

The Virtual Network Gateway gateway (VNG) is used to form the tunnel to the devices on your premises.

1. Create a Virtual Network Gateway (VNG).
2. Create a new public IP address or use an existing IP. Take note of the public IP address assigned to the VNG as this will be the **Customer endpoint** for Magic WAN's IPsec tunnels configuration.
3. Select the resource group and VNET you have already created.
4. In **Configuration**, disable **Active-active mode** and **Gateway Private IPs**.
5. Select **Create**.

### 3. Create a Local Network Gateway

The local network gateway typically refers to your on-premises location. In this case, the local gateway will represent the Cloudflare side of the connection.

1. Create a new local network gateway.
2. In **Endpoint**, select **IP address** and enter the Cloudflare endpoint address.
3. In **Address space**, specify the address range of any subnets you wish to access remotely via the Magic WAN connection. For example, if you want to reach a network with an IP range of `192.168.1.0/24`, and this network is connected to your Magic WAN tenant, you would add `192.168.1.0/24` to the local network gateway address space.
4. Go to the **Advanced** tab > **BGP settings**, and make sure you select **No**.

### 4. Configure Local Network Gateway for Magic IPsec tunnel health checks

Magic WAN uses [tunnel health checks](/magic-wan/reference/tunnel-health-checks/) to ensure the tunnel is up and running.

When configuring Magic IPsec Tunnels, Cloudflare typically allows customers to select an IP address ([RFC 1918 - Address Allocation for Private Internets](https://datatracker.ietf.org/doc/html/rfc1918)) with either a `/30` or `/31` subnet and will automatically determine the IP address of the remote tunnel endpoint.

Due to the nature of how the Azure Local Network Gateway requires specifying a subnet as opposed to a remote tunnel endpoint, we recommend using a `/31` subnet (RFC 3021, using 31-bit prefixes on [IPv4 Point-to-Point Links](https://datatracker.ietf.org/doc/html/rfc3021)).

Azure will only accept the lower IP address within a `/31` CIDR when configuring the Local Network Gateway settings. Use the upper IP address when configuring the Interface Address in the Magic IPsec Tunnel settings.

Example:

```txt
10.252.3.54/31 - Lower IP Address - Define in Azure Local Network Gateway
10.252.3.55/31 - Upper IP Address - Define in Cloudflare Magic IPsec Tunnel
```

{{<Aside type="note">}}It is important to ensure the subnet selected for the Interface Address does not overlap with any other subnet.{{</Aside>}}

To configure the local network:

1. Edit the local network gateway configured in the previous section.
2. Select **Connections**.
3. Add the lower IP address of the desired `/31` subnet (for example, `10.252.3.54/31`).
4. Select **Save**.

### 5. Create an IPsec VPN connection

Choose the following settings when creating your VPN connection:

1. **Virtual network gateway**: Select the VNG you have created in step 2.
2. **Local network gateway**: Select the local network gateway created in step 3.
3. **Use Azure Private IP Address**: **Disabled**
4. **BGP**: **Disabled**
5. **IPsec / IKE policy**: **Custom**
    1. **IKE Phase 1**
        1. **Encryption**: *GCMAES256* or *AES256*
        2. **Integrity/PRF**: *SHA256*
        3. **DH Group**: *DHGroup14*
    2. **IKE Phase 2(IPsec)**
        1. **IPsec Encryption**: *GCMAES256* or *AES256*
        2. **IPsec Integrity**: *SHA256*
        3. **PFS Group**: *PFS2048*
    3. **IPsec SA lifetime in KiloBytes**: `0`
    4. **IPsec SA lifetime in seconds**: `27000`
    5. **Use policy based traffic selector**: **Disable**
    6. **DPD timeout in seconds**: `45`
    7. **Connection mode**: **Default**
    8. **Use custom traffic selectors**: **Disabled**
6. After the connection is created, select **Settings** > **Authentication**, and input your PSK (this will need to match the PSK used by the Magic WAN configuration).

### 5. Configure route table

The route table for your virtual network needs to be updated with routes for the destination subnets that are reachable via Magic WAN.

1. Navigate to the route table associated with the subnet bound to your virtual network.
2. Add routes for the destination prefixes of the networks behind Magic WAN. For example, `192.168.1.0/24`.
3. Set **Next hop** to **Virtual Network gateway**.
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

## Install Cloudflare Zero Trust CA Certificate

If you opt to route all Internet bound traffic through Magic WAN and want to take advantage of [HTTPS TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/), it will be necessary to install and trust the Cloudflare Zero Trust root CA certificate on your user's devices. You can either install the certificate provided by Cloudflare (default option), or generate your own custom certificate and upload it to Cloudflare.

More details on how to install the root CA certificate can be found in [User-side certificates](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) in the Cloudflare Zero Trust documentation.

Once the root CA certificate is installed, open a web browser or use curl to validate Internet connectivity:

```bash
curl https://ipinfo.io

{
  "ip": "104.xxx.xxx.225",
  "city": "Reston",
  "region": "Virginia",
  "country": "US",
  "loc": "xx.xxxx,-xx.xxxx",
  "org": "AS13335 Cloudflare, Inc.",
  "postal": "20190",
  "timezone": "America/New_York",
  "readme": "https://ipinfo.io/missingauth"
}
```

{{<Aside type="note">}}ICMP (ping/traceroute) will work to remote Magic WAN sites, but is not forwarded to the Internet. Please ensure you validate connectivity via HTTP.{{</Aside>}}

## Configure Magic WAN

1. Create an [IPsec tunnel](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) in the Cloudflare dashboard.
2. For each tunnel, make sure that you have the following settings:
    1. **Interface address**: As the Azure Local Network Gateway will only permit specifying the lower IP address in a `/31` subnet, add the upper IP address within the `/31` subnet selected in [step 4 of the Configure Azure section](#4-configure-local-network-gateway-for-magic-ipsec-tunnel-health-checks). Refer to [Tunnel endpoints](/magic-wan/configuration/manually/how-to/configure-tunnels/) for more details.
    2. **Customer endpoint**: The Public IP associated with your Azure VNG. For example, `40.xxx.xxx.xxx`.
    3. **Cloudflare endpoint**: Use the Cloudflare Anycast address you have received from your account team. This will also be the IP address corresponding to the Local Network Gateway in Azure. For example, `162.xxx.xxx.xxx`.
    4. **Health check rate**: Leave the default option (Medium) selected.
    5. **Health check type**: Leave the default option (Reply) selected.
    6. **Health check direction**: Leave default option.
    7. **Add pre-shared key later**: Select this option to create a PSK that will be used later in Azure.
    8. **Replay protection**: **Enable**.
3. Create static routes for your Azure Virtual Network subnets, specifying the newly created tunnel as the next hop.

## Validate connectivity and disable Azure Virtual Network Gateway anti-replay protection

Once you have determined that connectivity has been established, Cloudflare recommends you disable anti-replay protection for the Azure Virtual Network Gateway site-to-site VPN connection. This can be accomplished through Microsoft Azure API.

1. Determine the API token via PowerShell:

```powershell
PS C:\home\user_name> Get-AzAccessToken

Token: eyJ0e<REDACTED>AH-PdSPg
ExpiresOn : 04/08/2024 23:32:47 +00:00
Type      : Bearer
TenantId  : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
UserId    : user@domain.com
```

2. Issue the API call to display the details of the site-to-site VPN Connection associated with the Azure Virtual Network Gateway (`GET` request):

```bash
curl --location 'https://management.azure.com/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}?api-version=2022-05-01' \
--header 'Authorization: Bearer eyJ0e<REDACTED>AH-PdSPg'
```

3. Copy/paste the entire response into a text editor:

```json
{
    "name": "{{virtualNetworkGatewayName}}",
    "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}",
    "etag": "W/\"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\"",
    "type": "Microsoft.Network/virtualNetworkGateways",
    "location": "eastus"
    },
    "properties": {
        "provisioningState": "Succeeded",
        "resourceGuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "packetCaptureDiagnosticState": "None",
        "enablePrivateIpAddress": false,
        "isMigrateToCSES": false,
        "ipConfigurations": [
            {
                "name": "default",
                "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}/ipConfigurations/default",
                "etag": "W/\"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\"",
                "type": "Microsoft.Network/virtualNetworkGateways/ipConfigurations",
                "properties": {
                    "provisioningState": "Succeeded",
                    "privateIPAllocationMethod": "Dynamic",
                    "publicIPAddress": {
                        "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/publicIPAddresses/{{virtualNetworkGatewayPublicIpAddress}}"
                    },
                    "subnet": {
                        "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworks/{{virtualNetworkGatewayName}}/subnets/GatewaySubnet"
                    }
                }
            }
        ],
        "natRules": [],
        "virtualNetworkGatewayPolicyGroups": [],
        "enableBgpRouteTranslationForNat": false,
        "disableIPSecReplayProtection": false,
        "sku": {
            "name": "VpnGw2AZ",
            "tier": "VpnGw2AZ",
            "capacity": 2
        },
        "gatewayType": "Vpn",
        "vpnType": "RouteBased",
        "enableBgp": false,
        "activeActive": false,
        "bgpSettings": {
            "asn": 65515,
            "bgpPeeringAddress": "172.25.40.30",
            "peerWeight": 0,
            "bgpPeeringAddresses": [
                {
                    "ipconfigurationId": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}/ipConfigurations/default",
                    "defaultBgpIpAddresses": [
                        "172.25.40.30"
                    ],
                    "customBgpIpAddresses": [],
                    "tunnelIpAddresses": [
                        "{{CF ANYCAST IP}}"
                    ]
                }
            ]
        },
        "gatewayDefaultSite": {
            "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/localNetworkGateways/{{localNetworkGatewayName}}"
        },
        "vpnGatewayGeneration": "Generation2",
        "allowRemoteVnetTraffic": false,
        "allowVirtualWanTraffic": false
    }
}
```

4. Locate the line that controls disabling IPsec anti-replay protection, and change it from `false` to `true`:

```bash
"disableIPSecReplayProtection": true
```

5. Upload the entire response in a subsequent API call (`PUT` request):

```bash
curl --location --request PUT 'https://management.azure.com/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}?api-version=2022-05-01' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJ0e<REDACTED>AH-PdSPg' \
--data '{
    "name": "{{virtualNetworkGatewayName}}",
    "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}",
    "etag": "W/\"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\"",
    "type": "Microsoft.Network/virtualNetworkGateways",
    "location": "eastus"
    },
    "properties": {
        "provisioningState": "Succeeded",
        "resourceGuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        "packetCaptureDiagnosticState": "None",
        "enablePrivateIpAddress": false,
        "isMigrateToCSES": false,
        "ipConfigurations": [
            {
                "name": "default",
                "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}/ipConfigurations/default",
                "etag": "W/\"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\"",
                "type": "Microsoft.Network/virtualNetworkGateways/ipConfigurations",
                "properties": {
                    "provisioningState": "Succeeded",
                    "privateIPAllocationMethod": "Dynamic",
                    "publicIPAddress": {
                        "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/publicIPAddresses/{{virtualNetworkGatewayPublicIpAddress}}"
                    },
                    "subnet": {
                        "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworks/{{virtualNetworkGatewayName}}/subnets/GatewaySubnet"
                    }
                }
            }
        ],
        "natRules": [],
        "virtualNetworkGatewayPolicyGroups": [],
        "enableBgpRouteTranslationForNat": false,
        "disableIPSecReplayProtection": true,
        "sku": {
            "name": "VpnGw2AZ",
            "tier": "VpnGw2AZ",
            "capacity": 2
        },
        "gatewayType": "Vpn",
        "vpnType": "RouteBased",
        "enableBgp": false,
        "activeActive": false,
        "bgpSettings": {
            "asn": 65515,
            "bgpPeeringAddress": "172.25.40.30",
            "peerWeight": 0,
            "bgpPeeringAddresses": [
                {
                    "ipconfigurationId": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/virtualNetworkGateways/{{virtualNetworkGatewayName}}/ipConfigurations/default",
                    "defaultBgpIpAddresses": [
                        "172.25.40.30"
                    ],
                    "customBgpIpAddresses": [],
                    "tunnelIpAddresses": [
                        "{{CF ANYCAST IP}}"
                    ]
                }
            ]
        },
        "gatewayDefaultSite": {
            "id": "/subscriptions/{{subscriptionId}}/resourceGroups/{{resourceGroupName}}/providers/Microsoft.Network/localNetworkGateways/{{localNetworkGatewayName}}"
        },
        "vpnGatewayGeneration": "Generation2",
        "allowRemoteVnetTraffic": false,
        "allowVirtualWanTraffic": false
    }
}
'
```

6. Leave the replay protection setting checked in the Cloudflare dashboard, and wait several minutes before validating connectivity again.

## Tunnel health checks and Azure

We have identified cases where the IPsec Tunnels configured on the Azure Virtual Network Gateway need to be restarted one time before the tunnel health checks start passing.

### Restart Azure tunnels

1. Open the Virtual Network Gateway.
2. Go to **Settings** > **Connections**.
3. Open the properties of the tunnel.
4. Go to **Help** > **Reset**.
5. Select **Reset**.

It may take several minutes for the tunnels to reset from the Azure side. Monitor the [tunnel health checks section](/magic-wan/configuration/common-settings/check-tunnel-health-dashboard/) in the Cloudflare dashboard to determine the status.

{{<Aside type="note">}}Tunnel Health Check percentages are calculated over a one hour period.{{</Aside>}}