---
pcx_content_type: configuration
title: Custom builds
weight: 4
---

# Custom builds

Custom builds are a way for you to customize how your code is compiled, before being processed by Wrangler.

{{<Aside type="note">}}
With the release of Wrangler v2, it is no longer necessary to use custom builds to bundle your code via webpack and similar bundlers. Wrangler runs [esbuild](https://esbuild.github.io/) by default as part of the `dev` and `publish` commands, and bundles your Worker project into a single Worker script. Refer to [Bundling](/workers/wrangler/bundling/).
{{</Aside>}}

## Configure custom builds

Custom builds are configured by adding a `[build]` section in your `wrangler.toml`, and using the following options for configuring your custom build.

{{<definitions>}}

- `command` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used. This command will be run as part of `wrangler dev` and `wrangler deploy`.

- `cwd` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory in which the command is executed.

- `watch_dir` {{<type>}}string | string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`. Defaults to the current working directory.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
[build]
command = "npm run build"
cwd = "build_cwd"
watch_dir = "build_watch_dir"
```
