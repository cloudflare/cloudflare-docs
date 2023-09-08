---
_build:
  publishResources: false
  render: never
  list: never

name: "Strict compression error checking"
# sort date incremented by 1, noCfBotManagementDefault has the same
# compatibility date but was added first.
sort_date: "2023-08-02"
enable_date: "2023-08-01"
enable_flag: "strict_compression_checks"
disable_flag: "no_strict_compression_checks"
---

Perform additional error checking in the Compression Streams API and throw an error if a `DecompressionStream` has trailing data or gets closed before the full compressed data has been provided.
