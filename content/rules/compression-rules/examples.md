---
title: Examples
pcx_content_type: configuration
weight: 5
meta:
  title: Compression rules examples
---

# Compression rules examples

The following examples cover common patterns for configuring compression rules.

## Do not apply compression to AVIF images

The following example rule will disable compression for AVIF images, based on either the content type or the file extension specified in the request.

{{<example>}}

**When incoming requests match**
- _Media Type_ _equals_ `image/avif` **OR**
- _File extension_ _equals_ `avif`

**Then**
- **Compression options** > _Disable compression_

{{</example>}}

<details>
<summary>Example API request</summary>
<div>

The following example sets the rules of an existing [entry point ruleset](/ruleset-engine/about/phases/#phase-entry-point-ruleset) (with ID `{ruleset_id}`) for the `http_response_compression` phase to a single compression rule, using the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation:

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
```

</div>
</details>

## Use GZIP compression for CSV files or other algorithm if not available

The following example rule will configure GZIP compression as the preferred compression method for CSV files. If the visitor does not support this algorithm, Cloudflare will try to compress the response using a different algorithm supported by the visitor.

{{<example>}}

**When incoming requests match**
- _File extension_ _equals_ `csv`

**Then**
- **Compression options** > _Custom_ > `Gzip`, `Auto`

{{</example>}}

<details>
<summary>Example API request</summary>
<div>

The following example sets the rules of an existing [entry point ruleset](/ruleset-engine/about/phases/#phase-entry-point-ruleset) (with ID `{ruleset_id}`) for the `http_response_compression` phase to a single compression rule, using the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation:

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
```

</div>
</details>

## Use only Brotli compression for a specific URI path

The following example rule will configure only Brotli compression for a specific URI path.

{{<example>}}

**When incoming requests match**
- _URI Path_ _equals_ `/download/assets.tar`

**Then**
- **Compression options** > _Custom_ > `Brotli`

{{</example>}}

Since the rule configuration does not include _Auto_ at the end of the custom algorithms list, the response will be uncompressed if the web visitor does not support Brotli.

<details>
<summary>Example API request</summary>
<div>

The following example sets the rules of an existing [entry point ruleset](/ruleset-engine/about/phases/#phase-entry-point-ruleset) (with ID `{ruleset_id}`) for the `http_response_compression` phase to a single compression rule, using the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation:

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
```

</div>
</details>
