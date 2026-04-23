---
_build:
  publishResources: false
  render: never
  list: never

name: "Remove end-of-life Node.js APIs"
sort_date: "2025-09-01"
enable_date: "2025-09-01"
enable_flag: "remove_nodejs_compat_eol"
disable_flag: "add_nodejs_compat_eol"
---

When `remove_nodejs_compat_eol` is enabled, APIs that have reached End-of-Life in Node.js will be removed for Workers. When disabled, the APIs are present but might still be non-functional stubs.

This flag is a roll-up flag. As additional APIs reach EOL in specific Node.js versions, new version-specific compat flags are added (such as `remove_nodejs_compat_eol_v22`, `remove_nodejs_compat_eol_v23`, and `remove_nodejs_compat_eol_v24`) that are implied by this flag after their respective dates.

This flag is automatically enabled for Workers using a compatibility date of 2025-09-01 or later when [`nodejs_compat`](/workers/runtime-apis/nodejs/) is enabled.
