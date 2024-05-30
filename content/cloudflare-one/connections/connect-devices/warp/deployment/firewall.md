---
pcx_content_type: reference
title: WARP with firewall
weight: 9
---

# WARP with firewall

If your organization uses a firewall or other policies to restrict or intercept Internet traffic, you may need to exempt the following IP addresses and domains to allow the WARP client to connect.

## Client orchestration API

The WARP client connects to Cloudflare via a standard HTTPS connection outside the tunnel for operations like registration or settings changes. To perform these operations, you must allow `zero-trust-client.cloudflareclient.com` which will lookup the following IP addresses:

{{<render file="warp/_client-orchestration-ips.md">}}

## DoH IP

All DNS requests through WARP are sent outside the tunnel via DoH (DNS over HTTPS). The following IP addresses must be reachable for DNS to work correctly.

{{<render file="warp/_doh-ips.md">}}

### Android devices

If you are deploying the Cloudflare One Agent on Android/ChromeOS, you must also add `cloudflare-dns.com` to your firewall exception list. On Android/ChromeOS devices, WARP uses `cloudflare-dns.com` to resolve domains on your [Split Tunnel list](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#domain-based-split-tunnels).

## Client authentication endpoint

When you [log in to your Zero Trust organization](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/), you will have to complete the authentication steps required by your organization in the browser window that opens. To perform these operations, you must allow the following domains:

- The IdP used to authenticate to Cloudflare Zero Trust
- `<your-team-name>.cloudflareaccess.com`

## WARP ingress IP

These are the IP addresses that the WARP client will connect to. All traffic from your device to the Cloudflare edge will go through these IP addresses.

- IPv4 Range: `162.159.193.0/24`
- IPv6 Range: `2606:4700:100::/48`

{{<Aside type="note">}}
Before you [log in to your Zero Trust organization](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/), you may see the IPv4 range `162.159.192.0/24`. This IP is used for consumer WARP services ([1.1.1.1 w/ WARP](/warp-client/)) and is not required for Zero Trust deployments.
{{</Aside>}}

### WARP UDP ports

WARP utilizes UDP for all of its communications. By default, the UDP port required for WARP is `UDP 2408`. WARP can fallback to `UDP 500`, `UDP 1701`, or `UDP 4500`.

## Captive portal

The following domains are used as part of our captive portal check:

- `cloudflareportal.com`
- `cloudflareok.com`
- `cloudflarecp.com`

## Connectivity check

As part of establishing the WARP connection, the client will check the following HTTPS URLs to validate a successful connection:

- `engage.cloudflareclient.com` verifies general Internet connectivity outside of the WARP tunnel. These requests are always sent directly to an IP in the [WARP ingress IPv4 or IPv6 range](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#warp-ingress-ip) (or to your [`override_warp_endpoint`](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/#override_warp_endpoint) if set). Requests will not use a proxy server, even if one is configured for the system.

- `connectivity.cloudflareclient.com` verifies connectivity inside of the WARP tunnel. Because this check happens inside of the tunnel, you do not need to add `connectivity.cloudflareclient.com` to your firewall allowlist.

## NEL reporting

While not required for the WARP client to function, we will report connectivity issues to our NEL endpoint via `a.nel.cloudflare.com`. This is not technically required to operate but will result in errors in our logs if not excluded properly.

## Scope of firewall rules

### Required scopes

If your organization does not currently allow inbound/outbound communication over the IP addresses, ports, and domains described above, you must manually add an exception. The rule at a minimum needs to be scoped to the following process based on your platform:

- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`
- macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`

### Optional scopes

#### DEX tests

To run [Digital Experience Monitoring tests](/cloudflare-one/insights/dex/tests/), you will need to allow the `warp-dex` process to generate network traffic to your target destinations:

- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-dex.exe`
- macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/warp-dex`

#### WARP network statistics

To use the network connectivity tests built into the WARP GUI, you will need to allow the GUI application to generate network traffic:

- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\Cloudflare WARP.exe`
- macOS: `/Applications/Cloudflare WARP.app`
