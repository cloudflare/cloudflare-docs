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

The `throw_on_unrecognized_import_assertion` and `ignore_unrecognized_import_assertion` flags apply only to the legacy module registry.

The legacy registry previously ignored unrecognized import attributes. The `throw_on_unrecognized_import_assertion` flag rejects them instead.

The `ignore_unrecognized_import_assertion` flag restores the previous behavior.

The [new module registry](/workers/reference/module-registry/#validate-import-attributes) always validates import attributes. Neither legacy flag changes this behavior.
