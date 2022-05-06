---
pcx-content-type: reference
title: Supported API methods
weight: 4
---

# Supported API methods

The full list of API methods that are supported by an Ethereum Gateway
is given below. The Gateway returns a `403` if a method is specified that is not
supported.

For a full list of RPC API methods, refer to the [JSON-RPC specification](https://github.com/ethereum/execution-apis).

| RPC API method                          | Cloudflare Ethereum Gateway support |
| --------------------------------------- | :----------------------------------------: |
| web3_clientVersion                      |                     X                      |
| web3_sha3                               |                     X                      |
| net_version                             |                     X                      |
| net_peerCount                           |                     X                      |
| net_listening                           |                     X                      |
| eth_protocolVersion                     |                     X                      |
| eth_syncing                             |                     X                      |
| eth_coinbase                            |                                            |
| eth_mining                              |                     X                      |
| eth_hashrate                            |                     X                      |
| eth_gasPrice                            |                     X                      |
| eth_feeHistory                          |                     X                      |
| eth_accounts                            |                     X                      |
| eth_blockNumber                         |                     X                      |
| eth_chainId                             |                     X                      |
| eth_getBalance\*                        |                     X                      |
| eth_getStorageAt\*                      |                     X                      |
| eth_getTransactionCount\*               |                     X                      |
| eth_getBlockTransactionCountByHash      |                     X                      |
| eth_getBlockTransactionCountByNumber    |                     X                      |
| eth_getUncleCountByBlockHash            |                     X                      |
| eth_getUncleCountByBlockNumber          |                     X                      |
| eth_getCode\*                           |                     X                      |
| eth_sign                                |                                            |
| eth_sendTransaction                     |                                            |
| eth_sendRawTransaction                  |                     X                      |
| eth_call\*                              |                     X                      |
| eth_estimateGas                         |                     X                      |
| eth_getBlockByHash                      |                     X                      |
| eth_getBlockByNumber                    |                     X                      |
| eth_getTransactionByHash                |                     X                      |
| eth_getTransactionByBlockHashAndIndex   |                     X                      |
| eth_getTransactionByBlockNumberAndIndex |                     X                      |
| eth_getTransactionReceipt               |                     X                      |
| eth_pendingTransactions                 |                     X                      |
| eth_getUncleByBlockHashAndIndex         |                     X                      |
| eth_getUncleByBlockNumberAndIndex       |                     X                      |
| eth_getCompilers                        |                                            |
| eth_compileLLL                          |                                            |
| eth_compileSolidity                     |                                            |
| eth_compileSerpent                      |                                            |
| eth_newFilter                           |                                            |
| eth_newBlockFilter                      |                                            |
| eth_newPendingTransactionFilter         |                                            |
| eth_uninstallFilter                     |                                            |
| eth_getFilterChanges                    |                                            |
| eth_getFilterLogs                       |                                            |
| eth_getLogs\*                           |                     X                      |
| eth_getWork                             |                     X                      |
| eth_submitWork                          |                     X                      |
| eth_submitHashrate                      |                     X                      |
| eth_getProof                            |                     X                      |

> RPC API methods followed by "\*" are only supported for the latest 128 blocks
