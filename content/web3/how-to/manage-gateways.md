---
pcx-content-type: how-to
title: Manage gateways
weight: 1
---

# Manage gateways

You can interact with a Web3 gateway in several ways.

## Create a gateway

### Via the API

For a full list of gateway properties, refer to [Create Web3 Hostname](https://api.cloudflare.com/#web3-hostname-create-web3-hostname). If you need help with API authentication, refer to [Cloudflare API Quickstart](/api/).

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/web3/hostnames" \
-H "Content-Type: application/json" \
-d '{
    "result": {
        "name": "gateway.example.com",
        "description":"This is my IPFS gateway.",
        "target":"ipfs",
        "dnslink":"/ipns/onboarding.ipfs.cloudflare.com"
    }
}'
```

The response contains the complete definition of the new gateway.

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "<WEB_3_GATEWAY_ID>",
    "name": "gateway.example.com",
    "description": "This is my IPFS gateway.",
    "status": "active",
    "target": "ipfs",
    "dnslink": "/ipns/onboarding.ipfs.cloudflare.com",
    "created_on": "<CREATED_ON_DATE>",
    "modified_on": "<MODIFIED_ON_DATE>"
  }
}
```

---

## Edit a gateway

### Via the API

To edit specific settings for a gateway, use a [PATCH](https://api.cloudflare.com/#web3-hostname-edit-web3-hostname) request.

---

## Delete a gateway

### Via the API

To delete a gateway using the API, send a [DELETE](https://api.cloudflare.com/#web3-hostname-delete-web3-hostname) request.
