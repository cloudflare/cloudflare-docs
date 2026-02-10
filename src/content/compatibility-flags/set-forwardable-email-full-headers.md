---
_build:
  publishResources: false
  render: never
  list: never

name: "Set forwardable email full headers"
sort_date: "2025-08-01"
enable_date: "2025-08-01"
enable_flag: "set_forwardable_email_full_headers"
disable_flag: "set_forwardable_email_single_headers"
---

The original version of the headers sent to edgeworker were truncated to a
single value for specific header names, such as To and Cc. With the
`set_forwardable_email_full_headers` flag set, Workers will receive the full
header values to the worker script.
