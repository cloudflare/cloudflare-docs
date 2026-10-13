---
name: "Enable `process` v2 implementation"
sort_date: "2025-09-15"
enable_date: "2025-09-15"
enable_flag: "enable_nodejs_process_v2"
disable_flag: "disable_nodejs_process_v2"
---

When enabled after 2025-09-15, the `enable_nodejs_process_v2` flag along with the [`nodejs_compat`](/workers/runtime-apis/nodejs/) compat flag
ensures a comprehensive Node.js-compatible `process` implementation, updating from the previous minimal process implementation
that only provided the limited `nextTick`, `env`, `exit`, `getBuiltinModule`, `platform` and `features` properties.

To continue using the previous minimal implementation after the compat date, set the `disable_nodejs_process_v2` flag instead.

Most Node.js-supported process properties are implemented where possible, with undefined exports for unsupported features. See the [process documentation](/workers/runtime-apis/nodejs/process/) for Workers-specific implementation details.
