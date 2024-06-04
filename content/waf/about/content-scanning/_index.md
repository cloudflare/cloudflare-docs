---
title: Uploaded content scanning
pcx_content_type: concept
weight: 3
---

# Uploaded content scanning

WAF content scanning is a WAF [traffic detection](/waf/about/#detection-versus-mitigation) that scans content being uploaded to your application.

When enabled, content scanning attempts to detect content objects, such as uploaded files, and scans them for malicious signatures like malware. The scan results, along with additional metadata, are exposed as fields available in WAF [custom rules](/waf/custom-rules/), allowing you to implement fine-grained mitigation rules.

{{<Aside type="note">}}
This feature is available to customers on an Enterprise plan with a paid add-on.
{{</Aside>}}

## How it works

Once enabled, content scanning will run for all incoming traffic, identifying {{<glossary-tooltip term_id="content object" link="#what-is-a-content-object">}}content objects{{</glossary-tooltip>}} automatically.

For every request with one or more detected content objects, the content scanner connects to an antivirus (AV) scanner to perform a thorough analysis of the content objects. Using the results of the scan, the WAF will populate several fields you can use in rule expressions. For example, you can create a basic rule to block requests containing malicious files, or a more complex rule where the expression matches specific file sizes, file types, or URI paths.

Cloudflare uses the same [anti-virus (AV) scanner used in Cloudflare Zero Trust](/cloudflare-one/policies/gateway/http-policies/antivirus-scanning/) for WAF content scanning.

{{<Aside type="warning" header="Warning">}}
Content scanning will not apply any mitigation actions to requests with content objects considered malicious. It only provides a signal that you can use to define your attack mitigation strategy. You must create rules — [custom rules](/waf/custom-rules/) or [rate limiting rules](/waf/rate-limiting-rules/) — to perform actions based on detected signals.

For more information on detection versus mitigation, refer to [Concepts](/waf/about/#detection-versus-mitigation).
{{</Aside>}}

## What is a content object?

A content object is any request payload detected by heuristics that does not match any of the following types: `text/html`, `text/x-shellscript`, `application/json`, `text/csv`, and `text/xml`. All other content types are considered a content object, such as the following:

- Executable files (for example, `.exe`, `.bat`, `.dll`, and `.wasm`)
- Documents (for example, `.doc`, `.docx`, `.pdf`, `.ppt`, and `.xls`)
- Compressed files (for example, `.gz`, `.zip`, and `.rar`)
- Image files (for example, `.jpg`, `.png`, `.gif`, `.webp`, and `.tif`)
- Video and audio files

Content scanning does not take the request's `Content-Type` header into account, since this header can be manipulated. If the system detects a malicious object but cannot determine its exact content type, it reports the malicious content object as having an `application/octet-stream` content type.

## Scanned content

Content scanning can check the following content objects for malicious content:

- Uploaded files in a request
- Portions of the request body for multipart requests encoded as `multipart/form-data` or `multipart/mixed`
- Specific JSON properties in the request body (containing, for example, files encoded in Base64) according to the [custom scan expressions](#custom-scan-expressions) you provide

All content objects in an incoming request will be checked, namely for requests with multiple uploaded files (for example, a submitted HTML form with several file inputs).

The content scanner will fully check content objects with a size up to 15 MB. For larger content objects, the scanner will analyze the first 15 MB and provide scan results based on that portion of the object.

{{<Aside type="warning" header="Warning">}}
The AV scanner will not scan some particular types of files, namely encrypted or password-protected files. Refer to [Non-scannable files](/cloudflare-one/policies/gateway/http-policies/antivirus-scanning/#non-scannable-files) for a list of AV scanning limitations.
{{</Aside>}}

## Custom scan expressions

Sometimes, you may wish to specify where to find the content objects, such as when the content is a Base64-encoded string within a JSON payload. For example:

```json
{"file": "<BASE64_ENCODED_STRING>"}
```

In these situations, configure a custom scan expression to tell the content scanner where to find the content objects. For more information, refer to [Configure a custom scan expression](/waf/about/content-scanning/get-started/#4-optional-configure-a-custom-scan-expression).

## ​​Content scanning fields

When content scanning is enabled, you can use the following fields in WAF rules:

{{<table-wrap>}}

Field name in the dashboard         | Field name in expressions
------------------------------------|--------------------------------------
Has content object                  | [`cf.waf.content_scan.has_obj`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-has_obj)
Has malicious content object        | [`cf.waf.content_scan.has_malicious_obj`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-has_malicious_obj)
Number of malicious content objects | [`cf.waf.content_scan.num_malicious_obj`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-num_malicious_obj)
Content scan has failed             | [`cf.waf.content_scan.has_failed`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-has_failed)
Number of content objects           | [`cf.waf.content_scan.num_obj`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-num_obj)
Content object size (in bytes)      | [`cf.waf.content_scan.obj_sizes`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-obj_sizes)
Content object type                 | [`cf.waf.content_scan.obj_types`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-obj_types)
Content object result<br>Values: `clean`, `suspicious`,<br>`infected`, and `not scanned` | [`cf.waf.content_scan.obj_results`](/ruleset-engine/rules-language/fields/#field-cf-waf-content_scan-obj_results)

{{</table-wrap>}}

For examples of rule expressions using these fields, refer to [Example rules](/waf/about/content-scanning/example-rules/).
