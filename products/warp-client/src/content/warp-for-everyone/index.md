---
order: 1
---

# WARP Client for everyone

Using 1.1.1.1 allows you to enjoy a private browsing experience. By combining 1.1.1.1 with WARP, you can ensure that all communication happening through your device is private.

Cloudflare WARP supports the following operational modes:

### WARP Modes

* **1.1.1.1** is the fastest and most private DNS directory you can configure for all your devices. It also allows you to add security to your internet connection, because it gives you the option to send your DNS requests over DNS-over-HTTPS or DNS-over-TLS. This will ensure nobody will be able to eavesdrop on you.

 Read more about 1.1.1.1 on our blog post [Announcing 1.1.1.1: the fastest, privacy-first consumer DNS service](https://blog.cloudflare.com/announcing-1111/) and [Introducing 1.1.1.1 for Families](https://blog.cloudflare.com/introducing-1-1-1-1-for-families/)


* **WARP.** The WARP application uses [BoringTun](https://blog.cloudflare.com/boringtun-userspace-wireguard-rust/) to encrypt all of the traffic from your device and send it directly to Cloudflare’s edge, ensuring that no one in between is snooping on what you're doing. If the site you are visiting is already a Cloudflare customer, the content is immediately sent down to your device. If they aren't on our network, we use our global network of data centers to devise the shortest path to whomever you are talking to.

 Read more about WARP in our blog post [Introducing WARP: Fixing Mobile Internet Performance and Security](https://blog.cloudflare.com/1111-warp-better-vpn/)

  <Aside>
 
 **WARP** does not provide anonymity. It is not designed to prevent servers you communicate with from identifying you, or to allow you to pretend to be accessing the Internet in a different country than you are currently in.

 </Aside>

* **WARP+.** While WARP is able to take advantage of the many Cloudflare data centers around the world to give you a more private and robust connection, WARP+ improves on that with intelligent routing. Leveraging the same technology that powers [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/), WARP+ will route your traffic around congested internet route and improve overall end to end performance.
 
 **WARP Unlimited** is our monthly subscription offering for WARP+. For the time being, WARP Unlimited can only be purchased via your iOS and Android device.


