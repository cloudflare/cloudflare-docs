---
_build:
  publishResources: false
  render: never
  list: never

name: "Do not substitute `null` on `TypeError`"
sort_date: "2022-06-01"
enable_date: "2022-06-01"
enable_flag: "dont_substitute_null_on_type_error"
disable_flag: "substitute_null_on_type_error"
---

There was a bug in the runtime that meant that when being passed into built-in APIs, invalid values were sometimes mistakenly coalesced with `null`. Instead, a `TypeError` should have been thrown. The `dont_substitute_null_on_type_error` fixes this behavior so that an error is correctly thrown in these circumstances.
