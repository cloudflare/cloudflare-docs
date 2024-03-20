---
title: Choose a connection method
pcx_content_type: overview
weight: 1
layout: learning-unit
---

There are [multiple ways](/reference-architecture/architectures/sase/#connecting-networks) to onramp traffic from your private networks to Cloudflare. This page will focus on the two software-based methods that are commonly used for a VPN replacement use case: Cloudflare Tunnel via cloudflared and Cloudflare Tunnel via WARP Connector. Both of these methods involve installing lightweight software — either `cloudflared` or Cloudflare WARP — on a host machine in your network. The software creates a secure tunnel, called a Cloudflare Tunnel, to connect services and applications to Cloudflare’s global network.

## Cloudflare Tunnel via cloudflared

`cloudflared` is a daemon service that proxies traffic to internal applications or an entire private network. It only makes outbound connections, can be run on almost any infrastructure, and has a number of available options for server-side redundancy and steering.

## Cloudflare Tunnel via WARP Connector

WARP Connector is a more flexible and advanced option to connect your network traffic to Cloudflare. It operates a L3 proxy service on any Linux AMD64 machine that builds a Wireguard-encrypted tunnel to proxy traffic to Cloudflare. It is bidirectional and can be used to send traffic from user devices to your private network, to send traffic from your private networks to your user devices, or to proxy traffic between two or more private networks.

## Comparison table

|     | cloudflared | WARP Connector |
| --- | ------------- | -------------- |
| High availability and failover | ✅  | Coming soon |
| Bidirectional traffic |  ❌    |       ✅    |
| Source IP of request| `cloudflared` host machine | Virtual IP of requesting device |
| Host machine | Linux, macOS, Windows | AMD Linux |
| IPv4 | ✅ | ✅ |
| IPv6 |  ✅  | ❌  |
| OSI layer | L4 | L3 |
| Protocol | QUIC or HTTP/2 | WireGuard |

## Best practices

For VPN replacement and ZTNA use cases, [Cloudflared Tunnel via cloudflared](/learning-paths/replace-vpn/connect-private-network/cloudflared/) is our primary and recommended network on-ramp.

There are times when WARP Connector may be used as a secondary on-ramp. Consider [deploying WARP Connector](/learning-paths/replace-vpn/connect-private-network/warp-connector/) supplementally to deliver any sort of SIP or bidirectional connectivity relevant to your end users. This could include AD Group Policy updates, SCCM, SIP traffic, VoIP traffic, and any other bidirectional workflows such as DevOps pipeline updates.
