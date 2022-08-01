---
pcx_content_type: concept
title: About
weight: 2
layout: list
---

# How the gateways work

When you [create a gateway](/web3/how-to/manage-gateways/#create-a-gateway), Cloudflare automatically creates and adds specific [DNS records](/web3/reference/gateway-dns-records/) to your Cloudflare account.

When the hostname associated with your gateway receives requests, its DNS records route these requests to a Cloudflare Workers script.

![Cloudflare's Web3 gateways provide HTTP-accessible interfaces to the IPFS and Ethereum networks. For more details, continue reading.](/web3/static/web3-gateway-flow-diagram.png)

## Read operations

If the API call to the Worker is a read operation and the requested content is cached, the Workers script will respond with the requested information via HTTP to the client. 

If the requested content is not cached, it will first be requested via API call to Cloudflare IPFS or Ethereum nodes, cached at the edge for future requests, and returned via HTTP response to the client.

## Write operations

If the API call to the Worker is a write operation — only available for the [Ethereum gateway](/web3/how-to/use-ethereum-gateway) — the Ethereum Gateway will make an API call to the Cloudflare Ethereum nodes, and the transaction is placed in the local mempool and propagated to peers. 

A transaction ID is returned to the Ethereum Gateway, which is then returned to the client via HTTP response. Miner nodes take transactions from the mempool and place them into a block to execute. The new block to add to the blockchain is validated, consensus is reached, and the block is added to the blockchain and propagated to the rest of the network.