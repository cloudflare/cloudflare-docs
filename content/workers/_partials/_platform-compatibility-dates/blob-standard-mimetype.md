---
_build:
  publishResources: false
  render: never
  list: never

name: "Selecting the correct mime type for a Blob from a fetch"
sort_date: "2024-06-03"
enable_date: "2024-06-03"
enable_flag: "blob_standard_mime_type"
disable_flag: "blob_legacy_mime_type"
---

In the original implementation of the fetch `Body` mixin, the runtime would incorrectly assign the value of the Blob's MIME `type` property when the `Content-Type` header provided multiple or invalid values. This behavior is inconsistent with the `fetch()` standard which defines a specific algorithm for determining the MIME type of a Blob.

When the `blob_standard_mime_type` flag is used, the fetch `Body` mixin will implement the correct standard behavior.
