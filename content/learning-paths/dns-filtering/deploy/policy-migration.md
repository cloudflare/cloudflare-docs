---
title: Policy migration
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Learn about different ways to migrate policies from a third-party DNS filtering service to Cloudflare Zero Trust.

## UI

As discussed in a [previous module](/learning-paths/dns-filtering/create-policy/), you can download existing allowlists and blocklists from the third-party service and [upload the CSV files](/learning-paths/dns-filtering/create-policy/create-list/) to the  Zero Trust dashboard.

## API

You can use the [Cloudflare API](/api/operations/zero-trust-lists-create-zero-trust-list) to create a list of IPs or domains:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/lists \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--data '{
  "description": "Corporate IPs", "items": [{"value": "10.226.0.177/32"},{"value": "10.226.1.177/32"}], "name": "Umbrella-List-One", "type": "IP" }'
```

## Terraform

You can use the [Cloudflare Terraform provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/teams_list) to create a list of IPs or domains:

```tf
resource "cloudflare_teams_list" "example" {
  account_id  = "f037e56e89293a057740de681ac9abbe"
  name        = "Umbrella-List-One"
  type        = "IP"
  description = "Corporate IPs"
  items       = ["10.226.0.177/32", "10.226.1.177/32"]
}
```

## Descaler program

If you are an Enterprise organization migrating from Zscaler, you can use our [Descaler toolkit](https://blog.cloudflare.com/descaler-program/) to export policies from Zscaler Internet Access (ZIA) and import them into Cloudflare Gateway.
