---
order: 10
title: Firewall Considerations
---
# WARP with Firewall
If your organization utilizes a firewall or other policy to restrict internet traffic, you may need to make changes to allow WARP to connect.

## WARP Ingress IP
The Ingress IPs are the set of IP addresses that WARP Clients will connected to. All traffic from your device to the Cloudflare edge is done via these IP addresses:
- IPv4 Range: 162.159.192.0/24
- IPv6 Range: 2606:4700:d0::/48


<Aside>

**Ingress IP's changing**
In late May 2021 the ingress change for Cloudflare for Teams WARP Customers will change. The new range will be:

- IPv4 Range: 162.159.193.0/24
- IPv6 Range: 2606:4700:100::/48
</Aside>

## UDP Ports
WARP utilizes UDP for all of it's communication. UDP Port required for WARP: UDP 2408. 

## Creating firewall rules
If your organization does not currently allow Inbound/Outbound communication over the IP addresses and ports described above you must manually add an exception. The rule at a minimum needs to be scoped to the following process based on your platform:
- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`
- macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`
