---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;mssValue
---

The SYN-ACK packet sent to the client during TCP handshake encodes the value for maximum segment size (MSS). Egress packets are routed via your ISP interface, and each packet must comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.

Cloudflare uses tunnels to deliver packets from our global network to your data centers, while Cloudflare $1 encapsulates these packets, adding a new IP header and GRE protocol header.

$2

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