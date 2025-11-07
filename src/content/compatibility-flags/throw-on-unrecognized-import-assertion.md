---
_build:
  publishResources: false
  render: never
  list: never

name: "Throw on unrecognized import assertions"
sort_date: "2025-06-16"
enable_date: "2025-06-16"
enable_flag: "throw_on_unrecognized_import_assertion"
disable_flag: "ignore_unrecognized_import_assertion"
---

The `throw_on_unrecognized_import_assertion` flag controls how Workers handle
import attributes that are not recognized by the runtime. Previously, Workers
would ignore all import attributes, which is not compliant with the
specification. Runtimes are expected to throw an error when an import
attribute is encountered that is not recognized.

When the `ignore_unrecognized_import_assertion` flag is set, Workers will
ignore unrecognized import attributes.

