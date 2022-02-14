---
pcx-content-type: tutorial
---

# IPsec

Use Anycast [IPSec](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/) as an on-ramp to connect with your entire virtual network. With an IPsec tunnel, you can route traffic from your network to Cloudflare's edge and define static routes to direct traffic down the correct tunnel. 

Before you begin, make sure you already have an Account ID and API Key.

## 1. Create IPsec tunnels

Create a POST request using the API to [Create IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-create-ipsec-tunnels).

## 2. Generate the PSK for the IPsec tunnels

Create a POST request using the API to [Generate Pre Shared Key (PSK) for IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-generate-pre-shared-key-psk-for-ipsec-tunnels).

## 3. Initiate IKE session

Obtain your encryption key to use with Internet Key Exchange (IKE) and initiate your session.

## 4. Set up static routes

To set up your static routes, refer to [Create static routes](/get-started/configure-tunnels/assign-tunnel-priorities).

## Supported IPsec configuration parameters

- Auth
- Supported encryption
- Remote port
- Reauth time
- Rekey time
