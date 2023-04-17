---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4408869845261-Troubleshooting-for-BYOIP
title: Troubleshooting for BYOIP
---

# Troubleshooting for BYOIP



## uRPF filtering and packet loss

Routers receive IP packets and forward the packets to the destination IP address. Unicast Reverse Path Forwarding (uRPF) is a security feature that can prevent spoofing attacks. uRPF operates under two modes: strict and loose mode.

Under strict mode, the router performs two checks on incoming packets to look for a matching entry in the source routing table and to determine whether the interface that received the packet can be used to reach the source. If the incoming IP packets pass both checks, the packets are forwarded; if the checks do not pass, the packets are dropped.

When uRPF is set to loose mode, the router performs a single check when it receives an IP packet to look for a source's matching entry in the routing table.

If you are experiencing packet loss as a result of an upstream ISP implementing uRPF filtering, contact your ISP and request the link be set to **loose mode**.
