---
order: 1
pcx-content-type: reference
---

# WARP modes

## 1.1.1.1

1.1.1.1 is Cloudflare’s public DNS resolver. It offers a fast and private way to browse the Internet. It also offers an encrypted service through DNS over HTTPS (DoH) or DNS over TLS (DoT) for increased security and privacy.

Read more about 1.1.1.1 on our blog post [Announcing 1.1.1.1: the fastest, privacy-first consumer DNS service](https://blog.cloudflare.com/announcing-1111/) and [Introducing 1.1.1.1 for Families](https://blog.cloudflare.com/introducing-1-1-1-1-for-families/)

## 1.1.1.1 with WARP

<Aside type='warning'>
 
 WARP does not provide anonymity. It is not designed to prevent servers you communicate with from identifying you, or to allow you to pretend to be accessing the Internet in a different country than you are currently in.

</Aside>

The WARP application uses [BoringTun](https://blog.cloudflare.com/boringtun-userspace-wireguard-rust/) to encrypt the traffic from your device and send it directly to Cloudflare’s edge. This ensures your connection is secure and private, and prevents third-parties from accessing your traffic. If the site you are visiting is already a Cloudflare customer, the content is immediately sent to your device. If not, Cloudflare uses our global network of data centers to devise the shortest path to the site.

Read more about WARP in our blog post [Introducing WARP: Fixing Mobile Internet Performance and Security](https://blog.cloudflare.com/1111-warp-better-vpn/).

## WARP via Local Proxy

<Aside type="note">
 
Currently available on desktop clients only.

</Aside>

When WARP is configured as a local proxy, only the applications that you configure to use the proxy (HTTPS or SOCKS5) will have their traffic sent through WARP. This allows you to pick and choose which traffic is encrypted — for instance, your web browser or a specific app. Everything else will not be encrypted and will be sent over a regular Internet connection.

Because this feature restricts WARP to just applications configured to use the local proxy, leaving all other traffic unencrypted over the Internet by default, we have hidden it in the **Advanced** menu. To turn it on:

1. Navigate to **Preferences** > **Advanced** and click **Configure Proxy**.
1. On the window that opens, check the box and configure the port you want to listen on.

This will enable the **WARP via Local Proxy** option in the **WARP Settings** menu.

## WARP+

While WARP is able to take advantage of the many Cloudflare data centers around the world to give you a more private and robust connection, WARP+ improves on that with intelligent routing. Leveraging the same technology that powers [Argo Smart Routing](https://www.cloudflare.com/products/argo-smart-routing/), WARP+ will route your traffic around congested Internet routes and improve overall end-to-end performance.
 
## WARP Unlimited

WARP Unlimited is our monthly subscription offering for WARP+. For the time being, WARP Unlimited can only be purchased via your iOS and Android devices.