---
title: Cisco Viptela SD-WAN
pcx_content_type: tutorial
weight: 2
---

# Cisco Viptela SD-WAN

Cloudflare partners with Cisco's 8000v router SD-WAN solution to provide users with an integrated solution. The Viptela appliances (physical and virtual) manage subnets associated with branch offices and cloud instances. Anycast Tunnels are set up between these appliances and Cloudflare to securely route Internet-bound traffic. This tutorial describes how to configure the Cisco 8000v router in the SD-WAN mode for north-south (Internet-bound) use cases.

## Prerequisites

Before setting up a connection between Cisco Viptela and Cloudflare, you must have:

- Purchased Magic WAN and Secure Web Gateway.
- Cloudflare provision Magic WAN and Secure Web Gateway.
- Received two Cloudflare tunnel endpoints (Anycast IP address) assigned to Magic WAN.
- Cisco 8000 SD-WAN appliances (physical or virtual). This ensures specific Internet-bound traffic from the sites' private networks is routed over the Anycast GRE tunnels to Secure Web Gateway to enforce a user's specific web access policies.
- A static IP pair to use with the tunnel endpoints. The static IPs should be /31 addresses separate from the IPs used in the subnet deployment. The software version used on Cisco was `20.6.2/17.6.2`.

## Example scenario

For the purpose of this tutorial, the integration will refer to a scenario with one branch office with subnets.

The central branch office has a 192.168.30.0/24 network with the SD-WAN appliance terminating the Anycast GRE tunnel.

![Table of routing information for central  branch](/magic-wan/static/viptela-gre-routing-table.png)

## 1. Create a SIG template on Cisco vManage

Cisco vManage is Cisco's SD-WAN management tool that is used to manage all the SD-WAN appliances in branch offices.

For this example scenario, a non-default template for `SIG-Branch` was created.

![Traffic flow diagram for GRE](/magic-wan/static/viptela-flow-diagram-gre.png)

To create a Secure Internet Gateway (SIG) using vManage:

1. From **Cisco vManage** under **Configuration**, click **Generic** and **Add Tunnel**.
2. Refer to the table below for the setting fields and their options.

|     Setting             |   Type/Detail                          |
|-------------------------|----------------------------------------|
| **Global Template**     | Factory_Default_Global_CISCO_Template  |
| **Cisco Banner**        | Factory_Default_Retail_Banner          |
| **Policy**              | Branch-Local-Policy                    |

**Transport & Management VPN settings**

|     Setting                        |   Type/Detail                   |
|------------------------------------|---------------------------------|
| **Cisco VPN 0**                    | GCP-Branch-VPN0                 |
| **Cisco Secure Internet Gateway**  | Branch-SIG-GRE-Template         |
| **Cisco VPN Interface Ethernet**   | GCP-Branch-Public-Internet-TLOC |
| **Cisco VPN Interface Ethernet**   | GCP-VPN0-Interface              |
| **Cisco VPN 512**                  | Default_AWS_TGW_CSR_VPN512_V01  |

**Basic Information settings**

|     Setting        |   Type/Detail                           |
|--------------------|-----------------------------------------|
| **Cisco System**   | Default_BootStrap_Cisco_System_Template |
| **Cisco Loging**   | Default_Logging_Cisco_V01               |
| **Cisco AAA**      | AWS-Branch-AAA-Template                 |
| **Cisco BFD**      | Default_BFD_Cisco-V01                   |
| **Cisco OMP**      |  Default_AWS_TGW_CSR_OMP_IPv46_...      |
| **Cisco Security** | Default_Security_Cisco_V01              |

When creating the Feature Template, you can choose values that apply globally or that are device specific. For example, the **Tunnel Source IP Address**, **Interface Name** and fields from **Update Tunnel** are device specific and should be chosen accordingly.

## 2. Create tunnels in vManage

From vManage, click **Configuration** > **Templates**. You should see the newly created template where you will update the device values. 

Because the template was created to add GRE tunnels, you only need to update the device values. Note that **VPN0** is the default, and the WAN interface used to build the tunnel must be part of **VPN0**.

![Update template fields for GRE tunnel](/magic-wan/static/viptela-update-device-template-gre.png)

## 3. Create tunnels in Cloudflare

Refer to [Configure tunnel endpoints](/magic-wan/how-to/configure-tunnels) for more information on creating a GRE tunnel.

![Established GRE tunne in Cloudflash dashboard](/magic-wan/static/viptela-gre-tunnel.png)

## 4. Define static routes

Refer to [Configure static routes](/magic-wan/how-to/configure-static-routes) for more information on configuring your static routes.

![Established GRE static routes in Cloudflare dashboard](/magic-wan/static/viptela-gre-static-routes.png)

## 5. Validate traffic flow

In the example below, a request for neverssl.com was issued, which has a Cloudflare policy blocking traffic to neverssl.com.

On the client VM (192.168.30.3), a blocked response is visible.

![cURL example for a request to neverssl.com](/magic-wan/static/viptela-curl-traffic-flow.png)

A matching blocked log line is visible from the Cloudflare logs.

![A blocked log from Gateway Activity Log in the Cloudflare dashboard](/magic-wan/static/viptela-gre-swg-traffic.png)

**Validate east-west traffic**

The example shows a client in AWS (10.1.2.23), which can ping the private IP of the router in GCP (192.168.30.3).

The traceroute shows the path going from the client (10.1.2.23)<br>
→ to the AWS lan0 IP on the EdgeConnect (10.1.2.47)<br>
→ to the Cloudflare private IPSec endpoint IP (10.0.0.10)<br>
→ to the GCP private tunnel endpoint IP (10.49.0.10)<br>
→ to the GCP workload (192.168.30.3).

This validates the east-west traffic flow through Cloudflare Magic WAN.

![East-west traffic ping](/magic-wan/static/viptela-east-west-ping.png)

## Add new tunnels using IPsec

IPSec tunnels to Cloudflare can only be created on Cisco 8000v in the router mode today. Refer to the [Cisco IOS XE](/magic-wan/tutorials/cisco-ios-xe/) for more information. 

**Coming soon: IPsec tunnel creation in SD-WAN mode.**
