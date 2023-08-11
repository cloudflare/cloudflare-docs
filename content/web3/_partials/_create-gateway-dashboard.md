---
_build:
  publishResources: false
  render: never
  list: never
---

To create a gateway using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and website.
3. Go to **Web3**.
4. Click **Create Web3 Gateway**.
5. Enter the following information:
  - **Hostname**: Enter a hostname to use as your gateway, which has to be a subdomain of the current Cloudflare zone.
  - **Gateway Description**: Enter a description to help distinguish between different gateways.
  - **Gateway Type**: Select a gateway target of [IPFS DNSLink](/web3/ipfs-gateway/concepts/dnslink/), [IPFS Universal Path](/web3/ipfs-gateway/concepts/universal-gateway/), [Ethereum](/web3/ethereum-gateway/), or [Polygon](/web3/polygon-gateway/).
  - **DNSLink**: Only applicable to IPFS gateways, more details at [DNSLink](/web3/ipfs-gateway/concepts/dnslink/#how-is-it-used-with-cloudflare).
6. Click **Deploy**.