---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Linux | CMD | Powershell">}}
{{<tab label="linux" default="true">}}

```sh
curl --silent --request POST \
  --url https://api.cloudflare.com/client/v4/zones/<ZONEID>/logs/control/retention/flag \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{"flag": false}' | jq .result
```

{{</tab>}}
{{<tab label="cmd">}}

```sh
curl.exe -s POST "https://api.cloudflare.com/client/v4/zones/<ZONEID>/logs/control/retention/flag" -H "Authorization: Bearer <TOKEN>" -d "{""flag"":false}"
```
{{</tab>}}
{{<tab label="powershell">}}

```sh
$uri = "https://api.cloudflare.com/client/v4/zones/<ZONEID>/logs/control/retention/flag"
$headers = @{"Authorization" = "Bearer <TOKEN>"}
$bodyFlag = @{flag = $false} | ConvertTo-Json
Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $bodyFlag -ContentType "application/json"
```
{{</tab>}}

{{</tabs>}}