---
pcx_content_type: reference
title: Rinkeby deprecation
weight: 5
layout: list
---

# Rinkeby deprecation

Though Cloudflare's Ethereum Gateway launched with support for the Rinkeby testnet, Rinkeby did not run through [The Merge](https://ethereum.org/en/upgrades/merge/) and - as a result - will no longer be a reliable staging environment for mainnet.

Cloudflare will be deprecating support for Rinkeby on January 30, 2023.

## Migration

To avoid any issues with your Web3 development or debugging, you should switch over to the [Sepolia or Goerli testnets](/web3/ethereum-gateway/reference/supported-networks/), which are fully supported with your Ethereum Gateway.

To migrate, you should update the endpoints you use when [reading from or writing to](/web3/how-to/use-ethereum-gateway/) the Ethereum network.

For example, you might have been using the previous endpoints to interact with your Ethereum Gateway.

```sh
---
header: Previous curl
highlight: [1]
---
$ curl https://web3-trial.cloudflare-eth.com/v1/rinkeby \
-H 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByNumber",
    "params":["0x2244", true],
    "id":1
    }'
```

```js
---
header: Previous JS Fetch API
highlight: [2]
---
await fetch(
  new Request('https://web3-trial.cloudflare-eth.com/v1/rinkeby', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['0x2244', true],
      id: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).then(resp => {
  return resp.json();
});
```

To migrate away from Rinkeby, change the end of your endpoint to use another testnet.

```sh
---
header: New curl
highlight: [1]
---
$ curl https://web3-trial.cloudflare-eth.com/v1/goerli \
-H 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByNumber",
    "params":["0x2244", true],
    "id":1
    }'
```

```js
---
header: New JS Fetch API
highlight: [2]
---
await fetch(
  new Request('https://web3-trial.cloudflare-eth.com/v1/sepolia', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['0x2244', true],
      id: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).then(resp => {
  return resp.json();
});
```