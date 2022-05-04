---
title: Prerequisites
pcx-content-type: tutorial
weight: 3
---

# Prerequisites

Before you can begin using Magic Transit, verify that you meet Cloudflare's onboarding requirements.

## Verify router compatibility

Magic Transit relies on Generic Routing Encapsulation (GRE) tunnels to transmit packets from Cloudflare’s edge to your origin network.

The routers at your GRE tunnel endpoints must meet the following requirements to ensure compatibility with Magic Transit.

- Support GRE tunneling.
- Allow configuration of at least one tunnel per Internet service provider (ISP).
- Support maximum segment size (MSS) clamping.

## Draft Letter of Authorization

Draft a [Letter of Authorization (LOA)](/byoip/about/loa/) that identifies the prefixes you want to advertise and gives Cloudflare permission to announce them. The LOA is required by Cloudflare's transit providers so they can accept the routes Cloudflare advertises on your behalf. See this [LOA template](/byoip/about/loa/) for an example.

If you are using a Cloudflare IP, you do not need to submit an LOA.

{{<Aside type="note" header="Note">}}

The Letter of Authorization must be a PDF. Transit providers may reject the LOA if it is a JPG or PNG.

{{</Aside>}}

## Verify IRR entries

Verify your Internet Routing Registry (IRR) entries match corresponding origin autonomous system numbers (ASNs) to ensure Magic Transit routes traffic to the correct autonomous systems (AS). For guidance, refer to [Verify IRR entries](/byoip/how-to/verify-irr-entries/).

If you are using a Cloudflare IP, you do not need to verify your IRR entries.

## Set maximum segment size

![Breakdown of packet maximum segment size as it moves through Magic Transit workflow](/magic-transit/static/mss-values-and-packet.png)

The SYN-ACK packet sent to the client during TCP handshake encodes the value for maximum segment size (MSS). Egress packets are routed via your ISP interface, and each packet must comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.

Cloudflare uses GRE tunnels to deliver packets from our edge to your data centers, while Cloudflare Magic Transit encapsulates these packets, adding a new IP header and GRE protocol header.

You must set the MSS value to 1436 bytes at your physical egress interfaces — not the GRE tunnel interfaces — to accommodate the additional header data. For Magic Transit egress traffic, the MSS should be set via the tunnel’s interface for egress traffic.

{{<Aside type="warning" header="Important">}}

If you are using IPsec inside GRE, set the MSS clamp at the IPsec tunnel interface and subtract 24 bytes from your current MSS value, which may be 1360 bytes or lower. This is because the physical interface will see IPsec-encrypted packets, not TCP packets, and MSS clamping will not apply to those.

{{</Aside>}}

| Standard Internet Routable MTU                         | 1500 bytes  |
| ------------------------------------------------------ | ----------- |
| -	&nbsp;&nbsp;&nbsp; Original IP header                | 20 bytes    |
| - &nbsp;&nbsp;&nbsp; Original protocol header (TCP)    | 20 bytes    |
| -	&nbsp;&nbsp;&nbsp; New IP header                     | 20 bytes    |
| -	&nbsp;&nbsp;&nbsp; New protocol header (GRE)         | 4 bytes     |
| =	&nbsp;&nbsp;&nbsp; Maximum segment size (MSS)        | 1436 bytes  |

Unless you apply these MSS settings at the origin, client machines do not know that they must use an MSS of 1436 bytes when sending packets to your origin.

### Clear Don't Fragment (DF)

If you are unable to set the MSS on your physical interfaces to a value lower than 1500 bytes, you can choose to clear the `don't-fragment` bit in the IP header. When this option is enabled, Cloudflare fragments packets greater than 1500 bytes, and the packets are reassembled on your infrastructure after decapsulation. In most environments, enabling this option does not have significant impact on traffic throughput.

To enable this option for your network, contact your account team.

## Apply MSS clamps

Instructions to adjust MSS by applying MSS clamps vary depending on the vendor of your router.

The following table lists several commonly used router vendors with links to MSS clamping instructions:

| Router device | URL  |
| ------------- | ---- |
| Cisco         | [TC IP Adjust MSS](https://www.cisco.com/en/US/docs/ios-xml/ios/ipapp/command/ip_tcp_adjust-mss_through_ip_wccp_web-cache_accelerated.html#GUID-68044D35-A53E-42C1-A7AB-9236333DA8C4) |
| Juniper       | [TCP MSS – Edit System](https://www.juniper.net/documentation/en_US/junos/topics/reference/configuration-statement/tcp-mss-edit-system.html)                                          |

## Verify MSS settings at your origin

Run the following command on the servers egressing the prefixes you want to add to Magic Transit to verify that your routers have the correct MSS setting (1436 bytes) at your origin.

```sh
$ curl 167.71.125.57:8080
```

You should see the following result:

```txt
Local: 167.71.125.57:8080
Remote: 172.68.141.62:44108
Local MSS: 1436
Remote MSS: 1436
```

{{<Aside type="warning" header="Important">}}

If you do not have a publicly available TCP endpoint Cloudflare can use to verify your MSS settings, you must provide a screenshot of the cURL command results, similar to the one above.

{{</Aside>}}
