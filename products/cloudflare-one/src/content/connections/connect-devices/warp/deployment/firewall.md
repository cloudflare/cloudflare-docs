---
order: 10
---
# WARP with Firewall
If your organization uses a firewall or other policies to restrict Internet traffic, you may need to make a few changes to allow WARP to connect.

## WARP Ingress IP
These are the IP addresses that the WARP client will connect to. All traffic from your device to the Cloudflare edge will go through these IP addresses.
- IPv4 Range: 162.159.192.0/24
- IPv6 Range: 2606:4700:d0::/48


<Aside>

**Ingress IP's changing**
In late May 2021 the ingress change for Cloudflare for Teams WARP Customers will change. The new range will be 162.159.193.0/24 and 2606:4700:100::/48

</Aside>

## UDP Ports
WARP utilizes UDP for all of its communications. UDP Port required for WARP: UDP 2408. 

## Creating firewall rules
If your organization does not currently allow Inbound/Outbound communication over the IP addresses and ports described above you must manually add an exception. The rule at a minimum needs to be scoped to the following process based on your platform:
- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`
- macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`
