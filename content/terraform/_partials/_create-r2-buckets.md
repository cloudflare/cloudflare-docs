---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Wrangler | API">}}
{{<tab label="wrangler" default="true">}}

```sh
$ wrangler r2 bucket create your-tfstate-bucket-name
```

{{</tab>}}
{{<tab label="api">}}

```bash
 curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/buckets \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header 'Content-Type: application/json' \
  --data '{"name": "your-tfstate-bucket-name"}'
```
{{</tab>}}
{{</tabs>}}