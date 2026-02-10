---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable `navigator.language`"
sort_date: "2025-05-19"
enable_date: "2025-05-19"
enable_flag: "enable_navigator_language"
disable_flag: "disable_navigator_language"
---

When the `enable_navigator_language` flag is set, the `navigator.language` property
will be available in Workers. For now, the value of `navigator.language` will
always be `en`.

When the `disable_navigator_language` flag is set, the `navigator.language` property
will not be available.
