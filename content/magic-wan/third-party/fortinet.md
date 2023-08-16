---
pcx_content_type: integration-guide
title: Fortinet
---

# Fortinet

This tutorial provides information and examples of how to configure Cloudflare Magic WAN with IPsec tunnels in conjunction with Fortinet FortiGate firewalls.

The FortiGate configuration settings presented here support bidirectional health checks as required by Cloudflare Magic WAN. However, they do not factor in any other traffic flows outside of the tunnel health checks. The configuration may need to be adjusted based on your current FortiGate configuration.

## Testing Environment

The FortiGate configuration was tested on two different FortiGate firewalls:

- FortiGate Virtual Appliance
    - Version 7.0.8
    - Running on VMware ESXi 6.5

- FortiGate FG80F
    - Version 7.0.12

## Magic WAN configuration

The first step to setting up Magic WAN is to add Magic WAN IPsec tunnels and Magic static routes to your Cloudflare account via the dashboard or API.

Before proceeding, ensure that you have the Anycast IPs associated with your account. Check with your Cloudflare account team if you do not yet have them.

### Magic IPsec Tunnels

Cloudflare recommends customers configure two Magic IPsec tunnels per firewall/router — one to each of the two Anycast IP addresses.

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to  to **Magic WAN** > **Manage Magic WAN Configuration** > **Configure**.
3. From the **Tunnels** tab, select **Create**.
4. For the first IPsec tunnel, ensure the following settings are defined (refer to [Add tunnels](/magic-wan/get-started/configure-tunnels/#add-tunnels) to learn about settings not mentioned here):
    - **Customer Endpoint**: Enter your external/egress interface of the firewall.
    - **Cloudflare Endpoint**: Enter the first of your two Anycast IPs (typically begins with `162.x.x.x`).
    - **Health check rate**: _Low_.
    - **Health check type**: _Reply_.
    - **Health check target**: _Custom_.
    - **Target address**: The target address for the first tunnel is always `172.64.240.253`.
    - **Pre-shared key**: Enter your own key or allow Cloudflare to define the key. Refer to [Add IPsec tunnel](https://developers.cloudflare.com/magic-wan/get-started/configure-tunnels/#add-tunnels) for more information.

    ![The first IPsec tunnel should have the values mentioned above.](/images/magic-wan/third-party/fortinet/edit-ipsec-tunnel-01.png)

 5. For the second tunnel, make the same changes as you did for the first tunnel, and ensure the following additional settings are defined:
    - **Cloudflare Endpoint**: Enter the second of your two Anycast IPs (typically begins with `172.x.x.x`).
    - **Health check target**: _Custom_.
    - **Target address**: `172.64.240.254`.
    - **Pre-shared key**: Enter your own key or allow Cloudflare to define the key. Refer to [Add IPsec tunnel](https://developers.cloudflare.com/magic-wan/get-started/configure-tunnels/#add-tunnels) for more information.

    ![The second IPsec tunnel should have all the values mentioned for the first tunnel, as well as the ones mentioned in the step above.](/images/magic-wan/third-party/fortinet/edit-ipsec-tunnel-01.png)

### Magic static routes

Add two Magic static routes to define the IP address space that exists behind the Magic IPsec tunnels — one to each of the two Magic IPsec tunnels defined in the previous section.

By default, the Magic static routes are defined with the Priority set to `100`. Cloudflare leverages [Equal Cost Multipath Routing (ECMP)](/magic-wan/reference/traffic-steering/#equal-cost-multi-path-routing) and will load balance the traffic equally across the two tunnels. If you prefer to use an Active/Passive model, you can leave the default value for the first route set to `100`, and set the value for the second tunnel to `150` (higher value is a lower priority).

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Manage Magic WAN Configuration** > **Configure**.
3. Go to **Static Routes** > **Create**.
4. For the first route, ensure the following settings are defined (refer to [Configure static routes](/magic-wan/get-started/configure-static-routes/) to learn about settings not mentioned here):
    - **Prefix**: Specify the RFC1918 subnet that exists behind the first Magic IPsec tunnel you have defined in the previous section.
    - **Tunnel/Next hop**: Select your first tunnel (Tunnel 01 of 02).
    - **Priority**: Leave the default value (`100`).
    - **Weight**: Leave empty.
    - **Region code**: Leave this set to `All Regions`.

    ![The first static route should have the values mentioned above.](/images/magic-wan/third-party/fortinet/edit-static-route-01.png)

5. For the second route, ensure the following settings are defined:
    - **Prefix**: Specify the RFC1918 subnet that exists behind the second Magic IPsec tunnel defined in the previous section.
    - **Tunnel/Next hop**: Select your second tunnel (Tunnel 02 of 02).
    - **Priority**:  Leave the default value (`100`).
    - **Weight**: Leave empty.
    - **Region code**: Leave this set to `All Regions`.

    ![The second static route should have the values mentioned above.](/images/magic-wan/third-party/fortinet/edit-static-route-02.png)

## Fortinet FortiGate configuration

### Enable Asymmetric Routing

To ensure health checks work as expected, enable asymmetric routing for ICMP. This option is required. Otherwise, the tunnel health checks which are critical for proper Magic WAN functionality will not work as designed.

Note that enabling asymmetric routing will affect FortiGate behavior. To learn more, refer to [How FortiGate behaves when asymmetric routing is enabled](https://community.fortinet.com/t5/FortiGate/Technical-Note-How-the-FortiGate-behaves-when-asymmetric-routing/ta-p/198575).

```bash
config system settings
    set asymroute-icmp enable
end
```