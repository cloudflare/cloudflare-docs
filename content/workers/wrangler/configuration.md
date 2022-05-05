---
pcx-content-type: how-to
title: Configuration
weight: 3
---

## Configuring `wrangler.toml`

`wrangler` optionally uses a `wrangler.toml` configuration file to customise the development and publishing setup for a Worker. This document serves as a reference for all the fields and acceptable values in this configuration file.

```toml
---
filename: wrangler.toml
---
name = "worker"                    # --name

compatibility_date = "2021-11-12"  # --compat-date
compatibility_flags = [            # --compat-flag
    "formdata_parser_supports_files"
]

kv_namespaces = [                  # --kv
  { binding = "TEST_NAMESPACE", id = "", preview_id = "" }
]

[durable_objects]
bindings = [                       # --do
  { name = "OBJECT", class_name = "Object" }
]

[vars]                             # --binding
KEY = "value"

[site]
bucket = "./public"                # --site
include = ["upload_dir"]           # --site-include
exclude = ["ignore_dir"]           # --site-exclude

[triggers]
crons = ["30 * * * *"]             # --cron

[build]
command = "npm run build"          # --build-command
cwd = "build_cwd"                  # --build-base-path
watch_dir = "build_watch_dir"      # --build-watch-path

[wasm_modules]                     # --wasm
MODULE = "module.wasm"
```
