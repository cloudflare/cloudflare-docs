---
_build:
  publishResources: false
  render: never
  list: never

name: "Enhanced error serialization"
sort_date: "2026-04-21"
enable_date: "2026-04-21"
enable_flag: "enhanced_error_serialization"
disable_flag: "legacy_error_serialization"
---

When `enhanced_error_serialization` is enabled, errors serialized using `structuredClone()` or V8 serialization support more error types and include own properties on the error object.

Note that when enabled, deserialization of errors will not preserve the original stack trace by default.

Previously, only basic `Error` types were serialized, and own properties added to error objects were lost during serialization.
