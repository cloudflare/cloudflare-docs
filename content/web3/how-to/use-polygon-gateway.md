---
pcx_content_type: how-to
title: Use Polygon gateway
weight: 2
---

# Use the Polygon gateway

Once you have a Polygon gateway — meaning that you [create a new gateway](/web3/how-to/manage-gateways/#create-a-gateway) with a `target` of **Polygon** — you can interact with [different Polygon networks](/web3/polygon-gateway/reference/supported-networks/) by specifying the correct JSON blob for your query.

## Read from the network

The Cloudflare Polygon Gateway allows HTTP requests where the body of the request is set to be the JSON body of the request you would like to make. For example, if you would like to read the latest block, then your JSON blob takes the form:

```json
{ "jsonrpc": "2.0", "method": "eth_getBlockByNumber", "params": ["latest", false], "id": 1 }
```

Each blob use a valid [`method` parameter](/web3/polygon-gateway/reference/supported-api-methods/). The `params` array here contains the block that we would like to locate and a boolean expressing whether each individual transaction in the block should be shown in their entirety (`true`) or as stubs (`false`).

To send this query to your [custom Polygon Gateway](/web3/how-to/manage-gateways/), you could use a cURL command:

```bash
curl https://<YOUR_GATEWAY_HOSTNAME>/v1/mainnet -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}'
```

You can also write the same query using the JS Fetch API:

```js
await fetch(
  new Request('https://<YOUR_GATEWAY_HOSTNAME>/v1/mainnet', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', false],
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

The response in both cases will be a JSON blob of the form:

```json
{
	"jsonrpc": "2.0",
	"result": {
		"baseFeePerGas": "0xb",
		"difficulty": "0x5",
		"extraData": "0xd482021183626f7286676f312e3139856c696e7578000000000000000000000007f5516aff2be9a1ffa11d7266a53e22e328511e58aac736fe4b69456e86146f4be7ff8299a8d921689823fee63bfa43a359ae64cd15f99cc161c9aca9b72c9801",
		"gasLimit": "0x1312d00",
		"gasUsed": "0x61de74",
		"hash": "0x28b469fb8f886abb6b17adb4c39a9ad7cabb70b7b15bb3865d2c30db9f7dcaa3",
		"logsBloom": "0x0a4000022140104204800008814000002449d004210080010216000002910400a0201a07440501020080101001200403250180104222208201048280003408000231d040c00600080028000a000008902401040008641010800309b9c9a0600008a136a0025108412108100c01c10c00005c3349442d040080020418010884011611e100290600402c0002210046001600000a8110012402280480020915a0102218904081985108f0802230828000228043600124220008e42000020808204500c834a284a054200025008298202047296002408008800810108c822860e00180b89180c0c03470100100004014000800000081202050400004080662100302",
		"miner": "0x0000000000000000000000000000000000000000",
		"mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
		"nonce": "0x0000000000000000",
		"number": "0x1bcda1c",
		"parentHash": "0x9f302fc3a66795d703fdbc0c20fd5490263a0b44562d50bcd4caea737bd8b5c0",
		"receiptsRoot": "0x58cb8875c84cb32abcc9929d25e2b584421e6104913275c04a45af8af6f25b2d",
		"sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
		"size": "0x3c83",
		"stateRoot": "0x5913ff32d7d69135480927da33a70510dec90fe15e294cd3733361019e135e9f",
		"timestamp": "0x6372a6c0",
		"totalDifficulty": "0xb9977d0",
		"transactions": [
			"0x645eea2f0c59db3cee314d8c1f4658a4b894ec6b18ef9759bdd5f71abb6184ff",
			"0x78d16d72728ed113a6a5f815cb6194e39de5d76c7d5bb6438650501382fea50c",
			"0x4c0cf65f823eb6094f63b5dc2ed4365040186ea4b6bf7137269caa510569424f",
			"0xcf4324246e310511361b0b1a643432194076d58fb568bcbfb02d03c65c1dca01",
			"0x6e742e1affbe2f79c05bc6f1478d667ce963d6c2e3929babe64a2a147bfac14a",
			"0x1b273343ea8e9133fce1f480f8ee45b2d6f47d3dbbe0150c85e7d176dab7866b",
			"0xcc3ad9ed8d2b0081d9a1f2f949d9247a56a7d9d33eb751371ca6302ac6b18701",
			"0x092a86b357f01f422918a9bbb2dd237d98eebf47db0fa886035a0fbc0f87b5c3",
			"0x29157a86c0238677efcf8154180cf54a01c9dfe087d19df1b1952d9848923fab",
			"0x4f2e41d34d6bd7e7424f7dd66a244295e643d188c0a117a8ffddccec2418cba4",
			"0xdbf042bccccbbd32f9bc12edf938f756c3b6e978b6ab49ede87a5b0b9eebc577",
			"0x407768842fdf095fbb27f6d78b64d86832f710aa5b14bafa2f7ea136251f35db",
			"0x559528e6ea703a01b928739af23077c9ef8a72d8503a058b6d5d7630b0deb93b",
			"0xb634ffc48b00e7083a619f4fdb60e456ccde5ef81cc5abf34bce0b8d9db4d176",
			"0x1b2a4ea45522f2b6a119c7a78b99b4e229d0b63fb06499478ec5e92b839c0658",
			"0x3e476f5c41140e7c394b74400c8e026dfad5ab69699bc92ae30a70f841728839",
			"0x8a285bd9c05e66efc039636836a1178f5e9c74a1ee7bf5e3efa46ed3dbd43bf3",
			"0x70d6d1877f9db4f8fcb41de421bac90765c29a75999a98ff663b695ed29719c8",
			"0x95b574e72b304e21148b0abfa40400e6a0cb6110dedcbb802a20d5354076299a",
			"0x2dea55258697f1bc0c19adb05c2d4998cf7d1aa8e889da830da6e8ae5aa632e0",
			"0x943f5403ad16bb93158a5c17f328600608f994e06a0502d692bf1c08f3968d90",
			"0x7f897890e8a377dfc9954203c76bbee4901d67cbac07716cec0b942b8eec0455",
			"0xe186e3fd0a8fc82cbb4e91a044948835289da745e8864a4ee68200fe7cd09bb8",
			"0xf690c9dbc38effd0151e355e4f9bf57c031bfd83c6af0bff4a98c5b57ccdad27",
			"0x4a1bacc795ea88d1a8767933d0d4e98e5d279af8ab263f0bb04af3e1de87cb89",
			"0x80e13c268cedafd6981513606771b84a159919c810360fa79d392db98a129a12",
			"0x7cf9c7019b87b599f516d4dc73cd2915c1c9e75d1009a970c19263552187fe27",
			"0xecdcc34234543c0ef11150c8219e2ac4bae6dff692f4c30359a802a8929b281e",
			"0xb0def444cbf73deac148cc8c1740bb41a8d161590582123ab609097d3607e28f",
			"0x7523d3877ac1ab8b2a018fa61d7bb246d5b81dbc0dfeae1dd056e45467cf2ab0",
			"0x41c44eddd37abbac4bbf7628de7be67c0b94408f19d15f4bb8362f45b15af052",
			"0x2e3de998259f84cb5823457c0a1a9944028369bfecbf0e86722d525b186316d0",
			"0x07c81c4cca7100224d08eb5dde7a0905b9ea62a4e35a24e2d335ff8dd99b026e",
			"0x279a6a67b4cc23a95d2e313e1b525b40a39cf12146e4ae1d859d6815cd1c6ffe",
			"0x2a033de69546a6c3376e3bd365cb9241f40f3fd898933337d94ebeed3344984b",
			"0x49fd5681bd9c2439f842914e883fb94c4e8a04da55a1b28f7618b3526b12861b",
			"0x05709d187a23c827fec313815adcdac8b02b74ac9fb86d9b41cf9cb860d245e8",
			"0x5b35aaf4cddd064e23c68ad7f79eebf4df52f845d30f0899452be6f02f80b996"
		],
		"transactionsRoot": "0x18b4a7d6593186eac6ae87ae70b3426a80a495976b07417e6e0573963d41bfcb",
		"uncles": []
	},
	"id": 1
}
```

## Write to the network

Currently, the Polygon Gateway allows you to write to the network using the `eth_sendRawTransaction` RPC method. This creates a new message call transaction or a contract creation for signed transactions. The transactions are signed using a secret key corresponding to your own wallet.

Once you have a wallet set up and a method of signing your own transactions, you can write that transaction to the Polygon network via the [Cloudflare Polygon Gateway](/web3/polygon-gateway/reference/supported-api-methods/). Signed transactions use hexadecimal strings of the form:

```json
"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
```

Then you can use your [custom Gateway](/web3/how-to/manage-gateways/) to send the transaction to the network with a cURL command:

```bash
curl https://<YOUR_GATEWAY_HOSTNAME>/v1/mainnet -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],"id":1}'
```

You could also use a JS Fetch API request:

```js
await fetch(
  new Request('https://<YOUR_GATEWAY_HOSTNAME>/v1/mainnet', {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [
        '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
      ],
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

_(The actual command above will not work — you need to provide your own signed transaction.)_
