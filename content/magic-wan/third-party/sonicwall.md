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

The following instructions show how to setup an IPsec connection on your SonicWall device. Settings not explicitly mentioned can be left with their default values.

### 1. Create an IPsec tunnel on your Cloudflare account

1. Start by [creating an IPsec tunnel](/magic-wan/get-started/configure-tunnels/#add-tunnels) on Cloudflare. Name and describe the tunnel as needed, and add the following settings:
    - **Interface address**: Enter the internal tunnel IP on the Cloudflare side of the IPsec tunnel.
    - **Customer endpoint**: Enter the WAN IP address of your SonicWall device.
    - **Cloudflare endpoint**: Enter the IP address provided by Cloudflare.
    - **Pre-shared key**: Select Use my own pre-shared key and paste a secure key of your own.

2. Select **Add tunnels** when you are finished.

    <div class="large-img">

    ![Fill in the correct addresses to set up your IPsec tunnel](/images/magic-wan/third-party/sonicwall/step2.png)

    </div>

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

    <div class="large-img">

    ![An example of what your static routes should look like](/images/magic-wan/third-party/sonicwall/static-route1.png)
    ![An example of what your static routes should look like](/images/magic-wan/third-party/sonicwall/static-route2.png)

    </div>