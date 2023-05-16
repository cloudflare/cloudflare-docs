---
title: SonicWall
pcx_content_type: integration-guide
---

# SonicWall

This tutorial shows you how to use Magic WAN with the following versions of the SonicWall appliances:

- **Hardware tested**: 
    - SonicWall NSv 470
    - SonicWal 3700
- **Software versions tested**: 
    - SonicOS 7.0.1

You can connect your SonicWall appliance through [IPsec tunnels](/magic-wan/get-started/configure-tunnels/) to Magic WAN. Generic Routing Encapsulation (GRE) is not supported on SonicWall.

## Topology

![Topology diagram showing how to connect SonicWall appliances to Magic WAN](/images/magic-wan/third-party/sonicwall/topology.png)

## ​​IPsec connection

The following instructions show how to setup an IPsec connection on your SonicWall device. We will use the IP ranges from the topology image to create the several connections needed. Settings not explicitly mentioned can be left with their default values.

### 1. Create an IPsec tunnel on your Cloudflare account

1. Start by [creating an IPsec tunnel](/magic-wan/get-started/configure-tunnels/#add-tunnels) on Cloudflare. Name and describe the tunnel as needed, and add the following settings:
    - **Interface address**: Enter the internal tunnel IP on the Cloudflare side of the IPsec tunnel.
    - **Customer endpoint**: Enter the WAN IP address of your SonicWall device.
    - **Cloudflare endpoint**: Enter the IP address provided by Cloudflare.
    - **Pre-shared key**: Select Use my own pre-shared key and paste a secure key of your own.

2. Select **Add tunnels** when you are finished.

3. After you create your tunnel, Cloudflare dashboard will load list of tunnels set up for your account. Select the arrow to expand the tunnels you have just created, and check the following settings:
    - **Customer endpoint**: Refers to the SonicWall WAN IP that the VPN policy is bound to (in red).
    - **Cloudflare Endpoint**: Refers to the Anycast IP provided by Cloudflare (in blue).
    - **FQDN ID**: The ID used in the VPN policy for the SonicWall’s Local IKE ID. Copy this ID and save it. You will need it when configuring the tunnel on your SonicWall (in green).

    <div class="large-img">

    ![An example of what your IPsec tunnel should look like](/images/magic-wan/third-party/sonicwall/step3.png)

    </div>

{{<Aside type="note">}}The interface address on the Cloudflare side of the tunnel is `10.200.1.0/31`. You will need to use `10.200.1.1/31` on the SonicWall side of the tunnel.{{</Aside>}}

### 2. Create static routes on Cloudflare dashboard

Static routes are required for any networks that will be reached via the IPsec tunnel. In our example, there are two networks: `172.31.3.0/24` and the tunnel network `10.200.1.0/31`.

1. [Create your static routes](/magic-wan/get-started/configure-static-routes/#create-a-static-route). Name and describe them as needed, and add the following settings:
    - **First tunnel**: Following our example, add `10.200.1.0/31` as the **Prefix** and `10.200.1.1` for the **Tunnel/Next hop**.
    - **Second tunnel**: Following our example, add `172.31.3.0/24` as the **Prefix** and `10.200.1.1` for the **Tunnel/Next hop**.

2. Select **Add routes** when you are finished.

### 3. Add a VPN configuration in SonicWall

1. Go to **Network** > **IPSec VPN** > **Rules and Settings**.
2. Select **General** > **Add**.
3. In the **Security Policy** group, add the following settings:
    - **Authentication Method**: _IKE Using Preshared Secret_.
    - **IPsec Primary Gateway Name or Address**: Enter Cloudflare’s Anycast IP address for the primary gateway (in blue).
4. In the **IKE authentication** group, add the following settings:
    - **Shared secret**: Paste the pre-shared key you use to create the IPsec tunnel in step 1 (in purple).
    - **Local IKE ID**: Select _Domain name_ from the dropdown menu, and paste here the **FQDN ID** you saved from step 1, after creating the IPsec tunnel (in green).
    - **Peer IKE IDE**: Select _IPv4_ Address from the dropdown menu, and enter the Cloudflare Anycast IP address (in blue).

<div class="large-img">

![Configure a VPN policy on your SonicWall device](/images/magic-wan/third-party/sonicwall/3-vpn-config.png)

</div>

5. Select **Save**.

### 4. Update the VPN policy

VPN Policy is somewhat flexible. Adjust these settings to match your organization’s preferred security policy. As an example, you can set the following settings:

1. Go to **Network** > **IPSec VPN** > **Rules and Settings**.
2. Select **Proposals**.
3. In the **IKE (Phase 1) Proposal** group, select the following settings:
    - **Exchange**: _IKEv2 Mode_
    - **DH Group**: _Group 14_
    - **Encryption**: _AES-256_
    - **Authentication**: _SHA256_
    - **Life Time (seconds)**: `28800`
4. In the **IPsec (Phase 2) Proposal** group, add the following settings:
    - **Protocol**: _ESP_
    - **Encryption**: _AESGCM16-256_
    - **Authentication**: _None_
    - **Enable Perfect Forward Secrecy**: Enabled
    - **DH Group**: _Group 14_
    - **Life Time (seconds)**: `28800`

<div class="large-img">

![Configure a VPN policy on your SonicWall device](/images/magic-wan/third-party/sonicwall/4-vpn-policy-proposals.png)

</div>

5. Select **Save**.

### 5. Disable replay protection

1. Go to **Network** > **IPSec VPN** > **Rules and Settings**.
2. Select **Advanced**.
3. Enable **Disable IPsec Anti-Replay**.
4. In **VPN Policy bound to** select your WAN interface from the dropdown menu, to bind it to your VPN.
5. Select **Save**.

<div class="large-img">

![Configure a VPN policy on your SonicWall device](/images/magic-wan/third-party/sonicwall/5-anti-replay.png)

</div>

### 6. Add a VPN tunnel interface

SonicOS requires a VPN tunnel interface to route traffic via Magic WAN. When creating the interface, use the prefix `10.200.1.1/31`. This matches with the Cloudflare side for this tunnel, which is `10.200.1.0`.
 
{{<Aside type="note">}}You will need to use a different IP pair for each tunnel/site.{{<Aside>}}