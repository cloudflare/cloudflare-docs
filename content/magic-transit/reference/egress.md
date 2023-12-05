---
pcx_content_type: concept
title: Egress traffic
---

# Magic Transit egress traffic

If you have implemented Magic Transit with egress traffic, below is a list of technical aspects you need to consider to create a successful connection to Cloudflare.

- The source IP for packets you send to Cloudflare in the egress direction must be sourced from your Magic Transit prefix. If you are a customer with Magic Transit [leased IPs](/magic-transit/cloudflare-ips/) or a customer with [BYOIP](/byoip/) prefixes, you can choose whether to implement a NAT on your edge device, or use the prefix as a routed LAN interface on your side.
- Cloudflare recommends that you create policy-based routing (PBR) rules to ensure that only traffic sourced from your BYOIP prefixes or Magic Transit leased IP addresses is sent via your GRE/IPsec tunnels to Cloudflare for egress to the Internet. Cloudflare will only accept egress traffic sourced from authorized prefixes. As such, your PBR policies need to align with this.
If implementing PBR is not feasible and you need to implement a default-route via the Magic Transit tunnels, ensure the routes for your tunnel destination Anycast IP's are routed via your underlay transit path.
- You need a tunnel failure detection mechanism to re-route your PBR traffic. This is to ensure packets are re-routed if there is a failure in the upstream channel to Cloudflare. For example, you might configure your device to ping the other side of the tunnel or send a probe to an Internet website. When the probe returns with a failure response, you want your device to deprecate the PBR forwarding-path, and switch to a backup tunnel. Refer to your equipment's configuration guide to learn how to implement this.
- You may need to configure multiple GRE/IPsec tunnels as a way to load-share traffic sent to the Internet via Cloudflare. You can achieve this by applying two different PBR. Thus, traffic sourced from one IP/subnet is routed via one tunnel, and traffic from another IP/subnet is sent out via a different tunnel.
- Your Magic Firewall rules will apply in both directions. Ensure that your Magic Firewall rules are set up for your intended traffic flows, both in and out.
- If using Magic Transit egress then we recommend you set your GRE or IPSEC tunnel health check configuration to [bidirectional](/magic-transit/how-to/configure-tunnels/#add-tunnels), so that Cloudflare health checks are in-sync with the [data plane](https://en.wikipedia.org/wiki/Forwarding_plane) traffic flow.

