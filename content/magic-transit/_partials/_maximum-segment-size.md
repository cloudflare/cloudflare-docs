---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: imgName;;productName;;mssValue
---

## Set maximum segment size

![Breakdown of packet maximum segment size as it moves through the workflow]($1)

The SYN-ACK packet sent to the client during TCP handshake encodes the value for maximum segment size (MSS). Egress packets are routed via your ISP interface, and each packet must comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.

Cloudflare uses tunnels to deliver packets from our global network to your data centers, while Cloudflare $2 encapsulates these packets, adding a new IP header and GRE protocol header.

$3

| Standard Internet Routable MTU                         | 1500 bytes  |
| ------------------------------------------------------ | ----------- |
| -	&nbsp;&nbsp;&nbsp; Original IP header                | 20 bytes    |
| - &nbsp;&nbsp;&nbsp; Original protocol header (TCP)    | 20 bytes    |
| -	&nbsp;&nbsp;&nbsp; New IP header                     | 20 bytes    |
| -	&nbsp;&nbsp;&nbsp; New protocol header (GRE)         | 4 bytes     |
| =	&nbsp;&nbsp;&nbsp; Maximum segment size (MSS)        | 1436 bytes  |

Unless you apply these MSS settings at the origin, client machines do not know that they must use an MSS of 1436 bytes when sending packets to your origin.