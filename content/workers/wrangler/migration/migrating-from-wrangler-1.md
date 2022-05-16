---
pcx-content-type: how-to
title: Migrating from Wrangler 1
weight: 1
---

## Migrate from Wrangler 1

This document describes the steps to migrate a project from Wrangler 1 to Wrangler 2.

Wrangler 2 ships with new features and improvements that may require some changes to your configuration.

The CLI itself will guide you through the upgrade process.

{{<Aside type="node">}}
To learn more about the improvements to Wrangler, refer to the [Comparing Wrangler 1 & 2 page](/workers/wrangler/compare-v1-v2/).
{{</Aside>}}

### Update Wrangler version

The first step is to update to the latest version of Wrangler in your Worker project.
If you had previously installed Wrangler 1 globally, you can uninstall it with:

```sh
$ npm uninstall -g @cloudflare/wrangler
```

Now, install the latest version of Wrangler into your project, adding it to your `devDependencies`:

```sh
$ npm install -g wrangler
```

To check that you have installed the correct Wrangler version, run:

```sh
$ wrangler --version
```

### Build your Worker

Run the `wrangler dev` command. This will show any warnings or errors that should be addressed.
Note that in most cases, the messages will include actionable instructions on how to resolve the issue.

- Errors need to be fixed before Wrangler can build your Worker.
- In most cases, you will only see warnings.
  These do not stop Wrangler from building your Worker, but consider updating the configuration to remove them.

```sh
$ wrangler dev
```

Here is an example of some warnings and errors:

```sh
 ⛅️ wrangler 2.0.0
-------------------------------------------------------
▲ [WARNING] Processing wrangler.toml configuration:
  - 😶 Ignored: "type":
    Most common features now work out of the box with wrangler, including modules, jsx,
  typescript, etc. If you need anything more, use a custom build.
  - Deprecation: "zone_id":
    This is unnecessary since we can deduce this from routes directly.
  - Deprecation: "build.upload.format":
    The format is inferred automatically from the code.


✘ [ERROR] Processing wrangler.toml configuration:
  - Expected "route" to be either a string, or an object with shape { pattern, zone_id | zone_name }, but got "".
```

### Common deprecations

Here are common fields that are no longer required.

- `type` is no longer required. Wrangler will infer the correct project type automatically.
- `zone_id` is no longer required. It can be deduced from the routes directly.
- `build.upload.format` is no longer used. The format is now inferred automatically from the code.
- `build.upload.main` and `build.upload.dir` are no longer required. Use the top level `main` field, which now serves as the entry-point for the Worker.
- `site.entry-point` is no longer required. The entry point should be specified through the `main` field.
- `webpack_config` and `webpack` properties are no longer supported. Refer to [Ejecting Webpack](/workers/wrangler/migration/eject-webpack/).

Here are the Wrangler 1 commands that are no longer supported:

- `wrangler preview` - Use the `wrangler dev` command, for running your worker in your local environment.
- `wrangler generate` - If you want to use a starter template, clone its GitHub repository and manually initialize it.
- `wrangler route` - Routes are defined in the `wrangler.toml` configuration file.
- `wrangler report` - If you find a bug please report it at [Wrangler issues](https://github.com/cloudflare/wrangler2/issues/new/choose).
- `wrangler build` - If you wish to access the output from bundling your Worker use `wrangler publish --outdir=path/to/output`.

Refer to the [deprecations guide](/workers/wrangler/migration/deprecations/) for more details on what is no longer supported.
