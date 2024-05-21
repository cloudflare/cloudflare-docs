---
title: Example rules
pcx_content_type: configuration
weight: 3
meta:
  title: Example rules for content scanning
---

# Example rules

## Log requests with an uploaded content object

This [custom rule](/waf/custom-rules/) example logs all requests with at least one uploaded content object:

* Expression: `cf.waf.content_scan.has_obj`
* Action: _Log_

## Block requests to URI path with a malicious content object

This custom rule example blocks requests addressed at `/upload.php` that contain at least one uploaded content object considered malicious:

* Expression: `cf.waf.content_scan.has_malicious_obj and http.request.uri.path eq "/upload.php"`
* Action: _Block_

## Block requests with non-PDF file uploads

This custom rule example blocks requests addressed at `/upload` with uploaded content objects that are not PDF files:

* Expression: `any(cf.waf.content_scan.obj_types[*] != "application/pdf") and http.request.uri.path eq "/upload"`
* Action: _Block_

## Block requests with uploaded files over 500 KB

This custom rule example blocks requests addressed at `/upload` with uploaded content objects over 500 KB in size:

* Expression: `any(cf.waf.content_scan.obj_sizes[*] > 500000) and http.request.uri.path eq "/upload"`
* Action: _Block_

## Block requests with uploaded files over the content scanning limit (15 MB)

This custom rule example blocks requests with uploaded content objects over 15 MB in size (the current content scanning limit):

* Expression: `any(cf.waf.content_scan.obj_sizes[*] >= 15000000)`
* Action: _Block_

In this example, you must also test for equality because currently any file over 15 MB will be handled internally as if it had a size of 15 MB. This means that using the `>` (greater than) [comparison operator](/ruleset-engine/rules-language/operators/#comparison-operators) would not work for this particular rule — you should use `>=` (greater than or equal) instead.
