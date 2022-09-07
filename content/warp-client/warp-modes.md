---
pcx_content_type: reference
title: WARP modes
weight: 2
---

# WARP modes

The WARP client has several modes to better suit different connection needs.

## 1.1.1.1

1.1.1.1 is Cloudflare’s public DNS resolver. It offers a fast and private way to browse the Internet. It also offers a DNS encryption service through DNS over HTTPS (DoH) or DNS over TLS (DoT) for increased security and privacy.

Refer to [1.1.1.1 resolver](/1.1.1.1/encryption/) to learn more about DNS encryption.

## 1.1.1.1 with WARP

The WARP application uses [BoringTun](https://blog.cloudflare.com/boringtun-userspace-wireguard-rust/) to encrypt and secure the traffic from your device, and send it directly to Cloudflare’s edge network. This ensures Internet traffic between your device and the Internet is secure and private, while also preventing third parties from accessing your traffic. If the site you are visiting is already a Cloudflare customer, the content is immediately sent to your device. If not, Cloudflare uses its global network of data centers to devise the shortest path to the site.

Read more about WARP in our blog post [Introducing WARP: Fixing Mobile Internet Performance and Security](https://blog.cloudflare.com/1111-warp-better-vpn/).

{{<Aside type="warning" header="Warning">}}

WARP does not provide anonymity and is not designed to prevent servers you communicate with from identifying you. WARP also does not allow you to pretend to be accessing the Internet from a different country than the one you are currently in.

{{</Aside>}}

## WARP via Local Proxy

Currently, this mode is available on desktop clients only. When WARP is configured as a local proxy, only the applications that you configure to use the proxy (HTTPS or SOCKS5) will have their traffic sent through WARP. This allows you to pick and choose which traffic is encrypted — for example, your web browser or a specific application. Everything else will not be encrypted and will be sent over a regular Internet connection.

Because this feature restricts WARP to just applications configured to use the local proxy, leaving all other traffic over the Internet unencrypted by default, we have hidden it in the **Advanced** menu. To turn it on:

1. Navigate to **Preferences** > **Advanced** and select **Configure Proxy**.
2. On the window that opens, check the box and configure the port you want to listen on.

This will enable the **WARP via Local Proxy** option in the **WARP Settings** menu.

## WARP+

While WARP is able to take advantage of the many Cloudflare data centers around the world to give you a more private and robust connection, WARP+ subscribers get access to a larger network. More cities to connect to means you are likely to be closer to a Cloudflare data center – which can reduce the latency between your device and Cloudflare, and improve your browsing speed. As a result, sites load faster, both for those on the Cloudflare network and those that are not.

## WARP Unlimited

WARP Unlimited is our monthly subscription offering for WARP+. Currently, WARP Unlimited can only be purchased via iOS and Android devices.
