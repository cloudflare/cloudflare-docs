---
pcx-content-type: reference
title: Supported API methods
weight: 4
meta:
  title: Supported API methods - Ethereum Gateway
---

# Supported API methods for Ethereum Gateway

The full list of API methods that are supported by an Ethereum Gateway
is given below. The Gateway returns a `403` if a method is specified that is not
supported.

For a full list of RPC API methods, refer to the [JSON-RPC specification](https://github.com/ethereum/execution-apis).

| RPC API method                          | Cloudflare Ethereum Gateway support |
| --------------------------------------- | :----------------------------------------: |
| web3_clientVersion                      |                     Yes                      |
| web3_sha3                               |                     Yes                      |
| net_version                             |                     Yes                      |
| net_peerCount                           |                     No                      |
| net_listening                           |                     No                      |
| eth_protocolVersion                     |                     Yes                      |
| eth_syncing                             |                     Yes                      |
| eth_coinbase                            |                     No                       |
| eth_mining                              |                     Yes                      |
| eth_hashrate                            |                     Yes                      |
| eth_gasPrice                            |                     Yes                      |
| eth_feeHistory                          |                     No                      |
| eth_accounts                            |                     No                      |
| eth_blockNumber                         |                     Yes                      |
| eth_chainId                             |                     Yes                      |
| eth_getBalance\*                        |                     Yes                      |
| eth_getStorageAt\*                      |                     Yes                     |
| eth_getTransactionCount\*               |                     Yes                      |
| eth_getBlockTransactionCountByHash      |                     Yes                      |
| eth_getBlockTransactionCountByNumber    |                     Yes                      |
| eth_getUncleCountByBlockHash            |                     Yes                      |
| eth_getUncleCountByBlockNumber          |                     Yes                      |
| eth_getCode\*                           |                     Yes                      |
| eth_sign                                |                     No                       |
| eth_sendTransaction                     |                     No                       |
| eth_sendRawTransaction                  |                     Yes                      |
| eth_call\*                              |                     Yes                      |
| eth_estimateGas                         |                     Yes                      |
| eth_getBlockByHash                      |                     Yes                      |
| eth_getBlockByNumber                    |                     Yes                      |
| eth_getTransactionByHash                |                     Yes                      |
| eth_getTransactionByBlockHashAndIndex   |                     Yes                     |
| eth_getTransactionByBlockNumberAndIndex |                     Yes                      |
| eth_getTransactionReceipt               |                     Yes                      |
| eth_getUncleByBlockHashAndIndex         |                     Yes                      |
| eth_getUncleByBlockNumberAndIndex       |                     Yes                      |
| eth_getCompilers                        |                     No                       |
| eth_compileLLL                          |                     No                       |
| eth_compileSolidity                     |                     No                       |
| eth_compileSerpent                      |                     No                       |
| eth_newFilter                           |                     No                       |
| eth_newBlockFilter                      |                     No                       |
| eth_newPendingTransactionFilter         |                     No                       |
| eth_uninstallFilter                     |                     No                       |
| eth_getFilterChanges                    |                     No                       |
| eth_getFilterLogs                       |                     No                       |
| eth_getLogs\*                           |                     Yes                      |
| eth_getWork                             |                     Yes                      |
| eth_submitWork                          |                     Yes                      |
| eth_submitHashrate                      |                     Yes                      |
| eth_getProof                            |                     Yes                      |

> RPC API methods followed by "\*" are only supported for the latest 128 blocks
