---
_build:
  publishResources: false
  render: never
  list: never

name: "TextDecoder replaces lone surrogates"
sort_date: "2026-02-24"
enable_date: "2026-02-24"
enable_flag: "text_decoder_replace_surrogates"
disable_flag: "disable_text_decoder_replace_surrogates"
---

When `text_decoder_replace_surrogates` is enabled, the UTF-16le `TextDecoder` will replace lone surrogates with U+FFFD (the Unicode replacement character) as required by the [Encoding Standard](https://encoding.spec.whatwg.org/). Previously, lone surrogates were passed through unchanged, producing non-well-formed strings.
