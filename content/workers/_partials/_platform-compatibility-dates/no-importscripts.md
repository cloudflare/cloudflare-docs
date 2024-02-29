---
_build:
  publishResources: false
  render: never
  list: never

name: "Suppress global `importScripts()`"
sort_date: "2024-03-04"
enable_date: "2024-03-04"
enable_flag: "no_global_importscripts"
disable_flag: "global_importscripts"
---

Suppresses the global `importScripts()` function. This method was included in the Workers global scope but was marked explicitly as non-implemented. However, the presence of the function could cause issues with some libraries. This compatibility flag removes the function from the global scope.
