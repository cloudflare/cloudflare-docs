---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable fast JSG struct optimization"
sort_date: "2025-12-03"
enable_date: "2025-12-03"
enable_flag: "enable_fast_jsg_struct"
disable_flag: "disable_fast_jsg_struct"
---

When `enable_fast_jsg_struct` is enabled, internal struct types used by Workers runtime APIs are constructed using a more efficient pattern that reduces object creation time.

However, optional fields will be explicitly set to `undefined` rather than being omitted from the object entirely, which is an observable behavior change. Code that checks for the presence of a property using `"key" in obj` or `Object.hasOwn(obj, "key")` may behave differently, since optional fields that were previously absent will now be present with a value of `undefined`.

To check for a value, prefer `obj.key !== undefined` over `"key" in obj`.
