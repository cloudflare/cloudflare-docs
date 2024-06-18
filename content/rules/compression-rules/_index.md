---
title: Compression Rules
pcx_content_type: concept
weight: 8
---

# Compression Rules

Use Compression Rules to customize the compression applied to responses from Cloudflare's global network to your website visitors, based on the file extension and content type. Compression Rules are powered by the [Ruleset Engine](/ruleset-engine/).

Cloudflare [compresses some responses by default](/speed/optimization/content/brotli/), based on the content type. With Compression Rules, you can customize the default behavior, which includes defining preferred compression algorithms for particular file types.

When there is a match for a compression rule configured with several compression algorithms, the selected algorithm is the first one supported by the website visitor, according to the received `accept-encoding` HTTP header. If multiple compression rules match, the last rule wins.

{{<render file="_rules-requirements.md" withParameters="Compression Rules require">}}

## Get started

Follow the instructions in the following pages to get started:

* [Create a compression rule in the dashboard](/rules/compression-rules/create-dashboard/)
* [Create a compression rule via Cloudflare API](/rules/compression-rules/create-api/)

---

## Availability

Compression Rules are available to Enterprise customers.

{{<feature-table id="rules.compression_rules">}}

## Relevant fields

The following fields are commonly used in expressions of compression rules:

{{<table-wrap>}}

Field in [Expression Builder](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder) | Field name
----------------------|-----------
_Media Type_ | [`http.response.content_type.media_type`](/ruleset-engine/rules-language/fields/#field-http-response-content_type-media_type)
_File extension_ | [`http.request.uri.path.extension`](/ruleset-engine/rules-language/fields/#field-http-request-uri-path-extension)
N/A | [`raw.http.request.uri.path.extension`](/ruleset-engine/rules-language/fields/#field-raw-http-request-uri-path-extension)

{{</table-wrap>}}

## Important remarks

* If there is a match for a compression rule but the client does not support any of the compression algorithms configured in the rule (according to the provided `Accept-Encoding` request header), the response sent to the client will not be compressed.

* If there is a match for a compression rule but the response sent from the origin server contains a `cache-control: no-transform` HTTP header, the compression rule will not perform any changes to the response.

{{<render file="_troubleshoot-rules-with-trace.md" withParameters="compression rules">}}