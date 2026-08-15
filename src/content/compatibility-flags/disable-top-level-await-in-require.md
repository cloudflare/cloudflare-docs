---
_build:
publishResources: false
render: never
list: never

name: "Disable top-level await in require(...)"
sort_date: "2024-12-02"
enable_date: "2024-12-02"
enable_flag: "disable_top_level_await_in_require"
disable_flag: "enable_top_level_await_in_require"
---

The `disable_top_level_await_in_require` and `enable_top_level_await_in_require` flags apply only to the legacy module registry.

The legacy registry originally allowed required modules to use top-level `await`. The `disable_top_level_await_in_require` flag makes `require()` fail when the required module uses top-level `await`.

It is enabled by default for compatibility dates on or after `2024-12-02`. The `enable_top_level_await_in_require` flag restores the original behavior.

The [new module registry](/workers/reference/module-registry/#use-require-with-es-modules) always rejects `require()` when the target module or its import graph uses top-level `await`. Neither legacy flag changes this behavior.
