---
pcx_content_type: reference
title: WARP with firewall
weight: 9
---

# WARP with firewall

If your organization uses a firewall or other policies to restrict or intercept Internet traffic, you may need to exempt the following IP addresses and domains to allow the WARP client to connect.

## Client orchestration API

The WARP client talks with our edge via a standard HTTPS connection outside the tunnel for operations like registration or settings changes. To perform these operations, you must allow `zero-trust-client.cloudflareclient.com` which will lookup the following IP addresses:

- IPv4 API Endpoint: `162.159.137.105` and `162.159.138.105`
- IPv6 API Endpoint: `2606:4700:7::a29f:8969` and `2606:4700:7::a29f:8a69`

## DoH IP

All DNS requests through WARP are sent outside the tunnel via DoH (DNS over HTTPS). The following IP addresses must be reachable for DNS to work correctly.

- IPv4 DoH Address: `162.159.36.1`
- IPv6 DoH Address: `2606:4700:4700::1111`

## WARP ingress IP

These are the IP addresses that the WARP client will connect to. All traffic from your device to the Cloudflare edge will go through these IP addresses.

- IPv4 Range: `162.159.193.0/24`
- IPv6 Range: `2606:4700:100::/48`

### WARP UDP ports

WARP utilizes UDP for all of its communications. By default, the UDP port required for WARP is `UDP 2408`. WARP can fallback to `UDP 500`, `UDP 1701`, or `UDP 4500`.

## Creating firewall rules

If your organization does not currently allow inbound/outbound communication over the IP addresses and ports described above, you must manually add an exception. The rule at a minimum needs to be scoped to the following process based on your platform:

- Windows: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`
- macOS: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`

## Captive portal

The following domains are used as part of our captive portal check:

- `cloudflareportal.com`
- `cloudflareok.com`
- `cloudflarecp.com`

## Connectivity check

As part of establishing the WARP connection, the client will check the following URLs to validate a successful connection:

- `engage.cloudflareclient.com` applies to routes excluded from WARP in your Split Tunnel configuration.
- `connectivity.cloudflareclient.com` applies to routes included in WARP in your Split Tunnel configuration.

## NEL reporting

While not required for the WARP client to function, we will report connectivity issues to our NEL endpoint via `a.nel.cloudflare.com`. This is not technically required to operate but will result in errors in our logs if not excluded properly.
