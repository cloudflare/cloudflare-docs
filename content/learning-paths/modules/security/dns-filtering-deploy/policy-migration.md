---
title: Ways to migrate policies
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

## UI

## API
```sh
curl --request POST \
--url https://api.cloudflare.com/client/v4/accounts/{accountid}/gateway/lists \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--data '{
  "description": "[ 10.226.0.177/32 10.226.1.177/32 ]", "items": [{"value": "10.226.0.177/32"},{"value": "10.226.1.177/32"}], "name": "Umbrella-List-One", "type": "IP" }'
```

## Terraform


## Descaler program
