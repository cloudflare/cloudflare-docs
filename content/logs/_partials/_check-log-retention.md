---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Linux | CMD | Powershell">}}
{{<tab label="linux" default="true">}}

```sh
curl --silent --request GET \
  --url https://api.cloudflare.com/client/v4/zones/<ZONEID>/logs/control/retention/flag \
  --header 'Authorization: Bearer <TOKEN>' \
  --header 'Content-Type: application/json' | jq .result
```

{{</tab>}}
{{<tab label="cmd">}}

```sh
curl.exe -s GET "https://api.cloudflare.com/client/v4/zones/<ZONEID>/logs/control/retention/flag" -H "Authorization: Bearer <TOKEN>"
```
{{</tab>}}
{{<tab label="powershell">}}

```sh
$uri = "https://api.cloudflare.com/client/v4/zones/<ZONEID>/logs/control/retention/flag"
$headers = @{"Authorization" = "Bearer <TOKEN>"}
Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -ContentType "application/json"
```
{{</tab>}}

{{</tabs>}}