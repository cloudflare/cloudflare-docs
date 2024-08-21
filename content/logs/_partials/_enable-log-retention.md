---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Linux | CMD | Powershell">}}
{{<tab label="linux" default="true">}}

```bash
curl --silent --request POST \
 --url https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag \
 --header "Authorization: Bearer <API_TOKEN>" \
 --header 'Content-Type: application/json' \
 --data '{"flag": true}' | jq .result
```

{{</tab>}}
{{<tab label="cmd">}}

```txt
curl.exe -s POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag" -H "Authorization: Bearer <API_TOKEN>" -d "{""flag"":true}"
```
{{</tab>}}
{{<tab label="powershell">}}

```powershell
$uri = "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag"
$headers = @{"Authorization" = "Bearer <API_TOKEN>"}
$bodyFlag = @{flag = $true} | ConvertTo-Json
Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $bodyFlag -ContentType "application/json"
```
{{</tab>}}

{{</tabs>}}