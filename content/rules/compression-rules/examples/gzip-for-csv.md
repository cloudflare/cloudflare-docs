---
pcx_content_type: example
summary: Create a compression rule to set Gzip compression as the preferred compression method for CSV files.
product:
  - Compression Rules
title: Use Gzip compression for CSV files
---

# Use Gzip compression for CSV files or other algorithm if not available

The following example rule will configure Gzip compression as the preferred compression method for CSV files. If the visitor does not support this algorithm, Cloudflare will try to compress the response using a different algorithm supported by the visitor.

{{<example>}}

**When incoming requests match**

- Custom filter expression:

    - _File extension_ _equals_ `csv`

**Then**

- **Compression options**: Custom
- **Define a custom order for compression types**: `Gzip`, `Auto`

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
      "expression": "http.request.uri.path.extension eq \"csv\"",
      "action": "compress_response",
      "action_parameters": {
        "algorithms": [
          { "name": "gzip" },
          { "name": "auto" }
        ]
      }
    }
  ]
}'