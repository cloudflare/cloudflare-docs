---
order: 1
hidden: true
---

# For everyone

You can choose to have a private browsing experience by utilize 1.1.1.1 to keep your DNS lookups safe, or combine 1.1.1.1 with WARP end ensure all communication is private.

Cloudflare WARP supports the following operational modes:

### WARP Modes

* **1.1.1.1** Since nearly everything you do on the Internet starts with a DNS request, choosing the fastest DNS directory across all your devices will accelerate almost everything you do online. Speed isn’t  everything though, and while the connection between your application and a website may be encrypted, DNS lookups for that website were not. This allowed anyone, even your Internet Service Provider, to potentially snoop (and sell) on where you are going on the Internet.

    Cloudflare will never snoop or sell your data that way. And if you use DNS-over-HTTPS or DNS-over-TLS to our 1.1.1.1 resolver, your DNS lookup request will be sent over a secure channel. This means that if you use the 1.1.1.1 resolver then in addition to our privacy guarantees an eavesdropper can’t see your DNS requests. We will never look at what you’re doing. Don’t take our word for it though, earlier this year we published the results of a 3rd party audit, something we’ll keep doing and wish others would do as well.

    Read more about 1.1.1.1 on our blog post [Announcing 1.1.1.1: the fastest, privacy-first consumer DNS service](https://blog.cloudflare.com/announcing-1111/) and [Introducing 1.1.1.1 for Families](https://blog.cloudflare.com/introducing-1-1-1-1-for-families/)


* **WARP** WARP was built on the philosophy that even people who don’t know what [V.P.N.](https://www.cloudflare.com/learning/access-management/what-is-a-vpn/) stands for should be able to still easily get the protection one offers. For those of us unfortunately very familiar with traditional corporate VPN’s, something better was needed. Enter our own Wireguard implementation called [BoringTun](https://blog.cloudflare.com/boringtun-userspace-wireguard-rust/).

    The WARP application uses BoringTun to encrypt all of the traffic from your device and send it directly  to Cloudflare’s edge,ensuring that no one in between is snooping on what you're doing. If the site you are visiting is already a Cloudflare customer, the content is immediately sent down to your device. If they aren't on our network, we use our global network of data centers  to devise  the shortest path to whomever you are talking to.

    WARP does not provide anonymity however, it is not designed to prevent servers you communicate with from identifying you, or to allow you to pretend to be accessing the Internet in a different country than you are currently in.

    Read more about WARP in our blog post [Introducing WARP: Fixing Mobile Internet Performance and Security](https://blog.cloudflare.com/1111-warp-better-vpn/)

* **WARP+** While WARP is able to take advantage of the many Cloudflare data centers around the world to give you a more private and robust connection, WARP+ improves on that with intelligent routing. Leveraging the same technology that powers [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/), WARP+ will route your traffic around congested internet route and improve overall end to end performance.
    * **WARP Unlimited** is our monthly subscription offering for WARP+. Note WARP Unlimited can only be purchased via your iOS and Android device for the time being.


<ButtonGroup>
  <Button type="primary" href="test.com">1.1.1.1</Button>
  <Button type="primary" href="">WARP</Button>
  <Button type="primary" href="">WARP+</Button>
</ButtonGroup>