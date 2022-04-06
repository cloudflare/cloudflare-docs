---
pcx-content-type: tutorial
title: IPsec
weight: 1
---

# IPsec

Use Anycast IPsec as an on-ramp to connect with your entire virtual network. With an IPsec tunnel, you can route traffic from your network to Cloudflare's edge and define static routes to direct traffic down the correct tunnel. 

To learn more about Anycast IPsec, refer to [What is IPsec?](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/).

Before you begin, make sure you already have an Account ID and API Key.

## IPsec process

Review the information below to learn more about phases for IPsec connections.

 - **Negotiation or IKE phase 1**: Endpoints use IPsec to negotiate the set of policies used in the connection and has two modes: main and aggressive. Some solutions, like [EdgeConnect](/magic-wan/partners/aruba-edgeconnect), only offer an aggressive mode. 

    {{<Aside type="note" header="Note:">}}

  The IKE aggressive mode ensures security but does not allow room for negotiation. With the main mode, negotiations continue until a consensus is reached.

    {{</Aside>}}

- **IPSec circuit or IKE Phase 2**: An IPsec circuit is established based on the authentication and encryption methods agreed upon in IKE Phase 1. During this phase, authentication and encryption during the data transmission phase is determined, and random, cryptographic numbers are exchanged to authenticate sessions.

- **IPSec transmission**: Actual data transmission using authentication and encryption established in IKE Phase 2.

## 1. Create IPsec tunnels

Create a POST request using the API to [Create IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-create-ipsec-tunnels).

## 2. Generate the PSK for the IPsec tunnels

Create a POST request using the API to [Generate Pre Shared Key (PSK) for IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-generate-pre-shared-key-psk-for-ipsec-tunnels) and initiate your session.

## 4. Set up static routes

To set up your static routes, refer to [Configure static routes](/magic-wan/how-to/configure-static-routes/).

## Supported configuration parameters

### Phase 1

- **Encryption**: 
  - AES-GCM-16 with 128-bit or 256-bit key length
  - AES-CBC with 256-bit key length

- **Integrity** (sometimes referred to as Authentication):
  - SHA2-256

- **Diffie-Hellman group**:
  - DH group 14 (2048-bit MODP group)

- **Pseudorandom function (PRF)** (not to be confused with PFS. PRF is often not a configurable setting):
  - SHA2-256
  - SHA2-384
  - SHA2-512

### Phase 2

- **Encryption**: 
  - AES-GCM-16 with 128-bit or 256-bit key length
  - AES-CBC with 256-bit key length

- **Integrity** (sometimes referred to as Authentication):
  - SHA2-256

- **PFS group** (sometimes referred to as "Phase 2 Diffie-Hellman Group"):
  - DH group 14 (2048-bit MODP group)

### Additional configuration parameters

- Auth is PSK
- Remote Port of 500
- 0s reauth time or no reauth
- 4h rekey time
- Disable anti-replay protection
