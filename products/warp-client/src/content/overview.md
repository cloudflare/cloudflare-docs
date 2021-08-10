---
title: Overview
order: 1
---

Cloudflare WARP supports the following services depending on how you configure it.

### WARP Modes

### 1.1.1.1

**1.1.1.1** is the fastest and most private DNS directory you can configure for all your devices. It also allows you to add security to your internet connection, because it gives you the option to send your DNS requests over DNS-over-HTTPS or DNS-over-TLS. This will ensure nobody will be able to eavesdrop on you.

 Read more about 1.1.1.1 on our blog post [Announcing 1.1.1.1: the fastest, privacy-first consumer DNS service](https://blog.cloudflare.com/announcing-1111/) and [Introducing 1.1.1.1 for Families](https://blog.cloudflare.com/introducing-1-1-1-1-for-families/)

### 1.1.1.1 with WARP

<Aside type='note'>
 
 **WARP** does not provide anonymity. It is not designed to prevent servers you communicate with from identifying you, or to allow you to pretend to be accessing the Internet in a different country than you are currently in.

</Aside>

**WARP.** The WARP application uses [BoringTun](https://blog.cloudflare.com/boringtun-userspace-wireguard-rust/) to encrypt all of the traffic from your device and send it directly to Cloudflare’s edge, ensuring that no one in between is snooping on what you are doing. If the site you are visiting is already a Cloudflare customer, the content is immediately sent down to your device. If they are not on our network, we use our global network of data centers to devise the shortest path to whomever you are talking to.

 Read more about WARP in our blog post [Introducing WARP: Fixing Mobile Internet Performance and Security](https://blog.cloudflare.com/1111-warp-better-vpn/)

### WARP via Local Proxy

<Aside>
 
 Currently available on desktop clients only.

</Aside>

When WARP is configured as a local proxy, only the applications that you configure to use the proxy (HTTPS or SOCKS5) will have their traffic sent through WARP. This allows you to pick and choose which traffic is encrypted (for instance, your web browser or a specific app), and everything else will be left open over the Internet.

Because this feature restricts WARP to just applications configured to use the local proxy, leaving all other traffic unencrypted over the Internet by default, we have hidden it in the Advanced menu. To turn it on:

1. Navigate to **Preferences** > **Advanced** and click **Configure Proxy**.
1. On the dialog that opens, check the box and configure the port you want to listen on.
1. This will enable the **WARP via Local Proxy** option in the WARP Settings menu.

### WARP+

While WARP is able to take advantage of the many Cloudflare data centers around the world to give you a more private and robust connection, WARP+ improves on that with intelligent routing. Leveraging the same technology that powers [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/), WARP+ will route your traffic around congested Internet route and improve overall end to end performance.
 
 **WARP Unlimited** is our monthly subscription offering for WARP+. For the time being, WARP Unlimited can only be purchased via your iOS and Android device.
