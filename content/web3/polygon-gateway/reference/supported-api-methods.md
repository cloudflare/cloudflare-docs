---
pcx_content_type: reference
title: Supported API methods
weight: 1
meta:
  title: Supported API methods - Polygon Gateway
---

# Supported API methods for Polygon Gateway

The full list of API methods that are supported by an Polygon Gateway
is given below. The gateway returns a `403` if a method is specified that is not
supported.

Since Polygon is a layer 2 for the Ethereum network, most of Ethereum's JSON-RPC API
methods are supported for interacting with the [Polygon PoS chain](https://polygonscan.com/).

[Supported API methods](/web3/ethereum-gateway/reference/supported-api-methods/) lists all of the Ethereum API methods that the Polygon Gateway supports.

In addition to all of the `web3_*`, `net_*`, and `eth_*` methods, the following Polygon-specific methods are supported:

| JSON-RPC method                         | Cloudflare Polygon Gateway support |
| --------------------------------------- | :----------------------------------------: |
| bor_getAuthor                           |                     ✅                     |
| bor_getCurrentProposer                  |                     ✅                     |
| bor_getCurrentValidators                |                     ✅                     |
| bor_getRootHash                         |                     ✅                     |
| bor_getSigners                          |                     ✅                     |
| bor_getSignersAtHash                    |                     ✅                     |
| bor_getSnapshot                         |                     ❌                     |
| bor_getSnapshotAtHash                   |                     ❌                     |
