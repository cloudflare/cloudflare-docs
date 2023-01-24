---
pcx_content_type: reference
title: Supported API methods
weight: 1
meta:
  title: Supported API methods - Ethereum Gateway
---

# Supported API methods for Ethereum Gateway

The full list of API methods that are supported by an Ethereum Gateway
is given below. The gateway returns a `403` if a method is specified that is not
supported.

For a full list of JSON-RPC API methods, refer to the [JSON-RPC specification](https://github.com/ethereum/execution-apis).

| JSON-RPC method                         | Cloudflare Ethereum Gateway support |
| --------------------------------------- | :----------------------------------------: |
| web3_clientVersion                      |                     ✅                       |
| web3_sha3                               |                     ✅                       |
| net_version                             |                     ✅                       |
| net_listening                           |                     ✅                       |
| trace_filter                            |                     ✅                       |
| eth_syncing                             |                     ✅                       |
| eth_mining                              |                     ✅                       |
| eth_gasPrice                            |                     ✅                       |
| eth_feeHistory                          |                     ✅                       |
| eth_blockNumber                         |                     ✅                       |
| eth_chainId                             |                     ✅                       |
| eth_getBalance                          |                     ✅                       |
| eth_getStorageAt                        |                     ✅                      |
| eth_getTransactionCount                 |                     ✅                       |
| eth_getBlockTransactionCountByHash      |                     ✅                       |
| eth_getBlockTransactionCountByNumber    |                     ✅                       |
| eth_getUncleCountByBlockHash            |                     ✅                       |
| eth_getUncleCountByBlockNumber          |                     ✅                       |
| eth_getCode                             |                     ✅                       |
| eth_sendRawTransaction                  |                     ✅                       |
| eth_call                                |                     ✅                       |
| eth_estimateGas                         |                     ✅                       |
| eth_getBlockByHash                      |                     ✅                       |
| eth_getBlockByNumber                    |                     ✅                       |
| eth_getTransactionByHash                |                     ✅                       |
| eth_getTransactionByBlockHashAndIndex   |                     ✅                      |
| eth_getTransactionByBlockNumberAndIndex |                     ✅                       |
| eth_getTransactionReceipt               |                     ✅                       |
| eth_getUncleByBlockHashAndIndex         |                     ✅                       |
| eth_getUncleByBlockNumberAndIndex       |                     ✅                       |
| eth_getLogs                             |                     ✅                       |
| eth_getWork                             |                     ✅                       |
| eth_getProof                            |                     ✅                       |
| net_peerCount                           |                     ❌                       |
| eth_protocolVersion                     |                     ❌                       |
| eth_coinbase                            |                     ❌                        |
| eth_hashrate                            |                     ❌                       |
| eth_accounts                            |                     ❌                       |
| eth_sign                                |                     ❌                        |
| eth_sendTransaction                     |                     ❌                        |
| eth_getCompilers                        |                     ❌                        |
| eth_compileLLL                          |                     ❌                        |
| eth_compileSolidity                     |                     ❌                        |
| eth_compileSerpent                      |                     ❌                        |
| eth_newFilter                           |                     ❌                        |
| eth_newBlockFilter                      |                     ❌                        |
| eth_newPendingTransactionFilter         |                     ❌                        |
| eth_uninstallFilter                     |                     ❌                        |
| eth_getFilterChanges                    |                     ❌                        |
| eth_getFilterLogs                       |                     ❌                        |
| eth_submitWork                          |                     ❌                       |
| eth_submitHashrate                      |                     ❌                       |
