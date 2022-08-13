---
_build:
  publishResources: false
  render: never
  list: never
---

For a full list of gateway properties, refer to [Create Web3 Hostname](https://api.cloudflare.com/#web3-hostname-create-web3-hostname). If you need help with API authentication, refer to [Cloudflare API Quickstart](/api/).

```bash
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/web3/hostnames" \
-H "Content-Type: application/json" \
-d '{
      "name": "gateway.example.com",
      "description":"This is my IPFS gateway.",
      "target":"ipfs",
      "dnslink":"/ipns/onboarding.ipfs.cloudflare.com"
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
    "id": "<WEB3_GATEWAY_ID>",
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