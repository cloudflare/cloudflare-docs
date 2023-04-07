---
title: Use Zero Trust with DLS
pcx_content_type: how-to
weight: 1
---

# Use Zero Trust with Data Localization Suite

In the following sections, we will give you some details about how different Zero Trust products can be used with the Data Localization Suite.

## Gateway

Regional Services can be used with Gateway in all [supported regions](/data-localization/). Be aware that Regional Services only apply when using the WARP client in Gateway with WARP mode.

### Egress policies

Enterprise customers can purchase a [dedicated egress IP](/cloudflare-one/policies/filtering/egress-policies/dedicated-egress-ips/) (IPv4 and IPv6) or range of IPs geolocated to one or more Cloudflare network locations.
This allows your egress traffic to geolocate to the city selected in your [egress policies](/cloudflare-one/policies/filtering/egress-policies/).

### HTTP policies

As part of Regional Services, Cloudflare Gateway will only perform [TLS decryption](/cloudflare-one/policies/filtering/http-policies/tls-decryption/) when using the [WARP client](/cloudflare-one/connections/connect-devices/warp/) (in default [Gateway with WARP mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/)).

#### Data Loss Prevention (DLP) 

You are able to [log the payload of matched DLP rules](/cloudflare-one/policies/data-loss-prevention/dlp-policies/payload-logging/) and encrypt them with your public key so that only you can examine them later.

[Cloudflare cannot decrypt encrypted payloads](/cloudflare-one/policies/data-loss-prevention/dlp-policies/payload-logging/#data-privacy).

### Network policies

You are able to [configure SSH proxy and command logs](/cloudflare-one/policies/filtering/network-policies/ssh-logging/). Generate a Hybrid Public Key Encryption (HPKE) key pair and upload the public key `sshkey.pub` to your dashboard. All proxied SSH commands are immediately encrypted using this public key. The matching private key – which is in your possession – is required to view logs.

### DNS policies

Note that due to the nature of Cloudflare's anycast network, Gateway DNS traffic cannot yet be localized using the Data Localization Suite. 

Refer to the [WARP Settings](/data-localization/how-to/zero-trust/#warp-settings) section below for more information.

### Custom certificates

You can [bring your own certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/) to Gateway but these cannot yet be restricted to a specific region.

### Logs and Analytics

By default, Cloudflare will store and deliver logs from data centers across our global edge network. To maintain regional control over your data, you can use [Customer Metadata Boundary](/data-localization/metadata-boundary/) and restrict data storage to a specific geographic region. 

 | | Customer Metadata Boundary for US | Customer Metadata Boundary for EU
 ---- | ---- | ----
 Gateway DNS | ✅ All logs available | ✘ All logs sent to US
 Gateway HTTP | ✅ All logs available | ✅ Logpush can be used from EU <br> 🚧 Logs and Analytics in the dashboard not yet available
 Gateway Network | ✅ Log region can be configured to US | ✅ Logpush can be used from EU <br> 🚧 Logs and Analytics in the dashboard not yet available

Customers also have the option to reduce the logs that Cloudflare stores:
- You can [exclude PII from logs](/cloudflare-one/analytics/logs/gateway-logs/manage-pii/) 
- You can [disable logging, or only log blocked requests](/cloudflare-one/analytics/logs/gateway-logs/#selective-logging).

## Access 

To ensure that all reverse proxy requests for applications protected by Cloudflare Access will only occur in FedRAMP-compliant data centers, you should use [Regional Services](/data-localization/regional-services/get-started/) with the region set to FedRAMP.

## Cloudflare Tunnel

You can [configure Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/#region) to only connect to data centers within the United States, regardless of where the software was deployed.

## WARP settings

### Local Domain Fallback

You can use the WARP setting [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) in order to use a private DNS resolver, which you can manage yourself.

### Split Tunnels

[Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) allow you to decide which IP addresses/ranges and/or domains are routed through or excluded from Cloudflare.

{{<Aside type="warning">}}
Gateway policies will not apply for excluded traffic.
{{</Aside>}}