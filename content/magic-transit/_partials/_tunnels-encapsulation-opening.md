---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;mssURL;;productURL;;tunnelEndpoints
---

# Tunnels and encapsulation

$1 uses [Generic Routing Encapsulation (GRE)](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/) and [IPsec tunnels](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/) to transmit packets from Cloudflare’s global network to your origin network. Cloudflare sets up tunnel endpoints on global network servers inside your network namespace, and you set up tunnel endpoints on routers at your data center.

To accommodate additional header data introduced by encapsulation, the maximum segment size (MSS) must be adjusted so that packets comply with the standard Internet routable maximum transmission unit (MTU), which is 1500 bytes.

For instructions, refer to [Set Maximum Segment Size]($2).

This diagram illustrates the flow of traffic with $1.

```mermaid
sequenceDiagram
accTitle: Tunnels and encapsulation
accDescr: This diagram shows the flow of traffic with Magic Transit and Magic WAN.
participant A as Client machine
participant B as Cloudflare Magic Transit / WAN
participant C as Origin router
A->>B: Payload <br> Protocol <br> IP header
Note left of A: Ingress <br> traffic
B->>C: Payload <br> Protocol <br> IP header <br> GRE <br> IP header
C->>A: IP header <br> Protocol <br> Payload
Note right of C: Egress <br> traffic
```

<br>

{{<Aside type="note">}}By default, egress packets are routed by your ISP interface, not Cloudflare.{{</Aside>}}

## ​​Anycast tunnels

$1 uses [Anycast](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) IP addresses for Cloudflare’s tunnel endpoints. In the Anycast model, any server in any data center can receive traffic and must be capable of encapsulating and decapsulating packets for any tunnel.

This works with GRE tunnels because the GRE protocol is stateless. Each packet is processed independently and does not require any negotiation or coordination between tunnel endpoints. Tunnel endpoints are technically bound to IP addresses but do not need to be bound to specific devices. Any device that can strip off the outer headers and then route the inner packet can handle any GRE packet sent over the tunnel.

For IPsec tunnels, the customer's router negotiates the creation of an IPsec tunnel with Cloudflare using the Internet Key Exchange (IKE) protocol. Next, the Cloudflare server that handled that negotiation will propagate the details of that newly created IPsec tunnel (traffic selectors, keys, etc.) across Cloudflare's data centers. The result is that any Cloudflare server can then handle traffic for that IPsec tunnel, even though only one Cloudflare server actually negotiated the setup of that tunnel.

Cloudflare’s Anycast architecture provides a conduit to your tunnel for every server in every data center on Cloudflare’s global network as shown in the image below.

```mermaid
flowchart LR
accTitle: Anycast tunnel
accDescr: Multiple servers in data center preparing packets to send through Anycast tunnel.

a(User)

subgraph 1
direction LR
b(Cloudflare global <br> network server)
c(Cloudflare global <br> network server)
d(Cloudflare global <br> network server)
e(Cloudflare global <br> network server)
f(Cloudflare global <br> network server)
g(Cloudflare global <br> network server)
h(Cloudflare global <br> network server)
end

subgraph 2
i("Acme router <br> 198.51.100.1")
j("FTP server <br> (203.0.113.100)")
end

subgraph 3
x("Acme router <br> 198.51.100.1")
z("FTP server <br> (203.0.113.100)")
end

a --> 1== Cloudflare Anycast GRE <br> single endpoint ==>i --> j

1== Cloudflare Anycast IPSec <br> single endpoint ==>x --> z
```

## IPsec tunnels

[IPsec](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/) is a group of protocols that are used together to set up encrypted connections between devices. It helps keep data sent over public networks secure. IPsec is often used to set up VPNs, and it works by encrypting IP packets, along with authenticating the source where the packets come from.

For information on how to set up an IPsec tunnel, refer to [Configure tunnel endpoints]($4). To learn more about the configuration parameters $1 uses to create an IPsec tunnel, keep reading.

### How IKEv2 is used to establish an IPsec tunnel

$1 uses the following stages to establish an IPsec tunnel:

- **Initial Exchange** (`IKE_SA_INIT`): IKE peers negotiate parameters for the IKE Security Association (SA) and establish a shared secret used for key derivation. After this exchange, the peers have a secure communication channel but they have not yet authenticated each other. If supported, the peers will also perform NAT detection in this exchange.
- **Auth Exchange** (`IKE_AUTH`): Using the secure tunnel established in the initial exchange, IKE peers mutually authenticate each other. After authentication, the IKE security association (SA) is established. Next, the peers negotiate and establish an IPsec tunnel, known as a Child SA.

{{<Aside type="note">}}It is important to note that the IKE SA and the Child SA are separate things, each with their own parameters. The Child SA is the actual IPsec tunnel where user traffic flows (that is, the dataplane). The IKE SA is used to set up and manage the Child SA.{{</Aside>}}

In summary, an IKE SA is created that uses certain cryptographic transforms. That IKE SA is then used to create a Child SA which itself uses certain cryptographic transforms. The configuration section below details which of these transforms for IKE SAs and Child SAs are currently supported by $1.

### Supported configuration parameters

#### IKE SA

This is sometimes referred to as Phase 1 as per IKEv1 language.

- **Encryption**
  - AES-GCM-16 with 128-bit or 256-bit key length
  - AES-CBC with 256-bit key length

- **Integrity** (sometimes referred to as Authentication)
  - SHA2-256

- **Diffie-Hellman group**:
  - DH group 14 (2048-bit MODP group)
  - DH group 5 (1536-bit MODP group)

- **Pseudorandom function (PRF)** (not to be confused with PFS. PRF is often not a configurable setting.)
  - SHA2-256
  - SHA2-384
  - SHA2-512

#### IPsec

The Child SA. Sometimes referred to as Phase 2 as per IKEv1 language.

- **Encryption**: 
  - AES-GCM-16 with 128-bit or 256-bit key length
  - AES-CBC with 128-bit or 256-bit key length

- **Integrity** (sometimes referred to as Authentication.)
  - SHA2-256
  - SHA-1
  {{<Aside type="note">}}When using AES-GCM-16, an integrity algorithm is not required because AES GCM includes integrity checking (since it is an AEAD algorithm). Even when using an AEAD algorithm, however, some routers still require an integrity algorithm to be selected.{{</Aside>}}

- **PFS group** (sometimes referred to as Phase 2 Diffie-Hellman Group. Not to be confused with PRF.)
  - DH group 14 (2048-bit MODP group)
  - DH group 5 (1536-bit MODP group)

#### Required configuration parameters

- The IKE version must be IKEv2.
- The IKE authentication method must be Pre-Shared Key (PSK).
- [Anti-replay protection]($3) must be disabled.
- If your router is behind NAT and requires NAT traversal (NAT-T), then your router must initiate IKE communication on port `4500`. Most devices support configuring NAT-T to begin on port `4500` (exceptions include at least some versions of the Cisco ASA). NAT-T is not supported for IKE sessions which begin on port `500` and then switch to port `4500`.
- (Uncommon) Extended Sequence Numbers (ESN) must be disabled.

#### Optional configuration parameters

- **Null encryption for IPsec:** This option should not be used unless necessary as it reduces security because IPsec traffic is not encrypted. You must explicitly opt in to use this option.

### Supported IKE ID formats

$1 supports the following IKE ID types for IPsec:

{{<table-wrap>}}

RFC name | Format | Example
--- | --- | ---
`ID_RFC822_ADDR` | `ipsec@<TUNNEL_ID>.<ACCOUNT_ID>.ipsec.cloudflare.com` | `ipsec@f5407d8db1a542b196c59f6d04ba8bd1.123456789.ipsec.cloudflare.com`
`ID_FQDN` | `<TUNNEL_ID>.<ACCOUNT_ID>.ipsec.cloudflare.com` | `f5407d8db1a542b196c59f6d04ba8bd1.123456789.ipsec.cloudflare.com`
`ID_KEY_ID` | `<ACCOUNT_ID>_<TUNNEL_ID>` | `123456789_f5407d8db1a542b196c59f6d04ba8bd1`

{{</table-wrap>}}

Additionally, the IKE ID type of `ID_IPV4_ADDR` is supported if the following two conditions are met: 
1. The IPsec tunnel’s `customer_endpoint` value is set. 
2. The combination of `cloudflare_endpoint` and `customer_endpoint` is unique among the customer’s IPsec tunnels.