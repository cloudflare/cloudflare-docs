---
order: 10
pcx-content-type: reference
---

# WARP with Firewall

If your organization uses a firewall or other policies to restrict Internet traffic, you may need to make a few changes to allow WARP to connect.

## Client Orchestration API
The WARP client talks with our edge outside the tunnel for operations like registration or settings changes. To perform these operations, you must allow this IPv4 address:

 - IPv4 API Endpoint: `162.159.192.1`

<Aside> 
  The Orchestration API endpoint is currently shared with our Consumer WARP Client. In early 2022 we will be splitting this out to its own dedicated IP address.
</Aside>

## WARP Ingress IP
These are the IP addresses that the WARP client will connect to. All traffic from your device to the Cloudflare edge will go through these IP addresses.
- IPv4 Range: `162.159.193.0/24`
- IPv6 Range: `2606:4700:100::/48`

## UDP Ports
WARP utilizes UDP for all of its communications. By default, the UDP Port required for WARP is: UDP 2408. WARP can fallback to: UDP 500, UDP 1701, or UDP 4500.

## Creating firewall rules
If your organization does not currently allow Inbound/Outbound communication over the IP addresses and ports described above you must manually add an exception. The rule at a minimum needs to be scoped to the following process based on your platform:
- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`
- macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`
