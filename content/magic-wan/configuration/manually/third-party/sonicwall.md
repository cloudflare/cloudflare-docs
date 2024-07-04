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

You can connect your SonicWall appliance through [IPsec tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/) to Magic WAN. Generic Routing Encapsulation (GRE) is not supported on SonicWall.

## Topology

![Topology diagram showing how to connect SonicWall appliances to Magic WAN](/images/magic-wan/third-party/sonicwall/topology.png)

The following instructions show how to setup an IPsec connection on your SonicWall device. We will use the IP ranges from the above topology example to create the connections needed. Settings not explicitly mentioned can be left with their default values.

## 1. Create an IPsec tunnel on your Cloudflare account

1. Start by [creating your IPsec tunnels](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) on Cloudflare. Name and describe the tunnels as needed, and add the following settings:
    - **Interface address**: Enter the internal tunnel IP on the Cloudflare side of the IPsec tunnel. In this example, it is `10.200.1.0/31`.
    - **Customer endpoint**: Enter the WAN IP address of your SonicWall device. In our example, this is `198.51.100.2`.
    - **Cloudflare endpoint**: Enter the IP address provided by Cloudflare. In our example, this is `1.2.3.4`.
    - **Pre-shared key**: Select **Use my own pre-shared key** and paste a secure key of your own.

2. Select **Add tunnels** when you are finished.

3. After you create your tunnel, Cloudflare dashboard will load a list of tunnels set up for your account. Select the arrow to expand the tunnels you have just created, and check the following settings:
    - **Customer endpoint**: Refers to the SonicWall WAN IP that the VPN policy is bound to (in red).
    - **Cloudflare endpoint**: Refers to the Anycast IP provided by Cloudflare (in blue).
    - **FQDN ID**: The ID used in the VPN policy for the SonicWall's Local IKE ID. Copy this ID and save it. You will need it when configuring the tunnel on your SonicWall (in green).

    ![An example of what your IPsec tunnel should look like](/images/magic-wan/third-party/sonicwall/step3.png)

{{<Aside type="note">}}The interface address on the Cloudflare side of the tunnel is `10.200.1.0/31`. You will need to use `10.200.1.1/31` on the SonicWall side of the tunnel.{{</Aside>}}

## 2. Create static routes on Cloudflare dashboard

Static routes are required for any networks that will be reached via the IPsec tunnel. In our example, there are two networks: `172.31.3.0/24` and the tunnel network `10.200.1.0/31`.

1. [Create your static routes](/magic-wan/configuration/manually/how-to/configure-static-routes/#create-a-static-route). Name and describe them as needed, and add the following settings:
    - **First tunnel**: Following our example, add `10.200.1.0/31` as the **Prefix** and `10.200.1.1` for the **Tunnel/Next hop**.
    - **Second tunnel**: Following our example, add `172.31.3.0/24` as the **Prefix** and `10.200.1.1` for the **Tunnel/Next hop**.

2. Select **Add routes** when you are finished.

## 3. Add a VPN configuration in SonicWall

1. Go to **Network** > **IPsec VPN** > **Rules and Settings**.
2. Select **Add**.
3. In **General** > **Security Policy** group, add the following settings:
    - **Authentication Method**: _IKE Using Preshared Secret_.
    - **IPsec Primary Gateway Name or Address**: Enter Cloudflare's Anycast IP address for the primary gateway (in blue).
4. In the **IKE Authentication** group, add the following settings:
    - **Shared secret**: Paste the pre-shared key you use to create the IPsec tunnel in step 1 (in purple).
    - **Local IKE ID**: Select _Domain name_ from the dropdown menu, and paste here the **FQDN ID** you saved from step 1, after creating the IPsec tunnel (in green).
    - **Peer IKE IDE**: Select _IPv4_ Address from the dropdown menu, and enter the Cloudflare Anycast IP address (in blue).

<div class="large-img">

![Configure a VPN policy on your SonicWall device](/images/magic-wan/third-party/sonicwall/3-vpn-config.png)

</div>

5. Select **Proposals**. VPN Policy is somewhat flexible. Adjust these settings to match your organization's preferred security policy. As an example, you can use the settings in the examples below.
6. In the **IKE (Phase 1) Proposal** group, select the following settings:
    - **Exchange**: _IKEv2 Mode_
    - **DH Group**: _Group 14_
    - **Encryption**: _AES-256_
    - **Authentication**: _SHA256_
    - **Life Time (seconds)**: `28800`
7. In the **IPsec (Phase 2) Proposal** group, add the following settings:
    - **Protocol**: _ESP_
    - **Encryption**: _AESGCM16-256_
    - **Authentication**: _None_
    - **Enable Perfect Forward Secrecy**: Enabled
    - **DH Group**: _Group 14_
    - **Life Time (seconds)**: `28800`

<div class="large-img">

![Configure a VPN policy on your SonicWall device](/images/magic-wan/third-party/sonicwall/4-vpn-policy-proposals.png)

</div>

8. Select **Advanced**.
9. Enable **Disable IPsec Anti-Replay**.
10. In **VPN Policy bound to** select your WAN interface from the dropdown menu, to bind it to your VPN.
11. Select **Save**.

<div class="large-img">

![Enable anti-replay on your SonicWall device](/images/magic-wan/third-party/sonicwall/5-anti-replay.png)

</div>

## 4. Add a VPN tunnel interface

SonicOS requires a VPN tunnel interface to route traffic via Magic WAN. When creating the interface, use the prefix `10.200.1.1/31`. This matches with the Cloudflare side for this tunnel, which is `10.200.1.0`.

{{<Aside type="note">}}You will need to use a different IP pair for each tunnel/site.{{</Aside>}}

1. Go to **Network** > **System** > **Interfaces**.
2. Select **Add interface** > **VPN Tunnel Interface**.
3. For IP Address, use `10.200.1.1`.
4. Enable **Ping**. This is required so the interface can be pinged for debugging and Magic WAN health checks.

<div class="large-img">

![Enable ping to that your interface can be pinged for debugging and Magic WAN health checks](/images/magic-wan/third-party/sonicwall/6-vpn-ping.png)

</div>

5. Select **Advanced**.
6. Enable the **Enable Asymmetric Route Support** option. This is required for the Magic WAN tunnel health check.

<div class="large-img">

![Enable Asymmetric Route Support. It is required for Magic WAN health checks](/images/magic-wan/third-party/sonicwall/6-vpn-assymetric.png)

</div>

7. Select **OK**.

## 5. Add address object(s)

Address objects are necessary for route policies. In our example, we have one other site that will be reached via Magic WAN. First, you need to create address objects for each network. Then, you need to create an address group that contains all the remote networks. This address group will be used in the next step to create the correct route policies.

To add an address object:

1. Select **Object** > **Match Objects** > **Addresses**
2. Select **Address Objects** > **Add**.
3. Enter the information for your address object - refer to the topology image for the examples this tutorial is using. Since the addresses are in the VPN zone, set the **Zone Assignment** for the object to _VPN_.
4. Select **Save**. The window will stay on to facilitate multiple entries. Select **X** to close it.

<div class="large-img">

![Enter the appropriate settings for you object](/images/magic-wan/third-party/sonicwall/7-address-objects-settings.png)

</div>

5. Select **Address Groups** > **Add** to add a new address group.
6. Enter a **Name** for your address group.
7. Select the individual network objects you have created on the left menu, and add them to the group by selecting the right-facing arrow in the middle column.
6. Select **Save**.

<div class="large-img">

![Copy the individual network objects and add them to your group](/images/magic-wan/third-party/sonicwall/7-add-objects-group.png)

</div>

## 6. Set up routing

Add a route using the address object or group just created as the destination.

1. Select **Policy** > **Rules and Policies** > **Routing Rules**.
2. Select **Add** to add your route policy.
3. The **Next Hop** should be the VPN tunnel interface that was previously created in the interface panel.

## 7. Add access rule for health checks

An additional access rule is required for Magic WAN health checks to work properly. This will enable the WAN IP to receive ICMP pings via the tunnel, and return them over the WAN.

1. Select **Policy** > **Rules and Policies**.
2. Select **Access Rules** > **Add**.
3. Enter a descriptive name for your policy.
4. In **Source / Destination** > **Destination > Port/Services**, select _ICMP_ from the dropdown.
5. Select **Optional Settings**.
6. In **Others**, enable **Allow Management traffic**.

## 8. Setup health checks

You have to [configure Magic WAN health checks](/magic-wan/configuration/manually/how-to/configure-tunnels/#add-tunnels) correctly. Here is an example of how to set up health checks:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels/{tunnel_id} \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "health_check": {
    "enabled": true,
    "target": "SONICWALL_WAN_IP",
    "type": "request",
    "rate": "mid"
  }
}'
```

Health checks might take some time to stabilize after the configuration is changed.

## 9. Verify tunnel status on Cloudflare dashboard

{{<render file="_tunnel-healthchecks-dash.md" productFolder="magic-wan" withParameters="The dashboard shows the view of tunnel health as measured from each Cloudflare location where your traffic is likely to land.;;**Magic WAN** > **Tunnel health**" >}}
