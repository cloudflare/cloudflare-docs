---
_build:
  publishResources: false
  render: never
  list: never
---

```bash
---
header: Request
---
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/<<ZONE_ID>>/ssl/certificate_packs/<<PACK_ID>>" \
     -H "X-Auth-Email: <<EMAIL>>" \
     -H "X-Auth-Key: <<AUTH_KEY>>" \
     -H "Content-Type: application/json"
     --data '{
        "certificate_authority":"google"
        }'
```