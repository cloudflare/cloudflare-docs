---
title: Common API calls
pcx_content_type: configuration
weight: 4
meta:
  title: Common API calls for content scanning
---

# Common API calls

## Required API token permissions

The API token used in API requests to manage WAF content scanning and custom scan expressions must have one of the following [permissions](/fundamentals/api/reference/permissions/):

- Zone WAF Edit
- Account WAF Edit

---

## General operations

The following API examples cover basic operations such as enabling and disabling WAF content scanning.

### Enable WAF content scanning

To enable content scanning, use a `POST` request similar to the following:

```bash
---
header: Example request
---
curl --request POST \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/enable" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

### Disable WAF content scanning

To disable content scanning, use a `POST` request similar to the following:

```bash
---
header: Example request
---
curl --request POST \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/disable" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

### Get WAF content scanning status

To obtain the current status of the content scanning feature, use a `GET` request similar to the following:

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/settings" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

## Custom expression operations

The following API examples cover operations on custom scan expressions for content scanning.

### Get existing custom scan expressions

To get a list of existing custom scan expressions, use a `GET` request similar to the following:

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "id": "<EXPRESSION_ID>",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

### Add a custom scan expression

Use a `POST` request similar to the following:

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '[
  {
    "payload": "lookup_json_string(http.request.body.raw, \"file\")"
  }
]'
```

### Delete a custom scan expression

Use a `DELETE` request similar to the following:

```bash
---
header: Example request
---
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads/{expression_id}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```
