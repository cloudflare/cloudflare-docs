---
_build:
  publishResources: false
  render: never
  list: never

name: "Properly extract blob MIME type from `content-type` headers"
sort_date: "2024-06-03"
enable_date: "2024-06-03"
enable_flag: "blob_standard_mime_type"
disable_flag: "blob_legacy_mime_type"
---

When calling `response.blob.type()`, the MIME type will now be properly extracted from `content-type` headers, per the [WHATWG spec](https://fetch.spec.whatwg.org/#concept-header-extract-mime-type).
