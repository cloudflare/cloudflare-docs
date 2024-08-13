---
title: Configure via API
pcx_content_type: how-to
weight: 3
meta:
  title: Configure a Cloud Connector rule via API
---

# Configure a rule via API

You can configure Cloud Connector rules using the [Cloudflare API](/fundamentals/api/).

## Required permissions

The [API token](/fundamentals/api/get-started/create-token/) used in API requests to manage Cloud Connector rules must have at least the following permission:

- _Zone_ > _Cloud Connector_ > _Write_

{{<Aside type="note" header="Note">}}
A token with this permission is only valid for the Cloud Connector endpoints described in this page. You cannot use it to interact with the `http_cloud_connector` phase via [Rulesets API](/ruleset-engine/rulesets-api/).
{{</Aside>}}

## Endpoints

To obtain the complete endpoint, append the Cloud Connector endpoints listed below to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4
```

The `{zone_id}` argument is the [zone ID](/fundamentals/setup/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

Operation | Verb + Endpoint
----------|----------------
List Cloud Connector rules | `GET zones/{zone_id}/cloud_connector/rules`
Create/update/delete Cloud Connector rules | `PUT /zones/{zone_id}/cloud_connector/rules`

## Example API calls

### List of Cloud Connector rules

The following example returns a list of existing Cloud Connector rules:

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/cloud_connector/rules \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "id": "<RULE_1_ID>",
      "provider": "aws_s3",
      "expression": "http.request.uri.path wildcard \"/images/*\"",
      "description": "Connect to S3 bucket containing images",
      "enabled": true,
      "parameters": {
        "host": "examplebucketwithimages.s3.north-eu.amazonaws.com"
      }
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

### Create/update/delete Cloud Connector rules

The following example request will replace all existing Cloud Connector rules with a single rule:

```bash
curl --request PUT \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/cloud_connector/rules" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '[
  {
    "expression": "http.request.uri.path wildcard \"/images/*\"",
    "provider": "aws_s3",
    "description": "Connect to S3 bucket containing images",
    "parameters": {
      "host": "examplebucketwithimages.s3.north-eu.amazonaws.com"
    }
  }
]'
```

The required body parameters for each rule are: `expression`, `provider`, and `parameters.host`.

The `provider` value must be one of the following: `aws_s3`, `azure_storage` and `gcp_storage`.

{{<Aside type="warning" header="Warning">}}
To create a new rule and keep all existing rules, you must include them all in your request body. Omitting an existing rule in the request body will delete the corresponding Cloud Connector rule.
{{</Aside>}}
