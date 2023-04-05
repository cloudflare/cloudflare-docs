---
title: Sophos Firewall
pcx_content_type: tutorial
---

# Sophos Firewall

This tutorial will show you how to use Magic WAN with the following versions of the Sophos Firewall:

- **Sophos form factor tested:**
    - Sophos Firewall XGS and XG series hardware
    - Sophos Firewall virtual appliance on VMware 

- **Sophos software versions tested:**
    - SFOS  Version 19.0 MR2-Build 472
    - SFOS  Version 19.5.0 GA-Build 197

You can connect through Generic Routing Encapsulation (GRE) or IPsec tunnels to Magic WAN. Below there are instructions on how to achieve this through both types of connections.

## IPsec connection

The following instructions show how to setup an IPSec connection on your Sophos Firewall device.

### 1. Add an IPsec Profile

1. Go to **System** > **Profiles**.
2. In **IPsec profiles**, select **Add**.
3. In the **General settings** group, make sure you have the following settings:
    - **Name**: Give your profile a descriptive name.
    - **Key exchange**: **IKEv2**
    - **Authentication mode**: **Main mode**
4. In the **Phase 1** group, make sure you have the following settings:
    - **DH group (key group)**: _14(DH2048)_
    - **Encryption**: _AES256_
    - **Authentication**: _SHA2 256_
5. In the **Phase 2** group, select the following:
    - **PFS group (DH group)**: _Same as phase-1_
    - **Key life**: _3600_
    - **Encryption**: _AES256_
    - **Authentication**: _SHA2 256_
6. In **Dead Peer Detection**, select **Dead Peer Detection** and make sure you have _Re-initiate_ selected in **When peer unreachable**.
7. Select Save.

<div class="large-img">

![Start by setting up an IPsec profile.](/magic-wan/static/sophos-firewall/1-ipsec-profile.png)

</div>

### 2. Create IPsec connection tunnel

The next step involves configuring a site-to-site IPsec VPN connection on your Sophos Firewall device.

1. Go to **Configure** > **Site-to-site VPN**.
2. In **IPsec**, select **Add**.
3. In the **General settings** group, make sure you have the following settings:
    - **Name**: Give your site-to-site VPN a descriptive name.
    - **Connection type**: _Tunnel interface_
    - **Gateway type**: _Initiate the connection_
4. In the **Encryption** group, make sure you have the following settings:
    - **Authentication type**: **Preshared key**
5. In **Gateway settings**, make sure you have the following settings:
    - **Gateway address**: Enter your Cloudflare Anycast IP address provided by Cloudflare.

<div class="large-img">

![Configure an IPsec tunnel.](/magic-wan/static/sophos-firewall/2-ipsec-tunnel.png)

</div>

After setting up your IPsec tunnel, it will show up on the IPsec connections list with an **Active** status.

<div class="large-img">

![The IPsec tunnel should show up on the IPsec connections list.](/magic-wan/static/sophos-firewall/2b-ipsec-tunnel.png)

</div>

### 3. Assign the XFRM interface address

You must use an interface address from the `/31` subnet required to [configure tunnel endpoints](/magic-wan/get-started/configure-tunnels/) on Magic WAN.

1. Go to **Configure** > **Network**.
2. In **Interfaces**, select the corresponding interface to the IPsec tunnel you created in [step 2](#2-create-ipsec-connection-tunnel).
3. Edit the interface to assign an address from the `/31` subnet required to [configure tunnel endpoints](/magic-wan/get-started/configure-tunnels/). 

![Configure a XFRM interface.](/magic-wan/static/sophos-firewall/3-xfrm-interface.png)

### 4. Add a firewall rule

1. Go to **Protect** > **Rules and policies**.
2. In **Firewall rules**, create a firewall rule with the criteria and security policies from your company that allows traffic to flow between Sophos and Magic WAN.

![Create a firewall rule with the criteria and security policies from your company](/magic-wan/static/sophos-firewall/4-firewall-rule.png)

### 5. Disable IPsec anti-replay

You will have to disable IPsec Anti-Replay on your Sophos Firewall. Changing the anti-replay settings restarts the IPsec service, which causes tunnel-flap for all IPsec tunnels. This will also disable IPsec anti-replay protection for all VPN connections globally. Plan these changes accordingly. 

Below are instruction on how to achieve this on SFOS version 19 and SFOS version 19.5:

#### SFOS version 19.0 MR2-Build 472

1. Sign in to the CLI.
2. Enter **4** to choose **Device console**, and enter the following command:

    ```bash
    set vpn ipsec-performance-setting anti-replay window-size 0
    ```

    ![Access the CLI to disable anti-replay](/magic-wan/static/sophos-firewall/5-sfos-19.png)

#### SFOS version 19.5.0 GA-Build 197 or any other SFOS version

Contact Sophos support.

## GRE connection

### 1. Configure a GRE tunnel between SFOS and Cloudflare

Start by configuring a GRE tunnel between SFOS and the Cloudflare Anycast IP address.

1. Sign in to the CLI. 
2. Enter **4** to choose **Device console**, and enter the following command:

    ```bash
    system gre tunnel add name <NAME_OF_YOUR_GRE_TUNNEL> local-gw <WAN_PORT> remote-gw <REMOTE_GATEWAY_IP_ADDRESS> local-ip <LOCAL_IP_ADDRESS> remote-ip <REMOTE_IP_ADDRESS>
    ```

    ![Access the CLI to configure a GRE tunnel](/magic-wan/static/sophos-firewall/1-gre-connection.png)

    For more details, refer to [KB-000035813](https://support.sophos.com/support/s/article/KB-000035813?language=en_US).

### 2. Add a GRE or SD-WAN route to redirect traffic through the GRE tunnel

The detailed information on how to add a GRE or SD-WAN route to redirect traffic through the GRE tunnel, is in the following section (Traffic redirection mechanism on Sophos Firewall).

### 3. Add a firewall rule for LAN/DMZ to VPN

Create a firewall rule with the criteria and security policies from your company that allows traffic to flow between Sophos and Magic WAN. This firewall rule should include the required networks and services.

1. Go to **Protect** > **Rules and policies**.
2. In **Firewall rules**, select **IPv4** > **Add firewall rule**.

![Create a firewall rule with the criteria and security policies from your company](/magic-wan/static/sophos-firewall/4-firewall-rule.png)

## Traffic redirection mechanism on Sophos Firewall

To redirect traffic, add a static or a SD-WAN route.

### IPsec

#### Static route 

Go to **Configure** > **Routing** > **Static routes** to add an XFRM interface-based route. The interface will be automatically created when you set up a tunnel interface based on IPsec (such as the Cloudflare_MWAN example from above).

![Go to static routes to add an XFRM interface-based route](/magic-wan/static/sophos-firewall/static-route.png)