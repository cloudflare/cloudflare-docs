---
_build:
  publishResources: false
  render: never
  list: never

name: "Spec-compliant WritableStream writer behavior"
sort_date: "2026-03-24"
enable_date: "2026-03-24"
enable_flag: "writable_stream_spec_compliant_writer"
disable_flag: "no_writable_stream_spec_compliant_writer"
---

When `writable_stream_spec_compliant_writer` is enabled, several `WritableStream` spec compliance issues around writer lock and release behavior are fixed to match the [WHATWG Streams Standard](https://streams.spec.whatwg.org/).
