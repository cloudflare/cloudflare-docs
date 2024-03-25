---
pcx_content_type: reference
title: Supported networks
weight: 1
meta:
  title: Supported networks - Ethereum Gateway
---

# Supported networks for Ethereum Gateway

Currently, Cloudflare Ethereum gateways support [interacting with](/web3/how-to/use-ethereum-gateway/) the following networks.

| Network | Usage |
| --- | --- |
| [Ethereum Mainnet](https://ethereum.org/en/enterprise/) | Append `/v1/mainnet` to calls to your gateway or the Cloudflare public gateway (`cloudflare-eth.com`). |
| [Sepolia Testnet](https://sepolia.dev/) | Append `/v1/sepolia` to calls to your gateway. |
| [Goerli Testnet](https://goerli.net/) | Append `/v1/goerli` to calls to your gateway. The Goerli Testnet is deprecated and [will stop being supported](https://blog.ethereum.org/2023/11/30/goerli-lts-update) on April 13, 2024. Use the Sepolia Testnet instead. |
