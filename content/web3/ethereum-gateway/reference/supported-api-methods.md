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
| [web3_clientVersion](https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion)                      |                     ✅                       |
| [web3_sha3](https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_sha3)                               |                     ✅                       |
| [net_version](https://ethereum.org/en/developers/docs/apis/json-rpc/#net_version)                             |                     ✅                       |
| [net_listening](https://ethereum.org/en/developers/docs/apis/json-rpc/#net_listening)                           |                     ✅                       |
| [trace_filter]()[^3]                            |                     ✅                       |
| [eth_syncing](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_syncing)                             |                     ✅                       |
| [eth_mining](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_mining)                              |                     ✅                       |
| [eth_gasPrice](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice)                            |                     ✅                       |
| [eth_feeHistory](https://github.com/ethereum/execution-apis)[^2]                          |                     ✅                       |
| [eth_blockNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)                         |                     ✅                       |
| [eth_chainId](https://github.com/ethereum/execution-apis)                             |                     ✅                       |
| [eth_getBalance](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)                          |                     ✅                       |
| [eth_getStorageAt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat)                       |                     ✅                      |
| [eth_getTransactionCount](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)                 |                     ✅                       |
| [eth_getBlockTransactionCountByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash)      |                     ✅                       |
| [eth_getBlockTransactionCountByNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber)    |                     ✅                       |
| [eth_getUncleCountByBlockHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclecountbyblockhash)            |                     ✅                       |
| [eth_getUncleCountByBlockNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclecountbyblocknumber)          |                     ✅                       |
| [eth_getCode](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)                            |                     ✅                       |
| [eth_sendRawTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)                  |                     ✅                       |
| [eth_call](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)                                |                     ✅                       |
| [eth_estimateGas](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas)                         |                     ✅                       |
| [eth_getBlockByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash)                      |                     ✅                       |
| [eth_getBlockByNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber)                    |                     ✅                       |
| [eth_getTransactionByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)                |                     ✅                       |
| [eth_getTransactionByBlockHashAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyblockhashandindex)   |                     ✅                      |
| [eth_getTransactionByBlockNumberAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyblocknumberandindex) |                     ✅                       |
| [eth_getTransactionReceipt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionreceipt)               |                     ✅                       |
| [eth_getUncleByBlockHashAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclebyblockhashandindex)         |                     ✅                       |
| [eth_getUncleByBlockNumberAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclebyblocknumberandindex)       |                     ✅                       |
| [eth_getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)[^1]                             |                     ✅                       |
| [eth_getWork](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getwork)                             |                     ✅                       |
| [eth_getProof](https://ethereum.github.io/execution-apis/api-documentation/)                            |                     ✅                       |
| [net_peerCount](https://ethereum.org/en/developers/docs/apis/json-rpc/#net_peercount)                          |                     ❌                       |
| [eth_protocolVersion](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_protocolversion)                     |                     ❌                       |
| [eth_coinbase](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_coinbase)                            |                     ❌                        |
| [eth_hashrate](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_hashrate)                            |                     ❌                       |
| [eth_accounts](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)                           |                     ❌                       |
| [eth_sign](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sign)                               |                     ❌                        |
| [eth_sendTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)                     |                     ❌                        |
| [eth_getCompilers](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcompilers)                        |                     ❌                        |
| [eth_compileLLL](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_compilelll)                          |                     ❌                        |
| [eth_compileSolidity](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_compile_solidity)                     |                     ❌                        |
| [eth_compileSerpent](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_compileserpent)                      |                     ❌                        |
| [eth_newFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter)                           |                     ❌                        |
| [eth_newBlockFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newblockfilter)                     |                     ❌                        |
| [eth_newPendingTransactionFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter)         |                     ❌                        |
| [eth_uninstallFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallfilter)                     |                     ❌                        |
| [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)                    |                     ❌                        |
| [eth_getFilterLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs)                       |                     ❌                        |
| [eth_submitWork](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_submitwork)                          |                     ❌                       |
| [eth_submitHashrate](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_submithashrate)                      |                     ❌                       |

[^1]: **Limitations**: Max block range of 800 blocks.
[^2]: **Limitations**: Max block count of 10.
[^3]: **Limitations**: Max trace count of 200 and max block range of 800.