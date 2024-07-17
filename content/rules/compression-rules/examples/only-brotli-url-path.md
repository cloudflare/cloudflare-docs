---
pcx_content_type: example
summary: Create a compression rule to set Brotli as the only supported compression algorithm for a specific URI path.
product:
  - Compression Rules
title: Use only Brotli compression for a specific path
---

# Use only Brotli compression for a specific URI path

The following example rule will configure only Brotli compression for a specific URI path.

{{<example>}}

**When incoming requests match**

- Custom filter expression:

    - _URI Path_ _equals_ `/download/assets.tar`

**Then**

- **Compression options**: Custom
- **Define a custom order for compression types**: `Brotli`

{{</example>}}

Since the rule configuration does not include _Auto_ at the end of the custom algorithms list, the response will be uncompressed if the web visitor does not support Brotli.

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
      "expression": "http.request.uri.path eq \"/download/assets.tar\"",
      "action": "compress_response",
      "action_parameters": {
        "algorithms": [
          { "name": "brotli" }
        ]
      }
    }
  ]
}'