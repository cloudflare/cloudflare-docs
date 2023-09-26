---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName
---

Bidirectional health checks are available for GRE and IPsec tunnels. Right now you can configure them via the API, and the dashboard option will be available in the near future.

For Magic WAN this option defaults to bidirectional, while for Magic Transit it defaults to unidirectional.

You can enable bidirectional health checks via API with `-- data '{"health_check": {"direction": "bidirectional"}}'`. For example: 

```bash
curl --request https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
-- data '{"health_check": {"direction": "bidirectional"}}'
```
