---
title: Cisco Viptela SD-WAN
pcx-content-type: tutorial
weight: 2
---

# Cisco Viptela SD-WAN

Cloudflare partners with Cisco Viptela's SD-WAN solution to provide users with an integrated solution. The Viptela appliances (physical and virtual) manage subnets associated with branch offices and cloud instances. Anycast GRE Tunnels are set up between these appliances and Cloudflare to securely route Internet-bound traffic. 

## Prerequisites

Before setting up a connection between Cisco Viptela and Cloudflare, you must have:

- Purchased Magic WAN and Secure Web Gateway.
- Cloudflare provision Magic WAN and Secure Web Gateway.
- Received the Cloudflare GRE endpoint (Anycast IP address) assigned to Magic WAN.
- Cisco Viptela SD-WAN appliances (physical or virtual). This ensures specific Internet-bound traffic from the sites' private networks is routed over the Anycast GRE tunnels to Secure Web Gateway to enforce a user's specific web access policies.
- A static IP pair to use with the tunnel endpoints. The static IPs should be /31 addresses separate from the IPs used in the subnet deployment. The software version used on Cisco was `20.6.2/17.6.2`.

## Example scenario

For the purpose of this tutorial, the integration will refer to a scenario with one branch office with subnets.

The central branch office has a 192.168.30.0/24 network with the SD-WAN appliance terminating the Anycast GRE tunnel.

![Table of branch subnet information](/magic-wan/static/viptela-branch-subnets.png)

## Integration using IPsec tunnels

### 1. Create a SIG template on Cisco vManage

Cisco vManage is Cisco's SD-WAN management tool that is used to manage all the SD-WAN appliances in branch offices. For this example scenario, a non-default template for SIG-Branch-IPsec-Template was created.

To create a Secure Internet Gateway (SIG) using vManage:

1. From **Cisco vManage** under **Configuration**, click **Generic** and **Add Tunnel**.
2. Refer to the table below for the setting fields and their options.

|     Setting                                       |   Type/Detail                     |
|---------------------------------------------------|-----------------------------------|
| **Tunnel Type**                                   | IPsec                             |
| **Interface Name (1..255)**                       | Global                            |
| **Description**                                   | IP                                |
| **Tunnel Source IP Address**                      | Device-Specific                   |
| **IPv4 addresses**                                | Device-Specific                   |
| **Tunnel Route-via Interface**                    | Device-Specific                   |
| **Tunnel Destination IP Address/FQDN(Ipsec)**     | Device-Specific                   |
| **Preshared key**                                 | Device-Specific                  |
| **IPsec Rekey Interval (under advanced options)** | Default                           |
| **IPsec Replay Window**                           | Default                           |
| **IPSec Cipher Suite**                            | Global (AES 256 CBC SHA 256)      |
| **Perfect Forward Secrecy**                       | Global (Group-14 2048-bit modulus) |

### 2. Create a non-default feature template

For compatibility, you will need to disable replay protection, which is not an option through the templates, by creating a CLI template in addition to the feature template created in the previous step.

![CLI configuration used to disable replay](/magic-wan/static/viptela-cli-config.png)

In the image above, replay is disabled and the `local key-id` is set to a variable so that a Cloudflare tunnel ID with the format `xxxxxx_YYYYYYY` can be added.

### 3. Create IPsec tunnel in vManage

From **vManage**, click **Configuration** > **Templates**. You should see the newly created template where you will update the device values. 

In the example below, the template is the **GCP-Branch-Template**.

![Update template fields for IPsec tunnel](/magic-wan/static/viptela-update-device-template-ipsec.png)

### 4. Define IPsec tunnel through Cloudflare

Refer to [Configure tunnel endpoints](/magic-wan/how-to/configure-tunnels) for more information on creating an IPsec tunnel.

### 5. Define static routes

Refer to [Configure static routes](/magic-wan/how-to/configure-static-routes) for more information on configuring your static routes.

### 6. Test your setup

You can verify traffic is flowing through the established IPsec tunnel from the Cisco Device Dashboard under **Interface**. 

## Integration using GRE tunnels

### 1. Create a SIG template on Cisco vManage

Cisco vManage is Cisco's SD-WAN management tool that is used to manage all the SD-WAN appliances in branch offices. For this example scenario, a non-default template for `SIG-Branch` was created.

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

### 2. Create GRE tunnels in vManage

From vManage, click **Configuration** > **Templates**. You should see the newly created template where you will update the device values. 

Because the template was created to add GRE tunnels, you only need to update the device values.

Note that **VPN0** is the default, and the WAN interface used to build the tunnel must be part of **VPN0**.

![Update template fields for GRE tunnel](/magic-wan/static/viptela-update-device-template-gre.png)

### 3. Define GRE tunnels through Cloudflare

Refer to [Configure tunnel endpoints](/magic-wan/how-to/configure-tunnels) for more information on creating a GRE tunnel.

### 4. Define static routes

Refer to [Configure static routes](/magic-wan/how-to/configure-static-routes) for more information on configuring your static routes.

### 5. Test your setup

You can verify traffic is flowing through the established GRE tunnel from the Zero Trust dashboard under **Logs** > **Gateway**.