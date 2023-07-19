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

## Trace methods

EVM traces are a way to track the execution of smart contracts on the Ethereum blockchain. It records all the steps taken by the Ethereum Virtual Machine (EVM) as it runs the smart contract. This includes information like the specific operation that was executed, how much gas it cost, and any changes made to the blockchain as a result. The trace module is a tool that allows developers to access and analyze these traces, which can be useful for debugging, testing, and monitoring smart contracts. It can be used to identify and fix errors, optimize performance, and gain insight into how the smart contract is interacting with the blockchain.

### trace_filter
The `trace_filter` method retrieves the traces of multiple transactions in a single request. This method is particularly useful for debugging and monitoring specific addresses on the Ethereum blockchain.

#### Request Parameters
- `fromBlock`: `Quantity` or `Tag` - (optional) The block number to start receiving traces from.
- `toBlock`: `Quantity` or `Tag` - (optional) The block number to stop receiving traces at.
- `fromAddress`: `Array` - (optional) An array of addresses to start receiving traces from.
- `toAddress`: `Address` - (optional) An array of addresses to stop retrieving traces at.
- `after`: `Quantity` - (optional) The offset trace number
- `count`: `Quantity` - (optional) The amount of traces to return.

#### Returns
This method returns an `Array` of traces matching the given filter.

#### Example
```sh
---
header: trace_filter Request
highlight: [1]
---
$ curl https://web3-trial.cloudflare-eth.com/v1/mainnet \
-X POST \
-H 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"trace_filter",
    "params":[
        {
            "count": 200,
            "fromBlock": "0xccb943",
            "toBlock": "0xccbc62",
            "fromAddress": [
                "0xEdC763b3e418cD14767b3Be02b667619a6374076"
            ]
        }
    ],
    "id":1
    }'
```
#### Response
```json
{
    "jsonrpc": "2.0",
    "result": [
        {
            "action": {
                "from": "0xedc763b3e418cd14767b3be02b667619a6374076",
                "callType": "call",
                "gas": "0x8462",
                "input": "0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                "to": "0x7ff4169a6b5122b664c51c95727d87750ec07c84",
                "value": "0x0"
            },
            "blockHash": "0x351e7c06ec010c8f7e7358eb580238dd23e1e129be96822aa93ebb6da08558e6",
            "blockNumber": 13416771,
            "result": {
                "gasUsed": "0x6009",
                "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
            },
            "subtraces": 0,
            "traceAddress": [],
            "transactionHash": "0x054bbb9fbb855bf23f755e548c7409f45fc5eff8a824b2ad06380bc038d7b049",
            "transactionPosition": 54,
            "type": "call"
        }
    ],
    "id": 1
}
```

### Limitations
The `trace_filter` method has some limitations to ensure that our nodes are not overloaded.
- The block range for the `trace_filter` method is limited to 800 blocks.
- The trace `count` is limited to 200
