---
_build:
  publishResources: false
  render: never
  list: never

name: "Spec-compliant TextEncoderStream/TextDecoderStream backpressure"
sort_date: "2026-03-24"
enable_date: "2026-03-24"
enable_flag: "encoder_stream_spec_compliant_backpressure"
disable_flag: "no_encoder_stream_spec_compliant_backpressure"
---

When `encoder_stream_spec_compliant_backpressure` is enabled, `TextEncoderStream` and `TextDecoderStream` use a readable-side high water mark of 0, as specified by the [WHATWG Encoding Standard](https://encoding.spec.whatwg.org/).

With a high water mark of 0, the readable side starts with backpressure applied, so writes correctly block until a reader pulls. Previously, the high water mark defaulted to 1, which caused `pull()` to fire at startup, clearing backpressure before any write occurred.
