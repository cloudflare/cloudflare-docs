---
pcx_content_type: tutorial
title: Set up IPsec tunnels
---

# Set up IPsec tunnels

Use Anycast IPsec as an on-ramp to connect with your entire virtual network. With an IPsec tunnel, you can route traffic from your network to Cloudflare's edge and define static routes to direct traffic down the correct tunnel. 

To learn more about Anycast IPsec, refer to [What is IPsec?](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/).

Before you begin, make sure you already have an Account ID and API Key.

For a list of compatible devices, refer to [Device compatibility](/magic-wan/reference/device-compatibility/).

## IPsec process

Review the information below to learn more about phases to establish IPsec connections.

 - **Initial Exchange:** (sometimes called Phase 1) IPsec peers negotiate and establish a secure tunnel between them for exchanging further IKE messages, including those exchanged in the Auth Exchange. Security Associations (SAs), containing crypto policies, that are established in this phase are often referred to as IKE SAs.

- **Auth Exchange:** (sometimes called Phase 2) Using the secure tunnel established in the Initial Exchange, the IPsec peers further negotiate and establish an ESP IPsec tunnel that encrypts user traffic. Security Associations (SAs) established in this phase are often referred to as IPsec SAs or sometimes Child SAs.

- **IPsec user data transmission:** User traffic is securely – encrypted and authenticated – transmitted between the IPsec peers in the ESP IPsec tunnel established at the end of the Auth Exchange.

## 1. Create IPsec tunnels

Create a POST request using the API to [Create IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-create-ipsec-tunnels).

## 2. Generate the PSK for the IPsec tunnels

You can provide your own PSK or use the command below to have Cloudflare generate a PSK for you.

Create a POST request using the API to [Generate Pre Shared Key (PSK) for IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-generate-pre-shared-key-psk-for-ipsec-tunnels) and initiate your session.

## 3. Set up static routes

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
  - DH group 5 (1536-bit MODP group)

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
  - SHA-1

- **PFS group** (sometimes referred to as "Phase 2 Diffie-Hellman Group"):
  - DH group 14 (2048-bit MODP group)
  - DH group 5 (1536-bit MODP group)

### Additional configuration parameters

- Auth is PSK
- Remote Port of 500
- 0s reauth time or no reauth
- 4h rekey time
- Disable [anti-replay protection](/magic-wan/reference/anti-replay-protection/)
- Null encryption
- NAT-T supported

## Supported key ID formats

**RFC name:** `ID_RFC822_ADDR`<br>
**Format:** `ipsec@<TUNNEL_ID>.<ACCOUNT_ID>.ipsec.cloudflare.com`<br>
**Example:** `ipsec@f5407d8db1a542b196c59f6d04ba8bd1.123456789.ipsec.cloudflare.com`<br>

**RFC name:** `ID_FQDN`<br>
**Format:** `<TUNNEL_ID>.<ACCOUNT_ID>.ipsec.cloudflare.com`<br>
**Example:** `f5407d8db1a542b196c59f6d04ba8bd1.123456789.ipsec.cloudflare.com`<br>

**RFC name:** `ID_KEY_ID`<br>
**Format:** `<ACCOUNT_ID>_<TUNNEL_ID>`<br>
**Example:** `123456789_f5407d8db1a542b196c59f6d04ba8bd1`<br>
