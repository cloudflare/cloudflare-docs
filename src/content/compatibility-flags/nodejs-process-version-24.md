---
name: "Report Node.js 24 as `process.version`"
sort_date: "2026-11-24"
enable_date: "2026-11-24"
enable_flag: "nodejs_process_version_24"
disable_flag: "no_nodejs_process_version_24"
---

When you enable the `nodejs_process_version_24` compatibility flag along with the [`nodejs_compat`](/workers/runtime-apis/nodejs/) flag, `process.version` and `process.versions.node` report the latest Node.js 24 release instead of the latest Node.js 22 release.

```js
process.version; // "v24.22.2" with the flag, "v22.23.4" without it
```

Workers provide [a subset of Node.js APIs](/workers/runtime-apis/nodejs/). `process.version` and `process.versions.node` tell libraries which Node.js release the [Node.js compatibility layer](/workers/runtime-apis/nodejs/) targets. Libraries often check them to decide which features to use, so with this flag a library may take code paths written for Node.js 24.

To keep reporting Node.js 22 after the compatibility date, set the `no_nodejs_process_version_24` flag.
