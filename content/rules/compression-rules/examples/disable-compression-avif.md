---
pcx_content_type: example
summary: Create a compression rule to turn off compression for AVIF images, based on either the content type or the file extension specified in the request.
product:
  - Compression Rules
title: Disable compression for AVIF images
---

# Disable compression for AVIF images

The following example rule will disable compression for AVIF images, based on either the content type or the file extension specified in the request.

{{<example>}}

**When incoming requests match**

- Custom filter expression:

    - _Media Type_ _equals_ `image/avif` **OR**
    - _File extension_ _equals_ `avif`

**Then**

- **Compression options** > _Disable compression_

{{</example>}}

## Example API request

The following example sets the rules of an existing [entry point ruleset](/ruleset-engine/about/rulesets/#entry-point-ruleset) (with ID `{ruleset_id}`) for the `http_response_compression` phase to a single compression rule, using the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation:

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "expression": "http.response.content_type.media_type eq \"image/avif\" or http.request.uri.path.extension eq \"avif\"",
      "action": "compress_response",
      "action_parameters": {
        "algorithms": [
          { "name": "none" }
        ]
      }
    }
  ]
}'