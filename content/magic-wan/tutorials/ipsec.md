---
pcx-content-type: tutorial
---

# IPsec

Use Anycast IPsec as an on-ramp to connect with your entire virtual network. With an IPsec tunnel, you can route traffic from your network to Cloudflare's edge and define static routes to direct traffic down the correct tunnel. To learn more about Anycast IPsec, refer to [What is IPsec?](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/).

Before you begin, make sure you already have an Account ID and API Key.

## 1. Create IPsec tunnels

Create a POST request using the API to [Create IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-create-ipsec-tunnels).

## 2. Generate the PSK for the IPsec tunnels

Create a POST request using the API to [Generate Pre Shared Key (PSK) for IPsec tunnels](https://api.cloudflare.com/#magic-ipsec-tunnels-generate-pre-shared-key-psk-for-ipsec-tunnels) and initiate your session.

## 4. Set up static routes

To set up your static routes, refer to [Create static routes](/get-started/configure-tunnels/assign-tunnel-priorities).

## Supported IPsec configuration parameters

*   Auth is PSK
*   Supported encryption proposal: aes256gcm16-prfsha512-modp2048
*   Remote Port of 500
*   0s reauth time or no reauth
*   4h rekey time
