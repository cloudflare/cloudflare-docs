---
_build:
  publishResources: false
  render: never
  list: never

name: "Strip UTF-8 BOM in stream `readAllText()`"
sort_date: "2026-01-13"
enable_date: "2026-01-13"
enable_flag: "strip_bom_in_read_all_text"
disable_flag: "do_not_strip_bom_in_read_all_text"
---

When `strip_bom_in_read_all_text` is enabled, the `readAllText()` method on streams will strip a leading UTF-8 Byte Order Mark (BOM) if present, matching the expected behavior per web platform standards.

Previously, the BOM was included in the returned string, which could cause unexpected behavior when parsing text content.
