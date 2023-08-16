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

 [!](/images/magic-wan/third-party/fortinet/edit-ipsec-tunnel-01.png)
