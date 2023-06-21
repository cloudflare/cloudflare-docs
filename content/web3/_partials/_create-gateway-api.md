---
_build:
  publishResources: false
  render: never
  list: never
---

To create a gateway using the API, send a [`POST`](/api/operations/web3-hostname-create-web3-hostname) request that includes the following parameters:

- `name`: The hostname that will point to the target gateway via a `CNAME` record.
- `target`: The gateway target for the hostname (`ethereum`, `ipfs`, `ipfs_universal_path`, `polygon`).

If you need help with API authentication, refer to [Cloudflare API documentation](/fundamentals/api/).

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