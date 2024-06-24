---
title: Get started
pcx_content_type: get-started
weight: 1
layout: wide
meta:
    title: Get Started — Regional Services
---

# Get Started

{{<Aside type="note">}}

Interested customers need to contact their account team to enable DNS Regionalisation.

{{</Aside>}}

You can use Regional Services through the dashboard or via API.

## Configure Regional Services in the dashboard

To use Regional Services, you need to first create a DNS record in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select an account and domain.
2. Go to the **DNS** tab.
3. Follow these steps to [create a DNS record](/dns/manage-dns-records/how-to/create-dns-records/).
4. From the **Region** dropdown, select the region you would like to use on your domain. This value will be applied to all DNS records on the same hostname. This means that if you have two DNS records of the same hostname and change the region for one of them, both records will have the same region.

{{<Aside type="note">}}

Some regions may not appear on the dropdown because newly announced regions mentioned in the [blog post](https://blog.cloudflare.com/expanding-regional-services-configuration-flexibility-for-customers) are subject to approval by Cloudflare's internal team. For more information and entitlement reach out to your account team.

{{</Aside>}}

Refer to the table below for the complete list of available regions and their definitions.

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
| South Korea | Cloudflare will only use data centers that are physically located within South Korea to decrypt and service HTTPS traffic. |
| Austria | Cloudflare will only use data centers that are physically located within Austria to decrypt and service HTTPS traffic. |
| Brazil | Cloudflare will only use data centers that are physically located within Brazil to decrypt and service HTTPS traffic. |
| Cloudflare Green Energy | Cloudflare will only use data centers that are committed to powering their operations with renewable energy. |
| Exclusive of Hong Kong and Macau | Cloudflare will only use data centers that are NOT physically located within Hong Kong and Macau to decrypt and service HTTPS traffic. |
| Exclusive of Russia and Belarus | Cloudflare will only use data centers that are NOT physically located within Russia and Belarus to decrypt and service HTTPS traffic. |
| France | Cloudflare will only use data centers that are physically located within Metropolitan France (the European territory of France) to decrypt and service HTTPS traffic. |
| Hong Kong | Cloudflare will only use data centers that are physically located within Hong Kong to decrypt and service HTTPS traffic. |
| Italy | Cloudflare will only use data centers that are physically located within Italy to decrypt and service HTTPS traffic. |
| NATO | Cloudflare will only use data centers that are physically located within North Atlantic Treaty Organization (NATO) countries. For more details, refer to the [list of NATO countries](https://www.nato.int/nato-welcome/).
| Netherlands | Cloudflare will only use data centers that are physically located within the Netherlands to decrypt and service HTTPS traffic. |
| Russia | Cloudflare will only use data centers that are physically located within Russia to decrypt and service HTTPS traffic. |
| Saudi Arabia | Cloudflare will only use data centers that are physically located within Saudi Arabia to decrypt and service HTTPS traffic. |
| South Africa | Cloudflare will only use data centers that are physically located within South Africa to decrypt and service HTTPS traffic. |
| Spain | Cloudflare will only use data centers that are physically located within Spain to decrypt and service HTTPS traffic. |
| Switzerland | Cloudflare will only use data centers that are physically located within Switzerland to decrypt and service HTTPS traffic. |
| Taiwan | Cloudflare will only use data centers that are physically located within Taiwan to decrypt and service HTTPS traffic. |
| US State of California | Cloudflare will only use data centers that are physically located within the US State of California to decrypt and service HTTPS traffic. |
| US State of Florida | Cloudflare will only use data centers that are physically located within the US State of Florida to decrypt and service HTTPS traffic. |
| US State of Texas | Cloudflare will only use data centers that are physically located within the US State of Texas to decrypt and service HTTPS traffic. |

## Configure Regional Services via API

You can also use Regional Services via API. These are some examples of API requests.

{{<details header="List all the available regions">}}

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

{{</details>}}

{{<details header="Create a new regional hostname entry">}}

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

{{</details>}}

{{<details header="List all regional hostnames for a zone or get a specific one">}}

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

{{</details>}}

{{<details header="List all regional hostnames for a specific zone">}}

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

{{</details>}}

{{<details header="Patch the region for a specific hostname">}}

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

{{</details>}}

{{<details header="Delete the region configuration">}}

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

{{</details>}}

## Terraform support

You can also configure Regional Services using Terraform. For more details, refer to the [`cloudflare_regional_hostname` resource](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/regional_hostname) in the Terraform documentation.
