---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;mssValue
---

## Set maximum segment size

```mermaid
sequenceDiagram
accTitle: Magic WAN
accDescr: Maximum segment size
participant A as Client machine
participant B as Cloudflare Magic WAN/Transit
participant C as Origin router
A->>B: MSS = 1460 bytes <br> Protocol (20 bytes) <br> IP header (20 bytes)
Note left of A: SYN
B->>C: MSS = 1436 bytes <br> Protocol (20 bytes) <br> IP header (20 bytes) <br> GRE header (4 bytes) <br> IP header (20 bytes)
C->>A: MSS = 1436 bytes <br> IP <br> Protocol
Note right of C: SYN-ACK
A->>B: MSS = 1436 bytes <br> Protocol <br> IP
Note left of A: ACK
B->>C: Protocol <br> IP <br> GRE <br> IP
```
<br />

The SYN-ACK packet sent to the client during TCP handshake encodes the value for maximum segment size (MSS). Egress packets are routed via your ISP interface, and each packet must comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.

Cloudflare $1 uses tunnels to deliver packets from our global network to your data centers. Cloudflare encapsulates these packets adding new headers.

$2

{{<Aside type="warning" header="Important">}}

Refer to your device documentation to check if it sets IPsec MSS clamping automatically. If that is not the case and you are using IPsec inside GRE, you have to set MSS clamp manually.

Set MSS clamp at the IPsec tunnel interface and subtract 24 bytes from your current MSS value, which may be 1360 bytes or lower. This is because the physical interface will see IPsec-encrypted packets, not TCP packets, and MSS clamping will not apply to those.

{{</Aside>}}

| Standard Internet Routable MTU                         | 1500 bytes  |
| ------------------------------------------------------ | ----------- |
| -	&nbsp;&nbsp;&nbsp; Original IP header                | 20 bytes    |
| - &nbsp;&nbsp;&nbsp; Original protocol header (TCP)    | 20 bytes    |
| -	&nbsp;&nbsp;&nbsp; New IP header                     | 20 bytes    |
| -	&nbsp;&nbsp;&nbsp; New protocol header (GRE)         | 4 bytes     |
| =	&nbsp;&nbsp;&nbsp; Maximum segment size (MSS)        | 1436 bytes  |

Unless you apply these MSS settings at the origin, client machines do not know that they must use an MSS of 1436 bytes when sending packets to your origin.