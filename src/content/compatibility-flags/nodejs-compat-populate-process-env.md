---
name: "Enable auto-populating `process.env`"
sort_date: "2025-02-27"
enable_date: "2025-04-01"
enable_flag: "nodejs_compat_populate_process_env"
disable_flag: "nodejs_compat_do_not_populate_process_env"
---

When you enable the `nodejs_compat_populate_process_env` compatibility flag and the [`nodejs_compat`](/workers/runtime-apis/nodejs/)
flag is also enabled, `process.env` will be populated with values from any bindings with text or JSON values.
This means that if you have added [environment variables](/workers/configuration/environment-variables/),
[secrets](/workers/configuration/secrets/), or [version metadata](/workers/runtime-apis/bindings/version-metadata/)
bindings, these values can be accessed on `process.env`.

```js
const apiClient = ApiClient.new({ apiKey: process.env.API_KEY });
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
```

This makes accessing these values easier and conforms to common Node.js patterns, which can
reduce toil and help with compatability for existing Node.js libraries.

If users do not wish for these values to be accessible via `process.env`, they can use the
`nodejs_compat_do_not_populate_process_env` flag. In this case, `process.env` will still be
available, but will not have values automatically added.
