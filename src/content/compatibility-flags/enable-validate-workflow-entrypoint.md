---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable workflow entrypoint validation"
sort_date: "2025-09-20"
enable_date: "2025-09-20"
enable_flag: "enable_validate_workflow_entrypoint"
disable_flag: "disable_validate_workflow_entrypoint"
---

When `enable_validate_workflow_entrypoint` is enabled, additional validation checks are performed to ensure that [Workflows](/workflows/) are defined and used correctly. This helps catch configuration errors at upload time rather than at runtime.
