---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Linux | CMD | Powershell">}}
{{<tab label="linux" default="true">}}

```bash
curl --silent --request GET \
 --url https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag \
 --header 'Authorization: Bearer <API_TOKEN>' \
 --header 'Content-Type: application/json' | jq .result
```

{{</tab>}}
{{<tab label="cmd">}}

```txt
curl.exe -s GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag" -H "Authorization: Bearer <API_TOKEN>"
```
{{</tab>}}
{{<tab label="powershell">}}

```powershell
$uri = "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag"
$headers = @{"Authorization" = "Bearer <API_TOKEN>"}
Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -ContentType "application/json"
```
{{</tab>}}

{{</tabs>}}