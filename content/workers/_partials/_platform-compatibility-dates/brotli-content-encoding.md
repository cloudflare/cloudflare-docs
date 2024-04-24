---
_build:
  publishResources: false
  render: never
  list: never

name: "Brotli Content-Encoding support"
sort_date: "2024-04-29"
enable_date: "2024-04-29"
enable_flag: "brotli_content_encoding"
disable_flag: "no_brotli_content_encoding"
---

When the `brotli_content_encoding` compatibility flag is enabled, Workers supports the `br` content encoding and can request and respond with data encoded using the [Brotli](https://developer.mozilla.org/en-US/docs/Glossary/Brotli_compression) compression algorithm. This reduces the amount of data that needs to be fetched and can be used to pass through the original compressed data to the client. See the Fetch API [documentation](/workers/runtime-apis/fetch/#how-the-accept-encoding-header-is-handled) for details.
