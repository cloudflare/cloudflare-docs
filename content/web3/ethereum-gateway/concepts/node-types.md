---
pcx_content_type: concept
title: Node types
weight: 3
meta:
    title: Node types | Ethereum
---

# Types of Ethereum Nodes

There are three widely known Ethereum nodes that are used: Full nodes, Archive nodes, and Light nodes.

## Full nodes

Full nodes store all the blockchain’s data and participate in block validation. Validating the blockchain includes keeping track of new blocks and computing and maintaining state changes. Full nodes, once fully synced with the network, can query all Ethereum blockchain data.

## Light nodes

A light node is much smaller than a full node and does not participate in block validation in the same way. The node can query the Ethereum network but does not store the state of the chain. Because of this limitation, it relies on peering with full nodes to get accurate chain data.

## Archive nodes

An archive node is a full node that additionally maintains storage of historical blockchain states. While a full node can calculate a historical state, an archive node readily has the information in local storage and has better performance for these types of requests.

## Nodes at Cloudflare

Cloudflare's Ethereum Gateway provides access to full and archive nodes.

The archive nodes serve requests for the following [RPC state methods](https://ethereum.org/en/developers/docs/apis/json-rpc/#state_methods) when the block number parameter is before the most recent 128 blocks or the default block parameter is set to “earliest”:

- [eth_getBalance](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)
- [eth_getCode](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)
- [eth_getTransactionCount](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)
- [eth_getStorageAt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat)
- [eth_call](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)
