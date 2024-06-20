---
pcx_content_type: integration-guide
title: pfSense
updated: 2024-06-20
---

# pfSense firewall

This tutorial includes the steps required to configure IPsec tunnels to connect a pfSense firewall to Cloudflare Magic WAN.

## Software tested

Manufacturer | Firmware Revision
---          | ---
pfSense      | 24.03

## Prerequisites

For this tutorial, you will need to know the following information:
- Your Anycast IP addresses (given to you by Cloudflare)
- External IP addresses
- Internal IP address ranges
- Inside tunnel `/31` ranges

## Example Scenario

The following IP addresses are used throughout this tutorial. Any legally routable IP addresses have been replaced with IPv4 Address Blocks Reserved for Documentation ([RFC5737](https://datatracker.ietf.org/doc/html/rfc5737)) addresses within the `203.0.113.0/24` subnet.

Tunnel name                        | `PF_TUNNEL_01`                | `PF_TUNNEL_02`
---                                | ---                           | ---
Interface address                  | `10.252.2.26/31`              | `10.252.2.28/31`
Customer endpoint                  | `203.0.113.254`               | `203.0.113.254`
Cloudflare endpoint                | `<YOUR_ANYCAST_IP_ADDRESS_1>` | `<YOUR_ANYCAST_IP_ADDRESS_2>`
Pfsense IPsec Phase 2 Local IP     | `10.252.2.27`                 | `10.252.2.29`
Pfsense IPsec Phase 2 Remote IP    | `10.252.2.26`                 | `10.252.2.28`
Magic WAN static routes — Prefix   | `10.1.100.0/24`               | `10.1.100.0/24`
Magic WAN static routes — Next hop | `PF_TUNNEL_01`                | `PF_TUNNEL_02`

## 1. Configure Magic WAN IPsec tunnels

Use the Cloudflare dashboard or API to [configure two IPsec tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels). The settings mentioned below are used for the IPsec tunnels referenced throughout the remainder of this guide.

### Add IPsec tunnels

1. Follow the [Add tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/) instructions to create the required IPsec tunnels with the following options:
    - **Tunnel name**: `PF_TUNNEL_01`
    - **Interface address**: `10.252.2.26/31`
    - **Customer endpoint**: `203.0.113.254`
    - **Cloudflare endpoint**: Enter your Anycast IP address given by Cloudflare.
    - **Health check rate**: _Medium_
    - **Health check type**: _Request_
    - **Health check direction**: _Bidirectional_
2. Select **Add pre-shared key later** > **Add tunnels**.
3. Repeat the process to create a second IPsec tunnel with the following options:
    - **Tunnel name**: `PF_TUNNEL_02`
    - **Interface address**: `10.252.2.28/31`
    - **Customer endpoint**: `203.0.113.254`
    - **Cloudflare endpoint**: `172.64.242.164`
    - **Health check rate**: _Medium_
    - **Health check type**: _Request_
    - **Health check direction**: _Bidirectional_
4. Select **Add pre-shared key later** > **Add tunnels**.

### Generate Pre-shared keys

When you create IPsec tunnels with the option **Add pre-shared key later**, the Cloudflare dashboard will show you a warning indicator.

1. Select **Edit** to edit the properties of each IPsec tunnel you have created.
2. Select **Generate a new pre-shared key** > **Update and generate pre-shared key**.
3. Copy the pre-shared key value for each of your IPsec tunnels, and save these values somewhere safe. Then, select **Done**.

{{<Aside type="note">}} Take note of your pre-shared key, and keep it in a safe place.{{</Aside>}}

### IPsec identifier - User ID

After creating your IPsec tunnels, the Cloudflare dashboard will list them under **Tunnels**. To retrieve your IPsec tunnel's user ID:

1. Go to **Magic WAN** > **Configuration**.
2. Select **Tunnels**.
3. Select the IPsec tunnel.
4. Scroll to **User ID** and copy the string. For example, `ipsec@long_string_of_letters_and_numbers`.

The User ID will be required when configuring IKE Phase 1 on the pfSense Firewall.

## 2. Create Magic WAN static routes

Create a [static route](/magic-wan/configuration/manually/how-to/configure-static-routes/#create-a-static-route) for each of the two IPsec tunnels configured in the previous section, with the following settings (settings not mentioned here can be left with their default settings):

### Tunnel 01

- **Description**: `PF_TUNNEL_01`
- **Prefix**: `10.1.100.0/24`
- **Tunnel/Next hop**: `PF_TUNNEL_01`

### Tunnel 02

- **Description**: `PF_TUNNEL_02`
- **Prefix**: `10.1.100.0/24`
- **Tunnel/Next hop**: `PF_TUNNEL_02`

## 3. Configure the PFsense firewall

Install PFsense and boot up. Then, assign and set LAN and WAN interfaces, as well as IP addresses. For example:
- **LAN**: `203.0.113.254`
- **WAN**: `<YOUR_WAN_ADDRESS>`

### Configure IPsec Phase 1

Add a new IPsec tunnel [Phase 1 entry](https://docs.netgate.com/pfsense/en/latest/vpn/ipsec/configure-p1.html), with the following settings:

- **General Information**
    - **Description**: `CF1_IPsec_P1`
- **IKE Endpoint Configuration**
    - **Key exchange version**: _IKE_v2_
    - **Internet Protocol**: _IPv4_
    - **Interface**: _WAN_
    - **Remote gateway**: Enter your Cloudflare anycast IP address.
- **Phase 1 Proposal (Authentication)**
    - **Authentication method**: _Mutual PSK_
    - **My identifier**: _User Fully qualified domain name_ > `ipsec@long_string_of_letters_and_numbers` <br> (You can get this identifier from your Cloudflare IPsec tunnel configuration > **User ID**)
    - **Peer identifier**: _Peer IP Address_ (your Cloudflare Anycast IP)
    - **Pre-Shared Key**: Enter the PSK you have on your Cloudflare IPsec tunnel.
- **Phase 1 proposal (Encryption algorithm)**
    - **Encryption algorithm**: _AES 256_
    - **Key length**: _256 bits_
    - **Hash algorithm**: _SHA256_
    - **DH key group**: _14_
    - **Lifetime**: `28800`

<div class="medium-img">

![pfSense IPsec phase 1 settings](images/magic-wan/third-party/pfsense/ipsec-phase1.png)

</div>

<div class="medium-img">

![pfSense IPsec phase 1 settings](images/magic-wan/third-party/pfsense/ipsec-phase1b.png)

</div>