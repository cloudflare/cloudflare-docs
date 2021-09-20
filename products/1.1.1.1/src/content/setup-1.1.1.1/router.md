---
order:
pcx-content-type: how-to
---

# Router

Follow these steps to configure 1.1.1.1:

1. Go to the **IP address** used to access your router's admin console in your browser.

   - Linksys and Asus routers typically use [http://192.168.1.1](http://192.168.1.1)
   - Netgear routers typically use [http://192.168.0.1](http://192.168.0.1) or [http://192.168.1.1](http://192.168.1.1)
   - D-Link routers typically use [http://192.168.0.1](http://192.168.0.1)
   - Ubiquiti routers typically use [http://unifi.ubnt.com](http://unifi.ubnt.com)

1. Enter the router password.
1. Find the place in the admin console where **DNS settings** are set.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Replace the existing addresses with:

    ```txt
    1.1.1.1
    1.0.0.1
    2606:4700:4700::1111
    2606:4700:4700::1001
    ```

1. Save the updated settings.

## Using DNS-Over-TLS on OpenWRT

It is possible to encrypt DNS traffic out from your router using DNS-over-TLS if it is running OpenWRT. For more details, see our blog post on the topic: [Adding DNS-Over-TLS support to OpenWRT (LEDE) with Unbound](https://blog.cloudflare.com/dns-over-tls-for-openwrt/).


## FRITZ!Box

Starting with [FRITZ!OS 7.20](https://en.avm.de/press/press-releases/2020/07/fritzos-720-more-performance-convenience-security/), DNS over TLS is supported, see [Configuring different DNS servers in the FRITZ!Box](https://en.avm.de/service/knowledge-base/dok/FRITZ-Box-7590/165_Configuring-different-DNS-servers-in-the-FRITZ-Box/).