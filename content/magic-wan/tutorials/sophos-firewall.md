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

You can connect through Generic Routing Encapsulation (GRE) or IPsec tunnels to Magic WAN.

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
6. Enable **Dead Peer Detection**.
7. In **When peer unreachable**, select _Re-initiate_.
8. Select **Save**.

![Start by setting up an IPsec profile.](/magic-wan/static/sophos-firewall/1-ipsec-profile.png)

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

![Configure an IPsec tunnel.](/magic-wan/static/sophos-firewall/2-ipsec-tunnel.png)

After setting up your IPsec tunnel, it will show up on the IPsec connections list with an **Active** status.

![The IPsec tunnel should show up on the IPsec connections list.](/magic-wan/static/sophos-firewall/2b-ipsec-tunnel.png)

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

The detailed information on how to add a GRE or SD-WAN route to redirect traffic through the GRE tunnel, is in the next section ([Traffic redirection mechanism on Sophos Firewall](#traffic-redirection-mechanism-on-sophos-firewall)).

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

#### SD-WAN route 

1. Go to **Configure** > **Routing** > **Gateways** to create a custom gateway on the XFRM interface. The interface will be automatically created when you set up a tunnel interface based on IPsec (such as the Cloudflare_MWAN example from above).

![Go to Gateways to add an XFRM interface-based route](/magic-wan/static/sophos-firewall/1-sd-wan-gateway.png)

2. In **Configure** > **Routing** > **SD-WAN routes**, select **Add** to add the desired networks and services in the route to redirect traffic to Cloudflare. Enter a descriptive name for your connection, and pay attention to the **Incoming interface**, **Source networks** and **Primary gateway options**.

![Go to SD-WAN to add the desired networks and services in the route.](/magic-wan/static/sophos-firewall/2-sd-wan-routes.png)

### GRE

Add a GRE or SD-WAN route or both.

#### GRE route

Add the route on the CLI.

1. Sign in to the CLI. 
2. Enter **4** to choose **Device console**, and enter the following command to create the tunnel:

```bash
system gre route add net <IP_ADDRESS> tunnelname <TUNNEL_NAME>
```

![Add the route on the CLI.](/magic-wan/static/sophos-firewall/gre-route-cli.png)

#### SD-WAN route 

1. Add a custom gateway on GRE with the peer IP address (from the `/31` subnet you chose earlier) as the Gateway IP address, and disable **Health check**.

![Add a custom gateway on GRE.](/magic-wan/static/sophos-firewall/sd-wan-1-gre.png)

2. Add an SD-WAN route, with the desired networks and services in the route to redirect traffic to Cloudflare.

![Add an SD-WAN route.](/magic-wan/static/sophos-firewall/2-sd-wan-routes.png)

## Verify tunnel status on Cloudflare dashboard

You can check if your tunnels are healthy on the Cloudflare dashboard. 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and choose your account. 
2. Go to **Magic WAN** > **Tunnel health**, and select **View**.

This dashboard shows the global view of tunnel health as measured from all Cloudflare locations. If the tunnels are healthy on your side, you will see the majority of servers reporting an **up** status. It is normal for a subset of these locations to show tunnel status as degraded or unhealthy, since the Internet is not homogenous and intermediary path issues between Cloudflare and your network can cause interruptions for specific paths.

To make Cloudflare health checks work:

1. The ICMP probe  packet from Cloudflare must be the type ICMP request, with anycast source IP. For example:

```bash
curl --request PUT \
  --url https://api.cloudflare.com/client/v4/accounts/<account_identifier>/magic/gre_tunnels/<tunnel_identifier> \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <YOUR_EMAIL> ' \
  --data '{
    "health_check": {
        "enabled":true,
        "target":"172.64.240.252",
        "type":"request",
        "rate":"mid"
    }
}'
```

2. ICMP reply from SFOS should go back via the same tunnel on which the probe packets are received. You will need to create an additional SD-WAN policy route.

![Configure an SD-WAN route so the ICMP reply goes back to Cloudflare via the same tunnel.](/magic-wan/static/sophos-firewall/2-icmp-probe-reply.png)

Packet flow will look like the following:

```sh
$ tcpdump -nn proto 1 
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode 
listening on any, link-type LINUX_SLL (Linux cooked v1), capture size 262144 bytes 

13:09:55.500453 xfrm1, IN: IP 172.70.51.31 > 172.64.240.252: ICMP echo request, id 33504, seq 0, length 64 
13:09:55.500480 xfrm1, OUT: IP 172.64.240.252 > 172.70.51.31: ICMP echo reply, id 33504, seq 0, length 64 

13:09:55.504669 xfrm1, IN: IP 172.71.29.66 > 172.64.240.252: ICMP echo request, id 60828, seq 0, length 64 
13:09:55.504695 xfrm1, OUT: IP 172.64.240.252 > 172.71.29.66: ICMP echo reply, id 60828, seq 0, length 64
```

## Verification of tunnel status on Sophos Firewall dashboard

### IPsec

When the tunnel is working, its **Status** will be green.

![If the tunnel is working, it will show up with a green status.](/magic-wan/static/sophos-firewall/2b-ipsec-tunnel.png)

The corresponding XFRM interface will also show a **Connected** status.

![The XFRM interface will also show a connected status.](/magic-wan/static/sophos-firewall/1-sd-wan-gateway.png)

### GRE

Access the CLI to check the status of a GRE tunnel. When the tunnel is working, its Status will show up as **Enabled**.

![The GRE tunnel will show a status of Enabled when working.](/magic-wan/static/sophos-firewall/gre-status-enabled.png)

![The GRE tunnel will show a status of Enabled when working.](/magic-wan/static/sophos-firewall/gre-status-enabled-b.png)

## Troubleshooting

If a tunnel shows a connected status at both ends, but is not established:

- Check if the IPsec profile configuration is correct.
- Make sure the corresponding tunnel interfaces are up.
- Make sure routing configuration and route precedence are correctly set on SFOS. 
- Make sure a static back route is added on Cloudflare.
- Make sure you have added a firewall rule for the specific zone and host or service in SFOS. GRE and IPsec belong to the VPN zone.
- Perform `tcpdump` to check if packets are going through the VPN or GRE tunnel as expected.
- Perform a packet capture on Cloudflare to see if traffic is reaching the Cloudflare platform.