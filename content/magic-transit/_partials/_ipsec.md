---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;productURL;;tunnelEndpoints
---

# IPsec tunnels

[IPsec](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/) is a group of protocols that are used together to set up encrypted connections between devices. It helps keep data sent over public networks secure. IPsec is often used to set up VPNs, and it works by encrypting IP packets, along with authenticating the source where the packets come from.

For information on how to set up an IPsec tunnel, refer to [Configure tunnel endpoints]($3). To learn more about the configuration parameters $1 uses to create an IPsec tunnel, keep reading.

## How IKEv2 is used to establish an IPsec tunnel

$1 uses the following stages to establish an IPsec tunnel:

- **Initial Exchange** (`IKE_SA_INIT`): IKE peers negotiate parameters for the IKE Security Association (SA) and establish a shared secret used for key derivation. After this exchange, the peers have a secure communication channel but they have not yet authenticated each other. If supported, the peers will also perform NAT detection in this exchange.
- **Auth Exchange** (`IKE_AUTH`): Using the secure tunnel established in the initial exchange, IKE peers mutually authenticate each other. After authentication, the IKE security association (SA) is established. Next, the peers negotiate and establish an IPsec tunnel, known as a Child SA.

{{<Aside type="note">}}It is important to note that the IKE SA and the Child SA are separate things, each with their own parameters. The Child SA is the actual IPsec tunnel where user traffic flows (that is, the dataplane). The IKE SA is used to set up and manage the Child SA.{{</Aside>}}

In summary, an IKE SA is created that uses certain cryptographic transforms. That IKE SA is then used to create a Child SA which itself uses certain cryptographic transforms. The configuration section below details which of these transforms for IKE SAs and Child SAs are currently supported by $1.

## Supported configuration parameters

### IKE SA

This is sometimes referred to as “Phase 1” due to language from IKEv1.

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

### IPsec

The Child SA. Sometimes referred to as “Phase 2” due to language from IKEv1.

- **Encryption**: 
  - AES-GCM-16 with 128-bit or 256-bit key length
  - AES-CBC with 128-bit or 256-bit key length

- **Integrity** (sometimes referred to as Authentication.)
  - SHA2-256
  - SHA-1
  {{<Aside type="note">}}When using AES-GCM-16, an integrity algorithm is not required because AES GCM includes integrity checking (since it is an AEAD algorithm). Even when using an AEAD algorithm, however, some routers still require an integrity algorithm to be selected.{{</Aside>}}

- **PFS group** (sometimes referred to as "Phase 2 Diffie-Hellman Group". Not to be confused with PRF.)
  - DH group 14 (2048-bit MODP group)
  - DH group 5 (1536-bit MODP group)

### Required configuration parameters

- The IKE version must be IKEv2.
- The IKE authentication method must be Pre-Shared Key (PSK).
- [Anti-replay protection]($2) must be disabled.
- If your router is behind NAT and requires NAT traversal (NAT-T), then your router must initiate IKE communication on port 4500. Most devices support configuring NAT-T to begin on port `4500` (exceptions include at least some versions of the Cisco ASA). NAT-T is not supported for IKE sessions which begin on port `500` and then switch to port `4500`.
- (Uncommon) Extended Sequence Numbers (ESN) must be disabled.

### Optional configuration parameters

- **Null encryption for IPsec:** This option should not be used unless necessary as it reduces security because IPsec traffic is not encrypted. You must explicitly opt in to use this option.

## Supported IKE ID formats

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