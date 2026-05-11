---
_build:
  publishResources: false
  render: never
  list: never

name: "Dedicated CJK TextDecoder implementation"
sort_date: "2026-03-03"
enable_date: "2026-03-03"
enable_flag: "text_decoder_cjk_decoder"
disable_flag: "disable_text_decoder_cjk_decoder"
---

When `text_decoder_cjk_decoder` is enabled, a dedicated CJK `TextDecoder` implementation is used for CJK encoding overrides and Big5 lead-byte handling, instead of the legacy ICU-only code path. This improves spec compliance for CJK text decoding.
