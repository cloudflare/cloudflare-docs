---
_build:
  publishResources: false
  render: never
  list: never

name: "Throw On Not Implements TLS Options"
sort_date: "2026-06-16"
enable_date: "2026-06-16"
enable_flag: "throw_on_not_implemented_tls_options"
disable_flag: "no_throw_on_not_implemented_tls_options"
---

When enabled, passing unsupported TLS options (e.g. `checkServerIdentity`) to `tls.connect()` or `new TLSSocket()` throws `ERR_OPTION_NOT_IMPLEMENTED` instead of silently ignoring them
