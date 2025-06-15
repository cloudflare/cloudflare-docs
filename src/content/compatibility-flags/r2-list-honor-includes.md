---
_build:
  publishResources: false
  render: never
  list: never

name: "`R2` bucket `list` respects the `include` option"
sort_date: "2022-08-04"
enable_date: "2022-08-04"
enable_flag: "r2_list_honor_include"
---

With the `r2_list_honor_include` flag set, the `include` argument to R2 `list` options is honored. With an older compatibility date and without this flag, the `include` argument behaves implicitly as `include: ["httpMetadata", "customMetadata"]`.
