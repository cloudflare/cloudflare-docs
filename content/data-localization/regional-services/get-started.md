---
title: Get started
pcx_content_type: get-started
weight: 1
layout: list
---

# Get Started

You can use Regional Services through the dashboard or via API.

## Configure Regional Services in the dashboard

To use Regional Services, you need to first create a DNS record in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select an account and domain.
2. Go to the **DNS** tab.
3. Follow these steps to [create a DNS record](/dns/manage-dns-records/how-to/create-dns-records/).
4. From the **Region** dropdown, select the region you would like to use on your domain. Refer to the table below for the complete list of available regions and their definitions. Note that only Super Administrators can view and edit the DNS Region used for Regional Services.

{{<table-wrap style="font-size: 87%">}}

| Region | Definition |
| --- | --- |
| Australia | Cloudflare will only use data centers that are physically located within Australia to decrypt and service HTTPS traffic. |
| Canada | Cloudflare will only use data centers that are physically located within Canada to decrypt and service HTTPS traffic. |
| European Union | Cloudflare will only use data centers that are physically located within the European Union. For more details, refer to the [list of European Union countries](https://european-union.europa.eu/principles-countries-history/country-profiles_en). |
| India | Cloudflare will only use data centers that are physically located within India to decrypt and service HTTPS traffic. |
| Japan | Cloudflare will only use data centers that are physically located within Japan to decrypt and service HTTPS traffic. |
| United States of America | Cloudflare will only use data centers that are physically located within the United States of America to decrypt and service HTTPS traffic. |
| FedRAMP Compliant | Cloudflare will only use data centers that are FedRAMP certified. |
| ISO 27001 Certified European Union | Cloudflare will only use data centers that are physically located within the [European Union](https://european-union.europa.eu/principles-countries-history/country-profiles_en) and that adhere to the ISO 27001 certification. |
| Germany | Cloudflare will only use data centers that are physically located within Germany to decrypt and service HTTPS traffic. |
| Singapore | Cloudflare will only use data centers that are physically located within Singapore to decrypt and service HTTPS traffic. |

{{</table-wrap>}}

## Configure Regional Services via API

You can also use Regional Services via API. These are some examples of API requests.

<details>
<summary>List all the available regions</summary>
<div>

```bash
---
header: Request
---
curl -X GET "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/addressing/regional_hostnames/regions" \
     -H "Content-Type:application/json" \
     -H "X-Auth-Key:<API_KEY>" \
     -H "X-Auth-Email:<EMAIL>" | jq .
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "result": [
    {
      "key": "ca",
      "label": "Canada"
    },
    {
      "key": "eu",
      "label": "Europe"
    }
  ],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Create a new regional hostname entry</summary>
<div>

```bash
---
header: Request
---
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/addressing/regional_hostnames" \
     -H "Content-Type:application/json" \
     -H "X-Auth-Key:<API_KEY>" \
     -H "X-Auth-Email:<EMAIL>" \
     -d '{"hostname": "ca.regional.ipam.rocks", "region_key": "ca"}' | jq .
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "result": {
    "hostname": "ca.regional.ipam.rocks",
    "region_key": "ca",
    "created_on": "2023-01-13T23:59:45.276558Z"
  },
  "messages": []
}
```

</div>
</details>

<details>
<summary>List all regional hostnames for a zone or get a specific one</summary>
<div>

```bash
---
header: Request
---
curl -X GET "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/addressing/regional_hostnames" \
     -H "Content-Type:application/json" \
     -H "X-Auth-Key:<API_KEY>" \
     -H "X-Auth-Email:<EMAIL>" | jq .
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "result": [
    {
      "hostname": "ca.regional.ipam.rocks",
      "region_key": "ca",
      "created_on": "2023-01-14T00:47:57.060267Z"
    }
  ],
  "messages": []
}
```

</div>
</details>

<details>
<summary>List all regional hostnames for a specific zone</summary>
<div>

```bash
---
header: Request
---
curl -X GET "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/addressing/regional_hostnames/ca.regional.ipam.rocks" \
     -H "Content-Type:application/json" \
     -H "X-Auth-Key:<API_KEY>" \
     -H "X-Auth-Email:<EMAIL>" | jq .
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "result": {
    "hostname": "ca.regional.ipam.rocks",
    "region_key": "ca",
    "created_on": "2023-01-13T23:59:45.276558Z"
  },
  "messages": []
}
```

</div>
</details>

<details>
<summary>Patch the region for a specific hostname</summary>
<div>

```bash
---
header: Request
---
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/addressing/regional_hostnames/ca.regional.ipam.rocks" \
     -H "Content-Type:application/json" \
     -H "X-Auth-Key:<API_KEY>" \
     -H "X-Auth-Email:<EMAIL>" \
     -d '{"region_key": "eu"}' | jq .
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "result": {
    "hostname": "ca.regional.ipam.rocks",
    "region_key": "eu",
    "created_on": "2023-01-13T23:59:45.276558Z"
  },
  "messages": []
}
```

</div>
</details>

<details>
<summary>Delete the region configuration</summary>
<div>

```bash
---
header: Request
---
curl -X DELETE "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/addressing/regional_hostnames/ca.regional.ipam.rocks" \
     -H "Content-Type:application/json" \
     -H "X-Auth-Key:<API_KEY>" \
     -H "X-Auth-Email:<EMAIL>" | jq .
```

```json
---
header: Response
---
{
  "success": true,
  "errors": [],
  "result": null,
  "messages": []
}
```

</div>
</details>

## Terraform support

You can also configure Regional Services using Terraform. For more details, refer to the [`cloudflare_regional_hostname` resource](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/regional_hostname) in the Terraform documentation.