---
_build:
  publishResources: false
  render: never
  list: never

name: "CommonJS modules do not export a module namespace"
sort_date: "2022-10-31"
enable_date: "2022-10-31"
enable_flag: "export_commonjs_default"
disable_flag: "export_commonjs_namespace"
---

CommonJS modules were previously exporting a module namespace (an object like `{ default: module.exports }`) rather than exporting only the `module.exports`. When this flag is enabled, the export is fixed.
