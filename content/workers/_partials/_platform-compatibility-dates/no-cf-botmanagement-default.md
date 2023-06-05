---
_build:
  publishResources: false
  render: never
  list: never

name: "No CfBotManagement Default"
sort_date: "2023-08-01"
enable_date: "2023-08-01"
enable_flag: "no_cf_botmanagement_default"
disable_flag: "cf_botmanagement_default"
---

With `"no_cf_botmanagement_default"` **enabled** no default cfBotManagement data will be included.
With the the flag **disabled**, default cfBotManagement data will be included in the`request.cf` if the field is not present.