---
weight: 10
pcx_content_type: how-to
title: Router
meta:
    title: Set up 1.1.1.1 on a router
---

# Set up 1.1.1.1 - Router

1. Go to the **IP address** used to access your router's admin console in your browser.
    * Linksys and Asus routers typically use `http://192.168.1.1` or `http://router.asus.com` (for ASUS).
    * Netgear routers typically use `http://192.168.1.1` or `http://routerlogin.net`.
    * D-Link routers typically use `http://192.168.0.1`.
    * Ubiquiti routers typically use `http://unifi.ubnt.com`.

2. Enter the router credentials. For consumer routers, the default credentials for the admin console are often found under or behind the device.
3. In the admin console, find the place where **DNS settings** are set. This may be contained within categories such as **WAN** and **IPv6** (Asus Routers) or **Internet** (Netgear Routers). Consult your router's documentation for details.
4. Take note of any DNS addresses that are currently set and save them in a safe place in case you need to use them later.
5. {{<render file="_all-ipv4.md">}}
6. {{<render file="_all-ipv6.md">}}
7. Save the updated settings.

## Using DNS-Over-TLS on OpenWRT

It is possible to encrypt DNS traffic out from your router using DNS-over-TLS if it is running OpenWRT. For more details, see our blog post on the topic: [Adding DNS-Over-TLS support to OpenWRT (LEDE) with Unbound](https://blog.cloudflare.com/dns-over-tls-for-openwrt/).

## FRITZ!Box

Starting with [FRITZ!OS 7.20](https://en.avm.de/press/press-releases/2020/07/fritzos-720-more-performance-convenience-security/), DNS over TLS is supported, see [Configuring different DNS servers in the FRITZ!Box](https://en.avm.de/service/knowledge-base/dok/FRITZ-Box-7590/165_Configuring-different-DNS-servers-in-the-FRITZ-Box/).