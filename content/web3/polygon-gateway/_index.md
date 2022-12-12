---
pcx_content_type: concept
title: Polygon Gateway
weight: 4
---

# Polygon Gateway

Cloudflare's Polygon Gateway gives you read and write access to the Polygon PoS chain without installing any software on your computer.

[Polygon PoS](https://polygon.technology/solutions/polygon-pos/) is a scaling solution for the Ethereum network that utilizes side chains to increase transaction throughput and reduce transaction costs.

In particular, users can read all information that has been agreed upon by the consensus of existing nodes in the network. In addition, they can write their own transactions and smart contracts to be stored by these nodes in a distributed manner. Anyone else on the network will be able to view these transactions, and even run your smart contracts using their own supply of the [MATIC](https://coinmarketcap.com/currencies/polygon/) token.

These interactions take place through the official [Polygon JSON-RPC API](https://github.com/ethereum/execution-apis) and use [Cloudflare-supported API methods](/web3/polygon-gateway/reference/supported-api-methods/).

## Availability

{{<feature-table id="web3.polygon">}}